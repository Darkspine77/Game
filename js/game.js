terrain = [] 
pellets = []
players = []
enemies = []
experience = 0 
level = 0 
kills = 0
spawnDelay = 0
health = 0
enemiesLeft = 0 
spawnTimer = 0 
gameStatus = ""
levelTimer = 0
totalExp = 0
completionTime = 0

function setup(){
gameStatus = "Menu"
canvas = createCanvas(windowWidth,windowHeight)
canvas.parent('canvas');  
ground = createSprite(windowWidth/2,windowHeight,windowWidth,50)
terrain.push(ground)
player = new player(windowWidth/2,windowHeight/2)
players.push(player)
  start = createButton('click me');
  start.id('start')
  start.parent('HUD')
  start.mousePressed(gameStart);
      start.show()
}

function gameStart(){
  experience = 0
  gameStatus = 'Playing'
  levelTimer = millis() 
  health = 10
  enemiesLeft = 20
  start.hide()
}

function draw(){
  if(gameStatus == "Playing"){

    runGame()
  }
  if(gameStatus == "Menu"){
    runMenu()
  }
  if(gameStatus == "Win"){
    runMenu()
  }
}

function runMenu(){

}

function runGame(){
   fill(255,0,0)
  textSize(48)
  background(255)
  text(health,windowWidth/2, 50)
  fill(0,255,0)
    text(enemiesLeft,windowWidth/2, 100)
    players[0].run()
    drawSprite(players[0].sprite)
    spawnEnemy()
    for (var i = pellets.length - 1; i >= 0; i--) {
      drawSprite(pellets[i].sprite)
      pellets[i].run()
    }
    for (var i = enemies.length - 1; i >= 0; i--) {
      drawSprite(enemies[i].sprite)
      enemies[i].run()
    }
    endGame()
}

function endGame(){
if(health <= 0){
gameStatus = "Lose"
}
if(enemiesLeft <= 0){
start.show()
gameStatus = "Win"
completionTime = millis() - levelTimer
totalExp += experience
document.getElementById('results').textContent = "You completed the level in " + completionTime + "! You gained " + experience + " from this level and now have " + totalExp + " experience."
}
}

function spawnEnemy(){
if(millis() > spawnTimer){
  choice = int(random(1,3))
  xpos = 0
  if(choice == 1){
  xpos = windowWidth - 50
  }
  if(choice == 2){
  xpos = 50
  }
  enemies.push(new enemy(xpos,windowHeight/2,1))
  spawnTimer = millis() + 1000 
}
}

function player(x,y){
  this.sprite = createSprite(x,y,25,25) 
  this.xvel = 0
  this.yvel = 0
  this.facing = 'L' 
  this.aimCoords = {
      'x': 0,
    }
  this.shootDelay = 0 

  this.run = function(){
    this.move() 
    this.controls()
    this.attack()
    this.aimCoords.x = touchX
    this.aimCoords.x = mouseX
  } 

  this.attack = function(){
    pressed = touchIsDown || mouseIsPressed 
    if(millis() > this.shootDelay && pressed){
      dir = 0
      if(this.facing == 'L'){
        dir = -3
      }
      if(this.facing == 'R'){
        dir = 3
      }
      pellets.push(new pellet(this.sprite.position.x,this.sprite.position.y,dir,0,1))
      this.shootDelay = millis() + 1000 
    }
  }

  this.move = function(){
    this.sprite.position.x += this.xvel
    this.sprite.position.y += this.yvel
  }

  this.controls = function(){ 
  if(touchIsDown || mouseIsPressed){
      if(this.aimCoords.x > this.sprite.position.x){
        this.facing = 'R'
      }
      if(this.aimCoords.x < this.sprite.position.x){
        this.facing = 'L'
      }
    }
  }
}


function pellet(x,y,xvel1,yvel1,damage1){
  this.sprite = createSprite(x,y,10,10) 
  this.xvel = xvel1
  this.yvel = yvel1
  this.damage = damage1 

  this.run = function(){
    this.move() 
    if(this.sprite.position.x > windowWidth || this.sprite.position.x < 0){
      pellets.splice(pellets.indexOf(this),1)
    }
  } 

  this.move = function(){
    this.sprite.position.x += this.xvel
    this.sprite.position.y += this.yvel
  }
} 

function enemy(x,y,health1){ 
  this.sprite = createSprite(x,y,25,25) 
  this.xvel = 0
  this.yvel = 0
  this.size1 = 25
  this.health = health1 
  this.maxHealth = health1
  if(this.sprite.position.x > players[0].sprite.position.x){
  this.xvel = -3
  } 
  if(this.sprite.position.x < players[0].sprite.position.x){
  this.xvel = 3
  } 

  this.run = function(){
    this.move() 
    this.attack()
    this.collide()
    this.drawHealth()
    if(this.health <= 0 ){
      enemies.splice(enemies.indexOf(this),1)
      kills += 1
      enemiesLeft -= 1
      experience += this.maxHealth
    }
  }

    this.drawHealth = function(){
      strokeWeight(4);
      stroke(255, 0, 0);
      line(this.sprite.position.x-this.size1, this.sprite.position.y-this.size1, this.sprite.position.x+this.size1, this.sprite.position.y-this.size1); 
      stroke(0, 255, 0);
      line(this.sprite.position.x-this.size1, this.sprite.position.y-this.size1, (this.health*((this.sprite.position.x+this.size1)-(this.sprite.position.x-this.size1)))/this.maxHealth + (this.sprite.position.x-this.size1), this.sprite.position.y-this.size1);  
      stroke(0, 0, 0);
      strokeWeight(1);
  } 

  this.collide = function(){
    for (var i = pellets.length - 1; i >= 0; i--) {
      if(this.sprite.overlap(pellets[i].sprite)){
        this.health -= pellets[i].damage
        pellets.splice(pellets[i],1) 
      }
    }
  }

  this.attack = function(){
    if(this.sprite.overlap(players[0].sprite)){
      health -= 1
      enemies.splice(enemies.indexOf(this),1)
    }
  }

  this.move = function(){
    this.sprite.position.x += this.xvel;
    this.sprite.position.y += this.yvel;
  }
}