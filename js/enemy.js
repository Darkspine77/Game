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
      dropStats = ['This is a test item']
      drop = new item('resource','test',dropStats,-1);
      obj = {
        item: drop,
        quantity: 1
      };
      if(leveldrops.length != 0){
        for (var i = leveldrops.length - 1; i >= 0; i--) {
          if(leveldrops[i].drop = drop){
            leveldrops[i].quantity += obj.quantity
          } else {
            leveldrops.push(obj)
          }
        }
      } else {
        leveldrops.push(obj)
      }
      experience += this.maxHealth
      this.sprite.remove()
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
        pellets.splice(i,1) 
      }
    }
  }

  this.attack = function(){
    if(this.sprite.overlap(players[0].sprite)){
      players[0].stats.health -= 1
      enemies.splice(enemies.indexOf(this),1)
    }
  }

  this.move = function(){
    this.sprite.position.x += this.xvel;
    this.sprite.position.y += this.yvel;
  }
}