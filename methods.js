const movies = require("./moviesData.js");
// getMovieById
const getMovieById = (id, cb) => {
  const movie = movies.find(movie => {
    return movie.id == id;
  });

  if (!movie) {
    cb("No existe la pelicula");
  } else {
    cb(null, movie);
  }
};
getMovieById(5, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
// getMovieByTitle

// getMovieByShowtimes
