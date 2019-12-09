const http = require("http");
const url = require("url");
const qstring = require("querystring");

const { 
    getMovieFromMoviesDataById, 
    getMoviesFromMoviesDataByTitle, 
    getMoviesFromMoviesDataByShowtimes 
} = require("./methods")


const server = http.createServer(async (request, response) => {

    const parsedUrl = url.parse(request.url);

    const query = parsedUrl.query;

    const { id, title, showtime } = qstring.parse(query);

    switch ( request.url ) {

        case `/query?${ query }`:

            response.setHeader("Content-Type", "text/plain")

            if (query) {
                
                if(id){
                    
                    if(!isNaN(id)){

                        getMovieFromMoviesDataById(parseInt(id), (error, data) => {
                            if (error) {
                                response.statusCode = error.status ? error.status : 500
                                response.end(error.message ? error.message : "Error de servidor.");
                            }
                            response.statusCode = 200;
                            response.end(JSON.stringify(data))
                        });
                    }
                    else{
                        response.statusCode = 422
                        response.end("Debe ingresar un número para el id");
                    }
                }
                else if(title){

                    getMoviesFromMoviesDataByTitle(title)
                    .then((movies)=> {
                    response.statusCode = 200
                    response.end(JSON.stringify(movies))
                    })
                    .catch((error) => {
                        response.statusCode = error.status ? error.status : 500
                        response.end(error.message ? error.message : "Internal server error")
                    });
                }
                else if(showtime){
                    try {

                        const data = await getMoviesFromMoviesDataByShowtimes(showtime)
                        response.statusCode = 200
                        response.end(JSON.stringify(data))
        
                    } catch (error){
        
                        console.log(error)
                        response.statusCode = error.status ? error.status : 500
                        response.end(error.message ? error.message : "Internal server error")
        
                    }

                }
                else{
                    response.statusCode = 422
                    response.end("Debe proporcionar un parametro de busqueda correcto. (id, time or showtime)ej: query?id");
                }
                

            } else {
                response.statusCode = 422
                response.end("Debe proporcionar un parametro de busqueda. (id, time or showtime) ej: query?id=");
            }
        break;

        default: 
            response.statusCode = 404
            response.end("La ruta no existe");
            
    }

});

server.listen(3000, () => console.log(`Servidor corriendo en el puerto 3000`));
