console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
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

function postJokes(){

}

function renderToDOM(){

}




