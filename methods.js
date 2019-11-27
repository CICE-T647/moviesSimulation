const movies = require("./moviesData");

// getMovieById

const getMovieById = (id, callback) => {
  setTimeout(() => {
    const movie = movies.movies.find(movie => {
      return movie.id === id;
    });
    if (!movie) callback(console.log("no hay peli con este id"));
    else callback(null, movie);
  }, 2000);
};

getMovieById(3, (error, data) => {
  if (error) return console.log(error);
  return console.log(data);
});

// getMovieByTitle

// getMovieByShowtimes
