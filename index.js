const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const movies = require("./methods");

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url);

  console.log("parsedUrl", parsedUrl);

  const query = parsedUrl.query;

  console.log("query: ", query);

  switch (request.url) {

    case `/html?${query}`:
      const consulta = querystring.parse(query);
      //console.log(consulta.name, consulta.id, consulta.title, consulta.showTimes);
      response.statusCode = 200;
      response.write("<div>");
      response.write(`<h1>HOLA ${movies.getMovieById(consulta.id)}</h1`);
      response.write("</div>");
      response.end();
      break;

    default:
      response.statusCode = 404;
      response.end("La ruta a la que se intenta acceder no existe");
  }
});

server.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
