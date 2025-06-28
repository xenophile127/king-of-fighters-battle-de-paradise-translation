/*
	console-graphics.js
	These classes represent different videogame console's graphics:
	- colors and palettes
	- tiles and tilesets
	- maps
	Some of them are abstract and require a subclass to be implemented.

	---

	Released under MIT License

	Copyright (c) 2022-2025 Marc Robledo

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/


/** Abstract class representing a console color */
class Color {
	data;

	/**
	 * @param {number} data Binary data representing the console color
	 */
	constructor(data) {
		this.data = data;
	}

	/**
	 * Checks if two colors are equal
	 * @param {Color} color2 color to compare
	 * @returns true if colors are equal
	 */
	equals(color2) {
		return this.data === color2.data;
	}


	/**
	 * Get the luma of the color
	 * @returns {number}
	 */
	getLuma() {
		// Assuming toRGB24() returns an array [r, g, b]
		const [r, g, b] = this.toRGB24();
		// Calculate luma
		const luma = 0.299 * r + 0.587 * g + 0.114 * b;
		return luma;
	}




	toHex() {
		return this.data.toString(16).padStart(4, '0');
	}
	toHex24() {
		return this.toRGB24().map((component) => component.toString(16).padStart(2, '0')).join('');
	}

	/**
	 * Converts the color to RGB24, must be implemented by subclasses
	 * @returns Array with r8, g8 and b8 components
	 */
	toRGB24() {
		throw new Error('Color.toRGB24 not implemented');
	}
	/**
	 * Build a color from RGB24 components, must be implemented by subclasses
	 * @param {number} r8 
	 * @param {number} g8 
	 * @param {number} b8
	 * @returns 
	 */
	static fromRGB24(r8, g8, b8) {
		throw new Error('Color.fromRGB24 not implemented');
	}
}



/**
 * Class representing a RGB15 color, used in CGB and SNES
 */
const RESCALE_24TO15BIT = 8.22580645161291;
const BIT5_MASK = 0b00011111;
class ColorRGB15 extends Color {
	/**
	 * Export RGB15 binary data
	 * @returns color data
	 */
	export() {
		return [this.data & 0xff, (this.data >> 8) & 0xff];
	}

	/**
	 * Converts RGB15 to RGB24
	 * @returns Array with r, g and b properties (in 8bit format)
	 */
	toRGB24() {
		return [
			ColorRGB15.to8bit(this.data & BIT5_MASK),
			ColorRGB15.to8bit((this.data >> 5) & BIT5_MASK),
			ColorRGB15.to8bit((this.data >> 10) & BIT5_MASK),
		]
	}
	/**
	 * Extracts RGB15 components
	 * @returns Array with r, g and b properties (in 5bit format)
	 */
	toRGB15() {
		return [
			this.data & BIT5_MASK,
			(this.data >> 5) & BIT5_MASK,
			(this.data >> 10) & BIT5_MASK
		]
	}

	setR5(r5) {
		this.data = (this.data & 0b0111111111100000) | (r5 & BIT5_MASK);
	}
	setG5(g5) {
		this.data = (this.data & 0b0111110000011111) | ((g5 & BIT5_MASK) << 5);
	}
	setB5(b5) {
		this.data = (this.data & 0b0000001111111111) | ((b5 & BIT5_MASK) << 10);
	}
	setRGB15(r5, g5, b5) {
		this.data = (r5 & BIT5_MASK) | ((g5 & BIT5_MASK) << 5) | ((b5 & BIT5_MASK) << 10);
	}
	setR8(r8) {
		this.setR5(ColorRGB15.to5bit(r8));
	}
	setG8(g8) {
		this.setG5(ColorRGB15.to5bit(g8));
	}
	setB8(b8) {
		this.setB5(ColorRGB15.to5bit(b8));
	}
	setRGB24(r8, g8, b8) {
		this.setR8(r8);
		this.setG8(g8);
		this.setB8(b8);
	}

	static to5bit(component8) {
		return Math.round(component8 / RESCALE_24TO15BIT) & BIT5_MASK
	}
	static to8bit(component5) {
		return Math.round(component5 * RESCALE_24TO15BIT);
	}

	static fromRGB15(r5, g5, b5) {
		const newColor = new this(0x0000);
		newColor.setRGB15(r5, g5, b5);
		return newColor;
	}

	static fromRGB24(r8, g8, b8) {
		const newColor = new this(0x0000);
		newColor.setR8(r8);
		newColor.setG8(g8);
		newColor.setB8(b8);
		return newColor;
	}
}




/** Class representing a console palette */
class Palette {
	colors;

	/**
	* Create a palette
	* @param {Color[]} colors
	*/
	constructor(colors) {
		this.colors = colors
	}

	/**
	* Find a color in the palette.
	* @param {Color} color
	* @return {number} The color index in the palette, -1 if not found.
	*/
	getColorIndex(color) {
		return this.colors.findIndex((color2) => color.equals(color2));
	}


	/**
	* Check if palette contains a color.
	* @param {Color} color
	* @return {boolean} true if color was found
	*/
	hasColor(color) {
		return this.colors.some((color2) => color.equals(color2));
	}


