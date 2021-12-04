// Stores a maze for each challenges
let mazes = [];

// Initialise and declare maze variables
// Wall = 1; Path = 0
mazes[0] = {
  map: [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ],
  player: {
    x: 0,
    y: 0,
  },
  goal: {
    x: 0,
    y: 4,
  },
  theme: "default",
};

//  Creates a Game object using specified id and maze number.
//  @param {string} id
//  @param {number} maze
function Game(id, maze) {
  this.el = document.getElementById(id);
  this.tileTypes = ["floor", "wall"];
  this.tileDim = 64;
  // Inherit the maze's properties: map, player position, goal position
  this.map = maze.map;
  this.theme = maze.theme;
  this.player = { ...maze.player };
  this.goal = { ...maze.goal };
  this.player.el = null;
}

// Function that populates the grid based on the 2d array of the specified maze
Game.prototype.populateMap = function () {
  this.el.className = "game-container " + this.theme;
  let tiles = document.getElementById("tiles");
  // To iterate through the map array
  for (var y = 0; y < this.map.length; ++y) {
    for (var x = 0; x < this.map[y].length; ++x) {
      // Get either 1 or 0 at each position to determine is a Floor or Wall
      let tileCode = this.map[y][x];
      let tileType = this.tileTypes[tileCode];
      // Go to createEl function to create a tile
      let tile = this.createEl(x, y, tileType);
      tile.addEventListener('click', function () {
        if (tile.className == 'wall') {
          tile.className = 'floor';
        }
      })
      // Add to tile layer
      tiles.appendChild(tile);
    }
  }
  setID(tiles);
  return tiles;
};

// Function that place sprite based on the specified x and y values of the player and goal
// @param {string} type [Player or Goal]
// @returns divElement
Game.prototype.placeSprite = function (type) {
  // To get the x and y value of the Player or Goal
  let x = this[type].x;
  let y = this[type].y;
  // Go to createEl function to craete a sprite
  let sprite = this.createEl(x, y, type);
  // Set an id to player or goal for the div element 
  sprite.id = type;
  sprite.style.borderRadius = this.tileDim + "px";
  let layer = document.getElementById("sprites");
  // Add to sprite layer
  layer.appendChild(sprite);
  return sprite;
};

// Create div element for the tiles and sprites with dimensions 
// @param {number} x
// @param {number} y
// @param {string} type 
// @returns divElement
Game.prototype.createEl = function (x, y, type) {
  let el = document.createElement("div");
  el.className = type;
  el.style.width = el.style.height = this.tileDim + "px";
  // Set left positions based on x coordinate
  el.style.left = x * this.tileDim + "px";
  // Set top position based on y coordinate
  el.style.top = y * this.tileDim + "px";
  return el;
};

// To fix the layout of the maze
Game.prototype.sizeUp = function() {
  let map  = this.el.querySelector('.game-map');
  map.style.height = this.map.length * this.tileDim + 'px';
  map.style.width = this.map[0].length * this.tileDim + 'px';
};

// Set the ID for each tile from 0-24
function setID (tiles) {
  for (var i = 0; i < 25; i++) {
    let tile = tiles.childNodes[i];
    tile.id = i;
  }
}

// Main 
function init() {
  let challenge = new Game("game-container-1", mazes[0]);
  let tiles = challenge.populateMap();
  challenge.sizeUp();
  challenge.placeSprite("goal");
  let playerSprite = challenge.placeSprite("player");
  challenge.player.el = playerSprite;
}

init();
