const TRANSLATION_URL='https://www.deepl.com/es/translator#ja/en-us/%s'

var currentRom, currentPointers;



const translateLink=document.createElement('a');
translateLink.id='link-translate';
translateLink.target='_blank';
translateLink.textContent='Translate with DeepL';


const _loadRom=function(arrayBuffer, fileName){
	currentRom=new BinFile(arrayBuffer);
	currentRom.fileName=fileName;

	if(!GAME_INFO.checkFile(currentRom)){
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
		textareaTranslated.addEventListener('change', function(evt){
			pointer.modified=2;
			pointer.data=GAME_INFO.encodeText(this.value);
			this.value=GAME_INFO.decodeText(pointer.data);
			document.getElementById('btn-export-texts').disabled=false;
			div.classList.add('modified');
		});

		div.appendChild(header);
		div.appendChild(textareaOriginal);
		div.appendChild(textareaTranslated);
		document.getElementById('container-texts').appendChild(div);
		div.addEventListener('mouseenter', function(evt){
			translateLink.href=TRANSLATION_URL.replace('%s', encodeURIComponent(decodedText));
			this.appendChild(translateLink);
		})
	});

	GRAPHIC_REPLACEMENTS.forEach(function(graphicReplacement, i){
		currentRom.seek(graphicReplacement.offset);
		const canvasOriginal=document.createElement('canvas');
		const width=graphicReplacement.width;
		const height=graphicReplacement.height;
		canvasOriginal.width=width*8;
		canvasOriginal.height=height*8;
		for(var y=0; y<height; y++){
			for(var x=0; x<width; x++){
				const tileData=currentRom.readBytes(16);
				canvasOriginal.getContext('2d').putImageData(TileNGPC.import(tileData).toImageData(), x*8, y*8);
			}
		}
		const header=document.createElement('div');
		header.innerHTML='<strong>Graphic replacement #'+i+'</strong> <small>0x'+graphicReplacement.offset.toString(16).padStart(6, '0')+'</small><br/>';
		header.innerHTML+='<div>'+(graphicReplacement.comment || '-')+'</div>';




		const div=document.createElement('div');
		div.className='container-text';
		div.appendChild(header);
		div.appendChild(canvasOriginal);

		if(graphicReplacement.file){
			const imgTranslated=new Image();
			imgTranslated.onload=function(evt){
				const image=this;
				if(image.width%8!==0){
					const divMessage=document.createElement('div');
					divMessage.className='text-danger';
					divMessage.innerHTML=graphicReplacement.file+'.png width is not a multiple of 8 ('+image.width+'px)';
					div.appendChild(divMessage);
				}else if(image.height%8!==0){
					const divMessage=document.createElement('div');
					divMessage.className='text-danger';
					divMessage.innerHTML=graphicReplacement.file+'.png height is not a multiple of 8 ('+image.height+'px)';
					div.appendChild(divMessage);
				}
				const canvas = document.createElement('canvas');
				canvas.id='graphic-replacement-'+graphicReplacement.offset;
				canvas.width = image.width;
				canvas.height = image.height;
				const ctx = canvas.getContext('2d', {willReadFrequently: true});
				ctx.drawImage(image, 0, 0);
				const imageData = ctx.getImageData(0, 0, image.width, image.height);

				const result = Tileset.fromImageData(imageData, ConsoleGraphicsNGPC);
				const resultImageData=result.tileset.toImageData();
				canvas.width = resultImageData.width;
				canvas.height = resultImageData.height;
				ctx.putImageData(resultImageData, 0, 0);
				div.appendChild(canvas);
			};
			imgTranslated.src='translation/graphics/'+graphicReplacement.file+'.png';
		}

		document.getElementById('container-texts').appendChild(div);
	});

	MAP_REPLACEMENTS.forEach(function(mapReplacement, i){
		currentRom.seek(mapReplacement.offset);

		const header=document.createElement('div');
		header.innerHTML='<strong>Map replacement #'+i+'</strong> <small>0x'+mapReplacement.offset.toString(16).padStart(6, '0')+'</small><br/>';
		header.innerHTML+='<div class="comment">'+(mapReplacement.comment || '-')+'</div>';

		const div=document.createElement('div');
		div.className='container-text';
		div.appendChild(header);
		div.appendChild(document.createElement('span'));
		div.appendChild(document.createElement('span'));
		document.getElementById('container-texts').appendChild(div);
	});

	document.getElementById('btn-export-rom').disabled=false;
};

const _findKnownPointer=function(pointerIndex){
	if(typeof KNOWN_POINTERS!=='undefined' && Array.isArray(KNOWN_POINTERS)){
		return KNOWN_POINTERS.find((pointerInfo) => pointerInfo.pointerIndex===pointerIndex);
	}
	return null;
}


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
				translation:GAME_INFO.decodeText(pointer.data)
			};
			textareaValue+=JSON.stringify(object) + ',\n';
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
			reader.readAsArrayBuffer(file);
		}
	});

	document.getElementById('btn-export-rom').addEventListener('click', function(evt){
		const translatedRom=GAME_INFO.saveTexts(currentRom, currentPointers.filter(pointer => !!pointer.modified));
		translatedRom.setName(currentRom.getName() + ' (translated)');
		translatedRom.save();
	});
	if(location.protocol==='file:' && typeof GAME_INFO.autoloadFile==='string'){
		this.fetch('./translation/'+GAME_INFO.autoloadFile)
			.then(response => response.arrayBuffer())
			.then(arrayBuffer => {
				_loadRom(arrayBuffer, GAME_INFO.autoloadFile);
			})
			.catch(error => {
				console.error('Failed to autoload ROM:', error);
			});
	}
});