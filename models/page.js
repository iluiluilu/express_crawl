var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var pageSchema = new Schema({
    url: String,
    content: { type: JSON},
    type: { type: String, required: true },
    status: Number
});

// the schema is useless so far
// we need to create a model using it
var Page = mongoose.model('Page', pageSchema);

// make this available to our users in our Node applications
module.exports = Page;