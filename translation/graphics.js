

const GRAPHIC_REPLACEMENTS=[
	{type:'tileset', offset:0xb0218, nTiles:16*23, comment:'Small font', file:'font_small'},
	{type:'tileset', offset:0xb27d8, nTiles:64*19, comment:'Big font', file:'font_big'},

	{type:'tileset', offset:0x15284c, nTiles:31, comment:'Logo (sprite)', file:'logo_sprites'},
	{type:'tileset', offset:0x113eb9, nTiles:89, comment:'Logo (layer 1)', file:'logo_layer1'},
	{type:'tileset', offset:0x0fd266, nTiles:100, comment:'Logo (layer 2)', file:'logo_layer2'},

	{type:'map', offsetTileset:0x1bed84, nTiles:127, offsetMap:0x18a2ec, width:20, height:19, comment:'Main Menu', file:'map_main_menu'},
	{type:'tileset', offset:0x0ec532, nTiles:12*3, comment:'Main menu - Options (selected)', file:'main_menu_main_game_selected'},
	{type:'tileset', offset:0x0eca0e, nTiles:12*3, comment:'Main menu - Options (selected)', file:'main_menu_user_mode_selected'},
	{type:'tileset', offset:0x13c068, nTiles:12*3, comment:'Main menu - Options (selected)', file:'main_menu_options_selected'},

	{type:'tileset', offset:0x106e60, nTiles:9*9, comment:'Start menu - Turns', file:'start_menu_turns'},
	{type:'tileset', offset:0x10fa32, nTiles:10, comment:'Start menu - Players', file:'start_menu_players'},
	{type:'tileset', offset:0x0fbf15, nTiles:63, comment:'Start menu - Map banner 1', file:'start_menu_stage_banner_1'},
	{type:'tileset', offset:0x154f20, nTiles:104, comment:'Start menu - Map banner 2/3', file:'start_menu_stage_banner_23'},
	{type:'tileset', offset:0x15623c, nTiles:114, comment:'Start menu - Map banner 4/5', file:'start_menu_stage_banner_45'},
	{type:'tileset', offset:0x13a270, nTiles:106, comment:'Start menu - Map banner 6/??', file:'start_menu_stage_banner_6'},

	{type:'tileset', offset:0x11deb8, nTiles:24, comment:'Start game - First player', file:'start_game_player_first'},
	{type:'tileset', offset:0x1378cf, nTiles:24, comment:'Start game - Second player', file:'start_game_player_second'},
	//{type:'tileset', offset:0x12134f, nTiles:16, comment:'Multiplayer - Waiting for connection'},

	{type:'map', offsetTileset:0x1a4b6d, nTiles:55, offsetMap:0x187b6c, width:20, height:19, comment:'Game end - Ability points exchange', file:'map_game_end_ability_points'},
	{type:'map', offsetTileset:0x1bc808, nTiles:125, offsetMap:0x18b9c4, width:20, height:19, comment:'Game end - Save game', file:'map_game_end_save_game'},

	{type:'map', offsetTileset:0x1aa392, nTiles:188, offsetMap:0x189ff4, width:20, height:19, comment:'Choose avatar', file:'map_choose_avatar'},

	{type:'tileset', offset:0x0dfe80, nTiles:10*2, comment:'Options - Header', file:'options_header'},
	{type:'tileset', offset:0x129b4b, nTiles:14*2, comment:'Options - Message speed', file:'options_message_speed'},
	{type:'tileset', offset:0x0db504, nTiles:14*2, comment:'Options - Difficulty', file:'options_difficulty'},
	{type:'tileset', offset:0x110c83, nTiles:14*2, comment:'Options - DC Link', file:'options_dc_link'},
	{type:'tileset', offset:0x10c29a, nTiles:15*2, comment:'Options - Save data', file:'options_save_data'},
	{type:'tileset', offset:0x0f2b3c, nTiles:12*1, comment:'Options - Message speed (choose)', file:'options_message_speed_choose'},
	{type:'tileset', offset:0x11e0f5, nTiles:14*1, comment:'Options - Difficulty (choose)', file:'options_difficulty_choose'},

	{type:'tileset', offset:0x10beed, nTiles:24, comment:'User screen - Battle games - Header', file:'user_mode_battle_games_header'},
	{type:'tileset', offset:0x0fc322, nTiles:24, comment:'User screen - Level up - Header', file:'user_mode_level_up_header'},

	{type:'tileset', offset:0x108bad, nTiles:4*1, comment:'Gameplay - HUD', file:'gameplay_hud'},
	{type:'tileset', offset:0x148a07, nTiles:4*1, comment:'Gameplay - Icon text - Dice', file:'gameplay_icon_text_dice'},
	{type:'tileset', offset:0x14ae35, nTiles:6*1, comment:'Gameplay - Icon text - Striker', file:'gameplay_icon_text_striker'},
	{type:'tileset', offset:0x1170dd, nTiles:3*1, comment:'Gameplay - Icon text - Card', file:'gameplay_icon_text_card'},
	{type:'tileset', offset:0x148a45, nTiles:29, comment:'Gameplay - Battle Minigame Header', file:'gameplay_battle_minigame_header'},

	{type:'tileset', offset:0x12cfe7, nTiles:15*2, comment:'User - Minigame title #01 (selected)', file:'user_minigame_title_selected_01'},
	{type:'tileset', offset:0x0e8f91, nTiles:15*2, comment:'User - Minigame title #02 (selected)', file:'user_minigame_title_selected_02'},
	{type:'tileset', offset:0x0e0715, nTiles:15*2, comment:'User - Minigame title #03 (selected)', file:'user_minigame_title_selected_03'},
	{type:'tileset', offset:0x0e0e9d, nTiles:15*2, comment:'User - Minigame title #04 (selected)', file:'user_minigame_title_selected_04'},
	{type:'tileset', offset:0x100caf, nTiles:15*2, comment:'User - Minigame title #05 (selected)', file:'user_minigame_title_selected_05'},
	{type:'tileset', offset:0x1450f7, nTiles:15*2, comment:'User - Minigame title #06 (selected)', file:'user_minigame_title_selected_06'},
	{type:'tileset', offset:0x0f2011, nTiles:15*2, comment:'User - Minigame title #07 (selected)', file:'user_minigame_title_selected_07'},
	{type:'tileset', offset:0x0e14ac, nTiles:15*2, comment:'User - Minigame title #08 (selected)', file:'user_minigame_title_selected_08'},
	{type:'tileset', offset:0x0f6fa1, nTiles:15*2, comment:'User - Minigame title #09 (selected)', file:'user_minigame_title_selected_09'},
	{type:'tileset', offset:0x0e17e0, nTiles:15*2, comment:'User - Minigame title #10 (selected)', file:'user_minigame_title_selected_10'},
	{type:'tileset', offset:0x1084e5, nTiles:15*2, comment:'User - Minigame title #11 (selected)', file:'user_minigame_title_selected_11'},
	{type:'tileset', offset:0x0ed887, nTiles:15*2, comment:'User - Minigame title #12 (selected)', file:'user_minigame_title_selected_12'},
	{type:'tileset', offset:0x0e2ef0, nTiles:15*2, comment:'User - Minigame title #13 (selected)', file:'user_minigame_title_selected_13'},
	{type:'tileset', offset:0x149dac, nTiles:15*2, comment:'User - Minigame title #14 (selected)', file:'user_minigame_title_selected_14'},
	{type:'tileset', offset:0x0e20d7, nTiles:15*2, comment:'User - Minigame title #15 (selected)', file:'user_minigame_title_selected_15'},
	//{type:'tileset', offset:0x101bff, nTiles:15*2, comment:'User - Minigame title #16 (selected)'}, //TANK?
	{type:'tileset', offset:0x0de050, nTiles:15*2, comment:'User - Minigame title #17 (selected)', file:'user_minigame_title_selected_17'},
	{type:'tileset', offset:0x0e241e, nTiles:15*2, comment:'User - Minigame title #18 (selected)', file:'user_minigame_title_selected_18'},
	{type:'tileset', offset:0x1531c1, nTiles:15*2, comment:'User - Minigame title #19 (selected)', file:'user_minigame_title_selected_19'},
	{type:'tileset', offset:0x1358d1, nTiles:15*2, comment:'User - Minigame title #20 (selected)', file:'user_minigame_title_selected_20'},
	{type:'tileset', offset:0x0e27a4, nTiles:15*2, comment:'User - Minigame title #21 (selected)', file:'user_minigame_title_selected_21'},
	{type:'tileset', offset:0x0e2a0c, nTiles:15*2, comment:'User - Minigame title #22 (selected)', file:'user_minigame_title_selected_22'},
	//{type:'tileset', offset:0x12e685, nTiles:15*2, comment:'User - Minigame title #23 (selected)'}, //YO·SA·KU

	{type:'tileset', offset:0x10fce8, nTiles:12, comment:'Minigames - Let\'s dance - Performance'/*, file:'minigame_lets_dance_performance'*/},

	{type:'map', offsetTileset:0x1c94a6, nTiles:158, offsetMap:0x193c64 + ((20*19*2) * 0), width:20, height:19, comment:'Static screen - Game Rules', file:'game_rules/map_game_rules_0'},
	{type:'map', offsetTileset:0x1d3712, nTiles:225, offsetMap:0x193c64 + ((20*19*2) * 1), width:20, height:19, comment:'Static screen - Game rules 1.1', file:'game_rules/map_game_rules_1_1'},
	{type:'map', offsetTileset:0x1de80d, nTiles:211, offsetMap:0x193c64 + ((20*19*2) * 2), width:20, height:19, comment:'Static screen - Game rules 1.2', file:'game_rules/map_game_rules_1_2'},
	{type:'map', offsetTileset:0x1e1666, nTiles:174, offsetMap:0x193c64 + ((20*19*2) * 3), width:20, height:19, comment:'Static screen - Game rules 1.3', file:'game_rules/map_game_rules_1_3'},
	{type:'map', offsetTileset:0x1d673a, nTiles:178, offsetMap:0x193c64 + ((20*19*2) * 4), width:20, height:19, comment:'Static screen - Game rules 2.1', file:'game_rules/map_game_rules_2_1'},
	{type:'map', offsetTileset:0x1cc4a2, nTiles:158, offsetMap:0x193c64 + ((20*19*2) * 5), width:20, height:19, comment:'Static screen - Game rules 2.2', file:'game_rules/map_game_rules_2_2'}, //glitches USER MODE screen?
	{type:'map', offsetTileset:0x1ac365, nTiles:186, offsetMap:0x193c64 + ((20*19*2) * 6), width:20, height:19, comment:'Static screen - Game rules 3.1', file:'game_rules/map_game_rules_3_1'},
	{type:'map', offsetTileset:0x1b3a3d, nTiles:170, offsetMap:0x193c64 + ((20*19*2) * 7), width:20, height:19, comment:'Static screen - Game rules 3.2', file:'game_rules/map_game_rules_3_2'},
	{type:'map', offsetTileset:0x1bcfce, nTiles:144, offsetMap:0x193c64 + ((20*19*2) * 8), width:20, height:19, comment:'Static screen - Game rules 3.3', file:'game_rules/map_game_rules_3_3'},
	{type:'map', offsetTileset:0x1c1009, nTiles:160, offsetMap:0x193c64 + ((20*19*2) * 9), width:20, height:19, comment:'Static screen - Game rules 3.4', file:'game_rules/map_game_rules_3_4'},
	{type:'map', offsetTileset:0x1ceb0f, nTiles:206, offsetMap:0x193c64 + ((20*19*2) * 10), width:20, height:19, comment:'Static screen - Game rules 3.5', file:'game_rules/map_game_rules_3_5'},
	{type:'map', offsetTileset:0x1db839, nTiles:209, offsetMap:0x193c64 + ((20*19*2) * 11), width:20, height:19, comment:'Static screen - Game rules 3.6', file:'game_rules/map_game_rules_3_6'},
	{type:'map', offsetTileset:0x1e4a6e, nTiles:176, offsetMap:0x193c64 + ((20*19*2) * 12), width:20, height:19, comment:'Static screen - Game rules 4.1', file:'game_rules/map_game_rules_4_1'},
	{type:'map', offsetTileset:0x1d81a9, nTiles:212, offsetMap:0x193c64 + ((20*19*2) * 13), width:20, height:19, comment:'Static screen - Game rules 4.2', file:'game_rules/map_game_rules_4_2'},
	{type:'map', offsetTileset:0x1ba1a3, nTiles:164, offsetMap:0x193c64 + ((20*19*2) * 14), width:20, height:19, comment:'Static screen - Game rules 4.3', file:'game_rules/map_game_rules_4_3'},
	{type:'map', offsetTileset:0x1e9d31, nTiles:202, offsetMap:0x193c64 + ((20*19*2) * 15), width:20, height:19, comment:'Static screen - Game rules 4.4', file:'game_rules/map_game_rules_4_4'},
	{type:'map', offsetTileset:0x1ea9d1, nTiles:183, offsetMap:0x193c64 + ((20*19*2) * 16), width:20, height:19, comment:'Static screen - Game rules 5.1', file:'game_rules/map_game_rules_5_1'},
	{type:'map', offsetTileset:0x1eb541, nTiles:216, offsetMap:0x193c64 + ((20*19*2) * 17), width:20, height:19, comment:'Static screen - Game rules 5.2', file:'game_rules/map_game_rules_5_2'},
	{type:'map', offsetTileset:0x1ec2c1, nTiles:177, offsetMap:0x193c64 + ((20*19*2) * 18), width:20, height:19, comment:'Static screen - Game rules 5.3', file:'game_rules/map_game_rules_5_3'},
	{type:'map', offsetTileset:0x1ecdd1, nTiles:189, offsetMap:0x193c64 + ((20*19*2) * 19), width:20, height:19, comment:'Static screen - Game rules 5.4', file:'game_rules/map_game_rules_5_4'},
	{type:'map', offsetTileset:0x1ed9a1, nTiles:189, offsetMap:0x193c64 + ((20*19*2) * 20), width:20, height:19, comment:'Static screen - Game rules 5.5', file:'game_rules/map_game_rules_5_5'},
	{type:'map', offsetTileset:0x1ee571, nTiles:215, offsetMap:0x193c64 + ((20*19*2) * 21), width:20, height:19, comment:'Static screen - Game rules 5.6', file:'game_rules/map_game_rules_5_6'},

	//{type:'tileset', offset:0x1c5aef, nTiles:44, comment:'Secret data - First page (overlay)'},
	//{type:'tileset', offset:0x15562d, nTiles:24, comment:'DC Link - Header?'},
	//{type:'tileset', offset:0x19b86a, nTiles:59, comment:'DC Link - Header?'},
	//{type:'tileset', offset:0x19e1b5, nTiles:79, comment:'DC Link - Header?'},
];
