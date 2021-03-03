//stage 0 is to place all the pieces together, stage 1 is to rotate the pieces
let jigsawStage = 0;

// the arrays for all the jigsaw puzzle pieces
let topLeft = [];
let topRight = [];
let downLeft = [];
let downRight = [];
let downMiddle = [];

let clock;
let antiClock;

//the initial values for the presenting puzzle pieces
let topLeftNum = 1;
let topRightNum = 3;
let downLeftNum = 2;
let downRightNum = 3;
let downMiddleNum = 0;

let wholeLogo;

let width = 700;
let height = 700;

function setup() {
  
  createCanvas(width, height);
  
  topLeft[0] = loadImage('/Assets/fish4-1.png');
  topLeft[1] = loadImage('/Assets/fish4-2.png');
  topLeft[2] = loadImage('/Assets/fish4-3.png');
  topLeft[3] = loadImage('/Assets/fish4-4.png');
  
  topRight[0] = loadImage('/Assets/fish1-1.png');
  topRight[1] = loadImage('/Assets/fish1-2.png');
  topRight[2] = loadImage('/Assets/fish1-3.png');
  topRight[3] = loadImage('/Assets/fish1-4.png');
  
  downLeft[0] = loadImage('/Assets/fish5-1.png');
  downLeft[1] = loadImage('/Assets/fish5-2.png');
  downLeft[2] = loadImage('/Assets/fish5-3.png');
  downLeft[3] = loadImage('/Assets/fish5-4.png');
  
  downMiddle[0] = loadImage('/Assets/fish3-1.png');
  downMiddle[1] = loadImage('/Assets/fish3-2.png');
  downMiddle[2] = loadImage('/Assets/fish3-3.png');
  downMiddle[3] = loadImage('/Assets/fish3-4.png');
  
  downRight[0] = loadImage('/Assets/fish2-1.png');
  downRight[1] = loadImage('/Assets/fish2-2.png');
  downRight[2] = loadImage('/Assets/fish2-3.png');
  downRight[3] = loadImage('/Assets/fish2-4.png');
  
  clock = loadImage('/Assets/clock.png');
  antiClock = loadImage('/Assets/antiClock.png');
}

function draw() {
  background(220);
  
  if (jigsawStage == 0){
    imageMode(CENTER);
    image(topLeft[topLeftNum], width / 2, height / 2);
    image(topRight[topRightNum], width / 2, height / 2);
    image(downLeft[downLeftNum], width / 2, height / 2);
    image(downRight[downRightNum], width / 2, height / 2);
    image(downMiddle[downMiddleNum], width / 2, height / 2);
    
    //top left buttons
    image(clock, width/5, height/10, width/15, width/15);
    image(antiClock, width/10*3, height/10,  width/15, width/15);
    
    //top right buttons
    image(clock, width/10*6, height/10, width/15, width/15);
    image(antiClock, width/10*7, height/10,  width/15, width/15);
    
    //down left buttons
    image(clock, width/10, height/10*6, width/15, width/15);
    image(antiClock, width/10, height/10*7,  width/15, width/15);
    
    //down right buttons
    image(clock, width/10*9, height/10*6, width/15, width/15);
    image(antiClock, width/10*9, height/10*7,  width/15, width/15);
    
    //down middle buttons
    image(clock, width/10*4, height/10*9, width/15, width/15);
    image(antiClock, width/10*5, height/10*9,  width/15, width/15);
  }

}

function mousePressed(){
  
  console.log(mouseX);
  console.log(mouseY);
  
  // top left clock-wise
  if (dist(mouseX, mouseY, width/5, height/10) < (width / 30)){
    topLeftNum++;
    if (topLeftNum>3){
      topLeftNum = 0;
    }
    console.log(topLeftNum);
  }
  
  // top left anti-clock-wise
  if (dist(mouseX, mouseY, width/10*3, height/10) < (width / 30)){
    topLeftNum--;
    if (topLeftNum<0){
      topLeftNum = 3;
    }
    console.log(topLeftNum);
  }
  
  // top right clock-wise
  if (dist(mouseX, mouseY, width/10*6, height/10) < (width / 30)){
    topRightNum++;
    if (topRightNum>3){
      topRightNum = 0;
    }
    console.log(topRightNum);
  }
  
  // top right anti-clock-wise
  if (dist(mouseX, mouseY, width/10*7, height/10) < (width / 30)){
    topRightNum--;
    if (topRightNum<0){
      topRightNum = 3;
    }
    console.log(topRightNum);
  }
  
  // down left clock-wise
  if (dist(mouseX, mouseY, width/10, height/10*6) < (width / 30)){
    downLeftNum++;
    if (downLeftNum>3){
      downLeftNum = 0;
    }
    console.log(downLeftNum);
  }
  
  // down left anti-clock-wise
  if (dist(mouseX, mouseY, width/10, height/10*7) < (width / 30)){
    downLeftNum--;
    if (downLeftNum<0){
      downLeftNum = 3;
    }
    console.log(downLeftNum);
  }
  
  // down right clock-wise
  if (dist(mouseX, mouseY, width/10*9, height/10*6) < (width / 30)){
    downRightNum++;
    if (downRightNum>3){
      downRightNum = 0;
    }
    console.log(downRightNum);
  }
  
  // down right anti-clock-wise
  if (dist(mouseX, mouseY, width/10*9, height/10*7) < (width / 30)){
    downRightNum--;
    if (downRightNum<0){
      downRightNum = 3;
    }
    console.log(downRightNum);
  }
  
  // down middle clock-wise
  if (dist(mouseX, mouseY, width/10*4, height/10*9) < (width / 30)){
    downMiddleNum++;
    if (downMiddleNum>3){
      downMiddleNum = 0;
    }
    console.log(downMiddleNum);
  }
  
  // down right anti-clock-wise
  if (dist(mouseX, mouseY, width/10*5, height/10*9) < (width / 30)){
    downMiddleNum--;
    if (downMiddleNum<0){
      downMiddleNum = 3;
    }
    console.log(downMiddleNum);
  }
}