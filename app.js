var body = document.getElementsByTagName("body")[0];
var container = document.getElementById("container");
let card = null;let button = null;

let things = {
    anime: `https://api.jikan.moe/v3/anime/`,
    joke: `https://official-joke-api.appspot.com/random_joke`,
    show: 'http://api.tvmaze.com/shows/',
    cat: `https://aws.random.cat/meow`,
    dog: `https://random.dog/woof.json`
};

function random(){
    return Math.floor(Math.random()*1000) + 1;
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function createButtonDiv(thingName){ //creating div & refresh button 
  card = document.createElement('div');
  card.classList = "card w-50 p-3";
  card.style = "margin-left:25%";
  body.appendChild(card);
  
  button = document.createElement('button');
  button.classList = "btn btn-outline-secondary btn-block mt-4 w-50";
  button.style = "margin-left:25%"
  if(thingName == 'show' || thingName == 'anime'){
    button.innerHTML = "Another thing";button.onclick = function() {randomThing(thingName)};
  } else {
    button.innerHTML = "Another thing";button.onclick = function() {thing(thingName)};
  }
  body.appendChild(button);
}

//outputs
function outputAnime(thing){
  return `<img src=${thing.image_url} class="card-img-top w-50  p-3" style="margin-left:25%">
  <div class="card-body">
    <h5 class="card-title">${thing.title}</h5>
    <p class="card-text" style="font-size:1.5vh">${thing.synopsis}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Score : ${thing.score}</li>
    <li class="list-group-item">Type : ${thing.type}</li>
    <li class="list-group-item">Status : ${thing.status}</li>
  </ul>
  <div class="card-body">
    <a href="${thing.url}" class="card-link">Myanimelist</a>
  </div>`
}

function outputShow(thing){
  console.log(thing);
  return `<img src=${thing.image.medium} class="card-img-top w-50 p-3" style="margin-left:25%">
  <div class="card-body">
    <h5 class="card-title">${thing.name}</h5>
    <p class="card-text" style="font-size:1.5vh">${thing.summary}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Rating : ${thing.rating.average}</li>
    <li class="list-group-item">Year : ${thing.premiered.substr(0,4)}</li>
    <li class="list-group-item">Status : ${thing.status}</li>
  </ul>
  <div class="card-body">
    <a href="${thing.url}" class="card-link" style="margin-left:40%">Tvmaze</a>
  </div>`
}

function outputJoke(thing){
  return `<div class="card">
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p>${thing.setup}</p>
      <footer class="blockquote-footer">${thing.punchline}</footer>
    </blockquote>
  </div>
</div>`
}

function outputAnimal(thing, thingName){
  if(thingName == 'dog'){thing = thing.url;} else{thing = thing.file};
  if(thing.substr(thing.length - 4) != '.mp4' && thing.substr(thing.length - 5) != '.webm'){
    return `<div class="container">
      <img src=${thing} class="card-img-top w-75 p-3" style="margin-left:13%">
  </div>`;
  } else {
    return `<div class="embed-responsive embed-responsive-16by9">
    <iframe class="embed-responsive-item" src="${thing}"></iframe>
  </div>`;
  }
}

//controller
function output(thing, thingName){ 
  if(card != null || button != null){
    card.remove();
    button.remove();
    createButtonDiv(thingName);
  } else {
    createButtonDiv(thingName);
  }
  if(thingName == 'anime'){
    card.innerHTML = outputAnime(thing);
  } else if(thingName == 'show'){
    card.innerHTML = outputShow(thing);
  } else if(thingName == 'joke'){
    card.innerHTML = outputJoke(thing);
  } else if(thingName == 'cat' || thingName == 'dog'){
    card.innerHTML = outputAnimal(thing, thingName);
  }
}

//fetchers
function randomThing(thingName){
    let p = document.querySelector('#subtitle');
    let list = document.querySelector('#list');
    if(p != null & list != null){
      p.remove();
      list.remove();
    }
    let id = random();
    let link = things[thingName] + id;
    fetch(link)
    .then(function(response) {
        return response.json();
    })   
    .then(function(parsedJson) {
        console.log(parsedJson);
        if(parsedJson.status == 404){
          randomThing(thingName);
        } else {
          output(parsedJson, thingName);
          return parsedJson;
        }
    })
}

function thing(thingName){
  let p = document.querySelector('#subtitle');
  let list = document.querySelector('#list');
  if(p != null & list != null){
    p.remove();
    list.remove();
  }
  let link = things[thingName];
  try{
  fetch(link)
  .then(function(response) {
      return response.json();
  })   
  .then(function(parsedJson) {
      output(parsedJson, thingName);
      return parsedJson;
  })
  } catch($e){
    thing(thingName);
  }
}




    
