/*
    p5.js MQTT Client example
    This example uses p5.js: https://p5js.org/
    and the Eclipse Paho MQTT client library: https://www.eclipse.org/paho/clients/js/
    to create an MQTT client that sends and receives MQTT messages.
    The client is set up for use on the shiftr.io test MQTT broker (https://shiftr.io/try),
    but has also been tested on https://test.mosquitto.org
    created 12 June 2020
    modified 20 Aug 2020
    by Tom Igoe
    modified 13 Feb 2021
    by David Rios
*/

let bg = 0;
let ct = 0;
let stage = -1;
let txt=" ";
// a pushbutton to send messages
let sendButton;
let localDiv;
let remoteDiv;
let inpt;

let img;
let buttonImg;
let imgMachine;

let buttonTurn = 0;

let width = 400;
let height = 500;

let names = ["yellow", "orange", "purple", "green", "blue"];
// we have 5 different bottles of juice
let bottleNumber = [0, 0, 0, 0, 0];
let bottleCode = [3, 1, 2, 5, 3];

let clicks = []
let buttons = [];
let p;

// MQTT client details:
let broker = {
  //hostname: 'YOUR BROKER HERE',
  hostname: 'escaperoomtest2.cloud.shiftr.io', //shiftr example
  port: 443
};
// MQTT client:
let client;
// client credentials:
let creds = {
  clientID: 'Test2Player1', // choose whatever name you want
  userName: 'escaperoomtest2', // shiftr example
  password: 'EscapeRoomTest2Token1' // shiftr example
  // userName: 'YOURUSERNAME', // name from acct
  // password: 'YOURSECRETKEY' // unique Secret from token
}
// topic to subscribe to when you connect:
let topic = 'PuzzleTest1';



function preload() {
  img = loadImage('images/resellLeft.png');
  buttonImg = loadImage('images/button.png');
  imgMachine = loadImage('images/player1.jpg');
}

function setup() {
  createCanvas(400, 500);

  rectMode(CENTER);
  for (let i = 0; i < 5; i++) {
    buttons[i] = new PuzzleButton(width * 4 / 5, i * (height / 19.5) + (height * 3 / 10) + 25, color(120), names[i]);
  }

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
  // create the send button:
  //sendButton = createButton('Enter the Code');
  //sendButton.position(width / 2 - 55, height / 2 + 35);
  //sendButton.mousePressed(submitCode);
  //textSize(55);
}

function draw() {

  if (stage == -1){
    image(imgMachine, 0, 0, width, height);
  }
  
  if (stage == 0) {

    image(img, 0, 0, width, height);
    
    
  
    //text(txt, width / 12, 60);

    fill(90);
    



    for (let i = 0; i < buttons.length; i++) {
      buttons[i].show();
      if (buttons[i].detect() == true) {
        if (i == 0) {
          buttons[i].infill = color(245, 225, 77);
        }
        if (i == 1) {
          buttons[i].infill = color(220, 111, 62);
        }
        if (i == 2) {
          buttons[i].infill = color(96, 50, 143);
        }
        if (i == 3) {
          buttons[i].infill = color(148, 193, 92);
        }
        if (i == 4) {
          buttons[i].infill = color(61, 117, 184);
        }
      } else {
        buttons[i].infill = color(195);
      }
    }
  }
  if (stage == 1) {
    background(255, 255, bg);
    fill(0);
    text("You Cracked the Code!", width / 12, 60)
    bg += 15;
    bg = bg % 255;

    // if (!celebrate.isPlaying()) {
    //   celebrate.play();
    // }
    // sendButton.hide();
  }
}

// called when the client connects
function onConnect() {
  client.subscribe(topic);
  console.log("connected")
  p =createP("Keep talking to your partner to solve this one");
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

  if (incoming == "winner") {
    stage = 1;
  } else {
    txt = wronganswer[ct];
    console.log("incoming: "+incoming);
  }

  ct++;
  ct = ct % wronganswer.length;
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

class PuzzleButton {
  constructor(x, y, fil, name) {
    this.x = x;
    this.y = y;
    this.infill = 195;
    this.infill2 = fil;
    this.size = 15;
    this.name = name;
  }
  show() {
    fill(this.infill2);
    circle(this.x, this.y, this.size + 5);
    fill(this.infill);
    circle(this.x, this.y, this.size);
  }
  detect() {
    if (dist(mouseX, mouseY, this.x, this.y) <= this.size) {
      return true;
    } else {
      return false;
    }
  }
}

// if the button is pressed, a certain number of juice bottles are purchased
function mousePressed() {
  if (stage == -1 && mouseX > width * 1 / 2 && mouseX < width * 5 * 6 && mouseY > height * 1 / 3 && mouseY < height * 2 / 3 ){
    stage = 0;
  }
    
  
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].detect() == true) {
      bottleNumber[i]++;
      console.log(bottleNumber);
      // clicks[i].play(); //only for sound fx
      if (bottleNumber[0] == 3 && bottleNumber[1] ==1 && bottleNumber[2]  == 2 && bottleNumber[3] == 5 && bottleNumber[4] == 3){
        sendMqttMessage("winner");
        console.log("you win");
      }
      // if (bottleNumber == bottleCode){
      //   sendMqttMessage("winner");
      //   console.log("you win");
      // }
    }
  }
  
  
}



function submitCode() {
  if (outcode == code) {
    sendMqttMessage("winner");
    console.log("you win");
  } else {
    console.log("try again");
    sendMqttMessage("try again");
    outcode = "";
  }
}