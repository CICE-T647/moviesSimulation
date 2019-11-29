const movies = require("./moviesData");

// getMovieById
const getMovieFromMoviesDataById = (id, callback) => {
  setTimeout(() => {
    const movieMatched = movies.find(movie => movie.id === id);
    if (!movieMatched) {
      callback(`No se ha encontrado ninguna película con la id ${id}`);
    }
    callback(null, movieMatched);
  });
};

const getMovieById = id => {
  getMovieFromMoviesDataById(id, (error, movie) => {
    if (error) return console.log(error);
    return console.log(movie);
  });
};

const getMoviesFromMoviesDataByTitle = title => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const moviesMatched = movies.filter(movie =>
        movie.title.startsWith(title)
      );

      if (!moviesMatched) {
        reject(`No se ha encontrado una película que comience por ${title}`);
      }

      resolve(moviesMatched);
    }, 2000);
  });
};

// getMovieByTitle
const getMoviesByTitle = title => {
  getMoviesFromMoviesDataByTitle(title)
    .then(movie => movie)
    .catch(error => console.log(error));
};

// getMovieByShowtimes

const getMoviesFromMoviesDataByShowtimes = showTime => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const moviesMatched = movies.filter(movie =>
        movie.showtimes.includes(showTime)
      );

      if (!moviesMatched) {
        reject(`No se ha encontrado una película que comience por ${title}`);
      }

      resolve(moviesMatched);
    }, 2000);
  });
};

const getMovieByShowtimes = async showtimes => {
  try {
    const moviesMatched = await getMoviesFromMoviesDataByShowtimes(showtimes);
    return moviesMatched;
  } catch (error) {
    return console.log(error);
  }
};

getMoviesByTitle("The"); 
//getMovieByShowtimes('13:00').then(val => console.log(val)); 
// getMovieById(3);

exports.getMovieById = getMovieById;
exports.getMoviesByTitle = getMoviesByTitle;
exports.getMovieByShowtimes = getMovieByShowtimes; 

