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
      const {id, title, showTimes, name} = querystring.decode(query);
      response.setHeader("Content-type", "text/plain");
      if(name) //Si se ha puesto nombre
        response.write(`<h1 style="font-family: helvetica;">Querido ${name}:</h1>`); //Encabezado con nombre
      //Función para ID
      const getUserById = id => {
        movies.getMovieFromMoviesDataById(id, (error, data) => {
          if (error) {
            response.write(error);
          }
          response.write(`<div style="background: black; padding: 20px; color: white; font-weight: bold; font-family: arial; margin-bottom: 20px">La película con el id ${id} es ${JSON.stringify(data.title)}</div>`);
        });
      };
      //Función para title
      const getMoviesByTitle = title => {
        movies.getMoviesFromMoviesDataByTitle(title)
          .then(mov=>{
              let moviesList=[];
              mov.forEach(movie => moviesList.push(movie.title));
              response.write(`<div style="background: black; padding: 20px; color: white; font-weight: bold; font-family: arial; margin-bottom: 20px">Las películas que empiezan con ${title} son: ${moviesList.toString()}</div>`);
            }
            
          )
          .catch(error => {
            response.write(error);
            }  
          );
      };
      //Función para horarios
      const getMovieByShowtimes = async showtimes => {
        try {
          const moviesMatched = await movies.getMoviesFromMoviesDataByShowtimes(showtimes);
          let moviesList = []; 
          moviesMatched.forEach(movie => moviesList.push(movie.title));
          moviesList = moviesList.toString()
          return response.write(`<div style="background: black; padding: 20px; color: white; font-weight: bold; font-family: arial; margin-bottom: 20px">Las películas que empiezan a las ${showTimes} son: ${moviesList}</div>`);
        } catch (error) {
          return response.write(error);
        }
      };
      //Pongo condicionales por si no están los parámetros
      if (id)
        getUserById(parseInt(id)); 
      if (title)
        getMoviesByTitle(title); 
      if (showTimes)
        getMovieByShowtimes(showTimes); 

      //Termino la respuesta con más tiempo de ejecución que las promesas, sino da error. 
      setTimeout(() => {
        response.end()
      }, 3000);
      break;

    default:
      response.statusCode = 404;
      response.end("La ruta a la que se intenta acceder no existe");
  }
});

server.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
