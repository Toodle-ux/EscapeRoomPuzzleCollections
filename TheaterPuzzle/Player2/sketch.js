// the current state of the puzzle
let state = -1;

let width = 1367;
let height = 600;

let shelf;
let stage;
let setBox;

let mom;
let dad;

let rose;
let lily;
let letter;
let letters;
let ring;
let toyBrick;
let bag;
let suitCase;
let beer;

let boxX = 75;
let boxY = 525;
let boxA = 75;

// variables for rose
let beerX = 135;
let beerY = 275;
let beerXStart = 135;
let beerYStart = 275;
let beerMove = false;

// variables for lilies
let lilyX = 250;
let lilyY = 275;
let lilyXStart = 250;
let lilyYStart = 275;
let lilyMove = false;

// variables for ring
let letterX = 135; 
let letterY = 400;
let letterXStart = 135;
let letterYStart = 400;
let letterMove = false;

let lettersX = 250;
let lettersY = 400;
let lettersXStart = 250;
let lettersYStart = 400;
let lettersMove = false;

let bagX = 250;
let bagY = 525;
let bagXStart = 250;
let bagYStart = 525;
let bagMove = false;

// variables to store videos
let video1;
let video2;
let video3;
let video4;
let video5;
let video6;
let video7;

// check if the video has been played
let video1play = false;
let video2play = false;
let video3play = false;
let video4play = false;
let video5play = false;
let video6play = false;
let video7play = false;

// check if the video has ended
let video1end = false;
let video2end = false;
let video3end = false;
let video4end = false;
let video5end = false;
let video6end = false;


// MQTT client details:
let broker = {
  //hostname: 'YOUR BROKER HERE',
  hostname: 'escaperoomtest2.cloud.shiftr.io', 
  port: 443
};
// MQTT client:
let client;
// client credentials:
let creds = {
  clientID: 'PaintingPuzzlePlayer2', // choose whatever name you want
  userName: 'escaperoomtest2', // shiftr example
  password: 'EscapeRoomTest2Token1' // shiftr example
  // userName: 'YOURUSERNAME', // name from acct
  // password: 'YOURSECRETKEY' // unique Secret from token
}
// topic to subscribe to when you connect:
let topic = 'TheaterPuzzle';

function preload(){
  rose = loadImage('/Assets/rose.png');
  lily = loadImage('/Assets/vase.png');
  ring = loadImage('/Assets/ring.png');
  toyBrick = loadImage('/Assets/toy.png');
  suitCase = loadImage('/Assets/suitcase.png');
  letter = loadImage('/Assets/letter.png');
  letters = loadImage('/Assets/camer.png');
  bag = loadImage('/Assets/suitcase.png');
  beer = loadImage('/Assets/beer.png');
  
  shelf = loadImage('/Assets/shelf.png');
  setBox = loadImage('/Assets/box.jpeg');
  stage = loadImage('/Assets/stageOnly.png');
  
  mom = loadImage('/Assets/mom.png');
  dad = loadImage('/Assets/dad.png');
  
  video1 = createVideo(['/Assets/Video1.mp4', '/Assets/Video1.webm']);
  video1.hide();
  
  video2 = createVideo(['/Assets/Video2.mp4', '/Assets/Video2.webm']);
  video2.hide();
  
  video3 = createVideo(['/Assets/Video3.mp4', '/Assets/Video3.webm']);
  video3.hide();
  
  video4 = createVideo(['/Assets/Video4.mp4', '/Assets/Video4.webm']);
  video4.hide();
  
  video5 = createVideo(['/Assets/Video5.mp4', '/Assets/Video5.webm']);
  video5.hide();
  
  video6 = createVideo(['/Assets/Video6.mp4', '/Assets/Video6.webm']);
  video6.hide();
  
  video7 = createVideo(['/Assets/Video7.mp4', '/Assets/Video7.webm']);
  video7.hide();
}

function setup() {
  createCanvas(width, height);

  // Create an MQTT client:
  client = new Paho.MQTT.Client(broker.hostname, Number(broker.port), creds.clientID);
  // set callback handlers for the client:
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  // connect to the MQTT broker:
  client.connect({
    onSuccess: onConnect, // callback function for when you connect
    userName: creds.userName, // username
    password: creds.password, // password
    useSSL: true // use SSL
  });
}

