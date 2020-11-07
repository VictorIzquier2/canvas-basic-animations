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
    console.log(e);
    switch(e.keyCode){
      case 38:
        ghost.moveUp();
        console.log('up', ghost);
        break;
      case 40:
        ghost.moveDown();
        console.log('down', ghost);
        break;
      case 37:
        ghost.moveLeft();
        console.log('right', ghost);
        break;
      case 39:
        ghost.moveRight();
        console.log('right', ghost);
        break;
      case 32:
        ghost.x = 25; ghost.y = 25;
        console.log('restart', ghost);
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