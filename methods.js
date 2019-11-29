// getMovieById
const movies = require("./moviesData")

const getMovieFromMovieDataById = (id, callback) => {

    setTimeout(()=> {
        const movie = movies.find( (movie) => movie.id === id)

        if (!movie) callback(`No se ha encontrado ninguna película con la id ${id}`)
        else callback(null, movie)

    },3000)
}

const getMovieById = ( id ) => {
    
   getMovieFromMovieDataById( id, (error, data) => {
       if(error) return console.log(error)
       else return console.log(data)
   })

}
// getMovieById( 8 )


// getMovieByTitle

const getMoviesFromMoviesDataByTitle = (title) => {

    return new Promise( ( resolve, reject ) => {
        setTimeout(()=> {

            const moviesMatched = movies.filter( ( movie )=> movie.title.startsWith(title) )

            if (!moviesMatched || moviesMatched.length ===0) reject("No hay coincidencias")
            
            resolve(moviesMatched)

        },2000)
    })

}

const getMoviesByTitle = (title) => getMoviesFromMoviesDataByTitle(title)
                                    .then(movies=> console.log(movies))
                                    .catch(error=> console.log(error))

getMoviesByTitle("The S")





// getMovieByShowtimes

const getMoviesFromMoviesDataByShowtime = (showTime) => {

    return new Promise( ( resolve, reject ) => {
        setTimeout(()=> {

            const moviesMatched = movies.filter( ( movie )=> movie.showtimes.includes(showTime) )

            if (!moviesMatched || moviesMatched.length ===0) reject("No hay coincidencias")
            
            resolve(moviesMatched)

        },2000)
    })

}

const getMoviesByShowtime = async (swhotime) => {
    try{

        const moviesMatched = await getMoviesFromMoviesDataByShowtime(swhotime)
        return console.log(moviesMatched)

    } catch(error) {

        console.log("Error: ")
        return  console.log(error)

    }
}

// getMoviesByShowtime("13:50")