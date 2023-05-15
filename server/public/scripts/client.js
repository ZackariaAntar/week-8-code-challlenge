console.log("client.js sourced");

$(document).ready(onReady);

let whoseJoke;
let jokeQuestion;
let punchLine;

function onReady() {
	$("#addJokeButton").on("click", postJokes);
	console.log("DOM ready");
	getJokes();
}

function getJokes() {
	$.ajax({
		method: "GET",
		url: "/jokes",
	})
		.then(function (response) {
			renderToDOM(response);
		})
		.catch(function (error) {
			console.log(
				"Whoopsies, couldn't get what you were looking for",
				error
			);
		});
}

function postJokes(event) {
	event.preventDefault();
	whoseJoke = $("#whoseJokeIn").val();
	jokeQuestion = $("#questionIn").val();
	punchLine = $("#punchlineIn").val();
	$.ajax({
		method: "POST",
		url: "/jokes",
		data: {
			whoseJoke,
			jokeQuestion,
			punchLine,
		},
	})
		.then(function (response) {
			getJokes();
		})
		.catch(function (error) {
			console.log(
				"Whoopsies, couldn't post what you were looking for",
				error
			);
		});
}

function renderToDOM(jokeList) {
	$("#whoseJokeIn").val("");
	$("#questionIn").val("");
	$("#punchlineIn").val("");
	$("#outputDiv").empty();
	for (let joke of jokeList) {
		$("#outputDiv").append(`
        <div class="full-joke">
            <p class="jokes">Question: ${joke.jokeQuestion}</p>
            <p class="jokes">Punchline: ${joke.punchLine}</p>
            <p class="jokes">-Submitted by: ${joke.whoseJoke}</p>
        </div>

        `);
	}
}