	/**
	* Check if palette contains various colors.
	* @param {Color[]} colors
	* @return {boolean} true if all colors were found
	*/
	hasColors(colors) {
		for (var i = 0; i < colors.length; i++) {
			if (!this.hasColor(colors[i]))
				return false;
		}
		return true;
	}



	sortByLuma() {
		this.colors.sort((a, b) => a.getLuma() - b.getLuma());
		return this;
	}

	swapColors(colorIndex1, colorIndex2) {
		if (colorIndex1 === colorIndex2)
			return false;
		else if (this.colors[colorIndex1] === undefined)
			throw new Error('Invalid color index 1');
		else if (this.colors[colorIndex2] === undefined)
			throw new Error('Invalid color index 2');

		const tmp = this.colors[colorIndex1];
		this.colors[colorIndex1] = this.colors[colorIndex2];
		this.colors[colorIndex2] = tmp;
		return true;
	}

	equals(palette2) {
		if (this.colors.length !== palette2.colors.length)
			return false;

		for (var i = 0; i < this.colors.length; i++) {
			if (!this.colors[i].equals(palette2.colors[i]))
				return false;
		}

		return true;
	}


	/**
	* Generates a 8x8 tile ImageData with a checkered pattern containing all colors
	* @return {ImageData}
	*/
	toImageData() {
		const imageData = new ImageData(8, 8);
		const colors = this.colors.map((color) => color.toRGB24());

		const paletteTileChecker = PALETTE_TILE_CHECKER[this.colors.length <= 4 ? 0 : 1];
		for (var i = 0; i < 64; i++) {
			const color = colors[paletteTileChecker[i]];
			imageData.data[i * 4 + 0] = color[0];
			imageData.data[i * 4 + 1] = color[1];
			imageData.data[i * 4 + 2] = color[2];
			imageData.data[i * 4 + 3] = 255;
		}
		return imageData;
	}


	/**
	* Export all colors into an array of binary data.
	* @return {number[]}
	*/
	export() {
		return this.colors.map((color) => {
			return color.export();
		});
	}


	getBiggestPalette(colors1, colors2) {
		if (colors1.length < colors2.length) {
			for (var i = 0; i < colors1.length; i++) {
				if (colors2.find((color2) => color2.equals(colors1[i])))
					return false;
			}
			return colors2;
		} else {
			for (var i = 0; i < colors2.length; i++) {
				if (colors1.find((color1) => color1.equals(colors2[i])))
					return false;
			}
			return colors1;
		}
	}

}




const PALETTE_TILE_CHECKER = [
	[ //2bpp
		0, 0, 0, 0, 1, 1, 1, 1,
		0, 0, 0, 0, 1, 1, 1, 1,
		0, 0, 0, 0, 1, 1, 1, 1,
		0, 0, 0, 0, 1, 1, 1, 1,
		2, 2, 2, 2, 3, 3, 3, 3,
		2, 2, 2, 2, 3, 3, 3, 3,
		2, 2, 2, 2, 3, 3, 3, 3,
		2, 2, 2, 2, 3, 3, 3, 3,
		2, 2, 2, 2, 3, 3, 3, 3
	],
	[ //4bpp
		0, 0, 1, 1, 2, 2, 3, 3,
		0, 0, 1, 1, 2, 2, 3, 3,
		4, 4, 5, 5, 6, 6, 7, 7,
		4, 4, 5, 5, 6, 6, 7, 7,
		8, 8, 9, 9, 10, 10, 11, 11,
		8, 8, 9, 9, 10, 10, 11, 11,
		12, 12, 13, 13, 14, 14, 15, 15,
		12, 12, 13, 13, 14, 14, 15, 15
	]
];




/**
 * Represents a 8x8 tile
 * @constructor
 * @param {int} bpp - bits per pixel
*/
class Tile {
	pixels;
	defaultPalette;

	constructor(pixels, defaultPalette) {
		if (!pixels) {
			pixels = new Array(8);
			for (let y = 0; y < 8; y++) {
				pixels[y] = new Array(8);
				pixels[y].fill(0);
			}
		} else if (!Array.isArray(pixels) || pixels.length !== 8) {
			throw new Error('Invalid tile data (must be an 8x8 array)');
		} else {
			for (let y = 0; y < 8; y++) {
				if (!Array.isArray(pixels[y]) || pixels[y].length !== 8)
					throw new Error('Invalid tile data (must be an 8x8 array)');
			}
		}
		this.pixels = pixels;

		if (!(defaultPalette instanceof Palette))
			throw new Error('Invalid palette');

		this.defaultPalette = defaultPalette;
	}

	getPixel(x, y) {
		return this.pixels[y][x];
	}

	setPixel(x, y, colorIndex) {
		if (typeof colorIndex !== 'number' || colorIndex < 0 || colorIndex >= this.defaultPalette.colors.length)
			throw new Error('Invalid color index');
		this.pixels[y][x] = colorIndex;
		this._flippedTiles = null;
	}

	swapColors(colorIndex1, colorIndex2) {
		if (colorIndex1 === colorIndex2)
			return false;
		else if (this.defaultPalette.colors[colorIndex1] === undefined)
			throw new Error('Invalid color index 1');
		else if (this.defaultPalette.colors[colorIndex2] === undefined)
			throw new Error('Invalid color index 2');

		for (var y = 0; y < 8; y++) {
			for (var x = 0; x < 8; x++) {
				if (this.getPixel(x, y) === colorIndex1)
					this.setPixel(x, y, colorIndex2);
				else if (this.getPixel(x, y) === colorIndex2)
					this.setPixel(x, y, colorIndex1);
			}
		}

		return true;
	}

