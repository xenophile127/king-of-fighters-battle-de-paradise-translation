const GAME_INFO={
	autoloadFile:'King of Fighters, The - Battle de Paradise (Japan).ngc',
	version: '0.1',
	checkFile:function(romFile){
		currentRom.littleEndian=true;
		romFile.seek(0x24);
		return romFile.fileSize===0x200000 && romFile.readString(0x0c)==='BATTLEDEPARA';
	},
	getTexts:function(romFile){
		const texts=[];
		romFile.seek(0x080004);
		for(var i=0; i<2136; i++){
			const pointerOffset=romFile.offset;
			const pointer=romFile.readU32();
			if(pointer===0xffffffff)
				continue;

			romFile.push();

			romFile.seek(pointer - 0x200000);

			const readBytes=[];
			while(true){
				const charCode=romFile.readU8();
				readBytes.push(charCode);
				if(charCode===0x00)
					break;
			}

			texts.push({
				pointerIndex:i,
				pointerOffset,
				pointer:pointer - 0x200000,
				data:readBytes
			});

			romFile.pop();
		}
		return texts;
	},
	saveTexts:function(romFile, texts){
		const clonedRomFile=romFile.slice();
		var freeOffset=0x1f1200;
		texts.forEach(function(pointerInfo){
			clonedRomFile.seek(pointerInfo.pointerOffset);
			clonedRomFile.writeU32(freeOffset + 0x200000);
			clonedRomFile.seek(freeOffset);
			clonedRomFile.writeBytes(pointerInfo.data);
			freeOffset+=pointerInfo.data.length;
		});

		GRAPHIC_REPLACEMENTS.filter((graphicReplacement) => graphicReplacement.file).forEach(function(graphicReplacement, i){
			const image=document.getElementById('graphic-replacement-' + graphicReplacement.offset);
			const canvas = document.createElement('canvas');
			canvas.width = image.width;
			canvas.height = image.height;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(image, 0, 0);
			const imageData = ctx.getImageData(0, 0, image.width, image.height);

			const result = Tileset.fromImageData(imageData, ConsoleGraphicsNGPC);
			const resultData=result.tileset.tiles.map((tile) => tile.export()).flat();

			clonedRomFile.seek(graphicReplacement.offset);
   			clonedRomFile.writeBytes(resultData);
		});
		return clonedRomFile;
	},
	decodeText:function(bytes){
		var str='';
		for(var i=0; i<bytes.length; i++){
			const charCode=bytes[i];
			if(charCode===0x01 || charCode===0x02){
				const word=(bytes[i] << 8) + bytes[i+1];
				const foundChar=CHAR_TABLE.find((char) => char.id===word);
				if(foundChar){
					str+=foundChar.char;
				}else{
					str+='['+word.toString(16).padStart(4, '0')+']';
				}
				i++;
			}else if(charCode===0x00){
				break;
			}else{
				const foundChar=CHAR_TABLE.find((char) => char.id===charCode);
				if(foundChar){
					str+=foundChar.char;
				}else{
					str+='['+charCode.toString(16).padStart(2, '0')+']';
				}
			}
		}
		return str;
	},
	encodeText:function(text){
		text=text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

		const bytes=[];
		while(text.length){
			if(/^\[[0-9a-f]{2,4}\]/i.test(text)){
				const match=text.match(/^\[([0-9a-f]{2,4})\]/i);
				const data=parseInt(match[1], 16);
				if(data>0xff){
					bytes.push(data >> 8);
					bytes.push(data & 0xff);
				}else{
					bytes.push(data);
				}

				text=text.replace(/^\[[0-9a-f]{2,4}\]/, '');
			}else{
				const foundChar=CHAR_TABLE.find((char) => char.char===text.charAt(0));
				if(foundChar){
					if(foundChar.id>0xff){
						bytes.push(foundChar.id >> 8);
						bytes.push(foundChar.id & 0xff);
					}else{
						bytes.push(foundChar.id);
					}
				}else{
					bytes.push(0x3f); // ?
				}

				text=text.substr(1);
			}
		}
		bytes.push(0x00);
		return bytes;
	}
};


