var socket;

var shape;
var id;


var shapes = [];
var projectiles = [];
var exps = [];

//var zoom = 1;

function setup() {
	createCanvas(600, 600);

	socket = io.connect('http://localhost:3000');
	//socket.on('mouse', newDrawing);

	shape = new Shape(random(width), random(height), 100, 0, 9);

	var data = {
		x: shape.pos.x,
		y: shape.pos.y,
		health: shape.health,
		exp: shape.exp,
		sides: shape.sides
	}
	socket.emit('start_shape', data);

	socket.on('heartbeat_shapes',
		function(data) {
			shapes = data;
			//console.log(data);
		}
	);


	for (var i = 0; i < 50; i++) {
		var x = random(-width, width);
		var y = random(-height, height);
		exps[i] = new Exp(x, y, 16);
		var expData = {
			expX: exps[i].pos.x,
			expY: exps[i].pos.y,
			expSize: exps[i].size
		}
		socket.emit('start_exp', expData);
	}
}

function draw() {
	background(180);

	translate(width/2, height/2);

	translate(-shape.pos.x, -shape.pos.y);


	//rotate(tan(mouseX/mouseY));

	for (var i = shapes.length-1; i >= 0; i--) {
		if (shapes[i].id !== socket.id) {
			push();
			fill(112);
			polygon(shapes[i].x, shapes[i].y, 64, shapes[i].sides);
			pop();
		}
	}
	//setInterval(function() {
	if (mouseIsPressed) {
		var bulletVel = createVector(mouseX, mouseY);
		var projectile = new Projectile(shape.pos.x, shape.pos.y, bulletVel);
		projectiles.push(projectile);
		//}}, 330);
	}



	for (var k = 0; k < exps.length; k++) {
		if (shape.eats(exps[k])) { // if exp is eaten, spawns new exp at random location and draws it
			//exps.splice(k, 1);
			exps[k] = new Exp(random(-width, width), random(-height, height), 16);
			fill(136, 255, 137);
		  ellipse(exps[k].pos.x, exps[k].pos.y, 16, 16);
			//exps[k].show();
		}
		else {
			fill(136, 255, 137);
		  ellipse(exps[k].pos.x, exps[k].pos.y, 16, 16);
			//exps[k].show(); // if exp is not eaten, draws exp
		}
	}

	shape.show();
	shape.update();
	shape.constrain();

	var data = {
		x: shape.pos.x,
		y: shape.pos.y,
		health: shape.health,
		exp: shape.exp,
		sides: shape.sides,
		//updShape: [shape.pos.x, shape.pos.y, shape.exp, shape.sides]
		//updProjectiles: projectiles,
		//updExps: exps
	}


	for (var j = 0; j < projectiles.length; j++) {
		fill(255, 255, 0);
		polygon(projectiles[j].posit.x, projectiles[j].posit.y, 16, 3); // draws all projectiles
		projectiles[j].tick(); // updates all projectiles
	}

	socket.emit('update', data);
	//socket.emit('update_projectiles', projectiles);

	// var expUpd = {
	// 	expUpdX: shape.pos.x,
	// 	expUpdY: shape.pos.y,
	// 	expUpdSize: shape.exp,
	// 	sides: shape.sides
	// }


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
