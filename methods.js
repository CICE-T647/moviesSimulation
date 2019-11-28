const movies = require("./moviesData");
// getMovieById
console.log("getMovieById->");
const getMovieById = (id, cb) => {
  const oneMovie = movies.find(movie => movie.id == id);
  if (!oneMovie) {
    return cb(`No se ha encontrado ninguna película con la id ${id}`);
  } else {
    return cb(null, oneMovie);
  }
};

setTimeout(() => {
  getMovieById(55, (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      return console.log(data);
    }
  });
}, 3000);

// getMovieByTitle
console.log("getMovieByTitle->");

// getMovieByShowtimes
