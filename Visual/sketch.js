let cols;
let rows;
let current; 
let previous; 
let dampening = 0.99;
let gravity;
let stars = [];
let phase = 0;
let sliderNoise;
let sliderLoop;
let sliderPhase;
let sliderBGAlpha;
let b = 0;
let inc = 0.5;
let scl = 70;
let cls, rws;
let zoff = 0;
let fr;
let particles = [];
let flowfield;

function mouseDragged() {
  previous[mouseX][mouseY] = frameCount % 60;
}

function mousePressed(){
  current[mouseX][mouseY] = frameCount % 60;
}


function setup(){
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  cls = floor(width / scl);
  rws = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cls * rws);

  for (let i = 0; i < 600; i++) {
    particles[i] = new Particle();
  }

  background(0);
  
  gravity = createVector(0, 0.02);

  cols = windowWidth;
  rows = windowHeight;
  current = make2Darray(cols, rows);
  previous = make2Darray(cols, rows);
  sliderNoise = createSlider(0, 10, 3, 0.1).position(windowWidth*0.15, windowHeight*0.95); 
  sliderLoop = createSlider(-10, 10, 0.3, 0.1).position(windowWidth*0.35, windowHeight*0.95);
  sliderPhase = createSlider(-3.6, 3.6, 0, 0.1).position(windowWidth*0.55, windowHeight*0.95);
  sliderBGAlpha = createSlider(1, 255, 5, 1).position(windowWidth*0.75, windowHeight*0.95);
  
}

function draw(){ 
  // step 1
  if(key == '1'){
    drawWebNet();
  }
  
  // step 2
  if(key == '2'){
    drawWaterRipple();
  }

  // step 3
  if(key == '3'){
    starFalls();
  }

  // step 4
  if(key == '4'){
    starFalls();
    drawCircle();
  }
  
}


function starFalls(){
    for(var i = 0; i < 1; i++){
      stars.push(new star());
    }

    for(item of stars){
      item.update();
      item.drawStar();
    }
}

function drawCircle() {
  let noiseMax = sliderNoise.value();
  let loopSpeed = sliderLoop.value();
  let phaseSpeed = sliderPhase.value();
  let bgAlpha = sliderBGAlpha.value();


  colorMode(RGB);
  background(0, bgAlpha);
  translate(width / 2, height / 2);
  strokeWeight(2);
  noFill();

  colorMode(HSB);
    let xoff = map(cos(radians(-1) + phase), -1, 1, -noiseMax, noiseMax)+cos(b)
    let yoff = map(sin(radians(-1) + phase), -1, 1, -noiseMax, noiseMax)+sin(b)
    let r = map(noise(100+xoff, 100+yoff), 0, 1, 100, height / 2);
    let lastX =r * cos(radians(-1));
    let lastY =r * sin(radians(-1));
    for (let a = 0; a < TWO_PI; a += radians(1)) {
      xoff = map(cos(a + phase), -1, 1, -noiseMax, noiseMax)+cos(b)
      yoff = map(sin(a + phase), -1, 1, -noiseMax, noiseMax)+sin(b)
      r = map(noise(100+xoff, 100+yoff), 0, 1, 100, height / 2);
      let x = r * cos(a);
      let y = r * sin(a);
      stroke(255);
      line(lastX, lastY, x, y);
      lastX = x;
      lastY = y;
    }
	b += radians(loopSpeed)
	phase += radians(phaseSpeed)
}

function drawWebNet(){
  let yoff = 0;  
  
  for (let y = 0; y < rws; y++) {
    let xoff = 0;
    for (let x = 0; x < cls; x++) {
  
      let index = x + y * cls;
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0,50)
    }
    yoff += inc;
    stroke(0,50);
    zoff += 0.0003;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
    
  }
}

function drawWaterRipple(){

  r = frameCount%35;
  loadPixels();
  for (let i = 1; i < cols - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      current[i][j] =
        (previous[i - 1][j] +
          previous[i + 1][j] +
          previous[i][j - 1] +
          previous[i][j + 1]) /
          2 -
        current[i][j];
      current[i][j] = current[i][j] * dampening;
          
      let index = (i + j * cols) * 4;
      pixels[index + 0] = current[i][j] * r;
      pixels[index + 1] = current[i][j] * 82;
      pixels[index + 2] = current[i][j] * 250;
    }
  }
  updatePixels();

  let temp = previous;
  previous = current;
  current = temp;
}


function make2Darray(cols, rows){
   var array = new Array(cols);

   for(var i = 0; i < array.length; i++){

      array[i] = new Array(rows);

   }
  
  for(var x = 0; x < cols; x++){
    for(var y = 0; y < rows; y++){
      array[x][y] = 0;
      
    }
  }

   return  array;
}



