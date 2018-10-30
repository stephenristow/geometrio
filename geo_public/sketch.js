var socket;

var shape;
var id;


var shapes = [];
var zoom = 1;

function setup() {
	createCanvas(600, 600);

	socket = io.connect('http://localhost:3000');
	socket.on('mouse', newDrawing);

	shape = new Shape(random(width), random(height), 64);

	var data = {
		x: shape.pos.x,
		y: shape.pos.y,
		r: shape.r,
	}
	socket.emit('start', data);

	socket.on('heartbeat',
		function(data) {
			shapes = data;
			//console.log(data);
		}
	);
	//for (var i = 0; i < 10; i++) {
	//	var x = random(-width, width);
	//	var y = random(-height, height);
	//	shapes[i] = new Shape(x, y, 16);
	//}
}

function draw() {
	background(0);

	translate(width/2, height/2);

	var newzoom = 64 / shape.r;
	zoom = lerp(zoom, newzoom, 0.1);
	scale(zoom);
	translate(-shape.pos.x, -shape.pos.y);

	for (var i = shapes.length-1; i >= 0; i--) {
		var id shapes[i].id;
		if (id.substring(2, id.length) !== socket.id) {
			fill(0, 0, 255);
			ellipse(shapes[i].x, shapes[i].y, shapes[i].r * 2, shapes[i].r * 2);
		}
		//if (shape.eats(shapes[i])) {
		//	shapes[i].splice(i, 1);
		//}
	}

	shape.show();
	shape.update();
	shape.constrain();

	var data = {
		x: shape.pos.x,
		y: shape.pos.y,
		r: shape.r,
	}
	socket.emit('update', data);
}
