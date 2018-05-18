var express = require('express');
var router = express.Router();
var Crawler = require("crawler");
var Page = require('../models/page')
var Crawled = require('../models/crawled');



/* GET home page. */
router.get('/', function (req, res, next) {

    var c = new Crawler({
        maxConnections: 10,
    });


    var c = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                var as = $('div.update_item h3.nowrap a');
                as.each(function(index, value) {
                    var c = Crawled({
                        url: $(value).attr('href'),
                        status: 0
                    });
                    c.save(function (error) {
                        if (error) throw error;
                    })
                });
            }
            done();
        }
    });


    //
    //
    // Queue URLs with custom callbacks & parameters
    var urls1 = [];
    for (var i=1; i< 200; i++) {
        urls1.push("http://mangak.info/moi-dang/page/" + i);
    }
    c.queue(urls1);



    res.render('index', {title: 'Express'});
});


module.exports = router;
