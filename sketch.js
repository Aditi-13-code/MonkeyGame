
var monkey , monkey_running;
var bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var Ground;
var PLAY=1;
var END=0;
var gameState=PLAY;
var restart,restartImg;


function preload(){
  
  
  monkey_running =     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 restartImg=loadImage("restart.png");
}



function setup() {
  createCanvas(400,400);
  monkey=createSprite(30,350,5,5);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.11;
  
  ground=createSprite(200,382,400,5);
  ground.velocityX=-4;
  ground.x=ground.width/2
  console.log(ground.x);
  obstacleGroup=createGroup();
  bananaGroup=createGroup();
  
 restart = createSprite(200,250);
  restart.addImage(restartImg);
 restart.visible = false;

  score=0;
  
}


function draw() {

  background(250);
 stroke("white") ;
  textSize(20);
  fill("white");
  text("Score:"+score,500,50);
  
  if(gameState===PLAY){

    if (ground.x < 200){
      ground.x = ground.width/2;
    }
     restart.visible = false;
     
  
 
  
  
var survivalTime=0;
    
    
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("SurvivalTime:"+survivalTime,100,50);
  
    monkey.velocityY = monkey.velocityY + 0.9;  
  monkey.collide(ground); 

   
  
  if(keyDown("space")&& monkey. y >= 100) {
        monkey.velocityY = -12;}  
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+5;
  }
    food(); 
   rocks();
    

   if(obstacleGroup.isTouching(monkey)){
    gameState=END;
      
   
  }
}
  
  else if(gameState===END){
    restart.visible=true;
    ground.velocityX=0;
    monkey.velocityY=0;
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();

    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
  
   textSize(30);
    fill("red");
    text("You Lost!",140,200);
    if(mousePressedOver(restart)) {
       reset();
    }

    
  }

  
  monkey.collide(ground);
  
  
  
  drawSprites();
  
}

function reset(){

  restart.visible = true;
  SurvivalTime:0;
  gameState=PLAY;
}

  

function food(){
   

  
  
  
  if(frameCount%100===0){
  
   var banana=createSprite(400,0,5,5);
   banana.y = Math.round(random(200,350));
   banana.velocityX=-4; 
   banana.scale=0.09 ; 
   banana.addImage(bananaImage);
   banana.lifetime = 200;
   bananaGroup.add(banana);
      }
}

function rocks(){
  if(frameCount%300===0){
    var obstacle=createSprite(380,377,5,5);
      obstacle.y=Math.round(random(382,382));
      obstacle.velocityX=-8;
      obstacle.collide(ground);  
      obstacle.scale=0.3;
      obstacle.addImage(obstacleImage);
    
      
      obstacle.lifetime=200;
      obstacleGroup.add(obstacle);
  }



}