	toImageData(palette = null, flipX = false, flipY = false, transparent = false) {
		if (!palette)
			palette = this.defaultPalette;

		let tile;
		if (flipX || flipY) {
			if (!this._flippedTiles)
				this.cacheFlippedTiles();
			tile = this._flippedTiles[(flipY ? 2 : 0) | (flipX ? 1 : 0)];
		} else {
			tile = this;
		}
		const rgb24colors = palette.colors.map((color) => color.toRGB24());

		const imageData = new ImageData(8, 8);
		let k = 0;
		for (var y = 0; y < 8; y++) {
			for (var x = 0; x < 8; x++) {
				var colorIndex = tile.getPixel(x, y);
				imageData.data[k++] = rgb24colors[colorIndex][0];
				imageData.data[k++] = rgb24colors[colorIndex][1];
				imageData.data[k++] = rgb24colors[colorIndex][2];
				imageData.data[k++] = colorIndex || !transparent ? 255 : 0;
			}
		}
		return imageData;
	}


	flip(flipX = false, flipY = false) {
		const newTile = new this.constructor(null, this.defaultPalette);

		for (var y = 0; y < 8; y++) {
			for (var x = 0; x < 8; x++) {
				newTile.setPixel(x, y, this.getPixel(flipX ? 7 - x : x, flipY ? 7 - y : y));
			}
		}

		return newTile;
	}

	cacheFlippedTiles() {
		this._flippedTiles = [
			this.flip(false, false), //no flip
			this.flip(true, false), //flip X
			this.flip(false, true), //flip Y
			this.flip(true, true) //flip X and Y
		]
		return this._flippedTiles;
	}

	equals(tile) {
		for (var y = 0; y < 8; y++) {
			for (var x = 0; x < 8; x++) {
				if (this.getPixel(x, y) !== tile.getPixel(x, y))
					return false;
			}
		}
		return true;
	}
	equalsFlipped(tile) {
		if (!this._flippedTiles)
			this.cacheFlippedTiles();

		for (var i = 0; i < this._flippedTiles.length; i++) {
			const equals = this._flippedTiles[i].equals(tile);
			if (equals) {
				if (i)
					return { flipX: i & 0x01, flipY: i & 0x02 };
				return true;
			}
		}
		return false;
	}
}








const _getQuantizableTiles = function (tiles, checkCallback) {
	const quantizableTiles = tiles.reduce(
		(acc, tile, i, allTiles) => {
			const duplicateTiles = allTiles.slice(i + 1).filter((tile2) => checkCallback(acc, tile, tile2));
			duplicateTiles.forEach((duplicateTile) => {
				duplicateTile.duplicateFrom = tile;
			});
			return acc.concat(duplicateTiles);
		},
		[]
	);
	return quantizableTiles;
}


class Tileset {
	palettes;
	tiles;
	consoleGraphics;

	constructor(consoleGraphics) {
		this.palettes = [];
		this.tiles = [];
		this.consoleGraphics = consoleGraphics;
	}

	setTilePalette(tileIndex, paletteIndex) {
		if (typeof this.tiles[tileIndex] === 'undefined')
			throw new Error('Invalid tile index');
		if (typeof this.palettes[paletteIndex] === 'undefined')
			throw new Error('Invalid palette index');
		this.tiles[tileIndex].defaultPalette = this.palettes[paletteIndex];
	}

	swapTiles(tileIndex1, tileIndex2) {
		if (typeof this.tiles[tileIndex1] === 'undefined' || typeof this.tiles[tileIndex2] === 'undefined')
			throw new Error('Invalid tile index');
		if (tileIndex1 === tileIndex2)
			return false;
		const tmp = this.tiles[tileIndex1];
		this.tiles[tileIndex1] = this.tiles[tileIndex2];
		this.tiles[tileIndex2] = tmp;
		return true;
	}
	addTile(tile, tileIndex = null) {
		if (typeof tileIndex === 'number') {
			this.tiles.splice(tileIndex, 0, tile);
			return tileIndex;
		} else {
			this.tiles.push(tile);
			return this.tiles.length - 1;
		}
	}
	getTileIndex(tile) {
		return this.tiles.indexOf(tile);
	}
	pushTile(tile) {
		this.addTile(tile);
	}
	unshiftTile(tile) {
		this.addTile(tile, 0);
	}
	removeTile(tileIndex) {
		if (typeof tileIndex !== 'number')
			tileIndex = this.getTileIndex(tileIndex);
		return (this.tiles.splice(tileIndex, 1))[0];
	}
	popTile() {
		return this.removeTile(this.tiles.length - 1);
	}
	shiftTile() {
		return this.removeTile(0);
	}

