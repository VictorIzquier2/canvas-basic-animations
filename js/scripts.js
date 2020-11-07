const draw1 = () => {
  const canvas1 = document.querySelector('#canvas1');
  const ctx1 = canvas1.getContext('2d');

  const drawInCanvas = (x, y, w, h, color) => {
    ctx1.fillStyle = color;
    ctx1.fillRect(x, y, w, h);
  };
  drawInCanvas(10, 20, 30, 30, 'turquoise');
  ctx1.save();
  drawInCanvas(50, 70, 30, 30, 'orangeRed');
  ctx1.save();
  drawInCanvas(120, 150, 30, 30, 'magenta'); 

  ctx1.restore();
  drawInCanvas(200, 70, 30, 30);
  
  ctx1.restore();
  drawInCanvas(250, 20, 30, 30);
};
window.addEventListener('load', draw1());

const updateCanvas = () => {
  
  const canvas2 = document.querySelector('#canvas2');
  const ctx2 = canvas2.getContext('2d');
  
  const color = {
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255),
    rgb: function() {
      return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }
  };
   
    ctx2.clearRect(0, 0, 300, 300);
    //ctx2.fillStyle = color.rgb();
    ctx2.fillRect(75, 75, 150, 150);

    requestAnimationFrame(updateCanvas);
};

window.addEventListener('load', updateCanvas);


const canvas3 = document.querySelector('#canvas3');
const ctx3 = canvas3.getContext('2d');

ctx3.fillStyle = '#ff0000';

let speed1 = 0;
let speed2 = 0;
let speed3 = 0;

const clearCanvas = () => {
  ctx3.clearRect(0, 0, 300, 300);
};

const drawCanvas = (x, y, w, h, color) => {
  ctx3.fillStyle = color;
  ctx3.fillRect(x, y, w, h);
}

const updateCanvas3 = () => {
speed1 += 1;
speed2 += 2;
    speed3 += 3;

    clearCanvas();

    drawCanvas(50, speed1, 50, 50, 'red');
    drawCanvas(175, speed2, 50, 50, 'green');
    drawCanvas(250, speed3, 50, 50, 'yellow');

    requestAnimationFrame(updateCanvas3);

};
window.addEventListener('load', updateCanvas3);

const printCharacter = () => {
  const canvas4 = document.getElementById('canvas4');
  const ctx4 = canvas4.getContext('2d');

  ctx4.fillstyle = 'white';
  ctx4.font = '18px serif';

  class Character {
    constructor() {
      this.x = 25;
      this.y = 25;
      const img = new Image();
      img.addEventListener('load', () => {
        this.img = img;
        this.draw();
      });
      img.src = 'https://media.giphy.com/media/Qr8JE9Hvi7ave/200.gif'
    }
    moveUp(){
      this.y -= 25;
    }
    moveDown(){
      this.y += 25;
    }
    moveLeft(){
      this.x -= 25;
    }
    moveRight(){
      this.x += 25;
    }
    draw(){
      ctx4.drawImage(this.img, this.x, this.y, 50, 50);
    }
  }

  const ghost = new Character();

  document.addEventListener('keydown', (e) => {
    //console.log(e);
    switch(e.keyCode){
      case 38:
        ghost.moveUp();
        //console.log('up', ghost);
        break;
      case 40:
        ghost.moveDown();
        //console.log('down', ghost);
        break;
      case 37:
        ghost.moveLeft();
        //console.log('right', ghost);
        break;
      case 39:
        ghost.moveRight();
        //console.log('right', ghost);
        break;
      case 32:
        ghost.x = 25; ghost.y = 25;
        //console.log('restart', ghost);
        break;
    }
    updateCanvas4();
  });

  const updateCanvas4 = () => {
    ctx4.clearRect(0,0, 300, 300);
    ctx4.fillText('Ghost_x: ' + ghost.x, 200, 20);
    ctx4.fillText('Ghost_y: ' + ghost.y, 200, 40);

    ghost.draw();
  };
};
window.addEventListener('load', printCharacter);

