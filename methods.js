const movies = require("./moviesData")



//----------------------//
//  1.  getMovieById    //
//----------------------//

const getMovieFromMovieDataById = (id, callback) => {
// función encargada de la petición a la "base de datos".
// esta función será exportada desde este archivo. 

    setTimeout(()=> {
        const movie = movies.find( (movie) => movie.id === id)

        if (!movie) callback(`No se ha encontrado ninguna película con la id ${id}`)
        else callback(null, movie)

    },2000)
}



const getMovieById = ( id ) => {
// funcion principal (handler) encargada gestionar las peticiones y devolvewr las respuestas finales
// Por tanto, tendréis que crearla y llamarla desde la ruta correspondiente del servidor y devolver la respuesta en el callback

   getMovieFromMovieDataById( id, (error, data) => {
       if(error) {
           console.log(error)
           return error
        }
        console.log(data)
        return data
   })

}

// Llamada de la función principal (handler):
getMovieById( 8 )

// llamada que devuelve error: 
// getMovieById( 30 )



//--------------------------//
//   2.  getMoviesByTitle   //
//--------------------------//

const getMoviesFromMoviesDataByTitle = (title) => {
// función encargada de la petición a la "base de datos".
// esta función será exportada desde este archivo. 

    return new Promise( ( resolve, reject ) => {
        setTimeout(()=> {

            const moviesMatched = movies.filter( ( movie )=> movie.title.startsWith(title) )

            if (!moviesMatched || moviesMatched.length ===0) reject("No hay coincidencias")
            
            resolve(moviesMatched)

        },2000)
    })
}

// Llamada de la función principal (handler)
const getMoviesByTitle = (title) =>{

    // funcion principal (handler) encargada gestionar las peticiones y devolvewr las respuestas finales
    // Por tanto, tendréis que crearla y llamarla desde la ruta correspondiente del servidor y devolver la respuesta en el callback
    
    getMoviesFromMoviesDataByTitle(title)
    .then(moviesMatched=>{
        console.log(moviesMatched)
        return moviesMatched
    } )
    .catch(error=>{
        console.log(error)
        return error
    })
}

// Llamada de la función principal (handler):
getMoviesByTitle("The S")
// Llamada que devuelve error:
// getMoviesByTitle("X")




//-----------------------------//
//   3.  getMovieByShowtimes   //
//-----------------------------//

const getMoviesFromMoviesDataByShowtime = (showTime) => {
// función encargada de la petición a la "base de datos".
// esta función será exportada desde este archivo. 

    return new Promise( ( resolve, reject ) => {
        setTimeout(()=> {

            const moviesMatched = movies.filter( ( movie )=> movie.showtimes.includes(showTime) )

            if (!moviesMatched || moviesMatched.length ===0) reject("No hay coincidencias")
            
            resolve(moviesMatched)

        },2000)
    })

}

const getMoviesByShowtime = async (swhotime) => {
// funcion principal (handler) encargada gestionar las peticiones y devolvewr las respuestas finales
// Por tanto, tendréis que crearla y llamarla desde la ruta correspondiente del servidor y devolver la respuesta en el callback

    try{

        const moviesMatched = await getMoviesFromMoviesDataByShowtime(swhotime)
        
        console.log(moviesMatched)
        return moviesMatched

    } catch(error) {

        console.log(error)
        return  error

    }
}


// Llamada de la función principal (handler)
getMoviesByShowtime("13:50")
// Llamada que devuelve error:
// getMoviesByShowtime("20:33")
