# Movies.

## Creando un servidor que simule peticiones a la base de datos.

Antes de nada, tenéis que tener en cuenta un par de aspectos:
En la comunicación entre cliente y servidor, no es posible enviar objetos a través de un método get (que es el método que actualmente estamos utilizando). Necesitamos que sea tipo string, buffer...

Por ello, nuestro objeto de vuelta, deberá modificarse con la funcion JSON.stringify()
Ejemplo: 

```
      response.end(JSON.stringify(data))
```

### Ejercicio 1.

#### getMovieById

Crea una ruta getmoviebyid (o "get-movie-by-id", a vuestro gusto), que reciba una query "id" y devuelva la película que encuentre. 

```

        - La ruta debe gestionar el path /getmoviebyid?id=1
        - La "petición" a la base de datos debe hacerse a través de un __callback__.
        - Si encuentra una coincidencia, la función deberá devolver la película encontrada con un statusCode = 200
        - En caso de no encontrar una coincidencia deberá responder un error: "No se ha encontrado ninguna película con la id [ID]" y un statusCode = 404


```


Aquí os dejo un ejemplo de cómo se enviaría una respuesta desde el servidor a través de un callback con su correspondiente error (En el ejercicio 2 y 3 tendréis que adaptarlo)

```
    case `/getUser?${query}`:
      const { id } = querystring.parse(query);

      const getUserById = id => {
        getUserFromDatabaseById(id, (error, data) => {
          if (error) {
            response.statusCode = 404;
            response.setHeader("Content-type", "text/plain");
            response.end(error);
          }

          response.statusCode = 200;
          response.setHeader("Content-type", "text/plain");
          response.end(JSON.stringify(data));
        });
      };
      getUserById(id);
      break;

```

OJO! Tened en cuenta que el contenido de las querys son tipo string, por lo que, si la id es tipo number, tendréis que tratar de ajustarlo para que coincidan

### Ejercicio 2.

#### getMovieByTitle

Crea una ruta getMovieByTitle (o "get-movie-by-title", a vuestro gusto), que reciba una query `title` y devuelva un array con la película o películas que encuentre

Ejemplo:
Queremos buscar una película cuyo título empiece por "The".

```
        - La ruta debe gestionar el path /getmoviebytitle?title=the
        - La "petición" debe ejecutarse con una __promesa__.
        - Si se encuentra una coincidencia, la función deberá devolver la película o películas encontradas.
        - En caso de no encontrar ninguna coincidencia deberá devolver un error: "No se ha encontrado ninguna película que empiece por [TITLE]"

```

Si las respuestas En el callback se hacían dentro del callback, en este caso tendrán que hacerse en el then y en el catch.
### Ejercicio 3.

#### getMovieByShowtimes

Crea una ruta getMovieShowtimes (o "get-movie-by-showtime", a vuestro gusto), que reciba una query `showtime` y devuelva un array con la película o películas que encuentre

```
        - La ruta debe gestionar el path /getmoviebyshotime?shotime=10:30
        - La "petición" debe ejecutarse con Async-await.
        - Si se encuentra una coincidencia, la función deberá devolver la película o películas encontradas.
        - En caso de no encontrar ninguna coincidencia deberá devolver un error: "No se ha encontrado ninguna película que comience a las [TIME]"

```

En este caso tendremos que usar async-await, pero recordad que await solo es valido dentro de una función asíncrona, por lo que tendréis que encontrar dónde situar el async...


### Mucho Ánimo!

## HAPPY CODDING!!!
