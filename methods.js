const movies = require("./moviesData")

//----------------------//
//  1.  getMovieById    //
//----------------------//

const getMovieFromMovieDataById = (id, callback) => {
// función encargada de la petición a la "base de datos".
// esta función será exportada desde este archivo. 

    setTimeout(()=> {
        const movie = movies.find( (movie) => movie.id === id)

        if (!movie) callback({
            status: 404, 
            message: `No se ha encontrado ninguna película con la id ${id}`
        })

        else callback(null, movie)

    },2000)
}


//--------------------------//
//   2.  getMoviesByTitle   //
//--------------------------//

const getMoviesFromMoviesDataByTitle = (title) => {
// función encargada de la petición a la "base de datos".
// esta función será exportada desde este archivo. 

    return new Promise( ( resolve, reject ) => {
        setTimeout(()=> {

            const moviesMatched = movies.filter( ( movie )=> movie.title.startsWith(title) )

            if (!moviesMatched || !moviesMatched.length) 
                reject({ 
                    status: 404, 
                    message: `No se han encontrado coincidencias con el título "${title}"`
                })

            resolve(moviesMatched)

        },2000)
    })
}

//-----------------------------//
//   3.  getMovieByShowtimes   //
//-----------------------------//

const getMoviesFromMoviesDataByShowtime = (showTime) => {
// función encargada de la petición a la "base de datos".
// esta función será exportada desde este archivo. 

    return new Promise( ( resolve, reject ) => {
        setTimeout(()=> {
            console.log(showTime)
            const moviesMatched = movies.filter( ( movie )=> movie.showtimes.includes(showTime) )
            if (!moviesMatched || !moviesMatched.length) 
                reject({ status: 404, message: `No se han encontrado coincidencias con la hora de inicio "${showTime}"`})
            
            resolve(moviesMatched)

        },2000)
    })

}


module.exports = { getMovieFromMovieDataById, getMoviesFromMoviesDataByTitle, getMoviesFromMoviesDataByShowtime }