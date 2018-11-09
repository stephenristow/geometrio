var shapes = []; // list of player shapes in map
var projectiles = []; // list of projectiles in map
var exps = []; // list of exps in map

function Shape(id, x, y, exp, sides) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.exp = exp;
  this.sides = sides;
}

var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('./geo_public'));

console.log('Server started on port 3000');

var io = require('socket.io')(server);

setInterval(heartbeat, 33);

function heartbeat() {
  io.sockets.emit('heartbeat_shapes', shapes);
  io.sockets.emit('heartbeat', projectiles);
  io.sockets.emit('heartbeat', exps);
}

io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log('We have a new client: ' + socket.id);

  //var shape = new Shape(socket.id, 0, 0, 64, 3);
  //shapes.push(shape);

  socket.on('start_shape',
    function(data) {
      console.log(socket.id + '' + data.x + '' + data.y + '' + data.exp + '' + data.sides);
      var shape = new Shape(socket.id, data.x, data.y, data.exp, data.sides);
      shapes.push(shape);
    });

  // socket.on('start_exp',
  //   function(expData) {
  //     //console.log(socket.id + '' + data.x + '' + data.y + '' + data.exp + '' + data.sides);
  //     var exp = new Exp(expData.expX, expData.expY, expData.expSize);
  //     exps.push(exp);
  //   });

  socket.on('update_shapes',
      function(data) {
        //console.log(socket.id + '' + data.x + '' + data.y + '' + data.r);

        var shape;
        for (var i = 0; i < shapes.length; i++) {
          if (socket.id == shapes[i].id) {
            shape = shapes[i];
          }
        }

        shape.x = data.x;
        shape.y = data.y;
        shape.exp = data.exp;
        shape.sides = data.sides;
      });

    socket.on('update_projectiles',
        function(data) {
          //console.log(socket.id + '' + data.x + '' + data.y + '' + data.r);
          projectiles = data;
      });
}
