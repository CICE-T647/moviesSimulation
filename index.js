const http = require("http");
const url = require("url");
const querystring = require("querystring");

const PORT = 3000;

const { 
    getMovieFromMovieDataById, 
    getMoviesFromMoviesDataByTitle, 
    getMoviesFromMoviesDataByShowtime 
} = require("./methods")


const server = http.createServer(async (request, response) => {

    const { query } = url.parse(request.url);

    const { id, title, showtime } = querystring.parse(query);

    switch ( request.url ) {

        case `/getmoviebyid?${ query }`:

            response.setHeader("Content-Type", "text/plain")

            if (query && id) {

                getMovieFromMovieDataById(parseInt(id), (error, data) => {
                    if (error) {
                        response.statusCode = error.status ? error.status : 500
                        response.end(error.message ? error.message : "Internal server error.");
                    }
                    response.statusCode = 200;
                    response.end(JSON.stringify(data))
                });

            } else {
                response.statusCode = 422
                response.end("Debe proporcionar una id")
            }
        break;

        case `/getmoviesbytitle?${ query }`:
            response.setHeader("Content-Type", "text/plain");

            if( !query || !title ) {
                response.statusCode = 422
                response.end("Debe proporcionar un título")
            }

            getMoviesFromMoviesDataByTitle(title)
            .then((movies)=> {
                response.statusCode = 200
                response.end(JSON.stringify(movies))
            })
            .catch((error) => {
                response.statusCode = error.status ? error.status : 500
                response.end(error.message ? error.message : "Internal server error")
            })
            break;

        case `/getmoviesbyshowtime?${ query }`:

            response.setHeader("Content-Type", "text/plain");

            if ( !query || !showtime ) {
                response.statusCode = 422
                response.end("Debe proporcionar una hora")
            }

            try {

                const data = await getMoviesFromMoviesDataByShowtime(showtime)
                response.statusCode = 200
                response.end(JSON.stringify(data))

            } catch (error){

                console.log(error)
                response.statusCode = error.status ? error.status : 500
                response.end(error.message ? error.message : "Internal server error")

            }
                break;
        default: 
            response.statusCode = 404
            response.end("The route your are asking for doesn't exist")
            
    }

});

server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
