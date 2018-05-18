var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var crawledSchema = new Schema({
    url: String,
    status: Number
});

// 0: success
// 1: fail

// the schema is useless so far
// we need to create a model using it
var Crawled = mongoose.model('Crawled', crawledSchema);



// make this available to our users in our Node applications
module.exports = Crawled;