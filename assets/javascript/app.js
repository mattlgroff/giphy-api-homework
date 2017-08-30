var apiKey = "e9f95e9854974af3ac89fd3e68fa0759",
    limit = 10,
    rating = "rating=pg",
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
	//console.log("Document is ready.");
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

  //Reset the container html every time gifSearch is called
  $(".container").html("");

  //Append a bootstrap container to the body
  $("body")
    .append($("<div class='main container'>"));

  //API Stuff
  var url = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&" + rating + "&api_key=" + apiKey + "&limit=" + limit;

  //Make a returnedObj out of the json file from giphy's API
  var returnedObj = $.get(url);

  //.done runs once it is finished loading. 
  returnedObj.done(function(data) {

    //If No Results
    if (data.data.length === 0){
      console.log("No results.");

      $(".container")
        .append($("<p id='noResults'>"));

      $("#noResults")
        .text("Sorry, no results.");  

    }
    //If Less Than 10 Results..
    else if (data.data.length < limit){

      $(".container")
        .append($("<p id='fewResults'>"));

      $("#noResults")
        .text("There is less than " + limit + " results.");  

      for (var i = 0; i < data.data.length; i++){
        var src = "<img src='" + data.data[i].images.fixed_width.url + "'>",
            rating = "<p id='" + "rating" + data.data[i].id + "' class='rating'>" + data.data[i].rating; 

        $(".container")
          .append($("<div class='gifHolder' id='" + data.data[i].id + "'>"));

        $("#" + data.data[i].id)
          .append($(rating)) 
          .append($(src)); 

        $("#" + "rating" + data.data[i].id).text("Rated " + data.data[i].rating.toUpperCase());
      
      }

    }
    //If there are 10 (limit) or more results
    else {

      //Runs X amount of times according to the limit variable.
      for (var i = 0; i < limit; i++){
        var src = "<img src='" + data.data[i].images.fixed_width.url + "'>",
            rating = "<p id='" + "rating" + data.data[i].id + "' class='rating'>" + data.data[i].rating; 

        $(".container")
          .append($("<div class='gifHolder' id='" + data.data[i].id + "'>"));

        $("#" + data.data[i].id)
          .append($(rating)) 
          .append($(src)); 

        $("#" + "rating" + data.data[i].id).text("Rated " + data.data[i].rating.toUpperCase());
      
      }
    }

    
    
  });    

}