	getQuantizableTiles() {
		/* find duplicate tiles (same data+palette) */
		const quantizableTiles0 = _getQuantizableTiles(this.tiles, function (acc, tile, tile2) {
			return !acc.includes(tile) && !acc.includes(tile2) && tile.equals(tile2) && tile.defaultPalette === tile2.defaultPalette
		});
		if (quantizableTiles0.length)
			return quantizableTiles0;

		/* find duplicate tiles (same data, different palette) */
		const quantizableTiles1 = _getQuantizableTiles(this.tiles, function (acc, tile, tile2) {
			return !acc.includes(tile) && !acc.includes(tile2) && tile.equals(tile2)
		});
		if (quantizableTiles1.length)
			return quantizableTiles1;

		/* find duplicate tiles (flipped) */
		if (this.consoleGraphics.Map && this.consoleGraphics.Map.ALLOW_ATTRIBUTES) {
			const quantizableTiles2 = _getQuantizableTiles(this.tiles, function (acc, tile, tile2) {
				return !acc.includes(tile) && !acc.includes(tile2) && tile.equalsFlipped(tile2)
			});
			if (quantizableTiles2.length)
				return quantizableTiles2;
		}

		return null;
	}
	removeTiles(tiles) {
		tiles.forEach((tile) => {
			this.removeTile(tile);
		});
	}

	swapPalettes(paletteIndex1, paletteIndex2) {
		if (typeof this.palettes[paletteIndex1] === 'undefined' || typeof this.palettes[paletteIndex2] === 'undefined')
			throw new Error('Invalid palette index');
		if (paletteIndex1 === paletteIndex2)
			return false;
		const tmp = this.palettes[paletteIndex1];
		this.palettes[paletteIndex1] = this.palettes[paletteIndex2];
		this.palettes[paletteIndex2] = tmp;
		return true;
	}
	addPalette(palette, paletteIndex = null) {
		if (typeof paletteIndex === 'number') {
			this.palettes.splice(paletteIndex, 0, palette);
			return paletteIndex;
		} else {
			this.palettes.push(palette);
			return this.palettes.length - 1;
		}
	}
	getPaletteIndex(palette) {
		return this.palettes.indexOf(palette);
	}
	pushPalette(palette) {
		this.addPalette(palette);
	}
	unshiftPalette(palette) {
		this.addPalette(palette, 0);
	}
	removePalette(paletteIndex) {
		if (this.palettes.length === 1)
			throw new Error('Cannot remove the only existing palette');

		const removedPalette = this.palettes[paletteIndex];
		this.palettes.splice(paletteIndex, 1);
		const firstPalette = this.palettes[0];
		this.tiles.forEach((tile) => {
			if (tile.defaultPalette === removedPalette)
				tile.defaultPalette = firstPalette;
		});

		return removedPalette;
	}
	popPalette() {
		return this.removePalette(this.palettes.length - 1);
	}
	shiftPalette() {
		return this.removePalette(0);
	}

	toImageData() {
		const rowsEmbeddedPalettes = Math.ceil(this.palettes.length / 16);
		const canvas = document.createElement('canvas');
		canvas.width = 128;
		canvas.height = (rowsEmbeddedPalettes + Math.ceil(this.tiles.length / 16)) * 8;
		const ctx = canvas.getContext('2d');

		let y = 0;
		let x = 0;
		this.palettes.forEach((palette) => {
			ctx.putImageData(palette.toImageData(), x * 8, y * 8);
			x++;
			if (x === 16) {
				x = 0;
				y++;
			}
		});

		y = rowsEmbeddedPalettes;
		x = 0;
		this.tiles.forEach((tile) => {
			ctx.putImageData(tile.toImageData(), x * 8, y * 8);
			x++;
			if (x === 16) {
				x = 0;
				y++;
			}
		});

		return ctx.getImageData(0, 0, canvas.width, canvas.height);
	}

	export() {
		return {
			tiles: this.tiles.map((tile) => tile.export()).flat(),
			palettes: this.palettes.map((palette) => palette.export()).flat()
		}
	}


