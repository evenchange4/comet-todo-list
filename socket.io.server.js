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

:qa
      io.set('transports', [
        'websocket'
      ]);
    });


    // TODO: move parse cookie part to socket.io authorize
    // reference: https://github.com/gravityonmars/Balloons.IO/blob/master/balloons.js
   
    io.sockets.on('connection', function (socket) {
        //var userCookie = cookieParser(socket.handshake.headers.cookie);
        var room_id = socket.handshake.headers.referer.split('/').pop();

        var userCookie = {
                room_id: room_id
            };

        socket.join(room_id);

        collection.index(userCookie, function (todos) {
            socket.emit('index', todos); 
        });

        socket.on('create', function (data) {
            collection.create(userCookie, data.content, function (todos) {
                io.sockets.in(room_id).emit('create', todos);     
            });
        });

        socket.on('edit', function (data) {
            collection.edit(userCookie, data, function (todos) {
                io.sockets.in(room_id).emit('edit', todos);     
            });    
        });

        socket.on('destory', function (data) {
            collection.destory(userCookie, data.id, function (todos) {
                io.sockets.in(room_id).emit('destory', data);     
            });    
        });
    });

    return io;
};

