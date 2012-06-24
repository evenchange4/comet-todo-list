var mongoose = require( 'mongoose' );
var utils    = require('connect').utils;
var Todo     = mongoose.model( 'Todo' );
var Hashlist = mongoose.model( 'Hashlist' );
var utils    = require( 'connect' ).utils;

exports.index = function ( req, res, next ){
  var lang = {
        create: "Create"
      };
  res.render( 'index', {
      title : 'Comet Todo list',
      lang : lang
  });
};

exports.room = function ( req, res, next ){
  if (! req.params.hasOwnProperty("room")) {
    res.redirect("/");
  }

  Todo.
    find({ room_id : req.params.room }).
    sort( 'updated_at', -1 ).
    run( function ( err, todos ){
      if( err ) return next( err );

      res.render( 'room', {
          title : 'Comet Todo list',
          id: req.params.room,
          todos : todos
      });
    });
};

exports.create = function ( req, res, next ){
  res.clearCookie('room_id');
  var uid = utils.uid(10);

  new Hashlist({
    hash_id    : uid,
    enable     : true,
    updated_at : Date.now()
  }).save( function ( err, list, count ){
    if( err ) res.redirect('/');

    res.redirect('/room/' + uid);
  });
  
};

exports.current_room = function ( req, res, next ){
  if (!req.params.hasOwnProperty('room')) {
    res.render('404', {title: 'Error 404'});
    return;
  }
  var uid = req.params.room;

  Hashlist.find({
      hash_id: uid       
  }).
  run(function (err, list) {
    if (err) {
      res.render('404', {title: 'Error 404'});
      return;
    }
    
    res.cookie( 'room_id', uid, {path: '/'});
    next();
          
  });

};
