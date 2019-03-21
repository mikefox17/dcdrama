const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const axios = require("axios");
const logger = require("morgan");

const articles = require("./routes/api/articles");

const app = express();

//body-parser middleware

app.use(bodyParser.json());

//DB Config

const db = require("./config/keys").mongoURI;

//connect to mongo

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

//use routes
app.use("/api/articles", articles);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${5000}`));