	static fromImageData(imageData, consoleGraphics) {
		/* check parameters validity */
		if (!(imageData instanceof ImageData))
			throw new Error('Tileset.fromImageData: imageData is not an instance of ImageData');
		else if (imageData.width % 8 !== 0 || imageData.height % 8 !== 0)
			throw new Error('Tileset.fromImageData: invalid image dimensions (width and height must be divisible by 8)');


		const tempCanvas = document.createElement('canvas');
		tempCanvas.width = 8;
		tempCanvas.height = 8;
		const tempCtx = tempCanvas.getContext('2d');

		const nRows = imageData.height / 8;
		const nCols = imageData.width / 8;
		const warnings = [];

		const palettes = [];
		const tiles = [];
		const mapTiles = [];
		const pendingTilePalettes = [];
		var readingEmbeddedPalettes = true;
		var embeddedPaletteRows = 0;

		/* extract tiles info */
		for (var y = 0; y < nRows; y++) {
			const rowTileInfos = [];
			for (var x = 0; x < nCols; x++) {
				tempCtx.putImageData(imageData, -x * 8, -y * 8);
				const tileImageData = tempCtx.getImageData(0, 0, 8, 8);
				const tileInfo = _extractTileInfoFromImageData(tileImageData, consoleGraphics, readingEmbeddedPalettes, x, y);
				if (tileInfo) {
					if (readingEmbeddedPalettes && !tileInfo.isEmbeddedPalette)
						readingEmbeddedPalettes = false;
					if (tileInfo.tooManyColors)
						warnings.push({
							x,
							y,
							imageData: tileImageData
						});

					rowTileInfos.push(tileInfo);
				}
			}

			if (readingEmbeddedPalettes) {
				rowTileInfos.forEach((tileInfo) => {
					palettes.push(new consoleGraphics.Palette(tileInfo.colors));
				});
				embeddedPaletteRows++;
			} else {
				rowTileInfos.forEach((tileInfo) => {
					tiles.push(tileInfo);
					mapTiles.push({
						tileIndex: tiles.length - 1,
						x: tileInfo.x,
						y: tileInfo.y - embeddedPaletteRows
					});

					if (!palettes.some((palette) => palette.hasColors(tileInfo.colors))) {
						if (tileInfo.colors === consoleGraphics.Palette.SIZE) {
							/* tile has a new full palette */
							palettes.push(new consoleGraphics.Palette(tileInfo.colors));
						} else {
							pendingTilePalettes.push(tileInfo);
						}
					}
				});
			}
		}

		/* guess remaining palettes from tiles, prioritizing the ones with most colors */
		pendingTilePalettes.sort((a, b) => b.colors.length - a.colors.length);
		[...pendingTilePalettes].forEach((tileInfo) => {
			if (!palettes.some((palette) => palette.hasColors(tileInfo.colors))) {
				/* tile has a new palette */
				var colors = [...tileInfo.colors];
				/* check if there is room for more colors */
				var roomForMoreColors = consoleGraphics.Palette.SIZE - colors.length;
				while (roomForMoreColors) {
					for (var i = roomForMoreColors; i > 0; i--) {
						const pendingTilePaletteWithXColors = pendingTilePalettes.find((tileInfo2) => tileInfo2.colors.length === i);
						if (pendingTilePaletteWithXColors) {
							/* found a smaller palette that can be merged */
							for (var j = 0; j < pendingTilePaletteWithXColors.colors.length; j++) {
								if (!colors.find((color) => color.equals(pendingTilePaletteWithXColors.colors[j]))) {
									colors.push(pendingTilePaletteWithXColors.colors[j]);
								}
							}
							pendingTilePalettes.splice(pendingTilePalettes.indexOf(pendingTilePaletteWithXColors), 1);
							break;
						}
					}
					if (i === 0)
						break;
					roomForMoreColors = consoleGraphics.Palette.SIZE - colors.length;
				}
				while (colors.length < consoleGraphics.Palette.SIZE) {
					colors.push(consoleGraphics.Color.fromRGB24(255, 0, 255));
				}
				const tilePalette = new consoleGraphics.Palette(colors);
				tilePalette.sortByLuma();
				palettes.push(tilePalette);
			}
		});




		/* build tileset */
		const tileset = new Tileset(consoleGraphics);
		tileset.palettes = palettes;
		tiles.forEach((tileInfo) => {
			const possiblePalettes = tileset.palettes.filter((palette) => palette.hasColors(tileInfo.colors));
			const possibleTiles = possiblePalettes.map((palette) => {
				const pixels = new Array(8);
				for (var y = 0; y < 8; y++) {
					pixels[y] = new Array(8);
					for (var x = 0; x < 8; x++) {
						pixels[y][x] = palette.getColorIndex(tileInfo.pixels[y * 8 + x]);
					}
				}
				return new consoleGraphics.Tile(pixels, palette);
			});
			/* remove possible tiles that are equal */
			const uniqueTiles = possibleTiles.reduce((uniqueTiles, tile) => {
				if (!uniqueTiles.some((otherTile) => otherTile.equals(tile)))
					uniqueTiles.push(tile);
				return uniqueTiles;
			}, []);

			uniqueTiles.forEach((tile) => {
				tile.alternateTiles = uniqueTiles;
			});
			tileset.pushTile(uniqueTiles[0]);
		});
		
		
		
		/* build map */
		var map = null;
		if(consoleGraphics.Map){
			map = new consoleGraphics.Map(nCols, nRows - embeddedPaletteRows, tileset);
			mapTiles.forEach(function(mapTileInfo){
				map.setMapTile(
					mapTileInfo.x,
					mapTileInfo.y,
					mapTileInfo.tileIndex,
					false,
					false
				);
			});
		}

		//console.log('palettes', palettes);
		//console.log('tiles', tiles);
		//console.log('map', map);
	
		return {
			tileset,
			map,
			consoleGraphics,
			warnings
		};
	}
}













