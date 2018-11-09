function Shape(x, y, exp, sides) {
	this.pos = createVector(x, y);
	this.exp = exp;
	this.sides = sides;
	this.vel = createVector(0, 0);

	this.update = function() {
		var newvel = createVector(mouseX-width/2, mouseY-height/2);
		newvel.setMag(3);
		this.vel.lerp(newvel, 0.1);
		this.pos.add(this.vel);
	}

	this.eats = function(exp) {
		var d = p5.Vector.dist(this.pos, exp.pos)
		if (d < 64 + 16) {
			this.exp += exp.size
			//this.r = sqrt(sum / PI);
			return true
		} else {
			return false
		}
	}

	this.levelup = function() {
		if (exp >= 180) {
			this.sides = 5;
		}
		if (exp >= 220) {
			this.sides = 7;
		}
		if (exp >= 260) {
			this.sides = 9;
		}
		if (exp >= 300) {
			this.sides = 15;
		}
	}


	this.constrain = function() {
		shape.pos.x = constrain(shape.pos.x, -width, width);
		shape.pos.y = constrain(shape.pos.y, -height, height);
	}

	this.show = function() {
		if (this.sides == 3) {
			push();
			fill(255);
			polygon(this.pos.x, this.pos.y, 64, this.sides);
			//rotate(tan(mouseX/mouseY));
			pop();
		}
	}

	function polygon(x, y, radius, npoints) {
		var angle = TWO_PI / npoints;
  	beginShape();
  	for (var a = 0; a < TWO_PI; a += angle) {
    	var sx = x + cos(a) * radius;
    	var sy = y + sin(a) * radius;
    	vertex(sx, sy);
  	}
  endShape(CLOSE);
	}
}
