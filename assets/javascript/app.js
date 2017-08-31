var topics = [
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

  //Just doing btn on click will not work after we add new buttons.
  $(document).on("click", '.btn', function(){
    event.preventDefault();
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

function newButton(query){

    var button = "<button class='btn' id='" + query + "'>" + query;

    $("header")
      .append(button);
}

function createSearchBox(){

  $("body")
    .append($("<form class='searchForm'>"));

  $(".searchForm")  
    .append($("<label for='custom'>"))
    .append($("<input type='text' class='form-control' id='custom'>"))
    .append($("<input class='btn' id='searchBtn' type='submit' value='Search'>"));
    //.append($("<button class='btn' id='searchBtn'>"));

  $("label").text("Custom Search: ");
  $("#searchBtn").text("Search");

}

function buttonClicked(scope){

  console.log("Button clicked.");

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

    topics.push(query)

    newButton(query);

    $("#custom").val(" ");

    gifSearch(query);
  }

}

function gifSearch(searchTerm){

  //Reset the container html every time gifSearch is called
  $(".container").html("");

  //Append a bootstrap container to the body
  $("body")
    .append($("<div class='main container'>"));

  var apiKey = "e9f95e9854974af3ac89fd3e68fa0759",
      limit = 10,
      rating = "rating=pg";

  //API Stuff
  var url = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&" + rating + "&api_key=" + apiKey + "&limit=" + limit;

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
    //If there are more than 0 results
    else {

      //Runs X amount of times according to the limit variable.
      for (var i = 0; i < limit; i++){
        var src = "<img id='" + i + "' static='true' src='" + data.data[i].images.fixed_width_still.url + "'>",
            rating = "<p id='" + "rating" + data.data[i].id + "' class='rating'>" + data.data[i].rating; 

        $(".container")
          .append($("<div class='gifHolder' id='" + data.data[i].id + "'>"));

        $("#" + data.data[i].id)
          .append($(src))
          .append($(rating));

        $("#" + "rating" + data.data[i].id).text("Rated " + data.data[i].rating.toUpperCase());
      
      }


      //If an image is clicked, make it animated. Or unanimated.
      $("img").on("click", function(){
        var id = $(this).attr("id");

        if ($(this).attr("static") === "true"){
          $(this).attr("src", data.data[id].images.fixed_width.url);
          $(this).attr("static", "false");
        }
        else if ($(this).attr("static") === "false"){
          $(this).attr("src", data.data[id].images.fixed_width_still.url);
          $(this).attr("static", "true");
        }
        else {
          console.log("Something is wrong. Static is: " + $(this).attr("static"));
        }

        
      });

    }

    
    
  });    

}