const _extractTileInfoFromImageData = function (tileImageData, consoleGraphics, checkIfEmbeddedPalette, x, y) {
	const tileInfo = {
		pixels: new Array(8 * 8),
		colors: new Array(),
		tooManyColors: false,
		isEmbeddedPalette: false,
		x,
		y
	};

	var transparentPixels = 0;
	for (var i = 0; i < 64; i++) {
		if (tileImageData.data[(i * 4) + 3] < 192) {
			transparentPixels++;
			if (transparentPixels === 32) /* consider it a transparent tile */
				return false;
		}

		const color = consoleGraphics.Color.fromRGB24(
			tileImageData.data[(i * 4) + 0],
			tileImageData.data[(i * 4) + 1],
			tileImageData.data[(i * 4) + 2]
		);

		const existingColor = tileInfo.colors.find((otherColor) => color.equals(otherColor))
		if (existingColor) {
			tileInfo.pixels[i] = existingColor;
		} else {
			tileInfo.pixels[i] = color;
			tileInfo.colors.push(tileInfo.pixels[i]);
			if (tileInfo.colors.length > consoleGraphics.Palette.SIZE)
				tileInfo.tooManyColors = true;
		}
	}

	if (tileInfo.tooManyColors) {
		while (tileInfo.colors.length > consoleGraphics.Palette.SIZE) {
			const closestPairInfo = _closestPair(tileInfo.colors.map((color) => {
				const rgb24 = color.toRGB24();
				return {
					R: rgb24[0],
					G: rgb24[1],
					B: rgb24[2],
					A: 1
				}
			}));
			const color1 = tileInfo.colors[closestPairInfo.color1Index];
			const color2 = tileInfo.colors[closestPairInfo.color2Index];

			const count1 = tileInfo.pixels.filter((color) => color === color1).length;
			const count2 = tileInfo.pixels.filter((color) => color === color2).length;

			if (count1 < count2) {
				//remove color1
				tileInfo.pixels = tileInfo.pixels.map((color) => {
					if (color.equals(color1))
						return color2;
					return color;
				});
				tileInfo.colors.splice(closestPairInfo.color1Index, 1);
			} else {
				//remove color2
				tileInfo.pixels = tileInfo.pixels.map((color) => {
					if (color.equals(color2))
						return color1;
					return color;
				});
				tileInfo.colors.splice(closestPairInfo.color2Index, 1);
			}
		}
	}


	/* check if tile is embedded palette */
	if (checkIfEmbeddedPalette) {
		const nColors = consoleGraphics.Palette.SIZE;

		if (nColors !== 4 && nColors !== 16)
			throw new Error('Invalid palette colors size');

		const quadInfo = nColors === 4 ? {
			size: 4,
			cols: 2,
			rows: 2
		} : {
			size: 2,
			cols: 4,
			rows: 4
		};

		const colors = [];
		var isEmbeddedPalette = true;

		for (var q = 0; q < nColors && isEmbeddedPalette; q++) {
			var startX = quadInfo.size * (q % quadInfo.cols);
			var startY = quadInfo.size * Math.floor(q / quadInfo.rows);

			var quadColor = tileInfo.pixels[startY * 8 + startX];
			for (var y = 0; y < quadInfo.size && isEmbeddedPalette; y++) {
				for (var x = 0; x < quadInfo.size && isEmbeddedPalette; x++) {
					if (!tileInfo.pixels[(startY + y) * 8 + startX + x].equals(quadColor))
						isEmbeddedPalette = false;
				}
			}
			colors.push(quadColor);
		}

		if (isEmbeddedPalette) {
			/* check if checkered tile has at least two different colors */
			const differentColors=colors.slice(1).some((color) => !colors[0].equals(color));
			if(differentColors){
				tileInfo.isEmbeddedPalette = new consoleGraphics.Palette(colors);
				tileInfo.colors = colors;
			}
		}
	}



	return tileInfo;
}





class Map {
	width;
	height;
	tileset;
	mapTiles;

	constructor(w, h, tileset) {
		this.width = w;
		this.height = h;
		this.tileset = tileset;
		this.mapTiles = new Array(w * h).fill({
			tile:this.tileset.tiles[0],
			flipX:false,
			flipY:false,
		});
	}

	getMapTile(x, y) {
		return this.mapTiles[y * this.width + x];
	}
	setMapTile(x, y, tileIndex, flipX, flipY) {
		if (typeof tileIndex !== 'number')
			throw new TypeError('Tile index is not a number');
		else if (!this.tileset.tiles[tileIndex])
			throw new TypeError('Invalid tile index');

		const mapTile = {
			tile:this.tileset.tiles[tileIndex],
			flipX: false,
			flipY: false
		};

		if (typeof flipX !== 'undefined')
			mapTile.flipX = !!flipX;
		if (typeof flipY !== 'undefined')
			mapTile.flipY = !!flipY;

		this.mapTiles[y * this.width + x] = mapTile;
		return mapTile;
	}
	replaceMapTiles(tileSearch, tileReplace, flipX, flipY) {
		const tileReplaceIndex=this.tileset.getTileIndex(tileReplace);
		if (tileReplaceIndex === -1)
			throw new TypeError('Invalid tile index to replace');

		for(var y=0; y<this.height; y++){
			for(var x=0; x<this.width; x++){
				if(this.mapTiles[y * this.width + x].tile===tileSearch){
					this.setMapTile(x, y, tileReplaceIndex, flipX, flipY);
				}
			}
		}
		
		return this;
	}

	toImageData() {
		var canvas = document.createElement('canvas');
		canvas.width = this.width * 8;
		canvas.height = this.height * 8;
		var ctx = canvas.getContext('2d');

		var index = 0;
		for (var y = 0; y < this.height; y++) {
			for (var x = 0; x < this.width; x++) {
				const mapTile = this.mapTiles[index];

				const imageDataTile = mapTile.tile.toImageData(mapTile.tile.defaultPalette, mapTile.flipX, mapTile.flipY);
				ctx.putImageData(imageDataTile, x * 8, y * 8);

				index++;
			}
		}

		return ctx.getImageData(0, 0, this.width * 8, this.height * 8);
	}
}





/* NGPC */

/**
 * Class representing a RGB12 color
 */
