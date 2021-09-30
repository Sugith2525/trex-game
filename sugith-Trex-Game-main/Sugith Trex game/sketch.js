var trex,trexAnimation,trexCollided;
var edge;
var ground,groundImage;
var invisibleground;
var cloudImage
var cac1,cac2,cac3,cac4,cac5,cac6
var score = 0
var PLAY = 1
var END = 0
var gamestate = PLAY
var cloudGroup
var cactusGroup
var gameover,gameoverImage
var restart,restartImage
var jump,die,checkpoint
function preload(){
  trexAnimation=loadAnimation("trex1.png","trex3.png","trex4.png");
  trexCollided=loadImage("trex_collided.png")
  groundImage=loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  cac1=loadImage("obstacle1.png")
  cac2=loadImage("obstacle2.png")
  cac3=loadImage("obstacle3.png")
  cac4=loadImage("obstacle4.png")
  cac5=loadImage("obstacle5.png")
  cac6=loadImage("obstacle6.png")
  gameoverImage=loadImage("GameOver.png")
  restartImage=loadImage("restart.png")
  jump=loadSound("jump.mp3")
  checkpoint=loadSound("checkPoint.mp3")
  die=loadSound("die.mp3")
}

function setup(){
  createCanvas(600,250);
  
  //trex sprite
  trex = createSprite(50,220,10,100);
  trex.addAnimation ("run" , trexAnimation);
  trex.scale=0.6;
  trex.addImage("collided" , trexCollided);
  //edges
  edge=createEdgeSprites();
 
  //ground
  ground = createSprite(300,220,600,20)
  ground.addImage("background" ,groundImage)

  //invisibleground
  invisibleground= createSprite(300,235,600,10)
  invisibleground.visible=false

  //example for random number  
  //var rand=Math.round(random(0,100))
  //console.log(rand)

  cloudGroup= createGroup ();
  cactusGroup= createGroup ();
  trex.debug=false
  trex.setCollider("rectangle",0,0,trex.width,trex.height)
  
  gameover = createSprite(300,125,600,20)
  gameover.addImage("gameover" ,gameoverImage)
  gameover.scale=0.5

  restart = createSprite(300,150,600,20)
  restart.addImage("restart" ,restartImage)
  restart.scale=0.5
}

function draw(){
  background("white");
  
  if(gamestate===PLAY){
  score=score+Math.round(getFrameRate()/60)
  //trex jump  
  if(keyDown("space")&&trex.y>=175){trex.velocityY=-10;jump.play();}
  
  //trex gravity
    trex.velocityY=trex.velocityY+0.75;
  
  //ground moving
  ground.velocityX=-(3+score/100)
  if(ground.x<0){ground.x=ground.width/2}
//calling cloud and cactus function
  Clouds();
  Cactus();
  if(cactusGroup.isTouching(trex)){
  gamestate=END
  //trex.velocityY=-10
  die.play();
  }
  gameover.visible=false
  restart.visible=false

  if (score>0&&score%100===0){
  checkpoint.play(); 
  }
}
  else if (gamestate===END){
  ground.velocityX=0
  cloudGroup.setVelocityXEach(0)
  cactusGroup.setVelocityXEach(0)
  cloudGroup.setLifetimeEach(-1)
  cactusGroup.setLifetimeEach(-1)
  trex.velocityY=0
  trex.changeAnimation("collided" , trexCollided)
  gameover.visible=true
  restart.visible=true
}
  
  text ("Score = "+ score,525,50)
 
  
  //console.log(trex.y)
  

  //trex collide 
  trex.collide(invisibleground);
  

  //restart
  if (mousePressedOver(restart)){
  console.log ("restart")
  gamestate=PLAY
  cloudGroup.destroyEach();
  cactusGroup.destroyEach();
  trex.changeAnimation("run" , trexAnimation);
  score=0
  }
  drawSprites();
  }
  //cloud
  function Clouds(){
  if(frameCount%75===0){
  var cloud=createSprite(600,20,40,10)
  cloud.velocityX=-2
  cloud.y=Math.round(random(20,100))
  cloud.addImage("cloud",cloudImage)
  cloud.scale=0.7
  cloud.depth=trex.depth
  trex.depth=trex.depth+1
  cloud.lifetime=350
  cloudGroup.add(cloud)
  }
}
  //cactus
  function Cactus(){
  if(frameCount%100===0){
  var cactus =createSprite(600,210,10,40) 
  cactus.velocityX=-(3+score/100) 
  cactus.scale=0.4
  cactus.lifetime=350
  cactusGroup.add(cactus)
  var image=Math.round(random(1,6))  
  switch(image){
  case 1:cactus.addImage(cac1);cactus.scale=0.5;break;
  case 2:cactus.addImage(cac2);break;
  case 3:cactus.addImage(cac3);break;
  case 4:cactus.addImage(cac4);break;
  case 5:cactus.addImage(cac5);break;
  case 6:cactus.addImage(cac6);break;
  default:break
  }
 }
}


