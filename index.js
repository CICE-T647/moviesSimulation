const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");

const moviesMethods = require("./methods.js");

//server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);

  console.log("parsedUrl", parsedUrl);

  const query = parsedUrl.query;

  console.log("query: ", query);

  switch (req.url) {
    case "/":
      res.end("Index");
      break;
    case "getMovieById":
      res.end("getMovieById");
      break;
  }
});

server.listen(3000, () => {
  console.log("Running on port 3000");
});
