// the visualization of all code numbers
let number1_1;
let number1_2;
let number1_3;
let number1_4;
let number1_5;
let number1_6;
let number1_7;
let number1_8;
let number1_9;
let number2_1;
let number2_2;
let number2_3;
let number2_4;
let number2_5;
let number2_6;
let number2_7;
let number2_8;
let number2_9;
let number3_1;
let number3_2;
let number3_3;
let number3_4;
let number3_5;
let number3_6;
let number3_7;
let number3_8;
let number3_9;
let number4_1;
let number4_2;
let number4_3;
let number4_4;
let number4_5;
let number4_6;
let number4_7;
let number4_8;
let number4_9;

let safeBox;
let codePad;
let safeBoxOpen;

let status = 0;

let width = 600;
let height = 600;

let code = [-1, -1, -1, -1];


function preload(){
  safeBox = loadImage('/Assets/safeBox.jpeg');
  codePad = loadImage('/Assets/newCodePad.jpeg');
  safeBoxOpen = loadImage('/Assets/safeBoxOpen.jpeg');
  
  number1_1 = loadImage('/Assets/1-1.png');
  number1_2 = loadImage('/Assets/1-2.png');
  number1_3 = loadImage('/Assets/1-3.png');
  number1_4 = loadImage('/Assets/1-4.png');
  number1_5 = loadImage('/Assets/1-5.png');
  number1_6 = loadImage('/Assets/1-6.png');
  number1_7 = loadImage('/Assets/1-7.png');
  number1_8 = loadImage('/Assets/1-8.png');
  number1_9 = loadImage('/Assets/1-9.png');
  
  number2_1 = loadImage('/Assets/2-1.png');
  number2_2 = loadImage('/Assets/2-2.png');
  number2_3 = loadImage('/Assets/2-3.png');
  number2_4 = loadImage('/Assets/2-4.png');
  number2_5 = loadImage('/Assets/2-5.png');
  number2_6 = loadImage('/Assets/2-6.png');
  number2_7 = loadImage('/Assets/2-7.png');
  number2_8 = loadImage('/Assets/2-8.png');
  number2_9 = loadImage('/Assets/2-9.png');
  
  number3_1 = loadImage('/Assets/3-1.png');
  number3_2 = loadImage('/Assets/3-2.png');
  number3_3 = loadImage('/Assets/3-3.png');
  number3_4 = loadImage('/Assets/3-4.png');
  number3_5 = loadImage('/Assets/3-5.png');
  number3_6 = loadImage('/Assets/3-6.png');
  number3_7 = loadImage('/Assets/3-7.png');
  number3_8 = loadImage('/Assets/3-8.png');
  number3_9 = loadImage('/Assets/3-9.png');
  
  number4_1 = loadImage('/Assets/4-1.png');
  number4_2 = loadImage('/Assets/4-2.png');
  number4_3 = loadImage('/Assets/4-3.png');
  number4_4 = loadImage('/Assets/4-4.png');
  number4_5 = loadImage('/Assets/4-5.png');
  number4_6 = loadImage('/Assets/4-6.png');
  number4_7 = loadImage('/Assets/4-7.png');
  number4_8 = loadImage('/Assets/4-8.png');
  number4_9 = loadImage('/Assets/4-9.png');
}

function setup() {
  createCanvas(width, height);
}

