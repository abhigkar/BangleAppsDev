// place your const, vars, functions or classes here

var brick =  require("Storage").read("brick.img");
var cloud =  require("Storage").read("cloud.img");
var grass =  require("Storage").read("grass.img");
var mario =  require("Storage").read("mario.img");
var mario_jmp = require("Storage").read("mario_jmp.img");

var marioStage = {x1:90,y1:105,x2:150,y2:200};
var marioXY = {x:90, y:140};

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
    g.fillRect(0,0,240,240);

    for(var i=0; i<240;i=i+21){
        g.drawImage(brick,i,200);
        g.drawImage(brick,i,220);
    }

    g.drawImage(cloud,10,45);
    g.drawImage(cloud,185,80);
    g.drawImage(grass,210,180);
    g.drawImage(mario,90,140,{scale:1.8});

    box(60,39,5);
    box(131,39,5);

    
    g.setColor('#b32d00');
    g.setFont("6x8", 4);
    g.drawString(hour,68,55);
    g.drawString(minute,139,55);



    //bush
    g.setColor('#2eb82e');
    g.fillCircle(45,170,10);
    g.fillPoly([0,200,35,165,55,165,90,200]);
    g.setColor(0,0,0);
    g.fillRect(50,170,53,175);
    g.fillRect(47,180,50,175);


    g.fillRect(20,190,23,195);
    g.fillRect(17,195,20,200);

    g.fillRect(65,190,68,195);
}
function marioJump(){
 
    let offset = marioXY.y;
    let displacement = 5;
    let goingDown = false;
    let upInterval = setInterval(()=>{
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
      offset = offset-displacement;
      if(offset >= 145 && goingDown){
          clearInterval(upInterval);
          g.clearRect(marioStage.x1,marioStage.y1,marioStage.x2, marioStage.y2);
          g.setColor('#33ccff');
          g.fillRect(marioStage.x1,marioStage.y1,marioStage.x2, marioStage.y2);
          g.drawImage(mario,marioXY.x,offset,{scale:1.8});
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
  