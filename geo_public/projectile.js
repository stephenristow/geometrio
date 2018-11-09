function Projectile(x_pos, y_pos, bulletVel) {
  this.posit = createVector(x_pos, y_pos); // projectile has x & y location
  this.bulletVel = bulletVel.setMag(3); // sets magnitude of vector to 3

	this.tick = function() {
		//this.bulletVel.lerp(newvel, 0.1);
		this.posit.add(this.bulletVel);
	}

  //this.show() = function() {
  //  push();
  //  fill(100, 0, 0);
  //  ellipse(this.pos.x, this.pos.y, 16, 16);
  //  pop();
  //}
}
