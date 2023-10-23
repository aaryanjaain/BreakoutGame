const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;
const balldiameter = 20;
const boardwidth = 560;
const boardheight = 300;
const scoredisplay = document.getElementById("score");

let xDirection = -2;
let yDirection = 2;

const userstart = [230, 10];
let currentPosition = userstart;

const ballstart = [270, 40];
let ballcurrentposition = ballstart;
let timerid;
let score = 0;
class block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

const blocks = [
  new block(10, 270),
  new block(120, 270),
  new block(230, 270),
  new block(340, 270),
  new block(450, 270),
  new block(10, 240),
  new block(120, 240),
  new block(120, 240),
  new block(230, 240),
  new block(340, 240),
  new block(450, 240),
  new block(10, 210),
  new block(120, 210),
  new block(230, 210),
  new block(340, 210),
  new block(450, 210),
];

function addblocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}
addblocks();
//adding user
const user = document.createElement("div");
user.classList.add("user");
drawuser();
grid.appendChild(user);

//draw user
function drawuser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

//draw ball
function drawball() {
  ball.style.left = ballcurrentposition[0] + "px";
  ball.style.bottom = ballcurrentposition[1] + "px";
}

//move user

function moveuser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawuser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < 460) {
        currentPosition[0] += 10;
        drawuser();
      }
      break;
  }
}

document.addEventListener("keydown", moveuser);

//add ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawball();
grid.appendChild(ball);
//move ball
function moveball() {
  ballcurrentposition[0] += xDirection;
  ballcurrentposition[1] += yDirection;
  drawball();
  checkforcollisions();
}
timerid = setInterval(moveball, 30);

//check for collisions
function checkforcollisions() {
  //colision with blocks
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballcurrentposition[0] > blocks[i].bottomLeft[0] &&
      ballcurrentposition[0] < blocks[i].bottomRight[0] &&
      ballcurrentposition[1] + balldiameter > blocks[i].bottomLeft[1] &&
      ballcurrentposition[1] < blocks[i].topLeft[1]
    ) {
      const allblocks = Array.from(document.querySelectorAll(".block"));
      allblocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changedirection();
      score++;
      scoredisplay.innerHTML = score;
      if (blocks.length === 0) {
        scoredisplay.innerHTML = 'you win'
        clearInterval(timerid)
        document.removeEventListener('keydown',moveuser)
      }
    }
  }

  //wall
  if (
    ballcurrentposition[0] >= boardwidth - balldiameter ||
    ballcurrentposition[1] >= boardheight - balldiameter ||
    ballcurrentposition[0] <= 0
  ) {
    changedirection();
  }
  //check for user collisions
  if (
    (ballcurrentposition[0] > currentPosition[0] &&
    ballcurrentposition[0] < currentPosition[0] + blockWidth) &&
    (ballcurrentposition[1] > currentPosition[1] &&
    ballcurrentposition[1] < currentPosition[1] + blockHeight)
  ) {
    changedirection();
  }
  //check for game over
  if (ballcurrentposition[1] <= 0) {
    clearInterval(timerid);
    scoredisplay.innerHTML = "You lose";
    document.removeEventListener("keydown", moveuser);
  }
}
function changedirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
