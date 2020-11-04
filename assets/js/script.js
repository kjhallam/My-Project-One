$(document).ready(function () {


  var todayDate;
  var cityName = [];
  var image;
  var maxDistance;


  function getWeather() {
    var city = document.getElementById("search").value;
    var units = document.getElementById("units").value;
    fetch("http://api.weatherstack.com/current?access_key=b8825e7d7dff1231e64b523c6fb89e42&query=" + city
      + "&units=" + units)
      .then(a => a.json())
      .then(response => {
        console.log('======================WEATHER RESPONSE======================\n', response , '=========================================\n')
        
        document.getElementById("image").src = response.current.weather_icons[0];
        console.log(response)
        document.getElementById("output").innerHTML = "<h3>" + response.location.name + "</h3>Temperature: " + response.current.temperature + "F" + "<br><hr>Feels like: " + response.current.feelslike + "<br><hr>UV index: " + response.current.uv_index + "<br><hr>Humidity: " + response.current.humidity + "<br><hr>Description: " + response.current.weather_descriptions;
        return {lat: response.location.lat , lon: response.location.lon}
      }).then(coords => {
        console.log('----------------coords-------------------------', coords)
        var lat = coords.lat;
        var lon = coords.lon;



        $.ajax({
          url: "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=10&key=200952288-580b87b672e00ea3e6f7ec1e05ad0bb9",
          method: "GET"
        }).then(function (response) {
          console.log( '\n=================TRAILS==============\n', response.trails, '\n===================================\n')
          var trails = response.trails
             
          $(trails).each(function(index, el) {
            console.log( `${index}----> `, el)

             var labelData = {
                      ascent: 0,
                      conditionDate: "",
                      conditionDetails: null,
                      conditionStatus: "",
                      descent: 0,
                      difficulty: "",
                      high: 0,
                      id: 0,
                      imgMedium: "",
                      imgSmall: "",
                      imgSmallMed: "",
                      imgSqSmall: "",
                      latitude: 0,
                      length: 0,
                      location: "",
                      longitude: 0,
                      low: 0,
                      name: "",
                      starVotes: 0,
                      stars: 0,
                      summary: "",
                      type: "",
                      url: ""
            }
          
            var parent = $('#cardDisplay').attr("style", "width: 30rem");
            var imageSm  = $('<img>').attr('src', el.imgSqSmall, "style", "width: 300px;", "height: 300px;", "margin: 5px");
            var name = $('<h6>').text('' + el.name).attr("style", "margin-bottom: 2px");
            var difficult = $('<p>').text('Difficult:' + el.difficulty);
            var summary = $('<p>').text('' + el.summary).attr("style", "margin: 3px");




            parent.append(imageSm, name, difficult, summary)
            $("#cardDisplay").append(parent);

          })
          
         
           })
      })
}

  $("#weatherbutton").on("click", getWeather);


  //hiking API Key
function trailData(lat,lon) {
  

  $.ajax({
   
    url: "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=10&key=200952288-580b87b672e00ea3e6f7ec1e05ad0bb9",
    method: "GET"
  }).then(function (response) {
    console.log(response)
const trails= response.trails.map(function(trail){


const trailTemplate = `
<div class="card">
<div class="card-image">
  <img src="${trail.imgSqSmall}" width="200" height="200">
  <span class="card-title">${trail.name}</span>
</div>
<div class="card-content">
  <p>Difficulty: ${trail.difficulty}</p>
  <p>Rating: ${trail.stars}</p>
</div>
<div class="card-action">
  <a href="${trail.url}" target="_blank">Go to the trail site</a>
</div>
</div>
`
return trailTemplate;
})
$("#trail-cards").html(trails.join(""))
  })
}
})