function draw() {
  background(0);
  imageMode(CORNER);
  image(shelf, 0, 200, 320, 400);
  image(setBox, 0, 500, 125, 100);
  //image(stage, 320, 0, 1067, 600);

  textSize(20);
  fill(255);
  text('The props for the actress', 10, 80);
  text('Drag the right prop into the box',10, 120);
  
  presentState();
  
  // if (dist(roseX, roseY, boxA, boxY) < boxA && !roseMove){
  //   if (state == 1){
  //     state = 2;
  //   } else {
  //     roseX = roseXStart;
  //     roseY = roseYStart;
  //   }
  // }
  
}

function mousePressed(){
  if (state == -1){
    state = 0;
  }
  
  if (dist(mouseX, mouseY, beerX, beerY) < 50){
    beerMove = true;
  }
  
  if (dist(mouseX, mouseY, lilyX, lilyY) < 50){
    lilyMove = true;
  }
  
  if (dist(mouseX, mouseY, lettersX, lettersY) < 50){
    lettersMove = true;
  }
  
  if (dist(mouseX, mouseY, bagX, bagY) < 50){
    bagMove = true;
  }
  
  if (dist(mouseX, mouseY, letterX, letterY) < 50){
    letterMove = true;
  }
}

function mouseReleased(){
  beerMove = false;
  
  if (dist(beerX, beerY, boxA, boxY) < boxA){
    if (state == 0 && video1play && video1end){
      state = 1;
      sendMqttMessage("state1");
    } else {
      beerX = beerXStart;
      beerY = beerYStart;
    }
  }
  
  
  lilyMove = false;
  if (dist(lilyX, lilyY, boxA, boxY) < boxA){

    lilyX = lilyXStart;
    lilyY = lilyYStart;
    
  }
  
  letterMove = false;
  if (dist(letterX, letterY, boxA, boxY) < boxA){
    if (state == 4 && video5play && video5end){
      state = 5;
      sendMqttMessage("state5");
    } else {
      letterX = letterXStart;
      letterY = letterYStart;
    }
  }
  
  lettersMove = false;
  if (dist(lettersX, lettersY, boxA, boxY) < boxA){
    lettersX = lettersXStart;
    lettersY = lettersYStart;
  }
  
  bagMove = false;
  if (dist(bagX, bagY, boxA, boxY) < boxA){
    if (state == 2 && video3play && video3end){
      state = 3;
      sendMqttMessage("state3");
    } else {
      bagX = bagXStart;
      bagY = bagYStart;
    }
  }
}

function mouseDragged(){
  
  if (beerMove){
    beerX = mouseX;
    beerY = mouseY;
  }
  
  if (lilyMove){
    lilyX = mouseX;
    lilyY = mouseY;
  }
  
  if (letterMove){
    letterX = mouseX;
    letterY = mouseY;
  }
  
  if (lettersMove){
    lettersX = mouseX;
    lettersY = mouseY;
  }
  
  if (bagMove){
    bagX = mouseX;
    bagY = mouseY;
  }
  
}

