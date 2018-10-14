var shape;

var shapes = [];
var zoom = 1;

function setup() {
	createCanvas(600, 600);
	shape = new Shape(0, 0, 64);
	for (var i = 0; i < 10; i++) {
		var x = random(-width, width);
		var y = random(-height, height);
		shapes[i] = new Shape(x, y, 16);
	}
}

function draw() {
	background(0);

	translate(width/2, height/2);

	var newzoom = 64 / shape.r;
	zoom = lerp(zoom, newzoom, 0.1);
	scale(zoom);
	translate(-shape.pos.x, -shape.pos.y);
	
	for (var i = shapes.length-1; i >= 0; i--) {
		shapes[i].show();
		if (shape.eats(shapes[i])) {
			shapes[i].splice(i, 1);
		}
	}

	shape.show();
	shape.update();
}