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
  clientID: 'LogoPuzzlePlayer2', // choose whatever name you want
  userName: 'escaperoomtest2', // shiftr example
  password: 'EscapeRoomTest2Token1' // shiftr example
  // userName: 'YOURUSERNAME', // name from acct
  // password: 'YOURSECRETKEY' // unique Secret from token
}
// topic to subscribe to when you connect:
let topic = 'LogoPuzzle';

function preload(){
  
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
    // image(clock, width/10*6, height/10, width/15, width/15);
    // image(antiClock, width/10*7, height/10,  width/15, width/15);
    
    //down left buttons
    image(clock, width/10, height/10*6, width/15, width/15);
    image(antiClock, width/10, height/10*7,  width/15, width/15);
    
    //down right buttons
    // image(clock, width/10*9, height/10*6, width/15, width/15);
    // image(antiClock, width/10*9, height/10*7,  width/15, width/15);
    
    //down middle buttons
    image(clock, width/10*4, height/10*9, width/15, width/15);
    image(antiClock, width/10*5, height/10*9,  width/15, width/15);
  }

}

// called when the client connects
function onConnect() {
  client.subscribe(topic);
  console.log("connected")
  p =createP("Rotate your own jigsaw pieces");
  p.position(20,20);
}

// called when the client loses its connection
function onConnectionLost(response) {
  if (response.errorCode !== 0) {
    // localDiv.html('onConnectionLost:' + response.errorMessage);
    console.log('onConnectionLost:' + response.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  // remoteDiv.html('I got a message:' + message.payloadString);
  let incoming = split(trim(message.payloadString), "/");
  console.log(incoming);
  
  // if (incoming == "topRight1") {
  //   topRightNum = 1;
  // } else {
  //   console.log("incoming: "+incoming);
  // }
  
  if (incoming == "trn0"){
    topRightNum = 0;
  } else if (incoming == "trn1") {
    topRightNum = 1;
  } else if (incoming == "trn2") {
    topRightNum = 2;
  } else if (incoming == "trn3") {
    topRightNum = 3;
  } else if (incoming == "drn0") {
    downRightNum = 0;
  } else if (incoming == "drn1") {
    downRightNum = 1;
  } else if (incoming == "drn2") {
    downRightNum = 2;
  } else if (incoming == "drn3") {
    downRightNum = 3;
  }
  
  // TODO: Why the switch doesn't work??
  // switch(incoming){
  //   case "trn0":
  //     topRightNum = 0;
  //     console.log(topRightNum);
  //     break;
  //   case "trn1":
  //     topRightNum = 1;
  //     console.log(topRightNum);
  //     break;
  //   case "trn2":
  //     topRightNum = 2;
  //     console.log(topRightNum);
  //     break;
  //   case "trn3":
  //     topRightNum = 3;
  //     console.log(topRightNum);
  //     break;
  //   case 'drn0':
  //     downRightNum = 0;
  //     break;
  //   case 'drn1':
  //     downRightNum = 1;
  //     break;
  //   case 'drn2':
  //     downRightNum = 2;
  //     break;
  //   case 'drn3':
  //     downRightNum = 3;
  //     break;
  // }
    
  

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
    sendMqttMessage("tln" + topLeftNum);
  }
  
  // top left anti-clock-wise
  if (dist(mouseX, mouseY, width/10*3, height/10) < (width / 30)){
    topLeftNum--;
    if (topLeftNum<0){
      topLeftNum = 3;
    }
    console.log(topLeftNum);
    sendMqttMessage("tln" + topLeftNum);
  }
  
  // top right clock-wise
  // if (dist(mouseX, mouseY, width/10*6, height/10) < (width / 30)){
  //   topRightNum++;
  //   if (topRightNum>3){
  //     topRightNum = 0;
  //   }
  //   console.log(topRightNum);
  // }
  
  // top right anti-clock-wise
  // if (dist(mouseX, mouseY, width/10*7, height/10) < (width / 30)){
  //   topRightNum--;
  //   if (topRightNum<0){
  //     topRightNum = 3;
  //   }
  //   console.log(topRightNum);
  // }
  
  // down left clock-wise
  if (dist(mouseX, mouseY, width/10, height/10*6) < (width / 30)){
    downLeftNum++;
    if (downLeftNum>3){
      downLeftNum = 0;
    }
    console.log(downLeftNum);
    sendMqttMessage("dln" + downLeftNum);
  }
  
  // down left anti-clock-wise
  if (dist(mouseX, mouseY, width/10, height/10*7) < (width / 30)){
    downLeftNum--;
    if (downLeftNum<0){
      downLeftNum = 3;
    }
    console.log(downLeftNum);
    sendMqttMessage("dln" + downLeftNum);
  }
  
  // down right clock-wise
  // if (dist(mouseX, mouseY, width/10*9, height/10*6) < (width / 30)){
  //   downRightNum++;
  //   if (downRightNum>3){
  //     downRightNum = 0;
  //   }
  //   console.log(downRightNum);
  // }
  
  // down right anti-clock-wise
  // if (dist(mouseX, mouseY, width/10*9, height/10*7) < (width / 30)){
  //   downRightNum--;
  //   if (downRightNum<0){
  //     downRightNum = 3;
  //   }
  //   console.log(downRightNum);
  // }
  
  // down middle clock-wise
  if (dist(mouseX, mouseY, width/10*4, height/10*9) < (width / 30)){
    downMiddleNum++;
    if (downMiddleNum>3){
      downMiddleNum = 0;
    }
    console.log(downMiddleNum);
    sendMqttMessage("dmn" + downMiddleNum);
  }
  
  // down right anti-clock-wise
  if (dist(mouseX, mouseY, width/10*5, height/10*9) < (width / 30)){
    downMiddleNum--;
    if (downMiddleNum<0){
      downMiddleNum = 3;
    }
    console.log(downMiddleNum);
    sendMqttMessage("dmn" + downMiddleNum);
  }
}