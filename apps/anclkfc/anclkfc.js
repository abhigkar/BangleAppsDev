// place your const, vars, functions or classes here
var img =  require("Storage").read("clock_img1.img");
var img2 = require("Storage").read("clock_img2.img");
var img3 = require("Storage").read("clock_img3.img");
var img4 = require("Storage").read("clock_img4.img");

const p = Math.PI/2;
const PRad = Math.PI/180;

let intervalRefMin = null;
let intervalRefSec = null;

let minuteDate = new Date();
let secondDate = new Date();

function hand(angle, r1,r2) {
  const a = angle*PRad;
  const r3 = 3;
  g.fillPoly([
    120+Math.sin(a)*r1,
    120-Math.cos(a)*r1,
    120+Math.sin(a+p)*r3,
    120-Math.cos(a+p)*r3,
    120+Math.sin(a)*r2,
    120-Math.cos(a)*r2,
    120+Math.sin(a-p)*r3,
    120-Math.cos(a-p)*r3]);
}

function drawAll() {
  g.clear();
  secondDate = minuteDate = new Date();
  // draw hands first
  
  // draw seconds
  g.drawImage(img,0,0);
  g.drawImage(img2,60,0);
  g.drawImage(img3,120,0);
  g.drawImage(img4,180,0);


  g.setRotation(1);
  g.drawImage(img,0,0);
  g.drawImage(img2,60,0);
  g.drawImage(img3,120,0);


  g.setRotation(2);
  g.drawImage(img,0,0);
  g.drawImage(img2,60,0);
  g.drawImage(img3,120,0);

  g.setRotation(3);
  g.drawImage(img,0,0);
  g.drawImage(img2,60,0);
  g.drawImage(img3,120,0);

  g.setRotation(0);
    

  g.drawCircle(80,130,20);
  g.fillCircle(80,130,1);
  g.drawCircle(160,130,20);
  g.fillCircle(160,130,1);
  g.drawCircle(120,160,20);
  g.fillCircle(120,160,1);
    

  g.fillCircle(120,120,5);
  g.setColor(0x7be0);
  g.drawString("BangleJs",100,60,true);
  onSecond();
  onMinute();
}
function onSecond() {
  
}
function onMinute() {
  g.setColor(0,0,0);
  hand(360*(minuteDate.getHours() + (minuteDate.getMinutes()/60))/12, -10, 50);
  hand(360*minuteDate.getMinutes()/60, -10, 82);
  minuteDate = new Date();
  g.setColor(1,1,1);
  hand(360*(minuteDate.getHours() + (minuteDate.getMinutes()/60))/12, -10, 50);
  hand(360*minuteDate.getMinutes()/60, -10, 82);
  if(minuteDate.getHours() >= 0 && minuteDate.getMinutes() === 0) {
    Bangle.buzz();
  }
}
function clearTimers() {
  if(intervalRefMin) {clearInterval(intervalRefMin);}
  if(intervalRefSec) {clearInterval(intervalRefSec);}
}

function startTimers() {
  minuteDate = new Date();
  secondDate = new Date();
  intervalRefSec = setInterval(onSecond,1000);
  intervalRefMin = setInterval(onMinute,60*1000);
  drawAll();
}

// special function to handle display switch on
Bangle.on('lcdPower',function(on) {
  if (on) {
    g.clear();
    Bangle.drawWidgets();
    startTimers();
  }else {
    clearTimers();
  }
});

g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();
drawAll();
startTimers();
