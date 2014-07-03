var express = require('express');
var router = express.Router();
var SummaryTool = require('node-summary');
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res) {

  var url = req.query.u;
  console.log(req.query);
  console.log(url);

  var request = require('request');
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      var $ = cheerio.load(body);
      var title = $("title").text();
      var content = $("div[itemprop='description']").text();
      SummaryTool.summarize("", content, function(err, summary) {
        if(err) console.log("Something went wrong man!");
        // console.log(summary);
        // console.log("Original Length " + (title.length + content.length));
        // console.log("Summary Length " + summary.length);
        // console.log("Summary Ratio: " + (100 - (100 * (summary.length / (title.length + content.length)))));
        res.render('index', { title: title, content: content, summary: summary });
      });
    } else {
      res.render('index');
    }
  });

});

module.exports = router;
