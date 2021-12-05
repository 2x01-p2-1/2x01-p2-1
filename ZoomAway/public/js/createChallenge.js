/*-------------------------------------
|Game object for Creating a Challennge|
-------------------------------------*/
let newChallenge = new Game("game-container-1", mazes[0]);
let tiles = newChallenge.populateMap();
newChallenge.sizeUp();
setAttr(tiles);


// Onchange at the x and y axis input
function updateCarPos() {
    xcar = document.getElementById('x-car').value;
    ycar = document.getElementById('y-car').value;
    if (xcar != 0 && ycar != 0) {
        newChallenge.car.x = xcar-1;
        newChallenge.car.y = ycar-1;
        newChallenge.placeSprite("car");
    }
}
function updateDestPos() {
    xdest = document.getElementById('x-dest').value;
    ydest = document.getElementById('y-dest').value;
    if (xdest != 0 && ydest != 0) {
        newChallenge.goal.x = xdest-1;
        newChallenge.goal.y = ydest-1;
        newChallenge.placeSprite("goal");
    }
}

// Onclick Create Button 
function createBtn() {
    let map = [];
    map = convert2DMap();
    alert('created');
    for (var i = 0; i < 5; i++) {
        for (var i = 0; i < 5; i++) {
            console.log(map[i]);
        }
    }
}

