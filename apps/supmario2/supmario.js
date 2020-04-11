// place your const, vars, functions or classes here
Bangle.setLCDMode("120x120");

var brick =  require("Storage").read("brick2.img");
var cloud =  require("Storage").read("cloud2.img");
var grass =  require("Storage").read("grass2.img");
var mario =  require("Storage").read("mario2.img");
var mario_jmp = require("Storage").read("mario_jmp2.img");

var marioStage = {x1:45,y1:48,x2:76,y2:97};
var marioXY = {x:47, y:66};

/*
create variables for color

*/



function clearRam(){
    //delete brick;
   // delete cloud;
    //delete grass;
    //delete mario;
    //delete mario_jmp;
}

function box(x,y,scale){
    if(scale <=0)
      return;
    let width = 12 * scale;
    let height = 12 * scale;
    let borderWidth = 1 * scale;
    let dotSpacing = 1 * scale;
    
    g.setColor('#ff9933'); //base box color
    g.fillRect(x,y,x+width,y+height);
  
  
  
    g.setColor(0,0,0);
    //right and bottom border
    g.fillRect(x+width+1 ,y,x+width+borderWidth,y+height); //right
    g.fillRect(x-borderWidth,y+height+1,x+width+borderWidth,y+height+borderWidth); //bottom
  
    //4 black dots
    //g.fillRect(65,45,70,50);
    g.fillRect(x+dotSpacing,y+dotSpacing,x+dotSpacing*2,y+dotSpacing*2); //TL
    //g.fillRect(65,90,70,95);
    g.fillRect(x+dotSpacing, y+height-dotSpacing*2, x+dotSpacing*2,y+height-dotSpacing); // BL
    //g.fillRect(110,45,115,50);
    g.fillRect(x+width-dotSpacing*2,y+dotSpacing,x+width-dotSpacing,y+dotSpacing*2); //TR
    //g.fillRect(110,90,115,95);
    g.fillRect(x+width-dotSpacing*2,y+height-dotSpacing*2,x+width-dotSpacing,y+height-dotSpacing); //BR
    
    
    //left and top border
    g.setColor('#cc3300');
    g.fillRect(x-borderWidth,y,x,y+height);//left
    g.fillRect(x,y-borderWidth,x+width,y); //top
  }

function draw(){
  var date = new Date();
  var minute = (date.getMinutes()<10?'0':'') + date.getMinutes();
  var hour =  (date.getHours()<10?'0':'') + date.getHours();
  g.setColor('#33ccff');
  g.fillRect(0,0,120,120);

  for(var i=0; i<120;i=i+11){
    g.drawImage(brick,i,98);
    g.drawImage(brick,i,109);
  }

  g.drawImage(cloud,5,22);
  g.drawImage(cloud,90,40);
  g.drawImage(grass,89,82);

  g.drawImage(mario,marioXY.x,marioXY.y,{scale:2});
  

  box(30,20,2);
  box(59,20,2);

  
  g.setColor('#b32d00');
  g.setFont("4x6", 2);
  g.drawString(hour,35,28);
  g.drawString(minute,65,28);



  //bush
  g.setColor('#2eb82e');
  g.fillCircle(23,84,6);
  g.fillPoly([0,98,17,82,28,82,45,98]);
  g.setColor(0,0,0);
  g.fillRect(26,85,27,87);
  g.fillRect(47,180,50,175);


  g.fillRect(10,95,11,97);
  g.fillRect(8,97,10,98);

  g.fillRect(32,98,34,97);
  g.flip();
}
let jumping = false;
function marioJump(){
  if(jumping)
    return;
  let offset = marioXY.y;
  let displacement = 3;
  let goingDown = false;
  let upInterval = setInterval(()=>{
    jumping =true;
   if(offset <= marioStage.y1){
      //GO DOWN
      //clearInterval(upInterval);
      displacement = -displacement;
     goingDown = true;
    }
    g.clearRect(marioStage.x1,marioStage.y1,marioStage.x2, marioStage.y2);
    g.setColor('#33ccff');
    g.fillRect(marioStage.x1,marioStage.y1,marioStage.x2, marioStage.y2);
    g.drawImage(mario_jmp,marioXY.x,offset,{scale:1.8});
    g.flip();
    offset = offset-displacement;
    if(offset >= 72 && goingDown){
        clearInterval(upInterval);
       draw();
      jumping =false;
    }
  },100);
  
}
// special function to handle display switch on
Bangle.on('lcdPower', (on) => {
    if (on) {
        draw();
        clearRam();
    }
});
  
  g.clear();
  draw();
  clearRam();
  setWatch(Bangle.showLauncher, BTN2, {repeat:false,edge:"falling"});
  setWatch(marioJump, BTN1, {repeat:true,edge:"falling"});
  