const CHAR_TABLE=[
	{id:0x00, char:''}, //EOS

	{id:0x0d, char:'\n'}, //BR

	{id:0x20, char:' '},
	{id:0x21, char:'!'},
	{id:0x22, char:'"'},
	{id:0x23, char:'#'},
	{id:0x24, char:'$'},
	{id:0x25, char:'%'},
	{id:0x26, char:'&'},
	{id:0x27, char:"'"},
	{id:0x28, char:'('},
	{id:0x29, char:')'},
	{id:0x2a, char:'*'},
	{id:0x2b, char:'+'},
	{id:0x2c, char:','},
	{id:0x2d, char:'-'},
	{id:0x2e, char:'.'},
	{id:0x2f, char:'/'},
	{id:0x30, char:'0'},
	{id:0x31, char:'1'},
	{id:0x32, char:'2'},
	{id:0x33, char:'3'},
	{id:0x34, char:'4'},
	{id:0x35, char:'5'},
	{id:0x36, char:'6'},
	{id:0x37, char:'7'},
	{id:0x38, char:'8'},
	{id:0x39, char:'9'},
	{id:0x3a, char:':'},
	{id:0x3b, char:';'},
	{id:0x3c, char:'<'},
	{id:0x3d, char:'='},
	{id:0x3e, char:'>'},
	{id:0x3f, char:'?'},
	{id:0x40, char:'·'},
	{id:0x41, char:'A'},
	{id:0x42, char:'B'},
	{id:0x43, char:'C'},
	{id:0x44, char:'D'},
	{id:0x45, char:'E'},
	{id:0x46, char:'F'},
	{id:0x47, char:'G'},
	{id:0x48, char:'H'},
	{id:0x49, char:'I'},
	{id:0x4a, char:'J'},
	{id:0x4b, char:'K'},
	{id:0x4c, char:'L'},
	{id:0x4d, char:'M'},
	{id:0x4e, char:'N'},
	{id:0x4f, char:'O'},
	{id:0x50, char:'P'},
	{id:0x51, char:'Q'},
	{id:0x52, char:'R'},
	{id:0x53, char:'S'},
	{id:0x54, char:'T'},
	{id:0x55, char:'U'},
	{id:0x56, char:'V'},
	{id:0x57, char:'W'},
	{id:0x58, char:'X'},
	{id:0x59, char:'Y'},
	{id:0x5a, char:'Z'},
	{id:0x5b, char:'['},
	{id:0x5c, char:'￥'},
	{id:0x5d, char:']'},
	{id:0x5e, char:'―'},
	{id:0x5f, char:'_'},
	{id:0x60, char:'あ'},
	{id:0x61, char:'い'},
	{id:0x62, char:'う'},
	{id:0x63, char:'え'},
	{id:0x64, char:'お'},
	{id:0x65, char:'か'},
	{id:0x66, char:'き'},
	{id:0x67, char:'く'},
	{id:0x68, char:'け'},
	{id:0x69, char:'こ'},
	{id:0x6a, char:'さ'},
	{id:0x6b, char:'し'},
	{id:0x6c, char:'す'},
	{id:0x6d, char:'せ'},
	{id:0x6e, char:'そ'},
	{id:0x6f, char:'た'},
	{id:0x70, char:'ち'},
	{id:0x71, char:'つ'},
	{id:0x72, char:'て'},
	{id:0x73, char:'と'},
	{id:0x74, char:'な'},
	{id:0x75, char:'に'},
	{id:0x76, char:'ぬ'},
	{id:0x77, char:'ね'},
	{id:0x78, char:'の'},
	{id:0x79, char:'は'},
	{id:0x7a, char:'ひ'},
	{id:0x7b, char:'ふ'},
	{id:0x7c, char:'へ'},
	{id:0x7d, char:'ほ'},
	{id:0x7e, char:'ま'},
	{id:0x7f, char:'み'},
	{id:0x80, char:'む'},
	{id:0x81, char:'め'},
	{id:0x82, char:'も'},
	{id:0x83, char:'や'},
	{id:0x84, char:'ゆ'},
	{id:0x85, char:'よ'},
	{id:0x86, char:'ら'},
	{id:0x87, char:'り'},
	{id:0x88, char:'る'},
	{id:0x89, char:'れ'},
	{id:0x8a, char:'ろ'},
	{id:0x8b, char:'わ'},
	{id:0x8c, char:'を'},
	{id:0x8d, char:'ん'},
	{id:0x8e, char:'ぁ'},
	{id:0x8f, char:'ぃ'},
	{id:0x90, char:'ぅ'},
	{id:0x91, char:'ぇ'},
	{id:0x92, char:'ぉ'},
	{id:0x93, char:'ゃ'},
	{id:0x94, char:'ゅ'},
	{id:0x95, char:'ょ'},
	{id:0x96, char:'っ'},
	{id:0x97, char:'が'},
	{id:0x98, char:'ぎ'},
	{id:0x99, char:'ぐ'},
	{id:0x9a, char:'げ'},
	{id:0x9b, char:'ご'},
	{id:0x9c, char:'ざ'},
	{id:0x9d, char:'じ'},
	{id:0x9e, char:'ず'},
	{id:0x9f, char:'ぜ'},
	{id:0xa0, char:'ぞ'},
	{id:0xa1, char:'だ'},
	{id:0xa2, char:'ぢ'},
	{id:0xa3, char:'づ'},
	{id:0xa4, char:'で'},
	{id:0xa5, char:'ど'},
	{id:0xa6, char:'ば'},
	{id:0xa7, char:'び'},
	{id:0xa8, char:'ぶ'},
	{id:0xa9, char:'べ'},
	{id:0xaa, char:'ぼ'},
	{id:0xab, char:'ぱ'},
	{id:0xac, char:'ぴ'},
	{id:0xad, char:'ぷ'},
	{id:0xae, char:'ぺ'},
	{id:0xaf, char:'ぽ'},
	{id:0xb0, char:'ア'},
	{id:0xb1, char:'イ'},
	{id:0xb2, char:'ウ'},
	{id:0xb3, char:'エ'},
	{id:0xb4, char:'オ'},
	{id:0xb5, char:'カ'},
	{id:0xb6, char:'キ'},
	{id:0xb7, char:'ク'},
	{id:0xb8, char:'ケ'},
	{id:0xb9, char:'コ'},
	{id:0xba, char:'サ'},
	{id:0xbb, char:'シ'},
	{id:0xbc, char:'ス'},
	{id:0xbd, char:'セ'},
	{id:0xbe, char:'ソ'},
	{id:0xbf, char:'タ'},
	{id:0xc0, char:'チ'},
	{id:0xc1, char:'ツ'},
	{id:0xc2, char:'テ'},
	{id:0xc3, char:'ト'},
	{id:0xc4, char:'ナ'},
	{id:0xc5, char:'ニ'},
	{id:0xc6, char:'ヌ'},
	{id:0xc7, char:'ネ'},
	{id:0xc8, char:'ノ'},
	{id:0xc9, char:'ハ'},
	{id:0xca, char:'ヒ'},
	{id:0xcb, char:'フ'},
	{id:0xcc, char:'ヘ'},
	{id:0xcd, char:'ホ'},
	{id:0xce, char:'マ'},
	{id:0xcf, char:'ミ'},
	{id:0xd0, char:'ム'},
	{id:0xd1, char:'メ'},
	{id:0xd2, char:'モ'},
	{id:0xd3, char:'ヤ'},
	{id:0xd4, char:'ユ'},
	{id:0xd5, char:'ヨ'},
	{id:0xd6, char:'ラ'},
	{id:0xd7, char:'リ'},
	{id:0xd8, char:'ル'},
	{id:0xd9, char:'レ'},
	{id:0xda, char:'ロ'},
	{id:0xdb, char:'ワ'},
	{id:0xdc, char:'ヲ'},
	{id:0xdd, char:'ン'},
	{id:0xde, char:'ァ'},
	{id:0xdf, char:'ィ'},
	{id:0xe0, char:'ゥ'},
	{id:0xe1, char:'ェ'},
	{id:0xe2, char:'ォ'},
	{id:0xe3, char:'ャ'},
	{id:0xe4, char:'ュ'},
	{id:0xe5, char:'ョ'},
	{id:0xe6, char:'ッ'},
	{id:0xe7, char:'ガ'},
	{id:0xe8, char:'ギ'},
	{id:0xe9, char:'グ'},
	{id:0xea, char:'ゲ'},
	{id:0xeb, char:'ゴ'},
	{id:0xec, char:'ザ'},
	{id:0xed, char:'ジ'},
	{id:0xee, char:'ズ'},
	{id:0xef, char:'ゼ'},
	{id:0xf0, char:'ゾ'},
	{id:0xf1, char:'ダ'},
	{id:0xf2, char:'ヂ'},
	{id:0xf3, char:'ヅ'},
	{id:0xf4, char:'デ'},
	{id:0xf5, char:'ド'},
	{id:0xf6, char:'バ'},
	{id:0xf7, char:'ビ'},
	{id:0xf8, char:'ブ'},
	{id:0xf9, char:'ベ'},
	{id:0xfa, char:'ボ'},
	{id:0xfb, char:'パ'},
	{id:0xfc, char:'ピ'},
	{id:0xfd, char:'プ'},
	{id:0xfe, char:'ペ'},
	{id:0xff, char:'ポ'},

	//CONTROL CHARACTER 01	
	{id:0x0101, char:'a'},
	{id:0x0102, char:'b'},
	{id:0x0103, char:'c'},
	{id:0x0104, char:'d'},
	{id:0x0105, char:'e'},
	{id:0x0106, char:'f'},
	{id:0x0107, char:'g'},
	{id:0x0108, char:'h'},
	{id:0x0109, char:'i'},
	{id:0x010a, char:'j'},
	{id:0x010b, char:'k'},
	{id:0x010c, char:'l'},
	{id:0x010d, char:'m'},
	{id:0x010e, char:'n'},
	{id:0x010f, char:'o'},
	{id:0x0110, char:'p'},
	{id:0x0111, char:'q'},
	{id:0x0112, char:'r'},
	{id:0x0113, char:'s'},
	{id:0x0114, char:'t'},
	{id:0x0115, char:'u'},
	{id:0x0116, char:'v'},
	{id:0x0117, char:'w'},
	{id:0x0118, char:'x'},
	{id:0x0119, char:'y'},
	{id:0x011a, char:'z'},
	//{id:0x011b, char:'｛'},
	//{id:0x011c, char:'｜'},
	//{id:0x011d, char:'｝'},
	//{id:0x011e, char:'～UPPER'},
	//{id:0x011f, char:'　'},
	//{id:0x0120, char:'―'},
	{id:0x0121, char:'。'},
	{id:0x0122, char:'「'},
	{id:0x0123, char:'」'},
	{id:0x0124, char:'、'},
	{id:0x0125, char:'・'},
	{id:0x0126, char:'←'},
	{id:0x0127, char:'→'},
	{id:0x0128, char:'↑'},
	{id:0x0129, char:'↓'},
	{id:0x012a, char:'～'},

	{id:0x0165, char:'選'}, //???
	{id:0x0166, char:'択'}, //???
	{id:0x0167, char:'左'}, //???
	{id:0x0168, char:'石'}, //???

	{id:0x0183, char:'血'}, //???
	{id:0x019a, char:'少'}, //???
	{id:0x01a0, char:'性'}, //???
	{id:0x01a4, char:'属'}, //???

	//CONTROL CHARACTER 02
	{id:0x021b, char:'何'}, //???
	{id:0x0222, char:'女'}, //???
	{id:0x0239, char:'熱'}, //???
	{id:0x023a, char:'明'}, //???
	{id:0x023b, char:'子'} //???
];

