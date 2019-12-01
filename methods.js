const movies = require("./moviesData");

// getMovies

const getMovies = callback => {
    console.log("Getting movies");
    setTimeout(() => {
        if (!movies.movies) callback(`Not exist a movies`);
        else callback(null, movies.movies);
    }, 3000);
};

// getMovieById

const getMovieById = (id, callback) => {
    console.log("Initializating Movie search by ID", id);
    setTimeout(() => {
        const movie = movies.movies.find(movie => {
            return movie.id === id;
        });
        if (!movie) callback(`Opss - ID movie ${id} not found`);
        else callback(null, movie);
    }, 3000);
};

// getMovieByTitle

const getMovieByTitle = async title => {
    console.log("Initializating Movie search by Title", title);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let matches = [];
            for (let i = 0; i < movies.movies.length; i++) {
                if (movies.movies[i].title.startsWith(title)) {
                    matches.push(movies.movies[i]);
                }
            }
            if (matches.length > 0) resolve(matches);
            else reject(`Opss - Movies with Pattern "${title}" not found`);
        }, 3000);
    });
};

// getMovieByShowtimes
const getMovieByShowtimes = async time => {
    console.log("Initializating Movie search by Time", time);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let matches = [];
            for (let i = 0; i < movies.movies.length; i++) {
                if (movies.movies[i].showtimes.includes(time)) {
                    matches.push(movies.movies[i]);
                }
            }
            if (matches.length > 0) resolve(matches);
            else reject(`Opss - Movies showed on ${time} not found`);
        }, 3000);
    });
};

module.exports = {
    getMovieById,
    getMovies,
    getMovieByTitle,
    getMovieByShowtimes
};
