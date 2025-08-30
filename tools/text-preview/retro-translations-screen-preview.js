
const RetroTranslationsScreenPreview=(function(){
	let backgroundsInfo;
	const canvas=document.createElement('canvas');
	canvas.id='canvas-retro-screen-preview';
	canvas.className='pixelate';
	const ctx=canvas.getContext('2d');
	let currentBackground, currentText='', vwf;

	const _onLoadImages=function(evt){
		if(
			!currentBackground.backgroundImage || !currentBackground.backgroundImage.complete || currentBackground.backgroundImage.naturalWidth === 0 ||
			!currentBackground.fontImage || !currentBackground.fontImage.complete || currentBackground.fontImage.naturalWidth === 0
		){
			return false;
		}

		const cols=Math.floor(currentBackground.fontImage.width / currentBackground.width);
		currentBackground.fontTiles=new Array(256);
		for(var i=0; i<currentBackground.fontTiles.length; i++){
			if(i>=32 && i<=126){
				currentBackground.fontTiles[i]={x:(i%cols) * currentBackground.width, y:((Math.floor(i/cols)) - 1) * currentBackground.height, width: currentBackground.width};
			}else{
				currentBackground.fontTiles[i]={x:0, y:0, width: currentBackground.width};
			}
		}



		const tmpCanvas=document.createElement('canvas');
		tmpCanvas.width=currentBackground.width;
		tmpCanvas.height=currentBackground.height;
		const tmpCtx = tmpCanvas.getContext('2d');

		const tileWidth=currentBackground.width;
		const tileHeight=currentBackground.height;
		
		const nCharsX=Math.ceil(currentBackground.fontImage.width / tileWidth);
		const nCharsY=Math.ceil(currentBackground.fontImage.height / tileHeight);
		const nChars=nCharsX * nCharsY;
		currentBackground.variableWidthCharacters=new Array(255);
		currentBackground.variableWidthCharacters.fill(tileWidth);
		
		currentBackground.variableWidthCharacters[32]=currentBackground.spaceWidth?? tileWidth/2; //space

		for(var i=1; i<nChars; i++){
			tmpCtx.clearRect(0, 0, tileWidth, tileHeight);
			tmpCtx.drawImage(currentBackground.fontImage, -(i % nCharsX * tileWidth), -(Math.floor(i / nCharsX) * tileHeight));
			const tmpImageData=tmpCtx.getImageData(0, 0, tileWidth, tileHeight);

			for(var x=tileWidth-1; x>0; x--){
				var y;
				var temp=(tileWidth*tileHeight*4)-(tileWidth-x)*4;
				for(y=0; y<tileHeight; y++){
					if(tmpImageData.data[temp + 3] != 0){
						break;
					}
					temp-=tileWidth*4;
				}
				if(y==tileHeight){
					currentBackground.variableWidthCharacters[32+i]--;
				}else{
					break;
				}
			}
		}

		//document.getElementById('select-background').disabled=false;
		//document.getElementById('textarea-text').disabled=false;

		_refreshCanvas(true);
	};

	const _refreshCanvas=function(zoomCanvas){
		if(zoomCanvas){
			canvas.width=currentBackground.backgroundImage.width;
			canvas.height=currentBackground.backgroundImage.height;
			canvas.style.width=(currentBackground.backgroundImage.width * 2) + 'px';
			canvas.style.height=(currentBackground.backgroundImage.height * 2) + 'px';
		}

		ctx.drawImage(currentBackground.backgroundImage, 0, 0);
		const text=currentText;
		
		var x=currentBackground.x;
		var y=currentBackground.y;
		for(var i=0; i<text.length; i++){
			var char=text.charAt(i);
			var charCode=text.charCodeAt(i);
			var characterWidth;
			if(vwf){
				characterWidth=currentBackground.variableWidthCharacters[charCode] + (currentBackground.letterSpacing?? 0);
			}else{
				characterWidth=currentBackground.width;
			}
			if(char==='\n'){
				x=currentBackground.x;
				y+=currentBackground.lineHeight;
			}else{
				const tileInfo=currentBackground.fontTiles[charCode];
				ctx.drawImage(currentBackground.fontImage, tileInfo.x, tileInfo.y, tileInfo.width, currentBackground.height, x, y, tileInfo.width, currentBackground.height)
				x+=characterWidth;
			}
		}
	};


	const _setBackground=function(backgroundIndex){
		currentBackground=backgroundsInfo[backgroundIndex];
		if(!currentBackground.backgroundImage || !currentBackground.fontImage){
			//document.getElementById('select-background').disabled=true;
			//document.getElementById('textarea-text').disabled=true;

			currentBackground.backgroundImage=new Image();
			currentBackground.backgroundImage.onload=function(){
				_onLoadImages();
			}
			currentBackground.backgroundImage.onerror=function(){
				throw new Error('background image not found');
			};
			currentBackground.backgroundImage.src=currentBackground.folder+'/'+currentBackground.background+'.png';

			currentBackground.fontImage=new Image();
			currentBackground.fontImage.onload=function(){
				_onLoadImages();
			};
			currentBackground.fontImage.onerror=function(){
				throw new Error('font image not found');
			};
			currentBackground.fontImage.src=currentBackground.folder+'/'+currentBackground.font+'.png';
		}else{
			_refreshCanvas(true);
		}
	};

	return {
		initialize: function(backgroundsInfoParam){
			if(backgroundsInfo)
				throw new Error('already initialized');

			backgroundsInfo=backgroundsInfoParam;


			_setBackground(0);

			return this.getSettings();
		},
		getSettings: function(){
			return {
				canvas,
				backgrounds:backgroundsInfo
			};
		},
		setBackground:function(param){
			if(typeof param==='string')
				param=backgroundsInfo.findIndex(function(b){ return param===(b.folder+'/'+b.background); });

			if(typeof param==='number' && param>=0 && param<backgroundsInfo.length)
				_setBackground(param);
		},
		setText: function(text){
			currentText=text.replace(/\r?\n/g, '\n').replace(/\r/g, '\n');
			_refreshCanvas();
		},
		setVWF: function(vwfParam){
			vwfParam=!!vwfParam;
			if(vwf!==vwfParam){
				vwf=vwfParam;
				_refreshCanvas();
			}
		}
	}
}());
