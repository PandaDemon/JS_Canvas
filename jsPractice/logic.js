const canvas = document.getElementById('canvas');
const w = canvas.width = 530px;
const h = canvas.height = 530px;

const ctx = canvas.getContext('2d');

const {sin, cos, random} = Math;


let option = {
  size: 1000,
  point: 12.55,
  speed: 0.005
};

let sqAr = [];
let tick =10;


let infoBlock = document.querySelector(".info");


let size = document.createElement('input');
size.type = "range";
size.innerHTML = "Sized";
size.min = "1000";
size.max = "4000";
size.step = "1";
inps.appendChild(size);

let point = document.createElement('input');
point.type = "range";
point.innerHTML = "Point";
point.min = "-100";
point.max = "200";
point.step = "10";
point.value = "0";
inps.appendChild(point);

let speed = document.createElement('input');
speed.innerHTML = "Speed";
speed.type = "range";
speed.min = "-0.1";
speed.max = "0.1";
speed.step = "0.0005";
speed.value = "0";
inps.appendChild(speed);


size.addEventListener('input',(e)=>{
  option.size = +e.target.value;
});
point.addEventListener('input',(e)=>{
  option.point = +e.target.value;
});
speed.addEventListener('input',(e)=>{
  option.speed = +e.target.value;
});



function infoBox(){
infoBlock.innerHTML=
  `
  <p class='item'>Size:<span>${option.size}</span> </p>
  <p class='item'>Point:<span>${option.point}</span> </p>
<p class='item'>Speed:<span>${option.speed}</span> </p>
<p class='item'>Tick: <span>${Math.floor(tick*100) /100}</span></p>
  `;
}

class Flo {
  constructor(){
    this.zF = 540;
    this.size = 3;
    this.r = this.zF / 2.1;
    this.center = 0;
  }
  setFlo(value, i){
    let j =  Math.PI - (Math.PI / option.size * i);
    let b =  Math.PI*value / option.size* i;
    let zF = this.zF / (this.zF + option.point - this.r);
    
    let zz = this.center - zF * sin(j) * this.size;
    let x = this.center - this.r * sin(j)*sin(b);
    let y = this.center - this.r * cos(j) *cos(b);
    let z = Math.abs(zz); 
    ctx.beginPath();
    ctx.fillStyle = "#EF5350";
    ctx.arc(x, y, z/2, 0, Math.PI*2);
    ctx.fill();
  }
}

for(let i = 0; i < 1000; i++){
  sqAr.push(new Flo());
}

function animate(){
  ctx.clearRect(-w,-h,2*w,2*h);
  ctx.save();
  ctx.translate(w/2, h/2);
  sqAr.forEach((v, i)=>v.setFlo(tick, i));
  ctx.restore();
  tick += (0.7 * option.speed);
  
  infoBox();
  
  window.requestAnimationFrame(animate);
}
animate();

