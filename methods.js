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