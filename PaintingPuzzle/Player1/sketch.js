let painting;
let bow1;
let bow2;
let bird1;
let bird2;
let sun;
let tick1;
let tick2;
let tick3;
let tickBox;
let yellowSun;

let width = 480;
let height = 600;

//whether players find out that the difference
let sunStatus = 0;
let birdStatus = 0;
let bow1Status = 0;
let bow2Status = 0;

// the whole state
let bowStatus = 0;
let statusTotal = 0;

//give players punishment if they're doing random clicks
let clicks = 0;

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
  clientID: 'PaintingPuzzlePlayer1', // choose whatever name you want
  userName: 'escaperoomtest2', // shiftr example
  password: 'EscapeRoomTest2Token1' // shiftr example
  // userName: 'YOURUSERNAME', // name from acct
  // password: 'YOURSECRETKEY' // unique Secret from token
}
// topic to subscribe to when you connect:
let topic = 'PaintingPuzzle';

function preload() {
  painting = loadImage('/Assets/painting.png');
  sun = loadImage('/Assets/sun.png');
  yellowSun = loadImage('/Assets/yellowSun.png');
  bow1 = loadImage('/Assets/bow1.png');
  bow2 = loadImage('/Assets/bow2.png');
  bird1 = loadImage('/Assets/bird1.png');
  bird2 = loadImage('/Assets/bird2.png');
  tick1 = loadImage('/Assets/tick1.png');
  tick2 = loadImage('/Assets/tick2.png');
  tick3 = loadImage('/Assets/tick3.png');
  tickBox = loadImage('/Assets/tickBox.png');
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
  background(245);
  
  image(tickBox, 0, 0, width, height);
  image(painting, 0, 0, width, height);
  
  if (bow2Status == 1 && bow1Status == 1){
    bowStatus = 1;
  }
  
  statusTotal = bowStatus + sunStatus + birdStatus;
  
  if (statusTotal == 1){
    image(tick1, 0, 0, width, height);
  } else if (statusTotal == 2){
    image(tick1, 0, 0, width, height);
    image(tick2, 0, 0, width, height);
  } else if (statusTotal == 3){
    image(tick1, 0, 0, width, height);
    image(tick2, 0, 0, width, height);
    image(tick3, 0, 0, width, height);
  }
  
  if (sunStatus == 0) {
    image(yellowSun, 0, 0, width, height);
  } else if (sunStatus == 1) {
    image(sun, 0, 0, width, width);
  }
  
  if (bow1Status == 0) {
    image(bow1, 0, 0, width, width);
  }
  
  
  if (sunStatus == 1 && bow1Status == 1 && bow2Status == 1 && birdStatus == 1){
    background(0);
    textSize(width / 20);
    fill(255);
    text('A safe box suddently appears on the wall in the restaurant', width / 4, height / 4, width / 2, height / 2);
  }
  
  if (clicks == 10) {
    background(0);
    textSize(width / 20);
    fill(255);
    text('The restaurant owner is angry that you are touching everywhere of his paintings. Click to apologize to him.', width / 4, height / 4, width / 2, height / 2);
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
  
  if (incoming == "sun"){
    sunStatus = 1;
  } else if (incoming == "bow1") {
    bow1Status = 1;
  } else if (incoming == "bow2") {
    bow2Status = 1;
  } else if (incoming == "bird") {
    birdStatus = 1;
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

function mousePressed(){
  console.log(mouseX, mouseY);
  
  if (dist(mouseX, mouseY, width / 2, width / 4) < width / 8){
    sunStatus = 1;
    sendMqttMessage("sun");
  } else if (dist(mouseX, mouseY, width * 2 / 5, width * 13 / 20) < width / 8) {
    bow1Status = 1;
    sendMqttMessage("bow1");
  } else if (dist(mouseX, mouseY, width / 4, width / 4) < width / 8) {
    console.log("smoke");
  } else {
    clicks++;
    if (clicks == 11){
      clicks = 1;
    }
  }
}