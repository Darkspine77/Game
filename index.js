terrain = [] 
pellets = []
players = []
enemies = []
spawnDelay = 0

function setup(){
canvas = createCanvas(windowWidth,windowHeight) 
ground = createSprite(windowWidth/2,windowHeight,windowWidth,50)
terrain.push(ground)
player = new player(windowWidth/2,windowHeight - 50)
players.push(player)
enemies.push(new enemy(0,windowHeight - 50,3))
}

function draw(){
  background(255)
    players[0].run()
    drawSprite(players[0].sprite)
    for (var i = pellets.length - 1; i >= 0; i--) {
      drawSprite(pellets[i].sprite)
      pellets[i].run()
    }
    for (var i = enemies.length - 1; i >= 0; i--) {
      drawSprite(enemies[i].sprite)
      enemies[i].run()
    }
    // if(millis() > spawnDelay){
    //   enemies.push(new enemy(0,windowHeight - 50,2))
    //   spawnDelay = millis() + 1000
    // }
}

function player(x,y){
  this.sprite = createSprite(x,y,25,25) 
  this.xvel = 0
  this.yvel = 0
  this.facing = 'L' 
  this.aimCoords = {
      'x': 0,
      'y': 0
    }
  this.shootDelay = 0 

  this.run = function(){
    this.move() 
    this.controls()
    this.attack()
    this.aimCoords.x = touchX
    this.aimCoords.y = touchY
  } 

  this.attack = function(){
    if(millis() > this.shootDelay){
      dir = 0
      if(this.facing == 'L'){
        dir = -3
      }
      if(this.facing == 'R'){
        dir = 3
      }
      pellets.push(new pellet(this.sprite.position.x,this.sprite.position.y,dir,0,1))
      this.shootDelay = millis() + 500
    }
  }

  this.move = function(){
    this.sprite.position.x += this.xvel
    this.sprite.position.y += this.yvel
  }

  this.controls = function(){ 
  if(touchIsDown){
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
  pellets.push(this)

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
  this.health = health1 
  this.maxHealth = health1
  if(this.sprite.position.x > players[0].sprite.position.x){
  this.xvel = -3
  } 
  if(this.sprite.position.x < players[0].sprite.position.x){
  this.xvel = 3
  } 
  enemies.push(this)

  this.run = function(){
    this.move() 
    this.attack()
    this.collide()
    if(this.health <= 0 ){
      enemies.splice(enemies.indexOf(this),1)
    }
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
      enemies.splice(enemies.indexOf(this),1)
    }
  }

  this.move = function(){
    this.sprite.position.x += this.xvel
    this.sprite.position.y += this.yvel
  }
}