// Class - Movie
// The class Movie is stated below. An instance of class Movie represents a film. This class has the following three properties:

// title, which is a String representing the title of the movie
// studio, which is a String representing the studio that made the movie
// rating, which is a String representing the rating of the movie (i.e. PG­13, R, etc)
// a) Write a constructor for the class Movie, which takes a String representing the title of the movie, a String representing the studio, and a String representing the rating as its arguments, and sets the respective class properties to these values.

// b) The constructor for the class Movie will set the class property rating to "PG" as default when no rating is provided.

// c) Write a method getPG, which takes an array of base type Movie as its argument, and returns a new array of only those movies in the input array with a rating of "PG". You may assume the input array is full of Movie instances. The returned array need not be full.

// d) Write a piece of code that creates an instance of the class Movie with the title “Casino Royale”, the studio “Eon Productions”, and the rating “PG­13”.

//Create a Class Movie that has 3 properties: title, studio, and rating.
//The constructor for the class Movie takes 3 arguments: title, studio, and rating.
//The constructor sets the class properties to the arguments.
//The constructor sets the class property rating to "PG" as default when no rating is provided.
//Create a method getPG that takes an array of base type Movie as its argument.
//The method returns a new array of only those movies in the input array with a rating of "PG".
//You may assume the input array is full of Movie instances. The returned array need not be full.
//Create an instance of the class Movie with the title "Casino Royale", the studio "Eon Productions", and the rating "PG-13".

Class Movie {
    constructor(title, studio, rating) {
        this.title = title;
        this.studio = studio;
        this.rating = rating;
    }
    getPG(movies) {
        let pgMovies = [];
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].rating == "PG") {
                pgMovies.push(movies[i]);
            }
        }
        return pgMovies;
    }
}

//Create an instance of the class Movie with the title "Casino Royale", the studio "Eon Productions", and the rating "PG-13".
let movie = new Movie("Casino Royale", "Eon Productions", "PG-13");


