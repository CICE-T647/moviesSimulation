const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");

const moviesMethods = require("./methods.js");

http
  .createServer(function(req, res) {
    const queryObject = url.parse(req.url, true).query;
    const parsePathname = url.parse(req.url).pathname;

    const getMovieById = id => {
      moviesMethods.getMovieFromMoviesDataById(id, (error, data) => {
        if (error) {
          res.writeHead(200, { "Content-type": "text/plain" });
          res.write(error);
        } else {
          res.writeHead(200, { "Content-type": "application/json" });
          res.write(JSON.stringify(data));
        }
      });
    };

    const getMoviesByTittle = title => {
      moviesMethods
        .getMoviesFromMoviesDataByTitle(title)
        .then(data => {
          res.writeHead(200, { "Content-type": "application/json" });
          res.write(JSON.stringify(data));
        })
        .catch(error => {
          res.writeHead(200, { "Content-type": "text/plain" });
          res.write(error);
        });
    };
    /**
     * Si queremos ejecutar la promesa (async-await) de manera directa sin
     * meterla en una constante, sin directamente con la estructura
     * try-catch debemos colocar el async en la funcion contenedora inmediatamente
     * superior en este caso la funcion del server, le decimos que todo el callback es asincrono
     * esto no afecta al resto de funciones y podemos colocar dentro todos los awaits necesarios
     *  en caso contrario nos encontramos con error del tipo ENVIO DE DOBLE HEADER
     */
    const getMovieByShowtimes = async shotimes => {
      try {
        const moviesMatched = await moviesMethods.getMoviesFromMoviesDataByShowtimes(
          shotimes
        );
        res.writeHead(200, { "Content-type": "application/json" });
        res.write(JSON.stringify(moviesMatched));
      } catch (error) {
        res.writeHead(200, { "Content-type": "text/plain" });
        res.write(error);
      }
    };

    switch (parsePathname) {
      case "/":
        res.writeHead(200, { "Content-type": "text/plain" });
        res.write("INDEX");
        break;
      case "/getMovieById":
        if (queryObject.id) {
          getMovieById(parseInt(queryObject.id, 10));
        } else {
          res.writeHead(200, { "Content-type": "text/plain" });
          res.write("Debe indicar el parametro id");
        }
        break;
      case "/getMoviesByTitle":
        if (queryObject.title) {
          getMoviesByTittle(queryObject.title);
        } else {
          res.writeHead(200, { "Content-type": "text/plain" });
          res.write("Debe indicar el parametro title");
        }
        break;
      case "/getMovieByShowtimes":
        if (queryObject.showtimes) {
          getMovieByShowtimes(queryObject.showtimes);
        } else {
          res.writeHead(200, { "Content-type": "text/plain" });
          res.write("Debe indicar el parametro showtimes");
        }
        break;

      default:
        res.writeHead(404, { "Content-type": "text/plain" });
        res.write("No existe la ruta");
    }
    setTimeout(() => {
      res.end();
    }, 3000);
    //res.end();
  })
  .listen(3000, () => console.log("Running on port 3000"));
