const MAP_REPLACEMENTS=[
	/* Create user - Type name */
	/*
		*if first byte is changed, menu won't work correctly
		to-do: debug and find where it checks which character the cursor is on
	*/
	{offset:0x147bb, comment:'Create user - Type name (ASCII)', length:4, data:[0x63,'A','B','C']}, //*
	{offset:0x147bf, comment:'Create user - Type name (END)', length:4, data:[0x68,'E','N','D']} //*
];