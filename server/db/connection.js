var mongoo = require('mongoose');
const connectionString = 'localhost/todo';

var db = mongoo.connect(connectionString, {useNewUrlParser : true});

module.exports = db ;

