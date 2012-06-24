var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Todo = new Schema({
    room_id    : String,
    content    : String,
    updated_at : Date
});

var Hashlist = new Schema({
    hash_id    : String,
    enable     : Boolean,
    updated_at : Date
});

mongoose.model( 'Todo', Todo );
mongoose.model( 'Hashlist', Hashlist);

//mongoose.connect( 'mongodb://clonn:1234@flame.mongohq.com:27061/todoclonn' );
mongoose.connect( 'mongodb://localhost/express-todo' );
