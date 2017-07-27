var input = document.querySelector("#textInput");
var box = document.querySelector(".search");
var icon = document.querySelector("i");
var articleContainer = document.querySelector("#articles");
var end;
var searched = false;

input.addEventListener("focus",function(){
  box.classList.add("stretch");
});
input.addEventListener("blur",function(){
  box.classList.remove("stretch");
});
icon.addEventListener("click",function(){
  if (icon.className === "fa fa-search"){
    runSearch();
  }else{
    returntoOriginalState();  
  }
});
input.addEventListener("keypress",runSearch);


function searchToggle(){
    if (box.classList.contains("animate")){
        animateDown()();
    }else{
      if (!searched){
        animateUp(); 
      }
    }
  }


function animateUp(){
    box.classList.add("animate");
    icon.className ="fa fa-window-close";
}

function animateDown(){
    box.classList.add("animateReverse");
    icon.className = "fa fa-search";                       
    articleContainer.classList.remove("articleSwoosh");
    return timer(removeClass);
}


function removeClass(){
    box.classList.remove("animate");
    box.classList.remove("animateReverse");
}


function getData(){
  searched = true;
  var wikiLink ="https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=" + input.value;
  $.ajax({
  dataType: "json",
  type: "GET",
  url: wikiLink,
  success: success
});
}

function success(data){
  timer(populateWithArticles);
  function populateWithArticles(){
  var length = data.query.search.length;
  var NumberofArticles = length;
  if (length > 10){
    NumberofArticles = 10;
  }
  articleContainer.classList.add("articleSwoosh");
  for (var x = 0; x<NumberofArticles; x++){
    var title = data.query.search[x].title;
    var snippet = data.query.search[x].snippet;
    var link = "https://en.wikipedia.org/wiki/" + title;
    $("#articles").append("              \
        <a href=" + link + " target='_blank'><article class='card'>            \
        <div class='article'>              \
        <h5 id='title'>" + title + "</h5>   \
        <p id='content'>"+snippet+"</p>      \
        </div></a>")                     
    } 
  }

 }

function runSearch(e){
  if (arguments.length===1){
    var key = e.which || e.keyCode;
    if (key === 13){
      box.classList.remove("stretch");
      if (searched){
        clearData();
        getData();
      }else{
        searchToggle();
        getData();
      }    
    } 
  }else{
    searchToggle();
    getData();
  }
}

function timer(action){
  end = window.setTimeout(action,1000);
}

function clearData(){
  $("#articles").html("");
}

function returntoOriginalState(){
  box.classList.remove("stretch");
  input.value = "";
  clearData();
  searched = false;
  searchToggle();   
}