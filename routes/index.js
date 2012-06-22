var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );
var utils    = require( 'connect' ).utils;

exports.index = function ( req, res, next ){
  Todo.
    find({ user_id : req.cookies.user_id }).
    sort( 'updated_at', -1 ).
    run( function ( err, todos ){
      if( err ) return next( err );

      res.render( 'index', {
          title : 'Express Todo Example',
          todos : todos
      });
    });
};

exports.current_user = function ( req, res, next ){
  if( !req.cookies.user_id ){
    //res.cookie( 'user_id', utils.uid( 32 ));
    res.cookie( 'user_id', "123456789");
  }

  next();
};
