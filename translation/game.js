const GAME_INFO={
	autoloadFile:'King of Fighters, The - Battle de Paradise (Japan).ngc',
	version: '0.2',

	previewBackgrounds:[
		{
			title: 'King of Fighters: Battle de Paradise - Battle Game',
			folder: './tools/text-preview/kof_battle_de_paradise_ngpc',
			background: 'battle_game',
			font: 'font_big',
			width: 8, height: 16,
			x: 12, y: 48, lineHeight: 16
		},
		{
			title: 'King of Fighters: Battle de Paradise - Square Event',
			folder: './tools/text-preview/kof_battle_de_paradise_ngpc',
			background: 'square_event',
			font: 'font_big',
			width: 8, height: 16,
			x: 12, y: 96, lineHeight: 16
		},
	],
	previewFixFn:function(text){
		return text
			.replace(/\[08\]/g, 'PLYR')
			.replace(/\[09\]/g, 'RIVL')
			.replace(/\[(coin|card|heart)\]/g, '*')
			.replace(/\[(06|0f)\]/g, '')
	},

	checkFile:function(romFile){
		currentRom.littleEndian=true;
		const crc32=romFile.hashCRC32();
		return romFile.fileSize===0x200000 && crc32===0x77e37bac;
	},
	getStatus:function(){
		const total=1154 + GRAPHIC_REPLACEMENTS.length;
		const done=
			KNOWN_POINTERS.filter((pointer) => pointer.translation).length +
			43 + //ignored pointers
			GRAPHIC_REPLACEMENTS.filter((graphicReplacement) => graphicReplacement.file).length;
		
		return {
			done,
			total
		}
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
				if(charCode===0x01 || charCode===0x02){
					readBytes.push(romFile.readU8());
				}else if(charCode===0x00){
					break;
				}
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

		PATCHES.filter((patchInfo) => patchInfo.data && Array.isArray(patchInfo.data)).forEach(function(patchInfo, i){
			const newData=patchInfo.data.map((b) => {
				if(typeof b==='string'){
					const char=CHAR_TABLE.find((char) => char.char===b);
					if(typeof char==='undefined'){
						console.warn('unknown character in patch data');
						return 0x00;
					}
					return char.id;
				}else if(typeof b==='number' && b>=0 && b<=0xff){
					return b;
				}else{
					console.warn('unknown value in patch data', b);
					return 0x00;
				}
			});

			clonedRomFile.seek(patchInfo.offset);
   			clonedRomFile.writeBytes(newData);
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
				if(/^\[[a-z0-9]{3,5}\]/i.test(text)){
					const wordMatch=text.match(/^\[(.*?)\]/i);
					const specialChar=CHAR_TABLE.find((char) => char.char===wordMatch[0]);
					if(specialChar){
						if(specialChar.id>0xff){
							bytes.push(specialChar.id >> 8);
							bytes.push(specialChar.id & 0xff);
						}else{
							bytes.push(specialChar.id);
						}
						text=text.replace(/^\[.*?\]/, '');
						continue;
					}
				}
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

	//01xx
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
	//{id:0x011f, char:''}, //unused
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
	//{id:0x012b, char:''}, //unused
	//{id:0x012c, char:''}, //unused
	//{id:0x012d, char:''}, //unused
	{id:0x012e, char:'ヴ'},
	{id:0x012f, char:'ゔ'},
	{id:0x0130, char:'×'},
	{id:0x0131, char:'±'},
	{id:0x0132, char:'…'},
	{id:0x0133, char:'○'},
	{id:0x0134, char:'△'},
	{id:0x0135, char:'□'},
	{id:0x0136, char:'◇'},
	{id:0x0137, char:'●'},
	{id:0x0138, char:'■'},
	//{id:0x0139, char:''}, //unused
	//{id:0x013a, char:''}, //unused
	//{id:0x013b, char:''}, //unused
	//{id:0x013c, char:''}, //unused
	{id:0x013d, char:'♪'},
	{id:0x013e, char:'[heart]'},
	{id:0x013f, char:'[coin]'},
	{id:0x0140, char:'[card]'},
	{id:0x0141, char:'★'},
	{id:0x0142, char:'Ω'},
	//{id:0x0143, char:''}, //unused
	//{id:0x0144, char:''}, //unused
	//{id:0x0145, char:''}, //unused
	//{id:0x0146, char:''}, //unused
	//{id:0x0147, char:''}, //unused
	//{id:0x0148, char:''}, //unused
	//{id:0x0149, char:''}, //unused
	//{id:0x014a, char:''}, //unused
	//{id:0x014b, char:''}, //unused
	//{id:0x014c, char:''}, //unused
	//{id:0x014d, char:''}, //unused
	//{id:0x014e, char:''}, //unused
	//{id:0x014f, char:''}, //unused
	{id:0x0150, char:'悪'},
	{id:0x0151, char:'員'},
	{id:0x0152, char:'回'},
	{id:0x0153, char:'換'},
	{id:0x0154, char:'休'},
	{id:0x0155, char:'交'},
	{id:0x0156, char:'自'},
	{id:0x0157, char:'手'},
	{id:0x0158, char:'進'},
	{id:0x0159, char:'善'},  //not sure
	{id:0x015a, char:'全'},
	{id:0x015b, char:'相'},
	{id:0x015c, char:'奪'},
	{id:0x015d, char:'得'},
	{id:0x015e, char:'入'},
	{id:0x015f, char:'倍'},
	{id:0x0160, char:'半'},
	{id:0x0161, char:'分'},
	{id:0x0162, char:'枚'}, //not sure
	{id:0x0163, char:'消'},
	{id:0x0164, char:'数'},
	{id:0x0165, char:'選'},
	{id:0x0166, char:'択'},
	{id:0x0167, char:'左'},
	{id:0x0168, char:'右'},
	{id:0x0169, char:'移'},
	{id:0x016a, char:'動'}, //not sure
	{id:0x016b, char:'先'},
	{id:0x016c, char:'矢'},
	//{id:0x016d, char:''}, //unused
	//{id:0x016e, char:''}, //unused
	//{id:0x016f, char:''}, //unused

	{id:0x0170, char:'以'},
	{id:0x0172, char:'引'},
	{id:0x0173, char:'演'},
	{id:0x0174, char:'炎'},
	{id:0x0175, char:'俺'},
	{id:0x0176, char:'加'},
	{id:0x0178, char:'火'},
	{id:0x0179, char:'貨'},
	{id:0x017a, char:'画'},
	{id:0x017b, char:'間'},
	{id:0x017c, char:'岩'},
	{id:0x017d, char:'器'}, //to confirm
	{id:0x017e, char:'奇'}, //to confirm
	{id:0x0180, char:'金'},
	{id:0x0181, char:'偶'}, //to confirm
	{id:0x0182, char:'決'},
	{id:0x0183, char:'血'},
	{id:0x0184, char:'見'},
	{id:0x0185, char:'減'}, //to confirm
	{id:0x0186, char:'言'},
	{id:0x0187, char:'効'},
	{id:0x0188, char:'好'},
	{id:0x0189, char:'作'},
	{id:0x018a, char:'札'},
	{id:0x018b, char:'殺'}, //to confirm
	{id:0x018c, char:'三'}, //to confirm
	{id:0x018d, char:'使'},
	{id:0x018e, char:'死'},
	{id:0x018f, char:'私'},
	{id:0x0190, char:'歯'}, //to confirm
	{id:0x0191, char:'持'},
	{id:0x0192, char:'時'}, //to confirm
	{id:0x0193, char:'次'},
	{id:0x0195, char:'捨'}, //to confirm
	{id:0x0196, char:'集'},
	{id:0x0197, char:'十'}, //to confirm
	{id:0x0198, char:'出'},
	{id:0x0199, char:'所'}, //to confirm
	{id:0x019a, char:'少'},
	{id:0x019b, char:'笑'},
	{id:0x019c, char:'上'},
	{id:0x019d, char:'場'},
	{id:0x019e, char:'人'},
	{id:0x01a0, char:'性'},
	{id:0x01a1, char:'切'},
	{id:0x01a2, char:'操'},
	{id:0x01a3, char:'増'},
	{id:0x01a4, char:'属'},
	{id:0x01a5, char:'多'}, //to confirm
	{id:0x01a6, char:'打'},
	{id:0x01a8, char:'大'},
	{id:0x01a9, char:'叩'}, //to confirm
	{id:0x01aa, char:'脱'},
	{id:0x01ab, char:'超'},
	{id:0x01ac, char:'定'},
	{id:0x01ad, char:'点'},
	{id:0x01ae, char:'登'},
	{id:0x01af, char:'怒'},
	{id:0x01b1, char:'同'},
	{id:0x01b2, char:'内'},
	{id:0x01b3, char:'能'},
	{id:0x01b4, char:'買'},
	{id:0x01b5, char:'爆'},
	{id:0x01b6, char:'発'},
	{id:0x01b7, char:'飛'},
	{id:0x01b8, char:'武'}, //to confirm
	{id:0x01b9, char:'舞'},
	{id:0x01bc, char:'面'},
	{id:0x01bd, char:'目'},
	{id:0x01be, char:'戻'}, //to confirm
	{id:0x01bf, char:'用'}, //to confirm
	{id:0x01c0, char:'落'},
	{id:0x01c1, char:'力'},
	{id:0x01c2, char:'連'},
	{id:0x01c3, char:'話'},
	{id:0x01c6, char:'変'},
	{id:0x01c7, char:'更'},
	{id:0x01c8, char:'映'}, //to confirm
	{id:0x01c9, char:'押'},
	{id:0x01cb, char:'会'},
	{id:0x01cc, char:'改'},
	{id:0x01cd, char:'挌'},
	{id:0x01ce, char:'獲'},
	{id:0x01cf, char:'楽'},
	{id:0x01d0, char:'願'}, //to confirm
	{id:0x01d1, char:'気'},
	{id:0x01d2, char:'技'},
	{id:0x01d3, char:'撃'},
	{id:0x01d4, char:'光'},
	{id:0x01d5, char:'攻'},
	{id:0x01d6, char:'師'}, //to confirm
	{id:0x01d7, char:'車'},
	{id:0x01d8, char:'終'},
	{id:0x01d9, char:'宿'},
	{id:0x01da, char:'匠'}, //to confirm
	{id:0x01db, char:'色'}, //to confirm
	{id:0x01dc, char:'神'},
	{id:0x01de, char:'星'},
	{id:0x01df, char:'声'}, //to confirm
	{id:0x01e1, char:'戦'},
	{id:0x01e3, char:'組'},
	{id:0x01e6, char:'知'},
	{id:0x01e7, char:'仲'},
	{id:0x01e8, char:'敵'},
	{id:0x01e9, char:'闘'},
	{id:0x01ea, char:'扉'}, //to confirm
	{id:0x01eb, char:'必'}, //to confirm
	{id:0x01ec, char:'姫'},
	{id:0x01ed, char:'方'},
	{id:0x01ee, char:'本'},
	{id:0x01ef, char:'味'},
	{id:0x01f0, char:'無'},
	{id:0x01f1, char:'命'},
	{id:0x01f2, char:'迷'},
	{id:0x01f3, char:'雷'},
	{id:0x01f4, char:'両'}, //to confirm
	{id:0x01f5, char:'料'}, //to confirm
	{id:0x01f6, char:'理'}, //to confirm
	{id:0x01f7, char:'良'},
	{id:0x01f8, char:'輪'},
	{id:0x01f9, char:'路'},
	{id:0x01fa, char:'往'},
	{id:0x01fb, char:'応'}, //to confirm
	{id:0x01fd, char:'活'},
	{id:0x01fe, char:'距'},
	{id:0x01ff, char:'強'}, //to confirm

	//02xx
	{id:0x0200, char:'経'},
	{id:0x0201, char:'拳'}, //not sure
	{id:0x0202, char:'高'},
	{id:0x0203, char:'山'},
	{id:0x0204, char:'弱'},
	{id:0x0205, char:'準'},
	{id:0x0206, char:'勝'},
	{id:0x0207, char:'照'},
	{id:0x0208, char:'衰'}, //not sure
	{id:0x0209, char:'走'},
	{id:0x020a, char:'速'},
	{id:0x020b, char:'太'},
	{id:0x020c, char:'短'},
	{id:0x020d, char:'転'},
	{id:0x020e, char:'当'},
	{id:0x020f, char:'年'},
	{id:0x0210, char:'敗'},
	{id:0x0211, char:'反'},
	{id:0x0212, char:'百'},
	{id:0x0213, char:'復'}, //not sure
	{id:0x0214, char:'忘'},
	{id:0x0215, char:'名'},
	{id:0x0216, char:'離'}, //not sure
	{id:0x0217, char:'郎'},
	{id:0x0218, char:'条'},
	{id:0x0219, char:'件'},
	{id:0x021a, char:'門'},
	{id:0x021b, char:'何'},
	{id:0x021c, char:'覚'},
	{id:0x021d, char:'寄'},
	{id:0x021e, char:'付'},
	{id:0x021f, char:'合'},
	{id:0x0220, char:'今'},
	{id:0x0221, char:'度'},
	{id:0x0222, char:'女'},
	{id:0x0223, char:'日'},
	{id:0x0224, char:'食'},
	{id:0x0225, char:'茶'},
	{id:0x0226, char:'売'},
	{id:0x0227, char:'店'},
	{id:0x0228, char:'流'},
	{id:0x0229, char:'購'}, //not sure
	{id:0x022a, char:'危'},
	{id:0x022b, char:'機'},
	{id:0x022c, char:'ー'}, //not sure
	{id:0x022d, char:'髪'}, //not sure
	{id:0x022e, char:'最'}, //not sure
	{id:0x022f, char:'殿'},
	{id:0x0230, char:'下'},
	{id:0x0231, char:'業'},
	{id:0x0232, char:'務'},
	{id:0x0233, char:'参'},
	{id:0x0234, char:'考'},
	{id:0x0235, char:'思'},
	{id:0x0236, char:'花'},
	{id:0x0237, char:'愛'},
	{id:0x0238, char:'優'},
	{id:0x0239, char:'熱'},
	{id:0x023a, char:'明'},
	{id:0x023b, char:'子'},
	{id:0x023c, char:'実'},
	{id:0x023d, char:'案'}, //not sure
	{id:0x023e, char:'外'},
	{id:0x023f, char:'第'},
	{id:0x0241, char:'留'}, //to confirm
	{id:0x0245, char:'新'},
	{id:0x0246, char:'意'},
	{id:0x0248, char:'燃'}, //to confirm
	{id:0x024b, char:'焼'}, //to confirm
	{id:0x024e, char:'教'}, //to confirm
	{id:0x024f, char:'官'}, //to confirm
	{id:0x0254, char:'借'}, //to confirm
	{id:0x0255, char:'行'},
	{id:0x0256, char:'対'}, //to confirm
	{id:0x0257, char:'代'}, //to confirm
	{id:0x0258, char:'令'}, //to confirm
	{id:0x025a, char:'向'},
	{id:0x025d, char:'後'},
	{id:0x0260, char:'遊'},
	{id:0x0262, char:'然'},
	{id:0x0263, char:'頭'},
	{id:0x0266, char:'番'},
	{id:0x0267, char:'者'}, //to confirm
	{id:0x0269, char:'中'},
	{id:0x026b, char:'他'}, //to confirm
	{id:0x026c, char:'前'},
	{id:0x026d, char:'通'},
	{id:0x026f, char:'負'}, //to confirm
	{id:0x0270, char:'信'},
	{id:0x0271, char:'計'},
	{id:0x0272, char:'任'},
	{id:0x0273, char:'緒'}, //to confirm
	{id:0x0274, char:'要'}, //to confirm
	{id:0x0277, char:'佐'}, //to confirm
	{id:0x0278, char:'歌'}, //to confirm
	{id:0x0279, char:'封'},
	{id:0x027a, char:'印'},
	{id:0x027b, char:'平'},
	{id:0x027c, char:'卒'},
	{id:0x027d, char:'主'}, //to confirm
	{id:0x027e, char:'役'}, //to confirm
	{id:0x027f, char:'修'}, //to confirm
	{id:0x0289, char:'生'}
];

