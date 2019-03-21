const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const axios = require("axios");
//articles model

const Article = require("../../models/Article");

router.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("http://www.popville.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article h2").each(function(i, element) {
      // Save an empty result object
      const result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

//@route GET api/articles
//@desc Get all tiems

router.get("/", (req, res) => {
  Article.find()
    .sort({ date: -1 })
    .then(articles => res.json(articles));
});

//@route POST api/articles
//@desc create a post

router.post("/", (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    link: req.body.link
  });

  newArticle.save().then(articles => res.json(articles));
});

//@route DETE api/articles
//@desc DELETE
router.delete("/:id", (req, res) => {
  Article.findById(req.params.id)
    .then(article => article.remove().then(() => res.json({ success: true })))

    .catch(err => res.status(404).json({ success: false }));
});
router.get("/delete", function(req, res) {
  Article.remove({}, function(error, response) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log(response);
      res.send(response);
    }
  });
});

module.exports = router;
