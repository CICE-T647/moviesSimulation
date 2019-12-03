const movies = require("./moviesData") //Movies database

// Libreries
const http = require("http")
const fs = require("fs")
const url = require("url")
const querystring = require("querystring")

//----------------------//
//  1.  getMovieById    //
//----------------------//

const getMovieFromMovieDataById = (id, callback) => {
    // función encargada de la petición a la "base de datos".
    // esta función será exportada desde este archivo. 
    setTimeout(()=> {
        const movie = movies.find( (movie) => movie.id === id)

        if (!movie) callback(`No se ha encontrado ninguna película con la id ${id}.`)
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

            if (!moviesMatched || moviesMatched.length === 0) reject(`No se ha encontrado ninguna pelícua que empiece por '${title}'.`)
            
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

            const moviesMatched = movies.filter( ( movie )=> movie.showtimes.includes(showTime) )

            if (!moviesMatched || moviesMatched.length ===0) reject(`No se ha encontrado ninguna película que comience a las '${showTime}'`)
            
            resolve(moviesMatched)

        },2000)
    })

}



// Llamada de la función principal (handler)
// getMoviesByShowtime("13:50")
// Llamada que devuelve error:
// getMoviesByShowtime("20:33")




//-----------------//
// SERVER CREATION //
//-----------------//


const server = http.createServer((request, response) => {

    const parsedUrl = url.parse(request.url)
    console.log("parsedURl",parsedUrl)

    const query = parsedUrl.query
    console.log("query", query)
  

    switch(request.url) {
       
       
        // ..... //
        // by id //
        // ..... //

        case `/getmoviebyid?${query}`:
            const { id } = querystring.parse(query);
            const ByID = parseInt(id,0)
                                
            const getMovieById = ( id ) => {
            // funcion principal (handler) encargada gestionar las peticiones y devolver las respuestas finales
            // Por tanto, tendréis que crearla y llamarla desde la ruta correspondiente del servidor y devolver la respuesta en el callback
            
                getMovieFromMovieDataById( id, (error, data) => {
                    if(error) {
                        //Browser info
                        response.statusCode = 404
                        response.setHeader("Content-type", "text/plain")
                        response.end(error)
                        
                        //Terminal info
                        console.log(error)
                        return error
                    }
                    // Browser info          
                    response.statusCode = 200;
                    response.setHeader("Content-type", "text/plain");
                    response.end(JSON.stringify(data))

                    //Terminal info
                    console.log(data)
                    return data
                })
            
            }
            getMovieById(ByID)               
            break



        // ........ //
        // by title //
        // ........ //

        case `/getMovieByTitle?${query}`:
            const { title } = querystring.parse(query)

            const getMoviesByTitle = (title) =>{

                    // funcion principal (handler) encargada gestionar las peticiones y devolver las respuestas finales
                    // Por tanto, tendréis que crearla y llamarla desde la ruta correspondiente del servidor y devolver la respuesta en el callback
                    
                    getMoviesFromMoviesDataByTitle(title)
                    .then(moviesMatched=>{
                        // Browser info
                        response.statusCode = 200
                        response.setHeader("Content-type", "text/plain")
                        response.end(JSON.stringify(moviesMatched))

                        // Terminal info
                        console.log(moviesMatched)
                        return moviesMatched
                    } )
                    .catch(error=>{
                        // Browser info
                        response.statusCode = 404
                        response.setHeader("Content-type", "text/plain")
                        response.end(error)

                        // Terminal info
                        console.log(error)
                        return error
                    })
                }
                
                getMoviesByTitle(title)
                break


        // ........... //
        // by showtime //
        // ........... //

        case `/getMovieByShowtimes?${query}`:            
            const { showtime } = querystring.parse(query)

            const getMoviesByShowtime = async (showtime) => {
                // funcion principal (handler) encargada gestionar las peticiones y devolvewr las respuestas finales
                // Por tanto, tendréis que crearla y llamarla desde la ruta correspondiente del servidor y devolver la respuesta en el callback
        
                try{
            
                    const moviesMatched = await getMoviesFromMoviesDataByShowtime(showtime)
                    // Browser info
                    response.statusCode = 200
                    response.setHeader("Content-type", "text/plain")
                    response.end(JSON.stringify(moviesMatched))

                    // Terminal info
                    console.log(moviesMatched)
                    return moviesMatched
            
                } catch(error) {
                    // Browser info
                    response.statusCode = 404;
                    response.setHeader("Content-type", "text/plain");
                    response.end(error)
                    
                    // Terminal info
                    console.log(error)
                    return  error
            
                }
            }
            getMoviesByShowtime(showtime)
            break


        default:
            response.statusCode = 404
            response.end("La ruta a la que se intenta acceder no existe")
    }


    
})

server.listen(3000, ()=>{
    console.log("Servidor escuchando en el puerto 3000")
})