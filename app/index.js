import display  from "display";
import document from "document";
import * as fs from "fs";
import {inbox} from "file-transfer";
import {peerSocket} from "messaging";

// Variables Begin
//  Buttons
const bluebutton = document.getElementById("blue");
const purplebutton = document.getElementById("purple");
const redbutton = document.getElementById("red");
const orangebutton = document.getElementById("orange");
const greenbutton = document.getElementById("green");
const whitebutton = document.getElementById("white");
const settingsbutton = document.getElementById("cog");
const settingspopup = document.getElementById("settings");
const plusbutton = document.getElementById("btn-plus");
const minusbutton = document.getElementById("btn-minus");
const displayoffbutton = document.getElementById("center");

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
};

//  Brightness
let openSettings = false;
let brightness = document.getElementById("brightness");
let Brightlevel = document.getElementById("brightlevel");

// Variables End

// Settings Begin
//    Display
display.brightnessOverride = 1.0;
display.autoOff = false;

//    Default Brightness
let brightselection = 3;
display.brightnessOverride = 0.6;
brightness.href = "gray-4.png";
brightness.style.fill = "fb-black";
Brightlevel.height = 56;

//    From File 
pendingFiles();
inbox.onnewfile = pendingFiles;

if(parseFile("settingsnl.txt")) {
  let done = (peerSocket.readyState === peerSocket.OPEN);
  if(done) {
    peerSocket.send({getAll: 1});
  } else {
    peerSocket.onopen = () => {
      if(!done) peerSocket.send({getAll: 1});
      done = true;
    };
  }
}

// Settings End

// Settings Popup Begin
$("settings").x = 300;
settingspopup.style.display = "inline";

settingsbutton.onactivate = () => {
  $("settings").animate("enable");
  settingsbutton.style.display = "none";
  openSettings = true;
};

plusbutton.onactivate = () => {
  if(brightselection < 5)
  {
    brightselection = brightselection + 1
  }
  switch(brightselection) {
    case 0:
      display.brightnessOverride = 0.0;
      brightness.href = "gray-1.png";
      brightness.style.fill = "fb-black";
      Brightlevel.height = 148;
      break;
    case 1:
      display.brightnessOverride = 0.2;
      brightness.href = "gray-2.png";
      brightness.style.fill = "fb-black";
      Brightlevel.height = 119;
      break;
    case 2:
      display.brightnessOverride = 0.4;
      brightness.href = "gray-3.png";
      brightness.style.fill = "fb-black";
      Brightlevel.height = 90;
      break;
    case 3:
      display.brightnessOverride = 0.6;
      brightness.href = "gray-4.png";
      brightness.style.fill = "fb-black";
      Brightlevel.height = 62;
      break;
    case 4:
      display.brightnessOverride = 0.8;
      brightness.href = "gray-5.png";
      brightness.style.fill = "fb-black";
      Brightlevel.height = 33;
      break;
    case 5:
      display.brightnessOverride = 1.0;
      brightness.href = "black.png";
      Brightlevel.height = 1;
      break;
    default: 
      display.brightnessOverride = 1.0;
      brightness.href = "black.png";
      Brightlevel.height = 1;
  }
};

minusbutton.onactivate = () => {
  if(brightselection > 0)
  {
    brightselection = brightselection - 1
  }
  switch(brightselection) {
    case 0:
      display.brightnessOverride = 0.0;
      brightness.href = "gray-1.png";
      brightness.style.fill = "fb-black";
      Brightlevel.height = 148;
      break;
    case 1:
      display.brightnessOverride = 0.2;
      brightness.href = "gray-2.png";
      brightness.style.fill = "fb-black";
      Brightlevel.height = 119;
      break;
    case 2:
      display.brightnessOverride = 0.4;
      brightness.href = "gray-3.png";
      brightness.style.fill = "fb-black";
      Brightlevel.height = 90;
      break;
    case 3:
      display.brightnessOverride = 0.6;
      brightness.href = "gray-4.png";
      brightness.style.fill = "fb-black";
      Brightlevel.height = 62;
      break;
    case 4:
      display.brightnessOverride = 0.8;
      brightness.href = "gray-5.png";
      brightness.style.fill = "fb-black";
      Brightlevel.height = 33;
      break;
    case 5:
      display.brightnessOverride = 1.0;
      brightness.href = "black.png";
      Brightlevel.height = 1;
      break;
    default: 
      display.brightnessOverride = 1.0;
      brightness.href = "black.png";
      Brightlevel.height = 1;
  }
};

