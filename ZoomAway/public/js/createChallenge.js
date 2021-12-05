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
        newChallenge.car.x = xcar - 1;
        newChallenge.car.y = ycar - 1;
        newChallenge.placeSprite("car");
    }
}

function updateDestPos() {
    xdest = document.getElementById('x-dest').value;
    ydest = document.getElementById('y-dest').value;
    if (xdest != 0 && ydest != 0) {
        newChallenge.goal.x = xdest - 1;
        newChallenge.goal.y = ydest - 1;
        newChallenge.placeSprite("goal");
    }
}

// Onclick Create Button 
async function createBtn() {
    let map = [];
    map = convert2DMap();
    console.log(map)
    var newChallenge = {
        challengeName: $('#challenge-name').val(),
        instruction: $('#instruction').val(),
        command: $('#command').val(),
        maze: {
            firstRow: map[0],
            secondRow: map[1],
            thirdRow: map[2],
            fourthRow: map[3],
            fifthRow: map[4],
            startPoint: {
                x: $('#x-car').val(),
                y: $('#y-car').val()
            },
            endPoint: {
                x: $('#x-dest').val(),
                y: $('#y-dest').val()
            }
        }
    }
    Swal.fire({
        text: "Loading...",
        imageUrl: "https://www.boasnotas.com/img/loading2.gif",
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false
    });
    try {
        const result=await axios.post('/challenges/', newChallenge)
        console.log(result)
        Swal.close()
        Swal.fire({
            title: "Success !",
            text: "Challenge Successfully Created",
            icon: "success"
        }).then(response=>{
            window.location.href="/admin/challengesDashboard"
        })
    } catch (err) {
        console.log(err.msg)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          }).then(response=>{
            location.reload();
          })
    }

}