function draw() {
  
  if (status == 0){
    image(safeBox, 0, 0, width, height);
  } else if (status == 1){
    image(codePad, 0, 0, width, height);
    
    // the first digit
    if (code[0] == 1){
      image(number1_1, 0, 0, width, height);
    }
    if (code[0] == 2){
      image(number1_2, 0, 0, width, height);
    }
    if (code[0] == 3){
      image(number1_3, 0, 0, width, height);
    }
    if (code[0] == 4){
      image(number1_4, 0, 0, width, height);
    }
    if (code[0] == 5){
      image(number1_5, 0, 0, width, height);
    }
    if (code[0] == 6){
      image(number1_6, 0, 0, width, height);
    }
    if (code[0] == 7){
      image(number1_7, 0, 0, width, height);
    }
    if (code[0] == 8){
      image(number1_8, 0, 0, width, height);
    }
    if (code[0] == 9){
      image(number1_9, 0, 0, width, height);
    }
    
    // the second digit
    if (code[1] == 1){
      image(number2_1, 0, 0, width, height);
    }
    if (code[1] == 2){
      image(number2_2, 0, 0, width, height);
    }
    if (code[1] == 3){
      image(number2_3, 0, 0, width, height);
    }
    if (code[1] == 4){
      image(number2_4, 0, 0, width, height);
    }
    if (code[1] == 5){
      image(number2_5, 0, 0, width, height);
    }
    if (code[1] == 6){
      image(number2_6, 0, 0, width, height);
    }
    if (code[1] == 7){
      image(number2_7, 0, 0, width, height);
    }
    if (code[1] == 8){
      image(number2_8, 0, 0, width, height);
    }
    if (code[1] == 9){
      image(number2_9, 0, 0, width, height);
    }
    
    // the third digit
    if (code[2] == 1){
      image(number3_1, 0, 0, width, height);
    }
    if (code[2] == 2){
      image(number3_2, 0, 0, width, height);
    }
    if (code[2] == 3){
      image(number3_3, 0, 0, width, height);
    }
    if (code[2] == 4){
      image(number3_4, 0, 0, width, height);
    }
    if (code[2] == 5){
      image(number3_5, 0, 0, width, height);
    }
    if (code[2] == 6){
      image(number3_6, 0, 0, width, height);
    }
    if (code[2] == 7){
      image(number3_7, 0, 0, width, height);
    }
    if (code[2] == 8){
      image(number3_8, 0, 0, width, height);
    }
    if (code[2] == 9){
      image(number3_9, 0, 0, width, height);
    }
    
    // the fourth digit
    if (code[3] == 1){
      image(number4_1, 0, 0, width, height);
    }
    if (code[3] == 2){
      image(number4_2, 0, 0, width, height);
    }
    if (code[3] == 3){
      image(number4_3, 0, 0, width, height);
    }
    if (code[3] == 4){
      image(number4_4, 0, 0, width, height);
    }
    if (code[3] == 5){
      image(number4_5, 0, 0, width, height);
    }
    if (code[3] == 6){
      image(number4_6, 0, 0, width, height);
    }
    if (code[3] == 7){
      image(number4_7, 0, 0, width, height);
    }
    if (code[3] == 8){
      image(number4_8, 0, 0, width, height);
    }
    if (code[3] == 9){
      image(number4_9, 0, 0, width, height);
    } 
  } else if (status == 2){
      image(safeBoxOpen, 0, 0, width, height);
  }
}