bluebutton.onclick = () => {
  $("background").style.fill = "fb-blue";
};

purplebutton.onclick = () => {
  $("background").style.fill = "fb-purple";
};

redbutton.onclick = () => {
  $("background").style.fill = "fb-red";
};

orangebutton.onclick = () => {
  $("background").style.fill = "fb-orange";
};

greenbutton.onclick = () => {
  $("background").style.fill = "fb-green";
};

whitebutton.onclick = () => {
  $("background").style.fill = "fb-white";
};

displayoffbutton.onclick = () => {
  display.on = false;
};

document.onkeypress = e => {
  if(e.key === "back" && openSettings) 
  {
    sendAll();
    openSettings = false;
    $("settings").animate("disable");
    sleep(300).then(() => {
      settingsbutton.style.display = "inline";
    });
    e.preventDefault();
  }
};  

// Settings Popup End

// Functions

function $(s) 
{
  //* Function to get a gui element by id *//
  return document.getElementById(s);
}

function sendAll() {
  //* Function to write settings to file *//
  let obj = {
    backgroundcolour: $("background").style.fill,
    light: brightselection,
  };
  fs.writeFileSync("settingsnl.txt", obj, "cbor");
}

function applySettings(o) {
  //* Function to apply settings *//
  if("light" in o)
  {
    brightselection = o.light;
  }
  if("backgroundcolour" in o) {
    $("background").style.fill = o.backgroundcolour;
  }
  switch(brightselection) {
    case 0:
      display.brightnessOverride = 0.0;
      brightness.href = "gray-1.png";
      brightness.style.fill = "fb-black";
      Brightlevel.height = 148;
      break;
    case 1:
      display.brightnessOverride = 0.2;
      brightness.href = "gray-2.png";
      brightness.style.fill = "fb-black";
      Brightlevel.height = 119;
      break;
    case 2:
      display.brightnessOverride = 0.4;
      brightness.href = "gray-3.png";
      brightness.style.fill = "fb-black";
      Brightlevel.height = 90;
      break;
    case 3:
      display.brightnessOverride = 0.6;
      brightness.href = "gray-4.png";
      brightness.style.fill = "fb-black";
      Brightlevel.height = 62;
      break;
    case 4:
      display.brightnessOverride = 0.8;
      brightness.href = "gray-5.png";
      brightness.style.fill = "fb-black";
      Brightlevel.height = 33;
      break;
    case 5:
      display.brightnessOverride = 1.0;
      brightness.href = "black.png";
      Brightlevel.height = 1;
      break;
    default: 
      display.brightnessOverride = 1.0;
      brightness.href = "black.png";
      Brightlevel.height = 1;
  }
}

function parseFile(name) {
  //* Function to read settings to file *//
  let obj;
  try {
    obj = fs.readFileSync(name, "cbor");
  } catch(e) {
    return true;
  }

  if(name === "settingsnl.txt") {
    if(obj) applySettings(obj);
  }
}

function pendingFiles() {
  //* Function to wait for file to be ready *//
  let found = false;
  let temp;
  while(temp = inbox.nextFile()) {
    parseFile(temp);
    console.log(temp);
    found = true;
  }
  if(found) {
    display.poke();
    vibration.start("bump");
  }
}
