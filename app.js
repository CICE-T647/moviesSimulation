const moviesMethods = require("./methods");
const http = require("http");
const qs = require("querystring");
const url = require("url");
const port = 4000;

const server = http.createServer(async (req, res) => {
    parsedURL = url.parse(req.url);
    queryURL = parsedURL.query;
    console.log(parsedURL);

    switch (parsedURL.pathname) {
        case "/getMovieById":
            res.setHeader("Content-type", "json");
            if (queryURL) {
                const { id } = qs.parse(parsedURL.query);
                if (id) {
                    moviesMethods.getMovieById(parseInt(id), (error, data) => {
                        if (error) {
                            res.statusCode = 404;
                            res.end(error);
                        } else {
                            console.log(data);
                            res.statusCode = 200;
                            res.end(JSON.stringify(data));
                        }
                    });
                } else {
                    res.statusCode = 404;
                    res.end('Opss - Only "id" search paremeter is valid ...');
                }
            } else {
                res.statusCode = 400;
                res.end("Opss - Please define a query...");
            }
            break;

        case "/getMovieByTitle":
            res.setHeader("Content-type", "json");
            if (queryURL) {
                const { title } = qs.parse(parsedURL.query);
                if (title) {
                    moviesMethods.getMovieByTitle(title).then(
                        function(value) {
                            console.log(value);
                            res.statusCode = 200;
                            res.end(JSON.stringify(value));
                        },
                        error => {
                            console.log(error);
                            res.statusCode = 404;
                            res.end(error);
                        }
                    );
                } else {
                    res.statusCode = 404;
                    res.end(
                        'Opss - Only "title" search paremeter is valid ...'
                    );
                }
            } else {
                res.statusCode = 400;
                res.end("Opss - Please define a query...");
            }
            break;

        case "/getMovieByShowtimes":
            res.setHeader("Content-type", "json");
            if (queryURL) {
                const { showtimes } = qs.parse(parsedURL.query);
                if (showtimes) {
                    try {
                        const mathces = await moviesMethods.getMovieByShowtimes(
                            showtimes
                        );
                        console.log(mathces);
                        res.statusCode = 200;
                        res.end(JSON.stringify(mathces));
                    } catch (error) {
                        console.log(error);
                        res.statusCode = 404;
                        res.end(error);
                    }
                } else {
                    res.statusCode = 404;
                    res.end(
                        'Opss - Only "showtimes" search paremeter is valid ...'
                    );
                }
            } else {
                res.statusCode = 400;
                res.end("Opss - Please define a query...");
            }
            break;

        default:
            res.statusCode = 404;
            res.setHeader("Content-type", "text/plain");
            res.end("Error " + res.statusCode + " -> Page not found");
            break;
    }
});

const lister = server.listen(port, () => {
    console.log("Server Running port", port);
});
