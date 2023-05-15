console.log('client.js sourced');

$( document ).ready( onReady );

let whoseJoke;
let jokeQuestion;
let punchLine;

function onReady() {
    $("#addJokeButton").on('click', postJokes);
    console.log('DOM ready');
    getJokes()
}

function getJokes(){
    $.ajax({
        method: 'GET',
        url: '/jokes'
    }).then(function(response){
        renderToDOM(response)
    }).catch(function(error){
        console.log('Whoopsies, couldn\'t get what you were looking for', error);
    })

}

function postJokes(event){
    event.preventDefault()
    whoseJoke = $("#whoseJokeIn").val();
    jokeQuestion = $("#questionIn").val();
    punchLine = $("#punchlineIn").val();
    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: {
            whoseJoke,
            jokeQuestion,
            punchLine,
        }
    }).then(function(response){
        getJokes()
    }).catch(function(error){
        console.log("Whoopsies, couldn't post what you were looking for", error);

    })

}

function renderToDOM(jokeList){
    $('#outputDiv').empty()
    for (let joke of jokeList){
        $('#outputDiv').append(`<p class="jokes">${joke.jokeQuestion}</p>`)
        // add the rest of the props after testing.
        // figure out formatting.
    }

}




//     <input type='text' id='whoseJokeIn' placeholder='whose joke' />
    // <input type='text' id='questionIn' placeholder='question' />
    // <input type='text' id='punchlineIn' placeholder='punchline' />
    // <button id='addJokeButton'>Add Joke</button>
    // <h2>Jokes:</h2>
    // <div id='outputDiv'></div>



