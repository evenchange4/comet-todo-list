/**
 * @overview
 *
 * @author 
 * @version 2012/06/21
 */
module.exports = function (app) {
    var io = require('socket.io').listen(app);

    io.configure('production', function(){
      io.set('log level', 1);

      io.set('transports', [
        'websocket'
      , 'flashsocket'
      , 'htmlfile'
      , 'xhr-polling'
      , 'jsonp-polling'
      ]);
    });

    io.configure('development', function(){
      io.set('log level', 2);

      io.set('transports', [
        'websocket'
      ]);
    });
   
    io.sockets.on('connection', function (socket) {
        console.log("welcome user login");        
    });

    return io;
};

