const peliculas = require("./moviesData");

const getMovieById = (id, callback) => {
    const pelicula = peliculas.find((peli) => {
        return peli.id == id;
    })
    if(pelicula) {
        callback(null, pelicula)
    }
    else {
        callback("no se ha encontrado esa película")
    }
}


getMovieById(2, (error, data) => {
    setTimeout(() => {
        if(error) {
            console.log(error);
        } 
        return console.log(data)
    }, 2000)
})

const getMovieByTitle = (title) => {
    return new Promise((resolve, reject) => { 
        setTimeout(() => {
            const pelis = peliculas.map((peli) => {
                peli.title.startsWith(title)
            })    
            resolve(pelis)
        }, 2000)       
            
    })
}

getMovieByTitle("The")
.then((resultado) => {   
       console.log(resultado.length)   
})



// getMovieByShowtimes