class star{
  constructor() {
		let x = random(windowWidth);
		let y = random(-100, -10);
		this.position = createVector(x, y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector();
    this.size = random(2,4)
	}
	
  update(){
    this.acceleration = gravity;
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

	drawStar(){
    stroke(random(255));
    strokeWeight(this.size);
    point(this.position.x, this.position.y);
  }
}