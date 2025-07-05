const PATCHES=[
	{offset:0x8f62, comment:'Main menu - CONTINUE tiles starting index', length:1, data:[0x20]}, // originally 0x0a, 0x20 seems to be a safe index at Pattern Table (leftover tiles from SNK logo intro)
	{offset:0x8f64, comment:'Main menu - CONTINUE string length', length:1, data:[0x06 + 2]},



	/* STATIC SCREENS */
	//{offset:0x193c64, comment:'Static screen - Game Rules', length:20*19 * 2},






	/* Create user - Type name */
	/*
		*if first byte is changed, menu won't work correctly
		to-do: debug and find where it checks which character the cursor is on
	*/
	{offset:0x147bb, comment:'Create user - Type name (ASCII)', length:4, data:[0x63,'A','B','C']}, //*
	{offset:0x147bf, comment:'Create user - Type name (END)', length:4, data:[0x68,'E','N','D']} //*
];