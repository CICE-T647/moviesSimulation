const movies = require("./moviesData")

const getMovieFromMoviesDataById = (id, callback) =>{
    setTimeout(() => {
        const movieMatched =  movies.find(movie => movie.id === id);
            if(!movieMatched)
                callback(`No se ha encontrado la pelicula con id ${id}`);
            callback(null,movieMatched);
    });
};

const getMoviesFromMoviesDataByTitle = (title) => {
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            const movieMatched = movies.filter(movie => movie.title.startsWith(title));

            if(movieMatched)
                resolve(movieMatched);
            else
                reject(`No se ha encontrado ninguna pelicula que comience por ${title}`);

            /*const movieMatched = movies.map = (movie => {
                if(movie.title.startsWith(title)){
                    return movie;
                }      
            });*/
        },2000)
    });
};

getMoviesFromMoviesDataByShowtimes = (showTime) =>{
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            const movieMatched = movies.filter(movie => movie.showtimes.includes(showTime));

            if(movieMatched)
                resolve(movieMatched);
            else
                reject(`No se ha encontrado ninguna pelicula incluya ${showTime}`);

        },2000)
    });
};

module.exports = { getMovieFromMoviesDataById, getMoviesFromMoviesDataByTitle, getMoviesFromMoviesDataByShowtimes }