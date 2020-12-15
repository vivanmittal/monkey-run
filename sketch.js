var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;
var ground;

var banana,bananaImage,obstacle,obstacleImage;
var foodGroup,obstacleGroup

var score;

function preload(){
  monkey_running=
 loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
   
}

function setup() {
  createCanvas(600, 400);

  
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  //create Obstacle and food Groups
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  
  score = 0;
  
  ground=createSprite(300,350,600,20)
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    //scoring
    score = score + Math.round(getFrameRate()/60);
     
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 270) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
  
    //spawn obstacles on the ground
    spawnObstacles();
    spawnfood();
    if(obstaclesGroup.isTouching(monkey)){
        //trex.velocityY = -12;
        gameState = END;
        
    }
  }
   else if (gameState === END) {
      
     monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0); 
   }
  
 
  //stop trex from falling down
  monkey.collide(ground);
  
   drawSprites();
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
    obstacle = createSprite(600,320,10,40);
   obstacle.velocityX = -(6 + score/100);
    obstacle.addImage(obstacleImage);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnfood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(200,250));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
   
    //add each cloud to the group
    foodGroup.add(banana);
  }
}

