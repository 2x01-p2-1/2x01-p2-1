// Stores different levels of challenges
let levels = [];

levels[0] = {
  map: [
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0],
  ],
  player: {
    x: 0,
    y: 4,
  },
  goal: {
    x: 4,
    y: 1,
  },
  theme: "default",
};
/**
 * Creates a Game object using specified id and level number.
 *
 * @param {string} id
 * @param {number} level
 */
function Game(id, level) {
  this.el = document.getElementById(id);

  this.tileTypes = ["floor", "wall"];

  this.tileDim = 64;

  // inherit the level's properties: map, player start, goal start.
  this.map = level.map;
  this.theme = level.theme;
  this.player = { ...level.player };
  this.goal = { ...level.goal };
}
/**
 * Function that populates the grid based on the 2d array of the specified level.
 */
Game.prototype.populateMap = function () {
  this.el.className = "game-container " + this.theme;

  let tiles = document.getElementById("tiles");

  for (var y = 0; y < this.map.length; ++y) {
    for (var x = 0; x < this.map[y].length; ++x) {
      let tileCode = this.map[y][x];

      let tileType = this.tileTypes[tileCode];

      let tile = this.createEl(x, y, tileType);

      tiles.appendChild(tile); // add to tile layer
    }
  }
};
/**
 * Assign the appropriate css class names for each tile to represent either the floor or the wall.
 *
 * @param {number} x
 * @param {number} y
 * @param {string} type
 * @returns divElement
 */
Game.prototype.createEl = function (x, y, type) {
  // create one tile.
  let el = document.createElement("div");

  // two class names: one for tile, one or the tile type.
  el.className = type;

  // set width and height of tile based on the passed-in dimensions.
  el.style.width = el.style.height = this.tileDim + "px";

  // set left positions based on x coordinate.
  el.style.left = x * this.tileDim + "px";

  // set top position based on y coordinate.
  el.style.top = y * this.tileDim + "px";

  return el;
};

/**
 * Assigns the appropriate css class names for each sprite to represent either the player or the goal.
 *
 * @param {string} type
 * @returns divElement
 */
Game.prototype.placeSprite = function (type) {
  // syntactic sugar
  let x = this[type].x;

  let y = this[type].y;

  // reuse the createTile function
  let sprite = this.createEl(x, y, type);

  sprite.id = type;

  // set the border radius of the sprite.
  sprite.style.borderRadius = this.tileDim + "px";

  // get half the difference between tile and sprite.

  // grab the layer
  let layer = this.el.querySelector("#sprites");

  layer.appendChild(sprite);

  return sprite;
};

/* initialization */

function init() {
  let myGame = new Game("game-container-1", levels[0]);

  myGame.populateMap();

  myGame.placeSprite("goal");

  let playerSprite = myGame.placeSprite("player");

  myGame.player.el = playerSprite;
}

init();
