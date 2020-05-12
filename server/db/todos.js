var mongoo = require('mongoose');
var db = require('./connection');
var Schema = mongoo.Schema;

var userschema = new Schema({
    title: { type : String },
    isDone : { type : Boolean },
},{collection : 'user-data'});

var UserData = mongoo.model('Userdata', userschema);

module.exports = UserData;