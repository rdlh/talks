var express   = require('express');
var routes    = require('./routes');
var admin     = require('./routes/admin');
var http      = require('http');
var path      = require('path');
var stylus    = require('stylus')
var nib       = require('nib')
var favicon   = require('serve-favicon');

var app       = module.exports.app = express();

var server    = http.createServer(app);
var io        = require('socket.io').listen(server);

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compile: compile
  }
))
app.use(express.static(path.join(__dirname, 'public')));


global.current_slide = 1

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/admin', admin.list);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.on('connection', function (socket) {
  socket.emit('change_slide', { slide: global.current_slide });
  socket.on('slide_changed', function (data) {
    global.current_slide = data.slide
    io.emit('change_slide', { slide: global.current_slide });
  });
});
