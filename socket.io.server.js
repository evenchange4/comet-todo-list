/**
 * @overview
 *
 * @author 
 * @version 2012/06/21
 */
module.exports = function (app) {
    var io = require('socket.io').listen(app),
        collection = require('./collection'),
        cookieParser = require('connect').utils.parseCookie;

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
      io.set('log level', 1);

      io.set('transports', [
        'websocket'
      ]);
    });
   
    io.sockets.on('connection', function (socket) {
        var userCookie = cookieParser(socket.handshake.headers.cookie);
        collection.index(userCookie, function (todos) {
            socket.emit('index', todos); 
        });

        socket.on('create', function (data) {
            collection.create(userCookie, data.content, function (todos) {
                io.sockets.emit('create', todos);     
            });
        });

        socket.on('destory', function (data) {
            collection.destory(userCookie, data.id, function (todos) {
                io.sockets.emit('destory', data);     
            });    
        });
    });

    return io;
};

