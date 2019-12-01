const moviesMethods = require("./methods");

moviesMethods.getMovieById(8, (error, data) => {
    console.log(
        "********************************************************************"
    );
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
});

moviesMethods.getMovieById(25, (error, data) => {
    console.log(
        "********************************************************************"
    );
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
});

moviesMethods.getMovieByTitle("The").then(
    function(value) {
        console.log(
            "********************************************************************"
        );
        console.log(value);
    },
    error => {
        console.log(error);
    }
);

moviesMethods.getMovieByShowtimes("15:dd").then(
    function(value) {
        console.log(
            "********************************************************************"
        );
        console.log(value);
    },
    error => {
        console.log(error);
    }
);
