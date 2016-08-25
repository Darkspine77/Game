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