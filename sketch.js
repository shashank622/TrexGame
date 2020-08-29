var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacleImage1, obstacleImage2;
var obstacleImage3, obstacleImage4, obstacleImage5, obstacleImage6;
var over, restart;
var cloud, cloudsGroup, cloudImage;
var score = 0;
var obstaclesGroup;
var newImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var checkSound;
var dieSound;
var jumpSound;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacleImage1 = loadImage("obstacle1.png");

  obstacleImage2 = loadImage("obstacle2.png");

  obstacleImage3 = loadImage("obstacle3.png");

  obstacleImage4 = loadImage("obstacle4.png");
  obstacleImage5 = loadImage("obstacle5.png");

  obstacleImage6 = loadImage("obstacle6.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  checkSound = loadSound("checkPoint.mp3");
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");



}
function moveTrex() {

  if (keyDown("space") && trex.y >= 150) {
    trex.velocityY = -10;
    
  }

  trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
}

function gameOver() {

  

}

function endGame() {

  //what happens when game state is end
  trex.changeAnimation("collided", trex_collided);
  ground.velocityX = 0;
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
 
  trex.velocityY = 0;
  


}

function setup() {
  createCanvas(600, 200);

  
  over = createSprite(300, 100);
  over.addImage("over", gameOverImg);
  over.visible = false;

  restart = createSprite(300, 150);
  restart.addImage("restart", restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  
  
  
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.5;
 // trex.debug = true;
  //trex.setCollider("rectangle",0,0,300,trex.height)
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  console.log("Hello" + 5)

  obstaclesGroup = new Group();
  cloudsGroup = new Group();

}

function draw() {
  background("black");
  //display the score
  fill("white");
  text("Score = " + score, 530, 50);

  
  
  if(mousePressedOver(restart)) {
        reset();
    
  }
  
  
  if (gameState === PLAY) {
    ground.velocityX = -4 - score/50;
    //gameState, play
    displayScore();
    spawnObstacles();
    spawnClouds();
    moveTrex();
    

       if (obstaclesGroup.isTouching(trex)) {
           //if trex touches any obstacles game state is end
           dieSound.play();
           gameState = END;
        
       }
  }
  
  else if (gameState === END) {
      over.visible = true;
      restart.visible = true;
    
    
    endGame();
         
    }

  trex.collide(invisibleGround);

  drawSprites();

}

function spawnClouds() {
  // how to spawnclouds every  60 frames.
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 320, 40, 10);
    cloudsGroup.add(cloud);
    cloud.addImage(cloudImage)
    //the y coordinate of the cloud would be set randomly
    cloud.y = Math.round(random(10, 60))
    cloud.scale = 0.8;
    cloud.velocityX = -3;

    //assigning lifetime to the variable
    //lifetime is set for -1 so it doesnt disappear
    cloud.lifetime = -1;

    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
  }
}


function spawnObstacles() {

  if (frameCount % 60 === 0) {
    obstacle = createSprite(600, 180, 40, 10);
    obstacle.velocityX = -5 - score/50;
    var rand = Math.round(random(1, 6));
    obstaclesGroup.add(obstacle);

    //randomly pick which obstacle image we want
    switch (rand) {

      case 1:
        obstacle.addImage("ob", obstacleImage1);
        break;
      case 2:
        obstacle.addImage("ob", obstacleImage2);
        break;
      case 3:
        obstacle.addImage("ob", obstacleImage3);
        break;
      case 4:
        obstacle.addImage("ob", obstacleImage4);
        break;
      case 5:
        obstacle.addImage("ob", obstacleImage5);
        break;
      case 6:
        obstacle.addImage("ob", obstacleImage6);
        break;
      default:
        break;
    }

    obstacle.scale = 0.5;
    obstacle.lifetime = -1;

  }

}

function displayScore() {

  score = score + Math.round(getFrameRate() / 60);

  
  if(score%50===0 && score > 0 ) {
   checkSound.play(); 
  }
  

}

function reset() {

  console.log("hello");
  restart.visible = false;
  over.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  score =0;
  gameState=PLAY;
  
  trex.changeAnimation("running",trex_running);
  
  
}

