const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const movies = require("./methods");

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url);

  const query = parsedUrl.query;

  switch (request.url) {

    case `/html?${query}`:
      const consulta = querystring.decode(query);
      console.log(consulta.name, consulta.id, consulta.title,consulta.showTimes);
      response.statusCode = 200;
      const moviesByTitle = movies.getMoviesByTitle(consulta.title);
      const moviesById = movies.getMovieById(parseInt(consulta.id))
      const moviesByShowtime =  movies.getMovieByShowtimes(consulta.showTimes);
      console.log(moviesByTitle,moviesById, moviesByShowtime );
      response.write("<div style='margin: 50px; background: #00ff00; border-radius: 20px; color: #333; padding: 20px 40px; font-family: arial; '>");
      response.write(`<h1>Ejercicio de ${consulta.name}</h1>`);
      // response.write(`<p>La película cuyo id es ${consulta.id} es moviesById}</p>`);
      // response.write(`<p>La película que empieza a las ${consulta.showTime} es moviesByShowtime}</p>`);
      // response.write(`<p>La película cuyo título contiene ${consulta.title} es moviesByTitle}</p>`);
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