function presentState(){
  if (state == -1){
    // all the sets on the shelf
    imageMode(CENTER);
    image(beer, beerX, beerY, 90, 90);
    image(lily, lilyX, lilyY, 60, 90);
    image(letter, letterX, letterY, 80, 80);
    image(bag, bagX, bagY, 100, 80);
    image(letters, lettersX, lettersY, 80, 50);
    
    fill(255);
    textSize(20);
    text('Click to start the show', 700, 300);
    
  } else if (state == 0){
    // all the sets on the shelf
    imageMode(CENTER);
    image(beer, beerX, beerY, 90, 90);
    image(lily, lilyX, lilyY, 60, 90);
    image(letter, letterX, letterY, 80, 80);
    image(bag, bagX, bagY, 100, 80);
    image(letters, lettersX, lettersY, 80, 50);
    
    imageMode(CORNER);
    image(video1, 320, 0, 1067, 600);
    //both play and loop doesn't work
    //video2.loop();
    
    if (video1play == false){
      video1.play();
      video1play = true;
    }
    
    video1.onended(endVideo1);
    
  } else if (state == 1) {
    // all the sets on the shelf
    imageMode(CENTER);
    image(lily, lilyX, lilyY, 60, 90);
    image(letter, letterX, letterY, 80, 80);
    image(bag, bagX, bagY, 100, 80);
    image(letters, lettersX, lettersY, 80, 50);
    
    imageMode(CORNER);
    image(video2, 320, 0, 1067, 600);
    //both play and loop doesn't work
    //video2.loop();
    
    if (video2play == false){
      video2.play();
      video2play = true;
    }
    
    video2.onended(endVideo2);
    
  } else if (state == 2) {
    // all the sets on the shelf
    imageMode(CENTER);
    image(lily, lilyX, lilyY, 60, 90);
    image(letter, letterX, letterY, 80, 80);
    image(bag, bagX, bagY, 100, 80);
    image(letters, lettersX, lettersY, 80, 50);
    
    imageMode(CORNER);
    image(video3, 320, 0, 1067, 600);
    
    if (video3play == false){
      video3.play();
      video3play = true;
    }
    
    video3.onended(endVideo3);
    
  } else if (state == 3) {
    // all the sets on the shelf
    imageMode(CENTER);
    image(lily, lilyX, lilyY, 60, 90);
    image(letter, letterX, letterY, 80, 80);
    image(letters, lettersX, lettersY, 80, 50);
    
    //video
    imageMode(CORNER);
    image(video4, 320, 0, 1067, 600);
    
    if (video4play == false){
      video4.play();
      video4play = true;
    }
    
    video4.onended(endVideo4);
  } else if (state == 4) {
    // all the sets on the shelf
    imageMode(CENTER);
    image(lily, lilyX, lilyY, 60, 90);
    image(letter, letterX, letterY, 80, 80);
    image(letters, lettersX, lettersY, 80, 50);
    
    imageMode(CORNER);
    image(video5, 320, 0, 1067, 600);
    
    if (video5play == false){
      video5.play();
      video5play = true;
    }
    
    video5.onended(endVideo5);
    
  } else if (state == 5) {
    // all the sets on the shelf
    imageMode(CENTER);
    image(lily, lilyX, lilyY, 60, 90);
    image(letters, lettersX, lettersY, 80, 50);
    
    imageMode(CORNER);
    image(video6, 320, 0, 1067, 600);
    
    if (video6play == false){
      video6.play();
      video6play = true;
    }
    
    video6.onended(endVideo6);
    
    if (video6end){
      imageMode(CORNER);
      image(video7, 320, 0, 1067, 600);
    
      if (video7play == false){
        video7.play();
        video7play = true;
      }
    }
    
  } else if (state == 6) {
    // all the sets on the shelf
    imageMode(CENTER);
    image(lily, lilyX, lilyY, 100, 133);
    image(letters, lettersX, lettersY, 150, 100); 
    
    imageMode(CORNER);
    image(video7, 320, 0, 1067, 600);
    
    if (video7play == false){
      video7.play();
      video7play = true;
    }
    
  } 
}

// called when the client connects
function onConnect() {
  client.subscribe(topic);
  console.log("connected")
}

// called when the client loses its connection
function onConnectionLost(response) {
  if (response.errorCode !== 0) {
    console.log('onConnectionLost:' + response.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  // remoteDiv.html('I got a message:' + message.payloadString);
  let incoming = split(trim(message.payloadString), "/");
  console.log(incoming);
  
  // TODO: when videos are added to the scene, plz make sure that the messages are not sent repeatedly
  if (incoming == "state1"){
    state = 1;
  } else if (incoming == "state2") {
    state = 2;
  } else if (incoming == "state3") {
    state = 3;
  } else if (incoming == "state4") {
    state = 4;
  } else if (incoming == "state5"){
    state = 5;
  } else if (incoming == "state6"){
    state = 6;
  } else if (incoming == "state7"){
    state = 7;
  } else if (incoming == "state8"){
    state = 8;
  }
}


// called when you want to send a message:
function sendMqttMessage(msg) {
  // if the client is connected to the MQTT broker:
  if (client.isConnected()) {
    // start an MQTT message:
    message = new Paho.MQTT.Message(msg);
    // choose the destination topic:
    message.destinationName = topic;
    // send it:
    client.send(message);
  }
}

function endVideo1(){
  video1end = true;
}

function endVideo2(){
  video2end = true;
}

function endVideo3(){
  video3end = true;
}

function endVideo4(){
  video4end = true;
}

function endVideo5(){
  video5end = true;
}

function endVideo6(){
  video6end = true;
}