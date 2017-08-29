var apiKey = "e9f95e9854974af3ac89fd3e68fa0759",
  	topics = [
  		"cats",
  		"dogs",
  		"bats",
  		"squirrels",
  		"rabbits",
  		"hamsters",
  		"lizards",
  		"aww",
  		"puppy",
  		"kitten"
  	];

$(document).ready( function(){
	console.log("Document is ready.");
  createButtons(topics);
  createSearchBox();

  $("button").on("click", function(){
    buttonClicked(this);
  });

});

function createButtons(array){

  $("body")
    .append($("<header>"));

  for (i = 0; i < array.length; i++){
    var button = "<button class='btn' id='" + array[i] + "'>" + array[i];

    $("header")
      .append(button);
  }
}

function createSearchBox(){

  $("body")
    .append($("<div class='form'>"));

  $(".form")  
    .append($("<label for='custom'>"))
    .append($("<input type='text' class='form-control' id='custom'>"))
    .append($("<button class='btn' id='searchBtn'>"));

  $("label").text("Custom Search: ");
  $("#searchBtn").text("Search");

}

function buttonClicked(scope){

  var pressed = $(scope).attr("id");

  if (topics.indexOf(pressed) !== -1){
    gifSearch(pressed);
  }
  else if (pressed === "searchBtn"){
    searchBtnPressed();
  }
  else {
    console.log("Something is wrong.");
  }

}

function searchBtnPressed(){
  var query = $("#custom").val();

  if (query === ""){
    console.log("You typed nothing in the search box.");
  }
  else {
    gifSearch(query);
  }

}

function gifSearch(searchTerm){

  console.log("Insert function here to search for " + searchTerm + ".");

}