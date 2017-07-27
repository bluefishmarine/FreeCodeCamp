$(function() { // on Ready....

/***Gets Location Data***/
function getLocationData(){
  $.ajax({
  dataType: "json",
  type: "GET",
  url:"https://ipapi.co/json/",
  success: success
});
}

/**Location Call Instructions**/
function success(data){
  var latitude = data.latitude;
  var longitude = data.longitude;
  var city = data.city;
  var region = data.region;
  getWeatherData(city,region);
}
function fail(){
  alert("Failed to obtain location data")
}

/***Gets Weather Data From City**/
 function getWeatherData(city,region){
   $.ajax({
   dataType: "json",
   type: "GET",
   url:"https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6451b740ab1824462234f5fd523b3ac4&units=imperial",
   success: function(data){
     displayData(data,region);
   },
   fail: function(){
   $("#Loc").text("Unavailable");
   $("#Temp").text("Unavailable");
   $("#Desc").text("Unavailable");
   }
 }) 
    }

/***Displays Data on Screen**/
function displayData(data,region){
  var tempFar = Math.round(data.main.temp);
  var tempCel = Math.round((tempFar-32)*(5/9));
  var temp = "Fahr";
  var iconImage = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    $("#Toggle").on('click', function(){
      if (temp==="Fahr"){
        $("#Temp").text(tempCel + " C")
        temp="Celc";
      }else{
        $("#Temp").text(tempFar + " F")
        temp="Fahr";
      } 
    })
  $("#Loc").text(data.name + ", " + region);
  $("#Temp").text(tempFar + " F");
  $("#Desc").text(data.weather[0].description);
  $("#hum").text("Humidity: " + data.main.humidity);
  $("#press").text("Pressure: " + data.main.pressure)  ;             
  $("img").attr("src", iconImage);
}

$("a").click(function( event ) {
  event.preventDefault();
})

/*****Toggle Extra Info*******/
$("#button").on("click",function(){
  var icon = $("#button i").attr("class");
  $("#extra-table").slideToggle("slow",function(){
    if (icon==="fa fa-arrow-down"){
      $("#button i").attr("class","fa fa-arrow-up");
    }else{
      $("#button i").attr("class","fa fa-arrow-down");
    }
  });
})

getLocationData();

});











