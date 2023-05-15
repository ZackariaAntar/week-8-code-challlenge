console.log("client.js sourced");

$(document).ready(onReady);
// establishing global variables to store input data in.
let whoseJoke;
let jokeQuestion;
let punchLine;

function onReady() { // registering event handlers
	$("#addJokeButton").on("click", postJokes);
	console.log("DOM ready");
	getJokes(); //asking for stored jokes on page load to be appended to the DOM.
}

function getJokes() { // ajax call for jokes stored on server.
	$.ajax({
		method: "GET",
		url: "/jokes",
	})
		.then(function (response) {// after jokes are got, pass them through renderToDOM for rendering.
			renderToDOM(response);
		})
		.catch(function (error) {
			console.log(
				"Whoopsies, couldn't get what you were looking for",
				error
			);
		});
}

function postJokes(event) { // function to post new jokes to the server.
	event.preventDefault();
	whoseJoke = $("#whoseJokeIn").val(); // storing input data in our global variables.
	jokeQuestion = $("#questionIn").val();
	punchLine = $("#punchlineIn").val();
	$.ajax({
		method: "POST",
		url: "/jokes",
		data: {
			whoseJoke, // object shorthand notation.
			jokeQuestion,
			punchLine,
		},
	})
		.then(function (response) { // after succesful posting, call the full array of jokes back form the server so we can rerender.
			getJokes();
		})
		.catch(function (error) {
			console.log(
				"Whoopsies, couldn't post what you were looking for",
				error
			);
		});
}

function renderToDOM(jokeList) { // takes an array as an input argument.
	$("#whoseJokeIn").val(""); //clearing the input values as the page renders.
	$("#questionIn").val("");
	$("#punchlineIn").val("");
	$("#outputDiv").empty();// empty out the div that holds the jokes data because we're using a for of loop to append.
	for (let joke of jokeList) {// append the joke object data with each property on its own line. 
		$("#outputDiv").append(`
        <div class="full-joke">
            <p class="jokes">Question: ${joke.jokeQuestion}</p>
            <p class="jokes">Punchline: ${joke.punchLine}</p>
            <p class="jokes">-Submitted by: ${joke.whoseJoke}</p>
        </div>

        `);
	}
}
