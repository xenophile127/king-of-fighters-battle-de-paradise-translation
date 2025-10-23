const TRANSLATION_URL_GOOGLE='https://translate.google.com/?sl=ja&tl=en&text=%s&op=translate'
const TRANSLATION_URL_DEEPL='https://www.deepl.com/es/translator#ja/en-us/%s'

var currentRom, currentPointers;
var loadingQueue=0;



const translateLinks=document.createElement('a');
translateLinks.id='links-translate';
translateLinks.innerHTML='Translate with: ';
translateLinks.appendChild(document.createElement('a'));
translateLinks.innerHTML+=' ';
translateLinks.appendChild(document.createElement('a'));
translateLinks.children[0].target='_blank';
translateLinks.children[0].innerHTML='Google';
translateLinks.children[1].target='_blank';
translateLinks.children[1].innerHTML='DeepL';


const _showLoadingMessage=function(message){
	if(message){
		document.getElementById('loading-text').className='show';
		document.getElementById('loading-text').innerHTML=message;
	}else{
		document.getElementById('loading-text').className='';
		document.getElementById('loading-text').innerHTML='';
	}
}
const _loadRom=function(arrayBuffer, fileName){
	currentRom=new BinFile(arrayBuffer);
	currentRom.fileName=fileName;

	if(!GAME_INFO.checkFile(currentRom)){
		_showLoadingMessage();
		alert('Invalid ROM file');
		throw new Error('Invalid ROM');
	}

	currentPointers=GAME_INFO.getTexts(currentRom);

	document.getElementById('container-texts').innerHTML='';
	currentPointers.forEach(function(pointer){
		const knownPointer=_findKnownPointer(pointer.pointerIndex);
		const pretranslatedText=(knownPointer && knownPointer.translation);
		pointer.modified=pretranslatedText? 1:0;

		const div=document.createElement('div');
		div.className='container-text';
	
		const header=document.createElement('div');
		header.innerHTML='<strong>Pointer #'+pointer.pointerIndex+'</strong> <small>0x'+pointer.pointerOffset.toString(16).padStart(6, '0')+' &rarr; 0x'+pointer.pointer.toString(16).padStart(6, '0')+'</small><br/>';
		header.innerHTML+='<div class="comment">'+((knownPointer && knownPointer.comment) || '-')+'</div>';
		const commentContainer=header.querySelector('div.comment');
		commentContainer.addEventListener('click', function(){
			const knownPointer=_findKnownPointer(pointer.pointerIndex);
			const newComment=prompt('Pointer comment:', (knownPointer && knownPointer.comment) || '');

			if(knownPointer){
				if(newComment)
					knownPointer.comment=newComment;
				else
					delete knownPointer.comment;
			}else if(newComment){
				KNOWN_POINTERS.push({pointerIndex:pointer.pointerIndex, comment:newComment});
			}

			commentContainer.innerHTML=newComment || '-';
		});

		const decodedText=GAME_INFO.decodeText(pointer.data);
		const textareaOriginal=document.createElement('textarea');
		textareaOriginal.value=decodedText;
		textareaOriginal.readOnly=true;

		if(pretranslatedText)
			pointer.data=GAME_INFO.encodeText(knownPointer.translation);

		const textareaTranslated=document.createElement('textarea');
		textareaTranslated.value=pretranslatedText? knownPointer.translation : '';
		textareaTranslated.readOnly=(typeof IGNORED_POINTERS==='object' && IGNORED_POINTERS.includes(pointer.pointerIndex));
		textareaTranslated.addEventListener('change', function(evt){
			this.value=this.value.replace(/\r?\n/g, '\n').replace(/\r/g, '\n').replace(/\\n/g, '\n');
			pointer.modified=2;
			pointer.data=GAME_INFO.encodeText(this.value);
			this.value=GAME_INFO.decodeText(pointer.data);
			document.getElementById('btn-export-texts').disabled=false;
			div.classList.add('modified');
		});
		if(Array.isArray(GAME_INFO.previewBackgrounds) && knownPointer?.preview){
			const previewBackground=GAME_INFO.previewBackgrounds.find(b => b.background === knownPointer.preview);
			textareaTranslated.addEventListener('focus', function(evt){
				RetroTranslationsScreenPreview.setBackground(previewBackground.folder + '/' + previewBackground.background);
				RetroTranslationsScreenPreview.setText(GAME_INFO.previewFixFn? GAME_INFO.previewFixFn(this.value) : this.value);
				_showPreviewPopover();
			});
			textareaTranslated.addEventListener('blur', function(evt){
				_hidePreviewPopover();
			});
			textareaTranslated.addEventListener('input', function(evt){
				RetroTranslationsScreenPreview.setText(GAME_INFO.previewFixFn? GAME_INFO.previewFixFn(this.value) : this.value);
			});
		}

		div.appendChild(header);
		div.appendChild(textareaOriginal);
		div.appendChild(textareaTranslated);
		document.getElementById('container-texts').appendChild(div);
		div.addEventListener('mouseenter', function(evt){
			translateLinks.children[0].href=TRANSLATION_URL_GOOGLE.replace('%s', encodeURIComponent(decodedText));
			translateLinks.children[1].href=TRANSLATION_URL_DEEPL.replace('%s', encodeURIComponent(decodedText));
			this.appendChild(translateLinks);
		})
	});

	if(Array.isArray(GAME_INFO.previewBackgrounds)){
		const popoverPreview=document.createElement('div');
		popoverPreview.id='popover-preview';
		document.body.appendChild(popoverPreview);

		RetroTranslationsScreenPreview.initialize(GAME_INFO.previewBackgrounds);
		const canvas=RetroTranslationsScreenPreview.getSettings().canvas;
		popoverPreview.appendChild(canvas);
	}

	
	_showLoadingMessage('Rebuilding graphics...');
	loadingQueue=GRAPHIC_REPLACEMENTS.filter(graphicReplacement => graphicReplacement.file).length;
	const GRAYSCALE_PALETTE=new PaletteNGPC();
	GRAPHIC_REPLACEMENTS.filter(graphicReplacement => graphicReplacement.type==='tileset' ).forEach(function(graphicReplacement, i){
		const rowDiv=document.createElement('div');
		rowDiv.className='container-text';
		rowDiv.appendChild(document.createElement('div'));
		rowDiv.appendChild(document.createElement('div'));
		rowDiv.appendChild(document.createElement('div'));
		rowDiv.children[0].innerHTML='<strong>Graphic replacement #'+i+'</strong> <small>0x'+graphicReplacement.offset.toString(16).padStart(6, '0')+'</small><br/>';
		rowDiv.children[0].innerHTML+='<div>'+(graphicReplacement.comment || '-')+'</div>';

		currentRom.seek(graphicReplacement.offset);

		const tilesetOriginal=new Tileset(ConsoleGraphicsNGPC);
		tilesetOriginal.addPalette(GRAYSCALE_PALETTE);
		for(var j=0; j<graphicReplacement.nTiles; j++){
			tilesetOriginal.addTile(TileNGPC.import(currentRom.readBytes(16), GRAYSCALE_PALETTE));
		}

		if(graphicReplacement.file){
			const imgTranslated=new Image();
			imgTranslated.onload=function(evt){
				const image=this;
				if(image.width%8!==0 || image.height%8!==0){
					const divMessage=document.createElement('div');
					divMessage.className='text-danger';
					divMessage.innerHTML=graphicReplacement.file+'.png width and height must be multiple of 8 ('+image.width+'x'+image.height+'px)';
					rowDiv.children[2].appendChild(divMessage);
				}
				const canvas = document.createElement('canvas');
				canvas.width = image.width;
				canvas.height = image.height;
				const ctx = canvas.getContext('2d', {willReadFrequently: true});
				ctx.drawImage(image, 0, 0);
				const imageData = ctx.getImageData(0, 0, image.width, image.height);

				const result = Tileset.fromImageData(imageData, ConsoleGraphicsNGPC);
				if(result.tileset.tiles.length > graphicReplacement.nTiles){
					const divMessage=document.createElement('div');
					divMessage.className='text-danger';
					divMessage.innerHTML=graphicReplacement.file+'.png exceeds tile limit (&gt;'+graphicReplacement.nTiles+' tiles)';
					rowDiv.children[2].appendChild(divMessage);
				}


				const patchData=result.tileset.tiles.map((tile) => tile.export()).flat();
				PATCHES.push({
					offset: graphicReplacement.offset,
					name: 'automatic generated graphics patch: '+graphicReplacement.file,
					data: patchData
				});
				tilesetOriginal.addPalette(result.tileset.palettes[0]);
				tilesetOriginal.removePalette(0);
				rowDiv.children[1].appendChild(_imageDataToCanvas(tilesetOriginal.toImageData()));
				rowDiv.children[2].appendChild(_imageDataToCanvas(result.tileset.toImageData()));

				loadingQueue--;
				if(loadingQueue===0){
					document.getElementById('btn-export-rom').disabled=false;
					_showLoadingMessage();
				}
			};
			imgTranslated.src='translation/graphics/'+graphicReplacement.file+'.png';
		}else{
			rowDiv.children[1].appendChild(_imageDataToCanvas(tilesetOriginal.toImageData()));
		}
		document.getElementById('container-texts').appendChild(rowDiv);
	});
	GRAPHIC_REPLACEMENTS.filter(graphicReplacement => graphicReplacement.type==='map' ).forEach(function(graphicReplacement, i){
		const rowDiv=document.createElement('div');
		rowDiv.className='container-text';
		rowDiv.appendChild(document.createElement('div'));
		rowDiv.appendChild(document.createElement('div'));
		rowDiv.appendChild(document.createElement('div'));
		rowDiv.children[0].innerHTML='<strong>Map replacement #'+i+'</strong> <small>Tileset: 0x'+graphicReplacement.offsetTileset.toString(16).padStart(6, '0')+'</small> <small>Map: 0x'+graphicReplacement.offsetMap.toString(16).padStart(6, '0')+'</small><br/>';
		rowDiv.children[0].innerHTML+='<div>'+(graphicReplacement.comment || '-')+'</div>';

		currentRom.seek(graphicReplacement.offsetTileset);
		const tilesetOriginal=new Tileset(ConsoleGraphicsNGPC);
		tilesetOriginal.addPalette(GRAYSCALE_PALETTE);
		for(var j=0; j<graphicReplacement.nTiles; j++){
			tilesetOriginal.addTile(TileNGPC.import(currentRom.readBytes(16), GRAYSCALE_PALETTE));
		}

		currentRom.seek(graphicReplacement.offsetMap);
		const mapRawData=currentRom.readBytes(graphicReplacement.width * graphicReplacement.height * 2);
		const mapOriginal=MapNGPC.import(mapRawData, graphicReplacement.width, graphicReplacement.height, tilesetOriginal);

		if(graphicReplacement.file){
			const imgTranslated=new Image();
			imgTranslated.onload=function(evt){
				const image=this;
				if(image.width!==graphicReplacement.width*8 || image.height!==(graphicReplacement.height+1)*8){
					const divMessage=document.createElement('div');
					divMessage.className='text-danger';
					divMessage.innerHTML=graphicReplacement.file+'.png width and height must be '+(graphicReplacement.width*8)+'x'+((graphicReplacement.height+1)*8)+'px';
					rowDiv.children[2].appendChild(divMessage);
				}
				const canvas = document.createElement('canvas');
				canvas.width = image.width;
				canvas.height = image.height;
				const ctx = canvas.getContext('2d', {willReadFrequently: true});
				ctx.drawImage(image, 0, 0);
				const imageData = ctx.getImageData(0, 0, image.width, image.height);

				const result = Tileset.fromImageData(imageData, ConsoleGraphicsNGPC);
				result.tileset.quantize(result.map); //remove exact tiles
				result.tileset.quantize(result.map); //remove exact tiles with different palette
				result.tileset.quantize(result.map); //removed flipped tiles
				if(result.tileset.tiles.length > graphicReplacement.nTiles){
					const divMessage=document.createElement('div');
					divMessage.className='text-danger';
					divMessage.innerHTML=graphicReplacement.file+'.png exceeds tile limit (&gt;'+graphicReplacement.nTiles+' tiles)';
					rowDiv.children[2].appendChild(divMessage);
				}


				const patchDataTileset=result.tileset.tiles.map((tile) => tile.export()).flat();
				PATCHES.push({
					offset: graphicReplacement.offsetTileset,
					name: 'automatic generated graphics (tileset) patch: '+graphicReplacement.file,
					data: patchDataTileset
				});
				const patchDataMap=result.map.export().flat();
				PATCHES.push({
					offset: graphicReplacement.offsetMap,
					name: 'automatic generated graphics (map) patch: '+graphicReplacement.file,
					data: patchDataMap
				});

				rowDiv.children[1].appendChild(_imageDataToCanvas(mapOriginal.toImageData()));
				rowDiv.children[1].appendChild(_imageDataToCanvas(tilesetOriginal.toImageData()));
				rowDiv.children[2].appendChild(_imageDataToCanvas(result.map.toImageData()));
				rowDiv.children[2].appendChild(_imageDataToCanvas(result.tileset.toImageData()));

				loadingQueue--;
				if(loadingQueue===0){
					_showLoadingMessage();
					document.getElementById('btn-export-rom').disabled=false;
				}
			};
			imgTranslated.src='translation/graphics/'+graphicReplacement.file+'.png';
		}else{
			rowDiv.children[1].appendChild(_imageDataToCanvas(mapOriginal.toImageData()));
			rowDiv.children[1].appendChild(_imageDataToCanvas(tilesetOriginal.toImageData()));
		}
		document.getElementById('container-texts').appendChild(rowDiv);
	});
};