function mousePressed(){
  console.log(mouseX, mouseY);
  console.log(code);
  
  if (status == 0){
    if (dist(mouseX, mouseY, 37/60 * width, 7/15 * width) < 50){
      status = 1;
      code[0] = -1;
    }
    
  } else if (status == 1){
    if (code[0] == -1){
      if (dist(mouseX, mouseY, 7/24 * width, 1/2 * width) < 20){
        code[0] = 1;

      }
      if (dist(mouseX, mouseY, 9/20 * width, 1/2 * width) < 20){
        code[0] = 2;
      }
      if (dist(mouseX, mouseY, 3/5 * width, 1/2 * width) < 20){
        code[0] = 3;
      }
      if (dist(mouseX, mouseY, 7/24 * width, 2/3 * width) < 20){
        code[0] = 4;
      }
      if (dist(mouseX, mouseY, 9/20 * width, 2/3 * width) < 20){
        code[0] = 5;
      }
      if (dist(mouseX, mouseY, 3/5 * width, 2/3 * height) < 20){
        code[0] = 6;
      }
      if (dist(mouseX, mouseY, 7/24 * width, 49/60 * height) < 20){
        code[0] = 7;
      }
      if (dist(mouseX, mouseY, 9/20 * width, 49/60 * height) < 20){
        code[0] = 8;
      }
      if (dist(mouseX, mouseY, 3/5 * width, 49/60 * height) < 20){
        code[0] = 9;
      }
    } else if (code[1] == -1){
      if (dist(mouseX, mouseY, 7/24 * width, 1/2 * width) < 20){
        code[1] = 1;
      }
      if (dist(mouseX, mouseY, 9/20 * width, 1/2 * width) < 20){
        code[1] = 2;
      }
      if (dist(mouseX, mouseY, 3/5 * width, 1/2 * width) < 20){
        code[1] = 3;
      }
      if (dist(mouseX, mouseY, 7/24 * width, 2/3 * height) < 20){
        code[1] = 4;
      }
      if (dist(mouseX, mouseY, 9/20 * width, 2/3 * height) < 20){
        code[1] = 5;
      }
      if (dist(mouseX, mouseY, 3/5 * width, 2/3 * height) < 20){
        code[1] = 6;
      }
      if (dist(mouseX, mouseY, 7/24 * width, 49/60 * height) < 20){
        code[1] = 7;
      }
      if (dist(mouseX, mouseY, 9/20 * width, 49/60 * height) < 20){
        code[1] = 8;
      }
      if (dist(mouseX, mouseY, 3/5 * width, 49/60 * height) < 20){
        code[1] = 9;
      }
    } else if (code[2] == -1){
      if (dist(mouseX, mouseY, 7/24 * width, 1/2 * height) < 20){
        code[2] = 1;
      }
      if (dist(mouseX, mouseY, 9/20 * width, 1/2 * height) < 20){
        code[2] = 2;
      }
      if (dist(mouseX, mouseY, 3/5 * width, 1/2 * height) < 20){
        code[2] = 3;
      }
      if (dist(mouseX, mouseY, 7/24 * width, 2/3 * height) < 20){
        code[2] = 4;
      }
      if (dist(mouseX, mouseY, 9/20 * width, 2/3 * height) < 20){
        code[2] = 5;
      }
      if (dist(mouseX, mouseY, 3/5 * width, 2/3 * height) < 20){
        code[2] = 6;
      }
      if (dist(mouseX, mouseY, 7/24 * width, 49/60 * height) < 20){
        code[2] = 7;
      }
      if (dist(mouseX, mouseY, 9/20 * width, 49/60 * height) < 20){
        code[2] = 8;
      }
      if (dist(mouseX, mouseY, 3/5 * width, 49/60 * height) < 20){
        code[2] = 9;
      }
    } else if (code[3] == -1){
      if (dist(mouseX, mouseY, 7/24 * width, 1/2 * height) < 20){
        code[3] = 1;
      }
      if (dist(mouseX, mouseY, 9/20 * width, 1/2 * height) < 20){
        code[3] = 2;
      }
      if (dist(mouseX, mouseY, 3/5 * width, 1/2 * height) < 20){
        code[3] = 3;
      }
      if (dist(mouseX, mouseY, 7/24 * width, 2/3 * height) < 20){
        code[3] = 4;
      }
      if (dist(mouseX, mouseY, 9/20 * width, 2/3 * height) < 20){
        code[3] = 5;
      }
      if (dist(mouseX, mouseY, 3/5 * width, 2/3 * height) < 20){
        code[3] = 6;
      }
      if (dist(mouseX, mouseY, 7/24 * width, 49/60 * height) < 20){
        code[3] = 7;
      }
      if (dist(mouseX, mouseY, 9/20 * width, 49/60 * height) < 20){
        code[3] = 8;
      }
      if (dist(mouseX, mouseY, 3/5 * width, 49/60 * height) < 20){
        code[3] = 9;
      }
    } else if (dist(mouseX, mouseY, 3/4 * width, 19/24 * height) < 50) {
      if (code[0] == 5 && code[1] == 7 && code[2] == 1 && code[3] == 4){
        status = 2;
      } else {
        status = 1;
        code = [-1, -1, -1, -1];
      }
    }
  }
  
  
}