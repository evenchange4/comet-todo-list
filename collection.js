/**
 * @overview
 *
 * @author 
 * @version 2012/06/21
 */

var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );
var utils    = require( 'connect' ).utils;

module.exports.index = function (cookie, cb) {
  Todo.
    find({ user_id : cookie.user_id }).
    sort( 'updated_at', -1 ).
    run( function ( err, todos ){
      if( err ) cb(null);
      cb(todos);
    });
};

module.exports.create = function (cookie, content, cb) {
  new Todo({
    user_id    : cookie.user_id,
    content    : content,
    updated_at : Date.now()
  }).save( function ( err, todo, count ){
    if( err ) cb(null);

    cb(todo);
  });

};

module.exports.edit = function (cookie, data, cb) {
  Todo.findById( data.id, function ( err, todo ){
    todo.content    = data.content;
    todo.updated_at = Date.now();
    todo.save( function ( err, todo, count ){
      if( err ) cb(null);

      cb(todo);
    });
  });
};

module.exports.destory = function (cookie, id, cb) {
  Todo.findById( id, function ( err, todo ){
    todo.remove( function ( err, todo ){
      if( err ) cb(null);

      cb(todo);
    });
  });
};