const updateCanvas5 = () => {

  const canvas5 = document.getElementById('canvas5');
  const ctx5 = canvas5.getContext('2d');

  const backgroundImage = {
    img: new Image(),
    x: 0,
    speed: -1,

    move: function () {
      this.x += this.speed;
      this.x %= 300;
    },

    draw: function () {
      ctx5.drawImage(this.img, this.x, 0);
      if (this.speed < 0) {
        ctx5.drawImage(this.img, this.x + 300, 0);
      }else{
        ctx5.drawImage(this.img, this.x - this.img.width, 0);
      }
    },
  };
  backgroundImage.img.src = 'https://orig15.deviantart.net/8bed/f/2015/058/a/8/smb1_background_by_steamerthesteamtrain-d8jq7ea.png';

  backgroundImage.img.addEventListener('load', () => {
    let setIntervalId = 0;
    setIntervalId = setInterval(() =>{
      backgroundImage.move();
      ctx5.clearRect(0, 0, 300, 300);
      backgroundImage.draw();
    }, 40);
  });


};
window.addEventListener('load', updateCanvas5);


const startGame = () => {
  class Component {
    constructor(width, height, color, x, y){
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.speedX = 0;
      this.speedY = 0;
    }
    newPos(){
      this.x += this.speedX;
      this.y += this.speedY;
    }
    update(){
      const ctx6 = myGameArea.context;
      ctx6.fillStyle = this.color;
      ctx6.fillRect(this.x, this.y, this.width, this.height);
      ctx6.fillStyle = 'black';
      ctx6.font = '1rem serif';
      ctx6.fillText(player.x + 'x', 260, 20);
      ctx6.fillText(player.y + 'y', 260, 40);
    }
    left(){
      return this.x;
    }
    right(){
      return this.x + this.width;
    }
    top(){
      return this.y;
    }
    bottom(){
      return this.y + this.height;
    }
    crashWith(obstacle){
      return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
    }
  }

  const obstacles = [];

  const myGameArea = {
    canvas: document.getElementById('canvas6'),
    frames: 0,
    start: function() {
      this.canvas.width = 300;
      this.canvas.height = 300,
      this.context = this.canvas.getContext('2d');
      this.interval = setInterval(updateGameArea, 40);
    },
    stop: function(){
      clearInterval(this.interval);
    },
    clear: function() {
      this.context.clearRect(0, 0, 300, 300);
    },
    score: function(){
      const points = Math.floor(this.frames / 60);
      this.context.font = '1rem serif';
      this.context.fillStyle = 'navy';
      this.context.fillText(`Score: ${points}`, 20, 20);
    }
  };

  const player = new Component(30, 30, 'red', 10, 110);
  
  const updateObstacles = () => {
    
    myGameArea.frames += 1;
    if(myGameArea.frames % 60 === 0) {
      let x = myGameArea.canvas.width;
      let minHeight = 20;
      let maxHeight = 120;
      let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
      let minGap = 50;
      let maxGap = 180;
      let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      obstacles.push(new Component(10, height, 'green', x, 0));
      obstacles.push(new Component(10, x - height - gap, 'green', x, height + gap));
    }
    for(i = 0; i < obstacles.length; i++){
      obstacles[i].x += -1;
      obstacles[i].update();
    }
  };
  
  const checkGameOver = () => {
    const crashed = obstacles.some(function(obstacle) {
      return player.crashWith(obstacle);
    });
    if(crashed){
      myGameArea.stop();
    }
  };

  const updateGameArea = () => {
    myGameArea.clear();
    player.newPos();
    player.update();
    updateObstacles();
    checkGameOver();
    myGameArea.score();
  };

  document.addEventListener('keydown', (e) =>{
    console.log(e)
    switch(e.keyCode){
      case 87:
        player.speedY = -5;
        break;
      case 83:
        player.speedY = 5;
        break;
      case 65:
        player.speedX = -5;
        break;
      case 68:
        player.speedX = 5;
        break;
    }
  });
  document.addEventListener('keyup', (e) =>{
    player.speedX = 0;
    player.speedY = 0;
  });
  myGameArea.start();
  
};
window.addEventListener('load', startGame); 