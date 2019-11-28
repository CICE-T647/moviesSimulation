const movies = require('./moviesData');

// getMovieById
const getMovieById = (id, callback)=>{
    setTimeout(()=>{
        const found =  movies.find((movie)=> movie.id == id);
        if(found) return callback(null, found);
        return callback(`No se ha encontrado ninguna película con la id ${id}`, null);
    }, 1000)
}

getMovieById(4, (error, data)=>{
    if(error) {
        console.log(error)
        return error;
    }
    else {
        console.log(data)
        return data;
    }
})

// getMovieByTitle

const getMovieByTitle = (title)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const found =  movies.filter((movie)=> movie.title.substring(0, title.length).toLowerCase() == title.toLowerCase());
            if(found.length) resolve(found);
            else reject(`No se ha encontrado ninguna película que empiece por ${title}`);
        }, 2000)
    })
}

getMovieByTitle("the").then((data)=>{
    console.log(data);
    return data;
}).catch((error)=>{
    console.log(error)
    return error;
})

// getMovieByShowtimes

const findByShowtime = (hour)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const found = movies.filter((movie)=> movie.showtimes.includes(hour))
            if(found.length) resolve(found);
            else reject(`No se ha encontrado ninguna película que comience a las ${hour}`)
        }, 3000)
    })
}

const getMovieByShowtimes = async (hour)=>{
    try{
        const result = await findByShowtime(hour);
        console.log(result)
        return result;
    }catch(error){
        console.log(error)
        return error;
    }
}

getMovieByShowtimes("15:50");