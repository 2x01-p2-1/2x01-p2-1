/*---------------------------------
|All functions related to the maze|
----------------------------------*/

// Stores a maze for each challenges
let mazes = [];
let floorArr = [];

// Initialise and declare maze variables [Wall = 1; Path = 0]
// Template for create challenge maze
mazes[0] = {
  map: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
  ],
  car: {
      x: 10,
      y: 10,
  },
  goal: {
      x: 10,
      y: 10,
  },
  theme: "default",
};


//  Creates a Game object using specified id and maze number
function Game(id, maze) {
  this.el = document.getElementById(id);
  this.tileTypes = ["floor", "wall"];
  this.tileDim = 64;
  // Inherit the maze's properties: map, car position, goal position
  this.map = maze.map;
  this.theme = maze.theme;
  this.car = { ...maze.car };
  this.goal = { ...maze.goal };
  this.car.el = null;
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
      // Add to tile layer
      tiles.appendChild(tile);
    }
  }
  return tiles;
};

// Function that place sprite based on the specified x and y values of the car and goal
Game.prototype.placeSprite = function (type) {
  // To get the x and y value of the Car or Goal
  let x = this[type].x;
  let y = this[type].y;
  // Go to createEl function to craete a sprite
  let sprite = this.createEl(x, y, type);
  // Set an id to car or goal for the div element 
  sprite.id = type;
  sprite.style.borderRadius = this.tileDim + "px";
  let layer = document.getElementById("sprites");
  // Add to sprite layer
  layer.appendChild(sprite);
  return sprite;
};

// Create div element for the tiles and sprites with dimensions 
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

// Set the ID from 1-25 and onclick button for each tile
function setAttr (tiles) {
  for (var i = 0; i < 25; i++) {
    let tile = tiles.childNodes[i];
    tile.id = i+1;
    tile.setAttribute("onclick", "tilesBtn(this.id)");
  }
}

// Onclick button for each tile
function tilesBtn(id) {
  if (document.getElementById(id).className == 'wall') {
    document.getElementById(id).className = 'floor';
    floorArr.push(id)
  } else {
    document.getElementById(id).className = 'wall';
    floorArr = floorArr.filter(item => item !== id)
  } 
  console.log(floorArr);
}

// Convert to Map 2D Array (5x5)
function convert2DMap() {
  mapArr = new Array(5); //cols
  // Loop to create 2D map array using 1D array
  for (var i = 0; i < 5; i++) {
    mapArr[i] = new Array(5); //rows
  }
  // Loop to initialize map array elements from 1-25 id
  var num = 1;
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      mapArr[i][j] = num++;
    }
  }
  // Match floorArr ids with the mapArr, if same, set to 0
  for (var i = 0; i < mapArr.length; i++) {
    // Current array from array of mapArr, which is array to search  
    let curArr_to_be_searched = mapArr[i];
    for (var j = 0; j < curArr_to_be_searched.length; j++) {
      for (var k = 0; k < floorArr.length; k++) {
        if (curArr_to_be_searched[j] == floorArr[k]) {
          curArr_to_be_searched[j] = 0;
          break;
        } 
      };
    }
  }
  // Set non zero to 1
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      if (mapArr[i][j] != 0) {
        mapArr[i][j] = 1;
      }
    }
  }
  return mapArr;
}