function player(x,y){
  this.sprite = createSprite(x,y,25,25) 
  this.size1 = 25
  this.xvel = 0
  this.yvel = 0
  this.facing = 'L' 
  this.aimCoords = {
      'x': 0,
    }
  this.shootDelay = 0
  this.stats = currentSP
  console.log(this.stats)

  this.run = function(){
    this.move() 
    this.controls()
    this.attack()
    this.aimCoords.x = touchX
    this.aimCoords.x = mouseX
  }

  this.drawHealth = function(){
      strokeWeight(4);
      stroke(255, 0, 0);
      line(this.sprite.position.x-this.size1, this.sprite.position.y-this.size1, this.sprite.position.x+this.size1, this.sprite.position.y-this.size1); 
      stroke(0, 255, 0);
      line(this.sprite.position.x-this.size1, this.sprite.position.y-this.size1, (this.stats.health*((this.sprite.position.x+this.size1)-(this.sprite.position.x-this.size1)))/this.sprites.maxHealth + (this.sprite.position.x-this.size1), this.sprite.position.y-this.size1);  
      stroke(0, 0, 0);
      strokeWeight(1);
  } 
 

  this.attack = function(){
    pressed = touchIsDown || mouseIsPressed 
    if(millis() > this.shootDelay && pressed){
      dir = 0
      if(this.facing == 'L'){
        dir = -1 * this.stats.bulletSpeed
      }
      if(this.facing == 'R'){
        dir = 1 * this.stats.bulletSpeed
      }
      pellets.push(new pellet(this.sprite.position.x,this.sprite.position.y,dir,0,1))
      this.shootDelay = millis() + this.stats.fireDelay
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