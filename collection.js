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
  var newObj = {
      user_id    : cookie.user_id,
      content    : content,
      updated_at : Date.now()
  };

  new Todo(
    newObj
  ).save( function ( err, todo, count ){
    if( err ) cb(null);

    cb(newObj);
  });

};
