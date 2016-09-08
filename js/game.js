terrain = [] 
pellets = []
players = []
enemies = []
experience = 0 
level = 0 
kills = 0
leveldrops = []
spawnDelay = 0
enemiesLeft = 0 
spawnTimer = 0 
gameStatus = ""
levelTimer = 0
completionTime = 0
currentSP = null
totalExp = 0
userloaded = false
user = null
adding = []
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  displayUser()
  console.log('user info loaded') 
  } else {
   console.log('no user loaded')
  }
});

function displayUser(){
  user = firebase.auth().currentUser
}


function setup(){   // Hide
currentSP = new statProfile()
gameStatus = "Menu"
canvas = createCanvas(windowWidth,windowHeight)
canvas.parent('canvas');
canvas.hide()  
ground = createSprite(windowWidth/2,windowHeight,windowWidth,50)
terrain.push(ground)
player = new player(windowWidth/2,windowHeight/2)
players.push(player)


  menuButtons = createDiv('')
  menuButtons.id('menuButtons')
  menuButtons.parent('HUD')
  start = createButton('Start Level');
  start.id('start')
  start.parent('menuButtons')
  start.mousePressed(gameStart);
  showinv = createButton('View Inventory');
  showinv.id('showinv')
  showinv.parent('menuButtons')
  showinv.mousePressed(showInv);
  inv = createDiv('');
  inv.id('inventory')
  inv.hide()
    menuButtons.show()
}

function showInv(){
inv.show()

showinv.mousePressed(hideInv);   
document.getElementById('showinv').textContent = 'Hide Inventory';
firebase.database().ref('players/' + user.uid).once('value').then(function(snapshot) {  
showInv = snapshot.val().Inventory   
  for (var i = shownInv.length - 1; i >= 0; i--) {
   $("inventory").prepend(
                        '<div id=""><h1>' + shownInv[i].item.name + '</h1><p> Amount: ' + shownInv[i].quantity + '</p></div>'
                  );
    }
  });   
}

function hideInv(){
inv.hide()
showinv.mousePressed(showInv);   
document.getElementById('showinv').textContent = 'Show Inventory';     // Show
}


function gameStart(){
  canvas.show()
  experience = 0
  document.getElementById('results').textContent = ""
  gameStatus = 'Playing'
  levelTimer = millis()
  level += 1 
  leveldrops = [] 
  adding = []
  console.log(adding)
  players[0].stats.health = players[0].stats.maxHealth
  enemiesLeft = 1
  menuButtons.hide()
  console.log("Inv length: " + leveldrops.length) 

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
  text(players[0].stats.health,windowWidth/2, 50)
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
if(players[0].stats.health <= 0){
gameStatus = "Lose"
background(255)
}
if(enemiesLeft <= 0){
canvas.hide()
players[0].stats.totalExp += experience
    firebase.database().ref('players/' + user.uid).once('value').then(function(snapshot) {
      serverInv = snapshot.val().Inventory
      for (var i = leveldrops.length - 1; i >= 0; i--) {
          exists = false
          for (var ix = serverInv.length - 1; ix >= 0; ix--) {
            if(serverInv[ix].item.name == leveldrops[i].item.name){
              serverInv[ix].quantity += leveldrops[i].quantity
              exists = true
            }
          }
            flag = adding.indexOf(leveldrops[i]) >= 0
            if(!flag && !exists){
          adding.push(leveldrops[i])
          }
      }
    for (var i = adding.length - 1; i >= 0; i--) {
      serverInv.push(adding[i])
    }

      firebase.database().ref('players/' + user.uid).set({
                'SP': currentSP,
                'Inventory': serverInv
      });
  });
menuButtons.show()
gameStatus = "Win"
completionTime = Math.round((millis() - levelTimer)/1000)
document.getElementById('results').textContent = "You completed the level in " + completionTime + "seconds! You gained " + experience + " from this level and now have " + totalExp + " experience."
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

function statProfile(){
  this.maxHealth = 10
  this.health = this.maxHealth
  this.fireDelay = 1000
  this.damage = 1
  this.bulletSpeed = 3 
  this.totalExp = 0
}

function item(def,name,stats,durability){
  this.name = name
  this.stats = stats
  this.maxDurability = durability
  this.durability = durability
  this.def = def 
}