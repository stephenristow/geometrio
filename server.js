var shapes = [];

function Shape(id, x, y, r) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.r = r;
}

var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('./geo_public'));

console.log('Server started on port 3000');

var io = require('socket.io')(server);

setInterval(heartbeat, 33);

function heartbeat() {
  io.sockets.emit('heartbeat', shapes);
}

io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log('We have a new client: ' + socket.id);

  var shape = new Shape(socket.id, 0, 0, 64);
  shapes.push(shape);

  socket.on('start',
    function(data) {
      console.log(socket.id + '' + data.x + '' + data.y + '' + data.r);
      var shape = new Shape(socket.id, data.x, data.y, data.r);
      shapes.push(shape);
    });

  socket.on('update',
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
        shape.r = data.r;
      });
}