const RESCALE_24TO12BIT = 17;
const BIT4_MASK = 0b00001111;
class ColorRGB12 extends Color {
	/**
	 * Converts RGB15 to RGB24
	 * @returns Array with r, g and b properties (in 8bit format)
	 */
	toRGB24() {
		return [
			ColorRGB12.to8bit(this.data & BIT4_MASK),
			ColorRGB12.to8bit((this.data >> 4) & BIT4_MASK),
			ColorRGB12.to8bit((this.data >> 8) & BIT4_MASK),
		]
	}
	/**
	 * Extracts RGB15 components
	 * @returns Array with r, g and b properties (in 5bit format)
	 */
	toRGB15() {
		return [
			this.data & BIT4_MASK,
			(this.data >> 5) & BIT4_MASK,
			(this.data >> 10) & BIT4_MASK
		]
	}

	setR4(r4) {
		this.data = (this.data & 0b0000111111110000) | (r4 & BIT4_MASK);
	}
	setG4(g4) {
		this.data = (this.data & 0b0000111100001111) | ((g4 & BIT4_MASK) << 4);
	}
	setB4(b4) {
		this.data = (this.data & 0b0000000011111111) | ((b4 & BIT4_MASK) << 8);
	}
	setRGB12(r4, g4, b4) {
		this.data = (r4 & BIT4_MASK) | ((g4 & BIT4_MASK) << 4) | ((b4 & BIT4_MASK) << 8);
	}
	setR8(r8) {
		this.setR4(ColorRGB12.to4bit(r8));
	}
	setG8(g8) {
		this.setG4(ColorRGB12.to4bit(g8));
	}
	setB8(b8) {
		this.setB4(ColorRGB12.to4bit(b8));
	}
	setRGB24(r8, g8, b8) {
		this.setR8(r8);
		this.setG8(g8);
		this.setB8(b8);
	}

	static to4bit(component8) {
		return Math.round(component8 / RESCALE_24TO12BIT) & BIT4_MASK
	}
	static to8bit(component4) {
		return Math.round(component4 * RESCALE_24TO12BIT);
	}

	static fromRGB12(r4, g4, b4) {
		const newColor = new this(0x0000);
		newColor.setRGB12(r4, g4, b4);
		return newColor;
	}

	static fromRGB24(r8, g8, b8) {
		const newColor = new this(0x0000);
		newColor.setR8(r8);
		newColor.setG8(g8);
		newColor.setB8(b8);
		return newColor;
	}
}


class PaletteNGPC extends Palette {
	static SIZE = 4;

	constructor(colors) {
		if (Array.isArray(colors) && colors.length === 4) {
			super(colors);
		} else {
			super([
				ColorRGB12.fromRGB24(240, 240, 240),
				ColorRGB12.fromRGB24(176, 176, 180),
				ColorRGB12.fromRGB24(80, 80, 88),
				ColorRGB12.fromRGB24(32, 32, 40)
			]);
		}
	}
}


class TileNGPC extends Tile {
	static import(rawData, defaultPalette) {
		if (!Array.isArray(rawData) || rawData.length !== 16)
			throw new Error('invalid NGPC tile data');

		let readOffset = 0;
		const pixels = new Array(8);
		for (let y = 0; y < 8; y++) {
			pixels[y] = new Array(8);
			for (let x = 0; x < 4; x++) {
				const bit0 = (rawData[readOffset] >> (7 - x*2)) & 0x01;
				const bit1 = (rawData[readOffset] >> (7 - x*2 - 1)) & 0x01;

				pixels[y][x+4] = (bit1 << 1) | bit0;
			}
			readOffset++;

			for (let x2 = 0; x2 < 4; x2++) {
				const bit0 = (rawData[readOffset] >> (7 - x2*2)) & 0x01;
				const bit1 = (rawData[readOffset] >> (7 - x2*2 - 1)) & 0x01;

				pixels[y][x2+0] = (bit1 << 1) | bit0;
			}
			readOffset++;
		}
		if (!defaultPalette)
			defaultPalette = new PaletteNGPC();
		return new this(pixels, defaultPalette);
	}

	export() {
		let writeOffset = 0;
		const data = new Array(16);
		for (let y = 0; y < 8; y++) {
			let byte0 = 0x00;
			for (let x = 0; x < 4; x++) {
				const colorIndex = this.getPixel(x, y);
				byte0 |= (colorIndex >> 1) << (7 - x*2);
				byte0 |= (colorIndex & 0x01) << (7 - x*2 - 1);
			}

			let byte1 = 0x00;
			for (let x2 = 0; x2 < 4; x2++) {
				const colorIndex = this.getPixel(x2 + 4, y);
				byte1 |= (colorIndex >> 1) << (7 - x2*2);
				byte1 |= (colorIndex & 0x01) << (7 - x2*2 - 1);
			}

			data[writeOffset++] = byte1;
			data[writeOffset++] = byte0;
		}
		return data;
	}
}

const ConsoleGraphicsNGPC = {
	Color: ColorRGB12,
	Palette: PaletteNGPC,
	Tile: TileNGPC,
	Map: null
}







