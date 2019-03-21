const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const axios = require("axios");
const logger = require("morgan");
const path = require("path");
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

//Serve static if in production

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${5000}`));