const _findKnownPointer=function(pointerIndex){
	if(typeof KNOWN_POINTERS!=='undefined' && Array.isArray(KNOWN_POINTERS)){
		return KNOWN_POINTERS.find((pointerInfo) => pointerInfo.pointerIndex===pointerIndex);
	}
	return null;
}

const _imageDataToCanvas=function(imageData){
	const canvas=document.createElement('canvas');
	canvas.width=imageData.width;
	canvas.height=imageData.height;
	const ctx=canvas.getContext('2d', {willReadFrequently: true});
	ctx.putImageData(imageData, 0, 0);
	return canvas;
}

const _showPreviewPopover=function(){
	document.getElementById('popover-preview').className='show';
};
const _hidePreviewPopover=function(){
	document.getElementById('popover-preview').className='';
};

window.addEventListener('load', function(evt){
	if(typeof GAME_INFO !== 'object')
		throw new Error('GAME_INFO is not defined');
	else if(typeof GAME_INFO.checkFile !== 'function')
		throw new Error('GAME_INFO.checkFile is not a function');
	else if(typeof GAME_INFO.getTexts !== 'function')
		throw new Error('GAME_INFO.getTexts is not a function');
	else if(typeof GAME_INFO.saveTexts !== 'function')
		throw new Error('GAME_INFO.saveTexts is not a function');
	else if(typeof GAME_INFO.decodeText !== 'function')
		throw new Error('GAME_INFO.decodeText is not a function');
	else if(typeof GAME_INFO.encodeText !== 'function')
		throw new Error('GAME_INFO.encodeText is not a function');


	document.getElementById('btn-export-texts').disabled=true;
	document.getElementById('btn-export-rom').disabled=true;

	document.getElementById('btn-export-texts').addEventListener('click', function(evt){
		const textarea=document.getElementById('textarea-export');
		let textareaValue='';
		currentPointers.filter(pointer => pointer.modified>1).forEach(function(pointer){
			const knownPointer=_findKnownPointer(pointer.pointerIndex);
			const object={
				pointerIndex:pointer.pointerIndex,
				comment: (knownPointer && knownPointer.comment) || '-- Add comment here --',
				translation:GAME_INFO.decodeText(pointer.data).replace(/"/g, '&quot;').replace(/'/g, '&#39;')
			};
			textareaValue+=JSON.stringify(object)
				.replace('"pointerIndex"', 'pointerIndex')
				.replace('"comment"', ' comment')
				.replace('"translation"', ' translation')
				.replace(/"/g, "'")
				.replace(/&quot;/g, '"')
				.replace(/&#39;/g, '\\\'') + ',\n';
		});
		textarea.value=textareaValue;
		textarea.focus();
		textarea.select();

		document.getElementById('dialog-export-texts').showModal();
	});

	document.getElementById('input-file').addEventListener('change', function(evt){
		//load file as arrayBuffer
		if (this.files.length > 0) {
			const file = this.files[0];
			const reader = new FileReader();
			reader.onload = function(event) {
				const arrayBuffer = event.target.result;
				_loadRom(arrayBuffer, file.name);
			};
			reader.onerror = function(event) {
				console.error('Error reading file:', event);
			};
			_showLoadingMessage('Loading ROM...');
			reader.readAsArrayBuffer(file);
		}
	});

	document.getElementById('btn-export-rom').addEventListener('click', function(evt){
		const translatedRom=GAME_INFO.saveTexts(currentRom, currentPointers.filter(pointer => !!pointer.modified));
		translatedRom.setName(currentRom.getName() + ' (translated)');
		translatedRom.save();
	});

	const translationStatus=GAME_INFO.getStatus();
	this.document.getElementById('progress-status').max=translationStatus.total;
	this.document.getElementById('progress-status').value=translationStatus.done;
	this.document.getElementById('span-status-done').innerHTML=translationStatus.done;
	this.document.getElementById('span-status-total').innerHTML=translationStatus.total;

	if(location.protocol==='file:' && typeof GAME_INFO.autoloadFile==='string'){
		_showLoadingMessage('Loading ROM...');
		this.fetch('./translation/'+GAME_INFO.autoloadFile)
			.then(response => response.arrayBuffer())
			.then(arrayBuffer => {
				_loadRom(arrayBuffer, GAME_INFO.autoloadFile);
			})
			.catch(error => {
				_showLoadingMessage('Autoload ROM failed');
				console.error('Failed to autoload ROM:', error);
			});
	}
});