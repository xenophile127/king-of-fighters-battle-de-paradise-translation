const KNOWN_POINTERS=[
	/* TITLE SCREEN */
	{pointerIndex:0, comment:'Title screen menu', translation:'RESUME'},
	{pointerIndex:1, comment:'Title screen menu', translation:'CONTINUE'},
	{pointerIndex:2, comment:'Title screen menu', translation:'START'},
	{pointerIndex:3, comment:'Title screen menu', translation:'RULES'},

	{pointerIndex:4, comment:'Communication Error', translation:'CommErr'},

	/* START GAME */
	{pointerIndex:5, comment:'Start game - Intro (helper)', translation:'Choose\nhelper'},
	{pointerIndex:6, comment:'Start game - Intro (skill)', translation:'···and\nskill?'},
	{pointerIndex:7, comment:'Start game - Intro (bottom text)', translation:'USE ←/→'},
	{pointerIndex:8, comment:'Start game - Intro (bottom text filler)'},
	{pointerIndex:10, comment:'Start game - Intro (players)', translation:'Player\nnumber'},
	{pointerIndex:12, comment:'Start game - Intro (turns)', translation:'How\nmany\nturns?'},
	{pointerIndex:13, comment:'Start game - Intro (map)', translation:'And at\nlast…\nMap?'},

	/* CARD SHOP */
	{pointerIndex:14, comment:'Card shop buy confirm instructions', translation:'A=Buy   B=Cancel'},
	{pointerIndex:15, comment:'Card shop', translation:'Buy a\ncard?'},
	{pointerIndex:16, comment:'Card shop buy confirm', translation:'This\ncard?'},
	{pointerIndex:17, comment:'Card shop goodbye', translation:'Come\nagain!'},
	{pointerIndex:18, comment:'Card shop full', translation:'Hand\'s\nfull!'},



	/* MINIGAMES */
	{pointerIndex:20, comment:'Minigame instructions', translation:'PAIRPAIR GET\nMatch pairs\nof cards for\npoints!\n(Joy:Cursor)\n(A:Choose  )'},
	{pointerIndex:21, comment:'Minigame instructions', translation:'SYNCRO-FIST\nPress A when\nBenimaru\ncompletes\nhis move!\n(A:Respond )'},
	{pointerIndex:22, comment:'Minigame instructions', translation:' IT\'S BACK!\nMash buttons\nto beat the\nmachine.\n(A,B:Mash  )'},
	{pointerIndex:23, comment:'Minigame instructions', translation:'BOUZU?MEKURI\nDraw a card.\nPrincess [heart].\nMonk...?\n(←→:Select )\n(A:Choose  )'},
	{pointerIndex:24, comment:'Minigame instructions', translation:'NIKUMAN ROAD\nGuide Kensou\nto eat buns.\nWatch out\nfor enemies!\n(Joy:Route )'},
	{pointerIndex:25, comment:'Minigame instructions', translation:'LET\'S DANCE\nRepeat the\ndance! Time\nit well and\nMai dances[heart]\n(How:Follow)'},
	{pointerIndex:26, comment:'Minigame instructions', translation:'IKARI TARGET\nShoot the\nenemies! Not\nIkari elite!\n(Joy:Aim   )\n(A:Shoot   )'},
	{pointerIndex:27, comment:'Minigame instructions', translation:'GREAT ESCAPE\nUse doors to\nescape from\nKim & John.\n(←→:Select )\n(A:Choose  )'},
	{pointerIndex:28, comment:'Minigame instructions', translation:'BRIAN FLIES!\nRotate the\nJoystick as\nfast as you\ncan!\n(Joy:Rotate)'},
	{pointerIndex:29, comment:'Minigame instructions', translation:'DUSKCARNIVAL\nTap rapidly\nto help\nShermie pull\nvegetables!\n(A:Tap fast)'},
	{pointerIndex:30, comment:'Minigame instructions', translation:' YOU DOUBT!\nUse clues to\nfind the odd\none out!\n(←→:Select )\n(A:Choose  )'},
	{pointerIndex:31, comment:'Minigame instructions', translation:'SHADOW PLAY\nIdentify the\ncharacters\'\nsilhouettes. \n(←→:Select )\n(A:Choose  )'},
	{pointerIndex:32, comment:'Minigame instructions', translation:'FAST FIGHTER\nStriker race\nchallenge!\nHit A fast\nas you can!\n(A:Tap fast)'},
	{pointerIndex:33, comment:'Minigame instructions', translation:'TOP PRESENTS\nPull ring to\ndrop items!\nAvoid rocks!\n(←→:Move   )\n(A:Jump    )'},
	{pointerIndex:34, comment:'Minigame instructions', translation:' COIN JUMP\nJump to drop\ncoins. Good\ntiming for a\nspeed-up!\n(A:Jump    )'},
	{pointerIndex:35, comment:'Minigame instructions', translation:'   TANK?\nGrab treas-\nure with a\nkawaii TANK!\n(Joy:Move )\n(A:Shoot'},
	{pointerIndex:36, comment:'Minigame instructions', translation:' DARK MAZE\nIn the dark\nmaze collect\ntreasure and\nfind a goal!\n(Joy:Move )'},
	{pointerIndex:37, comment:'Minigame instructions', translation:'BOOM!ESCAPE\nRun from the\nexplosion!\nJump cracks!\n(A:Tap run )\n(B:Jump    )'},
	{pointerIndex:38, comment:'Minigame instructions', translation:'DARUMAOTOSHI\nKrizalid\'s\nclose call.\nTime your\nswing!\n(A:Swing   )'},
	{pointerIndex:39, comment:'Minigame instructions', translation:'IS IT 2000?\nDodge when\nGoenitz at-\ntacks!\n(←→:Move   )\n(A:Dash!!  )'},
	{pointerIndex:40, comment:'Minigame instructions', translation:'MOVE: \'NONE\'\nWhen Orochi\nattacks you\nmust dodge.\n(←→:Move   )\n(A:Dash!!  )'},
	{pointerIndex:41, comment:'Minigame instructions', translation:'BOOM!ESCAPEΩ\nThe blast is\neven bigger!\nJump faults!\n(A:Tap Run )\n(B:Jump    )'},
	{pointerIndex:42, comment:'Minigame instructions', translation:'  YO·SA·KU\nThe classic!\nCut down all\nthe trees.\n(←→:Move   )\n(A:Axe     )'},
	{pointerIndex:43, comment:'Minigame - YO·SA·KU - B&W intro', translation:'This game\nonly works\non NGPC,\nnot B&W.[06].[06].[06]\nBut...'},

	/* OPTIONS SCREEN */
	{pointerIndex:46, comment:'Options - Save Data', translation:'Save data?'},
	{pointerIndex:47, comment:'Options - Save Data', translation:'Saved!'},



	/* CREATE CHARACTER - NAME */
	{pointerIndex:50, comment:'Default player name - Yu G', translation:'YU G'},
	{pointerIndex:51, comment:'Default player name - Hatoko', translation:'HATO'},
	{pointerIndex:52, comment:'Default player name - Masamune', translation:'MASA'},
	{pointerIndex:53, comment:'Default player name - Ai', translation:'AI'},



	/* END GAME */
	{pointerIndex:54, comment:'End game - Unlockables', translation:'[0c][0b] SECRET unlocked'},
	{pointerIndex:55, comment:'End game - Unlockables', translation:'[0b] STRIKER unlocked'},
	{pointerIndex:56, comment:'End game - Unlockables', translation:'[0b] MAP unlocked'},
	{pointerIndex:57, comment:'End game - Unlockables', translation:'[0c][0b] GAMES unlocked'},
	{pointerIndex:59, comment:'End game - Point exchange', translation:'Convert coins to  Ability Points.'},
	{pointerIndex:60, comment:'End game - Point exchange', translation:'Converting to     Ability Points...'},
	{pointerIndex:61, comment:'End game - Point exchange', translation:'Conversion        completed.'},



	/* COMMON TEXTS */
	{pointerIndex:66, comment:'Common text - Accept', translation:'YES'},
	{pointerIndex:67, comment:'Common text - Cancel', translation:'NO'},

	/* START GAME - STRIKERS */
	{pointerIndex:68, comment:'Start game - Striker names - hidden'},
	{pointerIndex:69, comment:'Start game - Striker names', translation:'GORO'},
	{pointerIndex:70, comment:'Start game - Striker names', translation:'BLLY'},
	{pointerIndex:71, comment:'Start game - Striker names', translation:'RYUJ'},
	{pointerIndex:72, comment:'Start game - Striker names', translation:'KYO'},
	{pointerIndex:73, comment:'Start game - Striker names', translation:'CHIZ'},
	{pointerIndex:74, comment:'Start game - Striker names', translation:'ATHN'},
	{pointerIndex:75, comment:'Start game - Striker names', translation:'ALFR'},
	{pointerIndex:76, comment:'Start game - Striker names', translation:'FIO'},
	{pointerIndex:77, comment:'Start game - Striker names', translation:'GAI'},
	{pointerIndex:78, comment:'Start game - Striker names', translation:'SYO'},
	{pointerIndex:79, comment:'Start game - Justice side', translation:'ゔ[0b]JS'},
	{pointerIndex:80, comment:'Start game - Dark side', translation:'ゔ[0b]DS'},


	/* MINIGAME - COMMON */
	{pointerIndex:101, comment:'Minigame - your turn', translation:'[08]\'s turn.[0f]'},
	{pointerIndex:102, comment:'Minigame - rival turn', translation:'[09]\'s turn.[0f]'},
	{pointerIndex:103, comment:'Minigame - PairPair Get - waiting', translation:'Choosing...'},

	/* MINIGAME - DUSK CARNIVAL */
	{pointerIndex:104, comment:'Minigame - Dusk Carnival', translation:'Grrr.'},
	{pointerIndex:105, comment:'Minigame - Dusk Carnival', translation:'I can do it!'},
	{pointerIndex:106, comment:'Minigame - Dusk Carnival', translation:'Grunt!'},
	{pointerIndex:107, comment:'Minigame - Dusk Carnival', translation:'Done?'},
	{pointerIndex:108, comment:'Minigame - Dusk Carnival', translation:'Toh!'},
	{pointerIndex:109, comment:'Minigame - Dusk Carnival - win', translation:'Aha! What?'},
	{pointerIndex:110, comment:'Minigame - Dusk Carnival - lose'},

	/* MINIGAME - BOOM ESCAPE (AND BOOM ESCAPE OMEGA) */
	{pointerIndex:111, comment:'Minigame - Boom Escape', translation:'No escape'},
	{pointerIndex:112, comment:'Minigame - Boom Escape', translation:'Hahaha!'},
	{pointerIndex:113, comment:'Minigame - Boom Escape', translation:'Grr!'},
	{pointerIndex:114, comment:'Minigame - Boom Escape', translation:'Damn!!'},
	{pointerIndex:115, comment:'Minigame - Boom Escape', translation:'I win!'},
	{pointerIndex:116, comment:'Minigame - Boom Escape', translation:'What!!'},
	{pointerIndex:117, comment:'Minigame - Boom Escape', translation:'GUOAAaa!!'},
	{pointerIndex:118, comment:'Minigame - Boom Escape', translation:'Game over'},

	/* MINIGAME - BOUZU MEKURI */
	{pointerIndex:120, comment:'Minigame - Bouzu Mekuri - take a card (unused)'},
	{pointerIndex:120, comment:'Minigame - Bouzu Mekuri - Princess', translation:'Prin[heart]:Got [0c][0b][0f]'},
	{pointerIndex:121, comment:'Minigame - Bouzu Mekuri - Princess', translation:'Prin[heart]:Got [0b].[0f]'},
	{pointerIndex:122, comment:'Minigame - Bouzu Mekuri - Great Lord', translation:'Boss:Got 1.[0f]'},
	{pointerIndex:123, comment:'Minigame - Bouzu Mekuri - Lord', translation:'Lord:Drop 1.[0f]'},
	{pointerIndex:124, comment:'Minigame - Bouzu Mekuri - Monk', translation:'Monk:Drop [0c][0b][0f]'},
	{pointerIndex:125, comment:'Minigame - Bouzu Mekuri - Monk', translation:'Monk:Drop [0b].[0f]'},
	{pointerIndex:126, comment:'Minigame - Bouzu Mekuri - card counter', translation:'[card]'},



	/* CREATE CHARACTER */
	{pointerIndex:132, comment:'Set player name - Legend', translation:' A=Accept  B=Del '},
	{pointerIndex:133, comment:'Default player description - Yu G'},
	{pointerIndex:134, comment:'Default player description - Hatoko', translation:'A clumsy\ncheerful\ngirl.'},
	{pointerIndex:135, comment:'Default player description - Masamune'},
	{pointerIndex:136, comment:'Default player description - Ai'},
	{pointerIndex:137, comment:'Player select confirmation', translation:'Is it OK?'},



	/* USER SCREEN */
	{pointerIndex:139, comment:'User screen - Dialogue', translation:'Choose\noption'},
	{pointerIndex:140, comment:'User screen - Legend', translation:'A=Accept'},
	{pointerIndex:141, comment:'User screen - Legend', translation:'B=Cancel'},
	{pointerIndex:142, comment:'User screen - Menu', translation:'BATTLE GAMES'},
	{pointerIndex:143, comment:'User screen - Menu', translation:'SECRET DATA'},
	{pointerIndex:144, comment:'User screen - Menu', translation:'LEVEL UP'},

	/* USER SCREEN - MINIGAME BATTLE */
	{pointerIndex:145, comment:'User screen - Minigame battle - Choose first turn', translation:'Who goes first?                         YOU    CPU'},
	{pointerIndex:148, comment:'User screen - Minigame battle - Choose striker', translation:'Select a striker.'},
	{pointerIndex:146, comment:'User screen - Minigame battle - Confirm start', translation:'Is this OK?                             YES    NO'},

	/* USER SCREEN - leave */
	{pointerIndex:147, comment:'User screen - Dialogue (leave)', translation:'Good\nluck!'},



	/* USER SCREEN - LEVEL UP */
	{pointerIndex:149, comment:'User screen - Level up - Continue upgrading question', translation:'Keep upgrading?'},
	{pointerIndex:150, comment:'User screen - Level up - Total stars', translation:'STARS='},
	{pointerIndex:151, comment:'User screen - Level up - Cost for Lv2', translation:'ゔ2 UPGRADE COST=2'},
	{pointerIndex:152, comment:'User screen - Level up - Cost for Lv3', translation:'ゔ3 UPGRADE COST=5'},
	{pointerIndex:153, comment:'User screen - Level up - Ask?', translation:'Upgrade to next ゔ?'},
	{pointerIndex:154, comment:'User screen - Level up - LvX Justice side', translation:'ゔ[0b] JS'},
	{pointerIndex:155, comment:'User screen - Level up - LvX Dark side', translation:'ゔ[0b] DS'},



	/* MINIGAME - YOSAKU */
	{pointerIndex:159, comment:'Minigame - Yosaku - play'},
	{pointerIndex:160, comment:'Minigame - Yosaku - press a'},
	{pointerIndex:161, comment:'Minigame - Yosaku - snk'},
	{pointerIndex:162, comment:'Minigame - Yosaku - game over'},
	{pointerIndex:163, comment:'Minigame - Yosaku - score1'},
	{pointerIndex:164, comment:'Minigame - Yosaku - stage clear'},

	/* MINIGAME - BOOM ESCAPE */
	{pointerIndex:165, comment:'Minigame - Boom Escape', translation:'So funny!'},

	/* MINIGAME - PAIRPAIR GET */
	{pointerIndex:166, comment:'Minigame - PairPair Get - wallet', translation:'Wallet.'},
	{pointerIndex:167, comment:'Minigame - PairPair Get - coin', translation:'Coin.'},
	{pointerIndex:168, comment:'Minigame - PairPair Get - moneybag', translation:'$bag.'},
	{pointerIndex:169, comment:'Minigame - PairPair Get - gold', translation:'Gold.'},
	{pointerIndex:170, comment:'Minigame - PairPair Get - K\'', translation:'K\'.'},
	{pointerIndex:171, comment:'Minigame - PairPair Get - piggy bank', translation:'Piggy bank.'},
	{pointerIndex:172, comment:'Minigame - PairPair Get - no match wallet', translation:'Sorry!Wallet[0f]'},
	{pointerIndex:173, comment:'Minigame - PairPair Get - no match coin', translation:'Sorry! Coin.[0f]'},
	{pointerIndex:174, comment:'Minigame - PairPair Get - no match moneybag', translation:'Sorry! $bag.[0f]'},
	{pointerIndex:175, comment:'Minigame - PairPair Get - no match gold', translation:'Sorry! Gold.[0f]'},
	{pointerIndex:176, comment:'Minigame - PairPair Get - no match K\'', translation:'Sorry! K\'.[0f]'},
	{pointerIndex:177, comment:'Minigame - PairPair Get - no match piggy bank', translation:'Sorry!P\'bank[0f]'},
	{pointerIndex:178, comment:'Minigame - PairPair Get - got coin', translation:'Got coin![0f]'},
	{pointerIndex:179, comment:'Minigame - PairPair Get - 50 points', translation:'50 points.'},
	{pointerIndex:180, comment:'Minigame - PairPair Get - got wallet', translation:'Got wallet![0f]'},
	{pointerIndex:181, comment:'Minigame - PairPair Get - 80 points', translation:'80 points.'},
	{pointerIndex:182, comment:'Minigame - PairPair Get - got piggy bank', translation:'Got p\'bank.[0f]'},
	{pointerIndex:183, comment:'Minigame - PairPair Get - 100 points', translation:'100 points.'},
	{pointerIndex:184, comment:'Minigame - PairPair Get - got moneybag', translation:'Got $bag![0f]'},
	{pointerIndex:185, comment:'Minigame - PairPair Get - 120 points', translation:'120 points.'},
	{pointerIndex:186, comment:'Minigame - PairPair Get - got gold', translation:'Got gold![0f]'},
	{pointerIndex:187, comment:'Minigame - PairPair Get - 150 points', translation:'150 points.'},
	{pointerIndex:188, comment:'Minigame - PairPair Get - got K\'', translation:'Got K\'![0f]'},
	{pointerIndex:189, comment:'Minigame - PairPair Get - 200 points', translation:'200 points.'},
	{pointerIndex:193, comment:'Minigame - PairPair Get - otetsuki', translation:'Stop![0f]'},
	{pointerIndex:194, comment:'Minigame - PairPair Get - otetsuki switch turn', translation:'Turn\'s over.[0f]'},
	{pointerIndex:195, comment:'Minigame - PairPair Get - Orochi Iori', translation:'KYOOOOOOO![0f]'},
	{pointerIndex:196, comment:'Minigame - PairPair Get - Orochi Iori - Chi no Bousou minus 150 points', translation:'Riot! -150p[0f]'},
	{pointerIndex:197, comment:'Minigame - PairPair Get - choice 1', translation:'1st choice.'},
	{pointerIndex:198, comment:'Minigame - PairPair Get - choice 2', translation:'2nd choice.'},



	/* EVENT SQUARE: Athena */
	{pointerIndex:1355, comment:'Event Square - Athena - Now On Sale'},
	{pointerIndex:1356, comment:'Event Square - Athena - Now On Sale', translation:'Oh I forgot![06]\nI have a\nsigning at[0f]the record\nshop soon.\nSorry.[heart][0f]'},

	/* EVENT SQUARE: Kensou */
	{pointerIndex:1410, comment:'Event Square - Kensou'},
	{pointerIndex:1411, comment:'Event Square - Kensou'},
	{pointerIndex:1412, comment:'Event Square - Kensou'},

	/* EVENT SQUARE: Robert Garcia */
	{pointerIndex:1450, comment:'Event Square - Robert Garcia', translation:'●Ease and\ncomfort.[0f]'},
	{pointerIndex:1451, comment:'Event Square - Robert Garcia', translation:'Psst! Buy a\n★ for [coin]10?[0f]'},
	{pointerIndex:1452, comment:'Event Square - Robert Garcia', translation:'★ for [coin]10...'},
	{pointerIndex:1453, comment:'Event Square - Robert Garcia', translation:'Buy.'},
	{pointerIndex:1454, comment:'Event Square - Robert Garcia', translation:'Don\'t buy.'},
	{pointerIndex:1455, comment:'Event Square - Robert Garcia', translation:'Great deal![0f]'},
	{pointerIndex:1456, comment:'Event Square - Robert Garcia', translation:'Don\'t have\n[coin]10?[06] I can\'t\ngo lower.[0f]'},
	{pointerIndex:1457, comment:'Event Square - Robert Garcia', translation:'See you\nlater.[0f]'},

	/* EVENT SQUARE: Choi & Chang */
	{pointerIndex:1460, comment:'Event Square - Choi & Chang'},
	{pointerIndex:1461, comment:'Event Square - Choi & Chang'},
	{pointerIndex:1462, comment:'Event Square - Choi & Chang'},



	/* LOSE TURN */
	/* Used in both big font (for events) and small font (for the result of your Rival's events. */
	/* This means as is that I can't perfectly format this. */
	/* When used in events there is a leading space at the beginning of line two before the word 'turn'. */
	{pointerIndex:1600, comment:'Player - Lose Turn', translation:'[08] loses a turn.[0f]'},
	{pointerIndex:1601, comment:'Rival - Lose Turn', translation:'[09] loses a turn.[0f]'},

	

	/* EVENT SQUARE RESULT */
	{pointerIndex:1612, comment:'Event square result - Player - Got coins', translation:'[08] got\n[coin][0b][0c].[0f]'},
	{pointerIndex:1613, comment:'Event square result - Player - Got cards', translation:'[08] got\n[card][0b].[0f]'},
	{pointerIndex:1614, comment:'Event square result - Player - Got stars', translation:'[08] got\n★[0b].[0f]'},

	{pointerIndex:1621, comment:'Event square result - Player - Coins lost', translation:'[08] dropped\n[coin][0b][0c].[0f]'},
	{pointerIndex:1622, comment:'Event square result - Player - Cards lost', translation:'[08] lost\n[card][0b].[0f]'},
	{pointerIndex:1624, comment:'Event square result - Rival - Coins lost', translation:'[09] dropped\n[coin][0b][0c].[0f]'},
	{pointerIndex:1625, comment:'Event square result - Rival - Cards lost', translation:'[09] lost\n[card][0b].[0f]'},

	{pointerIndex:1633, comment:'Event square result - Striker side switch (good)', translation:'Striker went\nGOOD[0f].'},
	{pointerIndex:1634, comment:'Event square result - Striker side switch (evil)', translation:'Striker went\nEVIL[0f].'},

	{pointerIndex:1637, comment:'Event square result - Player - Coins increased by 25%', translation:'[08]\'s [coin]\nincreased by\n25%.[0f]'},

	{pointerIndex:1641, comment:'Event square result - Rival - Got coins', translation:'[09] got\n[coin][0b][0c].[0f]'},
	{pointerIndex:1642, comment:'Event square result - Rival - Got cards', translation:'[09] got\n[card][0b].[0f]'},
	{pointerIndex:1643, comment:'Event square result - Rival - Got stars', translation:'[09] got\n★[0b].[0f]'},


	/* BOARD GAME */
	{pointerIndex:1652, comment:'Board game - Rival - Card used', translation:'[09] moves 1'},
	{pointerIndex:1653, comment:'Board game - Rival - Card used', translation:'[09] moves 2'},
	{pointerIndex:1654, comment:'Board game - Rival - Card used', translation:'[09] moves 3'},
	{pointerIndex:1655, comment:'Board game - Rival - Card used', translation:'[09] moves 4'},
	{pointerIndex:1656, comment:'Board game - Rival - Card used', translation:'[09] moves 5'},
	{pointerIndex:1657, comment:'Board game - Rival - Card used', translation:'[09] moves 6'},
	{pointerIndex:1658, comment:'Board game - Rival - Card used', translation:'[09] moves 7'},
	{pointerIndex:1659, comment:'Board game - Rival - Card used', translation:'[09] moves 8'},
	{pointerIndex:1660, comment:'Board game - Rival - Card used', translation:'[09] moves 9'},
	{pointerIndex:1661, comment:'Board game - Rival - Card used', translation:'[09] moves 10'},
	{pointerIndex:1662, comment:'Board game - Rival - Coins get', translation:'[09] gets [coin][0b][0c]'},
	{pointerIndex:1663, comment:'Board game - Rival - Card get', translation:'[09] gets [card][0b]'},
	{pointerIndex:1664, comment:'Board game - Rival - Star get', translation:'[09] gets ★[0b]'},
	{pointerIndex:1665, comment:'Board game - Rival - Coins stolen', translation:'[09] stole [coin][0b][0c]'},
	{pointerIndex:1666, comment:'Board game - Rival - Card stolen', translation:'[09] stole [card][0b]'},
	{pointerIndex:1667, comment:'Board game - Rival - Star stolen', translation:'[09] stole a ★'},
	{pointerIndex:1668, comment:'Board game - Rival - Coin given', translation:'[09] gave [coin][0b][0c]'},
	{pointerIndex:1669, comment:'Board game - Rival - Card given', translation:'[09] gave [card][0b]'},
	{pointerIndex:1670, comment:'Board game - Rival - Star given', translation:'[09] gave a ★'},
	{pointerIndex:1671, comment:'Board game - Rival - Spent coins???', translation:'[09] spent?[coin][0b][0c]'},
	{pointerIndex:1672, comment:'Board game - Rival - Card used???', translation:'[09] used [0b] card'},

	{pointerIndex:1683, comment:'Board game - Striker side switch (good)', translation:'Striker goes GOOD'},
	{pointerIndex:1684, comment:'Board game - Striker side switch (evil)', translation:'Striker goes EVIL'},

	{pointerIndex:1686, comment:'Board game - Everyone\'s coins decreased by 25%', translation:'All coins -25%'},

	{pointerIndex:1691, comment:'Board game - Player - Coins lost', translation:'[08] loses [coin][0b][0c]'},



	/* CARD NAMES SHOP */
	{pointerIndex:1700, comment:'Card name long', translation:'Violent Rush    3[coin]'},
	{pointerIndex:1701, comment:'Card name long', translation:'Scramble        3[coin]'},
	{pointerIndex:1702, comment:'Card name long', translation:'Code: BB        3[coin]'},
	{pointerIndex:1703, comment:'Card name long', translation:'Lucky Vision    3[coin]'},
	{pointerIndex:1704, comment:'Card name long', translation:'Shadow Movement 3[coin]'},
	{pointerIndex:1705, comment:'Card name long', translation:'Blackout        3[coin]'},
	{pointerIndex:1706, comment:'Card name long', translation:'Robert\'s Wallet10[coin]'},
	{pointerIndex:1707, comment:'Card name long', translation:'Chan\'s Moneybox10[coin]'},
	{pointerIndex:1708, comment:'Card name long', translation:'Ryo\'s Pocket    5[coin]'},
	{pointerIndex:1709, comment:'Card name long', translation:'Choi\'s Stash    5[coin]'},
	{pointerIndex:1710, comment:'Card name long', translation:'Chizuru\'s Cash  5[coin]'},
	{pointerIndex:1711, comment:'Card name long', translation:'Kim\'s Wallet   15[coin]'},
	{pointerIndex:1712, comment:'Card name long', translation:'Yuri\'s Purse   15[coin]'},
	{pointerIndex:1713, comment:'Card name long', translation:'Mai\'s Bouquet  15[coin]'},
	{pointerIndex:1714, comment:'Card name long', translation:'Cloning        15[coin]'},
	{pointerIndex:1715, comment:'Card name long', translation:'Lily\'s Laundry 10[coin]'},
	{pointerIndex:1716, comment:'Card name long', translation:'Billy\'s Laundry10[coin]'},
	{pointerIndex:1717, comment:'Card name long', translation:'Vanessa\'s Cell 15[coin]'},
	{pointerIndex:1718, comment:'Card name long', translation:'Ryuhaku\'s Wish 25[coin]'},
	{pointerIndex:1719, comment:'Card name long', translation:'Eiji\'s Grudge  25[coin]'},
	{pointerIndex:1720, comment:'Card name long', translation:'Glauber\'s Tear 30[coin]'},
	{pointerIndex:1721, comment:'Card name long', translation:'Shingo Chore   20[coin]'},
	{pointerIndex:1722, comment:'Card name long', translation:'Iori\'s Rampage 10[coin]'},
	{pointerIndex:1723, comment:'Card name long', translation:'Leona Awakened 10[coin]'},
	{pointerIndex:1724, comment:'Card name long', translation:'Takuma\'s Soba  15[coin]'},
	{pointerIndex:1725, comment:'Card name long', translation:'Double Strike   5[coin]'},
	{pointerIndex:1726, comment:'Card name long', translation:'Yata Mirror     3[coin]'},
	{pointerIndex:1727, comment:'Card name long', translation:'Psi Teleport   10[coin]'},
	{pointerIndex:1728, comment:'Card name long', translation:'Cali Romance   15[coin]'},
	{pointerIndex:1729, comment:'Card name long', translation:'Loser\'s Blues   5[coin]'},



	/* USER SCREEN - LEVEL UP - NAMES */
	{pointerIndex:1806, comment:'User screen - Level up - Striker names', translation:'ALFRED'},



	/* STAR SQUARE: Heidern sells you up to three stars for 20 coins each. */
	{pointerIndex:1870, comment:'Star Square - Heidern', translation:'A ★ for [coin]20?'},
	{pointerIndex:1871, comment:'Star Square - Heidern (unused)', translation:'Yes.'},	/* Unused. Uses #66 instead. */
	{pointerIndex:1872, comment:'Star Square - Heidern (unused)', translation:'No.'},	/* Unused. Uses #67 instead. */

	{pointerIndex:1875, comment:'Star Square - Heidern', translation:'Another ★?'},
	{pointerIndex:1876, comment:'Star Square - Heidern', translation:'That\'s all!'},



	/* CARD NAMES SHORT */
	{pointerIndex:1900, comment:'Card name short', translation:'Violent Rush'},
	{pointerIndex:1901, comment:'Card name short', translation:'Scramble'},
	{pointerIndex:1902, comment:'Card name short', translation:'Code: BB'},
	{pointerIndex:1903, comment:'Card name short', translation:'Lucky Vision'},
	{pointerIndex:1904, comment:'Card name short', translation:'Shadow Move'},
	{pointerIndex:1905, comment:'Card name short', translation:'Blackout'},
	{pointerIndex:1906, comment:'Card name short', translation:'Rob\'s Wallet'},
	{pointerIndex:1907, comment:'Card name short', translation:'Chan\'s $ box'},
	{pointerIndex:1908, comment:'Card name short', translation:'Ryo\'s Pocket'},
	{pointerIndex:1909, comment:'Card name short', translation:'Choi\'s Stash'},
	{pointerIndex:1910, comment:'Card name short', translation:'Chiz\'s Cash'},
	{pointerIndex:1911, comment:'Card name short', translation:'Kim\'s Wallet'},
	{pointerIndex:1912, comment:'Card name short', translation:'Yuri\'s Purse'},
	{pointerIndex:1913, comment:'Card name short', translation:'Mai Bouquet'},
	{pointerIndex:1914, comment:'Card name short', translation:'Cloning'},
	{pointerIndex:1915, comment:'Card name short', translation:'Lily\'s Wash'},
	{pointerIndex:1916, comment:'Card name short', translation:'Billy\'s Wash'},
	{pointerIndex:1917, comment:'Card name short', translation:'Vanessa\'s #'},
	{pointerIndex:1918, comment:'Card name short', translation:'Ryuhaku Wish'},
	{pointerIndex:1919, comment:'Card name short', translation:'Eiji Grudge'},
	{pointerIndex:1920, comment:'Card name short', translation:'Glauber Tear'},
	{pointerIndex:1921, comment:'Card name short', translation:'Shingo Chore'},
	{pointerIndex:1922, comment:'Card name short', translation:'Iori\'s Rage'},
	{pointerIndex:1923, comment:'Card name short', translation:'Leona\'s Rage'},
	{pointerIndex:1924, comment:'Card name short', translation:'Takuma Soba'},
	{pointerIndex:1925, comment:'Card name short', translation:'DoubleStrike'},
	{pointerIndex:1926, comment:'Card name short', translation:'Yata Mirror'},
	{pointerIndex:1927, comment:'Card name short', translation:'Psi Teleport'},
	{pointerIndex:1928, comment:'Card name short', translation:'Cali Romance'},
	{pointerIndex:1929, comment:'Card name short', translation:'Loser Blues'},



	/* CARD DESCRIPTIONS */
	{pointerIndex:1950, comment:'Card description', translation:'Move 1.'},
	{pointerIndex:1951, comment:'Card description', translation:'Move 2 nonstop.'},
	{pointerIndex:1952, comment:'Card description', translation:'Move 3 nonstop.'},
	{pointerIndex:1953, comment:'Card description', translation:'Move 4 nonstop.'},
	{pointerIndex:1954, comment:'Card description', translation:'Move 5 nonstop.'},
	{pointerIndex:1955, comment:'Card description', translation:'Move 6 nonstop.'},
	{pointerIndex:1956, comment:'Card description', translation:'Get +25%c.  (good)'},
	{pointerIndex:1957, comment:'Card description', translation:'[09] -25%c. (evil)'},
	{pointerIndex:1958, comment:'Card description', translation:'Get 10 coins(good)'},
	{pointerIndex:1959, comment:'Card description', translation:'Get 10 coins(evil)'},
	{pointerIndex:1960, comment:'Card description', translation:'Get coins by lv.'},
	{pointerIndex:1961, comment:'Card description', translation:'Split coins evenly'},
	{pointerIndex:1962, comment:'Card description', translation:'Swap coin totals.'},
	{pointerIndex:1963, comment:'Card description', translation:'Random 5[card] (good)'},
	{pointerIndex:1964, comment:'Card description', translation:'Random 5[card] (evil)'},
	{pointerIndex:1965, comment:'Card description', translation:'[09] discard(good)'},
	{pointerIndex:1966, comment:'Card description', translation:'[09] discard(evil)'},
	{pointerIndex:1967, comment:'Card description', translation:'Warp to a shop.'},
	{pointerIndex:1968, comment:'Card description', translation:'Get a star. (good)'},
	{pointerIndex:1969, comment:'Card description', translation:'Rival -1star(evil)'},
	{pointerIndex:1970, comment:'Card description', translation:'Steal one star.'},
	{pointerIndex:1971, comment:'Card description', translation:'Get 1 star per 25[coin]'},
	{pointerIndex:1972, comment:'Card description', translation:'All coins 1/2.'},
	{pointerIndex:1973, comment:'Card description', translation:'All discard all.'},
	{pointerIndex:1974, comment:'Card description', translation:'Rival loses 1 turn'},
	{pointerIndex:1975, comment:'Card description', translation:'2xcoin for 3 turns'},
	{pointerIndex:1976, comment:'Card description', translation:'Swap Striker align'},
	{pointerIndex:1977, comment:'Card description', translation:'Tap A to move.'},
	{pointerIndex:1978, comment:'Card description', translation:'Lose cards. +25%[coin].'},
	{pointerIndex:1979, comment:'Card description', translation:'Loser gets coins!'},



	/* MINIGAME - YOU DOUBT */
	{pointerIndex:1999, comment:'Minigame - You Doubt', translation:'Round one.'},
	{pointerIndex:2000, comment:'Minigame - You Doubt', translation:'Round two.'},
	{pointerIndex:2001, comment:'Minigame - You Doubt', translation:'Round three.'},
	{pointerIndex:2002, comment:'Minigame - You Doubt', translation:'Round four.'},
	{pointerIndex:2003, comment:'Minigame - You Doubt', translation:'Round five.'},
	{pointerIndex:2004, comment:'Minigame - You Doubt - Hints', translation:'Taekwondo?'},
	{pointerIndex:2005, comment:'Minigame - You Doubt - Hints', translation:'Resist evil!'},
	{pointerIndex:2006, comment:'Minigame - You Doubt - Hints', translation:'Pyrokinetic!'},
	{pointerIndex:2007, comment:'Minigame - You Doubt - Hints', translation:'KYOOOOoooo!!'},
	{pointerIndex:2008, comment:'Minigame - You Doubt - Hints', translation:'That\'s dumb.'},
	{pointerIndex:2009, comment:'Minigame - You Doubt - Hints', translation:'KOF\'s boss.'},
	{pointerIndex:2010, comment:'Minigame - You Doubt - Hints', translation:'Guest star!'},
	{pointerIndex:2011, comment:'Minigame - You Doubt - Hints', translation:'Father/son?'},
	{pointerIndex:2012, comment:'Minigame - You Doubt - Hints', translation:'From where?'},
	{pointerIndex:2013, comment:'Minigame - You Doubt - Hints', translation:'Look closely'},
	{pointerIndex:2014, comment:'Minigame - You Doubt - Hints', translation:'In uniform?'},
	{pointerIndex:2015, comment:'Minigame - You Doubt - Hints', translation:'Not Orochi?'},
	{pointerIndex:2016, comment:'Minigame - You Doubt - Hints', translation:'Tough codger'},
	{pointerIndex:2017, comment:'Minigame - You Doubt - Hints', translation:'O... Orochi!'},
	{pointerIndex:2018, comment:'Minigame - You Doubt - Hints', translation:'Vintage look'},
	{pointerIndex:2019, comment:'Minigame - You Doubt - Hints', translation:'Justice? No!'},
	{pointerIndex:2020, comment:'Minigame - You Doubt - Hints', translation:'Former lead.'},
	{pointerIndex:2021, comment:'Minigame - You Doubt - Hints', translation:'Knows Ryuko?'},
	{pointerIndex:2022, comment:'Minigame - You Doubt - Hints', translation:'No flames.'},
	{pointerIndex:2023, comment:'Minigame - You Doubt - Hints', translation:'Lame outfit.'},
	{pointerIndex:2024, comment:'Minigame - You Doubt - Hints', translation:'Cold winter.'},
	{pointerIndex:2025, comment:'Minigame - You Doubt - Hints', translation:'Hachimaki!'},
	{pointerIndex:2026, comment:'Minigame - You Doubt - Hints', translation:'Fire powers?'},
	{pointerIndex:2027, comment:'Minigame - You Doubt - Hints', translation:'Sport fights'},
	{pointerIndex:2028, comment:'Minigame - You Doubt - Hints', translation:'I debut in 2'},
	{pointerIndex:2029, comment:'Minigame - You Doubt - Hints', translation:'Just karaoke'},
	{pointerIndex:2030, comment:'Minigame - You Doubt - Hints', translation:'March births'},
	{pointerIndex:2031, comment:'Minigame - You Doubt - Hints', translation:'What\'s BOF?'},
	{pointerIndex:2032, comment:'Minigame - You Doubt - Hints', translation:'S... Scary.'},
	{pointerIndex:2033, comment:'Minigame - You Doubt - Hints', translation:'No carnivore'},
	{pointerIndex:2034, comment:'Minigame - You Doubt - Hints', translation:'I\'m an OG!'},
	{pointerIndex:2035, comment:'Minigame - You Doubt - Hints', translation:'Back in \'99.'},
	{pointerIndex:2036, comment:'Minigame - You Doubt - Hints', translation:'Single team.'},
	{pointerIndex:2037, comment:'Minigame - You Doubt - Hints', translation:'Same members'},
	{pointerIndex:2038, comment:'Minigame - You Doubt - Hints', translation:'Too young!'},
	{pointerIndex:2039, comment:'Minigame - You Doubt - Hints', translation:'Ice sports.'},
	{pointerIndex:2040, comment:'Minigame - You Doubt - Hints', translation:'Scary bugs!'},
	{pointerIndex:2041, comment:'Minigame - You Doubt - Hints', translation:'Loves nature'},
	{pointerIndex:2042, comment:'Minigame - You Doubt - Hints', translation:'Strawberry[heart]?'},
	{pointerIndex:2043, comment:'Minigame - You Doubt - Hints', translation:'Sports fan?'},
	{pointerIndex:2044, comment:'Minigame - You Doubt - Hints', translation:'Plays sports'},
	{pointerIndex:2045, comment:'Minigame - You Doubt - Hints', translation:'True Orochi.'},
	{pointerIndex:2046, comment:'Minigame - You Doubt - Hints', translation:'From Europe?'},
	{pointerIndex:2047, comment:'Minigame - You Doubt - Hints', translation:'Dad\'s not in'},
	{pointerIndex:2048, comment:'Minigame - You Doubt - Hints', translation:'Sci and tech'},
	{pointerIndex:2049, comment:'Minigame - You Doubt - Hints', translation:'Not yet...'},
	{pointerIndex:2050, comment:'Minigame - You Doubt - Hints', translation:'Udon > Ramen'},
	{pointerIndex:2051, comment:'Minigame - You Doubt - Hints', translation:'One birthday'},
	{pointerIndex:2052, comment:'Minigame - You Doubt - Hints', translation:'Remove shoes'},
	{pointerIndex:2053, comment:'Minigame - You Doubt - Hints', translation:'Not in QOF.'},



	/* USER SCREEN - MINIGAME TITTLES */
	{pointerIndex:2059, comment:'User screen - Minigame titles', translation:'PAIRPAIR GET'},
	{pointerIndex:2060, comment:'User screen - Minigame titles', translation:'SYNCRO-FIST'},
	{pointerIndex:2061, comment:'User screen - Minigame titles', translation:'IT\'S BACK!'},
	{pointerIndex:2062, comment:'User screen - Minigame titles', translation:'BOUZU?MEKURI'},
	{pointerIndex:2063, comment:'User screen - Minigame titles', translation:'NIKUMAN ROAD'},
	{pointerIndex:2064, comment:'User screen - Minigame titles', translation:'LET\'S DANCE'},
	{pointerIndex:2065, comment:'User screen - Minigame titles', translation:'IKARI TARGET'},
	{pointerIndex:2066, comment:'User screen - Minigame titles', translation:'GREAT ESCAPE'},
	{pointerIndex:2067, comment:'User screen - Minigame titles', translation:'BRIAN FLIES!'},
	{pointerIndex:2068, comment:'User screen - Minigame titles', translation:'DUSKCARNIVAL'},
	{pointerIndex:2069, comment:'User screen - Minigame titles', translation:'YOU DOUBT!'},
	{pointerIndex:2070, comment:'User screen - Minigame titles', translation:'SHADOW PLAY'},
	{pointerIndex:2071, comment:'User screen - Minigame titles', translation:'FAST FIGHTER'},
	{pointerIndex:2072, comment:'User screen - Minigame titles', translation:'TOP PRESENTS'},
	{pointerIndex:2073, comment:'User screen - Minigame titles', translation:'COIN JUMP'},
	{pointerIndex:2074, comment:'User screen - Minigame titles', translation:'TANK?'},
	{pointerIndex:2075, comment:'User screen - Minigame titles', translation:'DARK MAZE'},
	{pointerIndex:2076, comment:'User screen - Minigame titles', translation:'BOOM!ESCAPE'},
	{pointerIndex:2077, comment:'User screen - Minigame titles', translation:'DARUMAOTOSHI'},
	{pointerIndex:2078, comment:'User screen - Minigame titles', translation:'IS IT 2000?'},
	{pointerIndex:2079, comment:'User screen - Minigame titles', translation:'MOVE: \'NONE\''},
	{pointerIndex:2080, comment:'User screen - Minigame titles', translation:'BOOM!ESCAPEΩ'},
	{pointerIndex:2081, comment:'User screen - Minigame titles', translation:'YO·SA·KU'},
	{pointerIndex:2082, comment:'Empty'},

	/* MINIGAME - PAIRPAIR GET - SHINGO */
	{pointerIndex:2083, comment:'Minigame - PairPair Get - Shingo - appears', translation:'Shingo!'},
	{pointerIndex:2084, comment:'Minigame - PairPair Get - Shingo - tries to steal points', translation:'Takes points'},
	{pointerIndex:2085, comment:'Minigame - PairPair Get - Shingo - 50 points', translation:'Got +50p!![0f]'},
	{pointerIndex:2086, comment:'Minigame - PairPair Get - Shingo - minus 50 points', translation:'Lost -50p![0f]'},
	{pointerIndex:2087, comment:'Minigame - PairPair Get - Shingo - no points to steal', translation:'No points.[0f]'},

	{pointerIndex:2088, comment:'Minigame - end early', translation:'B to skip.[0f]'},



	/* DC LINK */
	{pointerIndex:2119, comment:'Options - DC Link - NGPC -> DC', translation:'Choose a striker'},
	{pointerIndex:2120, comment:'Options - DC Link - NGPC -> DC', translation:'Send to DC?'},
	{pointerIndex:2121, comment:'Options - DC Link - DC -> NGPC', translation:'Receive AP from'},
	{pointerIndex:2122, comment:'Options - DC Link - DC -> NGPC', translation:'DC?'},
	{pointerIndex:2123, comment:'Options - DC Link', translation:'CommunicationError'},
	{pointerIndex:2124, comment:'Options - DC Link'},



	/* GAMEPLAY */
	{pointerIndex:2129, comment:'Game intro - Turns', translation:'[0b][0c] TURNS'},
	{pointerIndex:2130, comment:'Game intro - Stage names', translation:' BATTLEFIELD'},
	{pointerIndex:2131, comment:'Game intro - Stage names', translation:'     NEST'},
	{pointerIndex:2132, comment:'Game intro - Stage names', translation:'AMUSEMENT PARK'},
	{pointerIndex:2133, comment:'Game intro - Stage names', translation:'    MUSEUM'},
	{pointerIndex:2134, comment:'Game intro - Stage names', translation:' GAROU CANYON'},
	{pointerIndex:2135, comment:'Game intro - Stage names', translation:' ATHENA WORLD'},
];