/**
	@author Markus Ekholm
	@copyright 2012-2023 (c) Markus Ekholm <markus at botten dot org >
	@license Copyright (c) 2012-2023, Markus Ekholm
	All rights reserved.
	Redistribution and use in source and binary forms, with or without
	modification, are permitted provided that the following conditions are met:
	 * Redistributions of source code must retain the above copyright
		 notice, this list of conditions and the following disclaimer.
	 * Redistributions in binary form must reproduce the above copyright
		 notice, this list of conditions and the following disclaimer in the
		 documentation and/or other materials provided with the distribution.
	 * Neither the name of the author nor the
		 names of its contributors may be used to endorse or promote products
		 derived from this software without specific prior written permission.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
	ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	DISCLAIMED. IN NO EVENT SHALL MARKUS EKHOLM BE LIABLE FOR ANY
	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var rgbaToLab=function(a,b){b=normalize(b||{R:255,G:255,B:255}),a=normalize(a);let d=a;return void 0!==a.A&&(d={R:b.R+(a.R-b.R)*a.A,G:b.G+(a.G-b.G)*a.A,B:b.B+(a.B-b.B)*a.A}),xyzToLab(rgbToXyz(d))},rgbToXyz=function(a){let b=a.R/255,c=a.G/255,d=a.B/255;.04045<b?b=Math.pow((b+.055)/1.055,2.4):b/=12.92,.04045<c?c=Math.pow((c+.055)/1.055,2.4):c/=12.92,.04045<d?d=Math.pow((d+.055)/1.055,2.4):d/=12.92,b*=100,c*=100,d*=100;const e=.4124*b+.3576*c+.1805*d,f=.2126*b+.7152*c+.0722*d,g=.0193*b+.1192*c+.9505*d;return{X:e,Y:f,Z:g}},xyzToLab=function(d){let c=d.Y/100,e=d.Z/108.883,f=d.X/95.047;f=.008856<f?Math.pow(f,1/3):7.787*f+16/116,c=.008856<c?Math.pow(c,1/3):7.787*c+16/116,e=.008856<e?Math.pow(e,1/3):7.787*e+16/116;const g=116*c-16,h=500*(f-c),a=200*(c-e);return{L:g,a:h,b:a}},normalize=function(d){let c,e,f,h;"R"in d?(c=d.R,e=d.G,f=d.B,h=d.A):(c=d.r,e=d.g,f=d.b,h=d.a);const i={R:c,G:e,B:f};return void 0!==h&&(i.A=h),i},degrees=function(a){return a*(180/Math.PI)},radians=function(a){return a*(Math.PI/180)},hpF=function(a,b){if(0===a&&0===b)return 0;else{const c=degrees(Math.atan2(a,b));return 0<=c?c:c+360}},dhpF=function(a,b,c,d){if(0==a*b)return 0;if(180>=Math.abs(d-c))return d-c;if(180<d-c)return d-c-360;if(-180>d-c)return d-c+360;throw new Error},aHpF=function(a,b,c,d){if(0==a*b)return c+d;if(180>=Math.abs(c-d))return(c+d)/2;if(180<Math.abs(c-d)&&360>c+d)return(c+d+360)/2;if(180<Math.abs(c-d)&&360<=c+d)return(c+d-360)/2;throw new Error};const ciede2000=function(a,b,c){("R"in a||"r"in a)&&(a=rgbaToLab(a,c)),("R"in b||"r"in b)&&(b=rgbaToLab(b,c));const d=a.L,e=a.a,f=a.b,g=b.L,h=b.a,i=b.b,j=1,k=1,l=Math.sqrt(Math.pow(e,2)+Math.pow(f,2)),m=Math.sqrt(Math.pow(h,2)+Math.pow(i,2)),n=(l+m)/2,o=.5*(1-Math.sqrt(Math.pow(n,7)/(Math.pow(n,7)+Math.pow(25,7)))),p=(1+o)*e,q=(1+o)*h,r=Math.sqrt(Math.pow(p,2)+Math.pow(f,2)),s=Math.sqrt(Math.pow(q,2)+Math.pow(i,2)),t=hpF(f,p),u=hpF(i,q),v=s-r,w=dhpF(l,m,t,u),x=2*Math.sqrt(r*s)*Math.sin(radians(w)/2),y=(d+g)/2,z=(r+s)/2,A=aHpF(l,m,t,u),B=1-.17*Math.cos(radians(A-30))+.24*Math.cos(radians(2*A))+.32*Math.cos(radians(3*A+6))-.2*Math.cos(radians(4*A-63)),C=30*Math.exp(-Math.pow((A-275)/25,2)),D=Math.sqrt(Math.pow(z,7)/(Math.pow(z,7)+Math.pow(25,7))),E=1+.015*Math.pow(y-50,2)/Math.sqrt(20+Math.pow(y-50,2)),F=1+.045*z,G=1+.015*z*B,H=-2*D*Math.sin(radians(2*C)),I=Math.sqrt(Math.pow((g-d)/(E*1),2)+Math.pow(v/(F*j),2)+Math.pow(x/(G*k),2)+H*(v/(F*j))*(x/(G*k)));return I},_closestPair=function(a){let b={color1:null,color1Index:-1,color2:null,color2Index:-1,diff:null};for(let c=0;c<a.length;c++){const d=a[c];for(let e=c+1;e<a.length;e++){const f=a[e],g=ciede2000(d,f);g&&(!b.color1||g<b.diff)&&(b.color1=d,b.color1Index=c,b.color2=f,b.color2Index=e,b.diff=g)}}return b};