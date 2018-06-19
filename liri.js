var request = require('request');
var keys = require('./keys.js');
var twitterapi = require('twitter');
var spotifyapi = require('node-spotify-api');
var fs = require('fs');
var dotenv = require('dotenv');

var arg = process.argv;
var what = arg[2];
var command = arg[3];

switch (what) {

	case "movie-this":
	movie(command);
	break;

	case "do-what-it-says":
	dowhatitsays();
	break;
};





function movie(command) {

	var queryUrl = "http://www.omdbapi.com/?t=" + command + "&y=&plot=short&apikey=trilogy";

	request(queryUrl, function(error, response, body) {
		if (!command){
        	command = 'Mr Nobody';
    	}
		if (!error && response.statusCode === 200) {

		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		    console.log("Rating: " + JSON.parse(body).Ratings[1]);
		    console.log("Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
};

function dowhatitsays() {
	fs.readFile('random.txt', "utf8", function(error, data){

		if (error) {
    		return console.log(error);
  		}
		var dataArr = data.split(",");
		if(dataArr[0] === "movie-this") {
			var movie_name = dataArr[1].slice(1, -1);
			movie(movie_name);
		} 
		
  	});

};



