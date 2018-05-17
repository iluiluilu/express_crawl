var express = require('express');
var router = express.Router();
var Crawler = require("crawler");
var mongoose = require('mongoose');


/* GET home page. */
router.get('/', function (req, res, next) {



    //Import the mongoose module


    //Set up default mongoose connection
    var mongoDB = 'mongodb://127.0.0.1/test';
    mongoose.connect(mongoDB);
    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    //Get the default connection
    var db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    //Define a schema
    var Schema = mongoose.Schema;

    var SomeModelSchema = new Schema({
        a_string: String,
        a_date: Date
    });

    // Compile model from schema
    var SomeModel = mongoose.model('SomeModel', SomeModelSchema );

    // Create an instance of model SomeModel
    var awesome_instance = new SomeModel({ name: 'awesome' });

    // Save the new model instance, passing a callback
    awesome_instance.save(function (err) {

        // saved!
    });


    var c = new Crawler({
        maxConnections: 10,
        // This will be called for each crawled page
        // callback : function (error, res, done) {
        //     if(error){
        //         console.log(error);
        //     }else{
        //         var $ = res.$;
        //         // $ is Cheerio by default
        //         //a lean implementation of core jQuery designed specifically for the server
        //         console.log($("title").text());
        //     }
        //     done();
        // }
    });

// Queue just one URL, with default callback
//       c.queue('http://mangak.info/');

// Queue a list of URLs
//     c.queue(['http://www.google.com/','http://www.yahoo.com']);

// Queue URLs with custom callbacks & parameters
    c.queue([{
        uri: 'http://mangak.info/',
        // jQuery: false,

        // The global callback won't be called
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                // $ is Cheerio by default
                //a lean implementation of core jQuery designed specifically for the server
                console.log($("title").text());
                console.log("done");
                // console.log(res.body);
            }
            done();
        }
    }]);

// Queue some HTML code directly without grabbing (mostly for tests)
//     c.queue([{
//         html: '<p>This is a <strong>test</strong></p>'
//     }]);

    res.render('index', {title: 'Express'});
});

module.exports = router;
