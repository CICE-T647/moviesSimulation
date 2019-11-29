const movies = require('./moviesData.js');

const getPeli = (e) => {

    movies.forEach(element => {
        if (element.title.startsWith(e)) {
            console.log(element.id);
            console.log(element.title);
        }
    });

}

getPeli("The");