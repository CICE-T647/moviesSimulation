# Movies.

## Simulando peticiones a una base de datos.

### Ejercicio 1.

#### getMovieById

Crea una función getMovieById() que busque una película por su id.

```

        - La "petición" debe hacerse a través de un __callback__.
        - Dentro del callback debe haber un setTimeout para mayor realismo en la petición (Pon tantos segundos como tiempo estés dispuesto a esperar...)
        - Si encuentra una coincidencia, la función deberá devolver la película encontrada.
        - En caso de no encontrar una coincidencia deberá responder un error: "No se ha encontrado ninguna película con la id [ID]"


```

### Ejercicio 2.

#### getMovieByTitle

Crea una función getMovieByTitle() que busque una película por `title`. Sin embargo, esta vez no queremos una coincidencia completa, si no que debe comenzar por el string que le enviemos.
  
 Ejemplo:
Queremos buscar una película cuyo título empiece por "The".
  
 Si no conoces el método, deberás tratar de buscarlo antes de preguntar. Google lo sabe todo!!! Si no lo encuentras, pregunta. Aunque me temo que el profesor no lo sabe todo...

    ```

        - La "petición" debe ejecutarse con una __promesa__.
        - Dentro de la promesa, de nuevo debe haber un setTimeout.
        - Si se encuentra una coincidencia, la función deberá devolver la película o películas encontradas.
        - En caso de no encontrar ninguna coincidencia deberá devolver un error: "No se ha encontrado ninguna película que empiece por [TITLE]"

    ```

### Ejercicio 3.

#### getMovieByShowtimes

En este caso, daréis una opción para aquellos que quieren ir al cine, pero que les da igual qué película ver. Solo quieren buscar por una hora a la que les venga bien.

Para ello, deberéis filtrar dentro del array para encontrar una película que se emita a determinada hora (showtimes). Es decir, deberéis encontrar una coincidencia dentro del array que (PISTA!)incluya la hora que paséis como parametro.

        ```
        - La "petición" debe ejecutarse con Async-await.
        - Dentro de la promesa, de nuevo debe haber un setTimeout.
        - Si se encuentra una coincidencia, la función deberá devolver la película o películas encontradas.
        - En caso de no encontrar ninguna coincidencia deberá devolver un error: "No se ha encontrado ninguna película que comience a las [TIME]"

        ```

## HAPPY CODDING!!!
