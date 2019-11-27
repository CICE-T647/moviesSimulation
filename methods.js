const movies = require("./moviesData");

// console.log(movies);

// getMovieById

const getMovieById = (id, callback) => {
  console.log("Initializating Movie search by ID", id);
  setTimeout(() => {
    const movie = movies.movies.find(movie => {
      return movie.id === id;
    });
    if (!movie) callback(`Not exist a movie with this ID ${id}`);
    else callback(null, movie);
  }, 3000);
};

getMovieById(8, (error, data) => {
  if (error) {
    console.log(error);
  }
  console.log(data);
});

// getMovieByTitle

// getMovieByShowtimes
