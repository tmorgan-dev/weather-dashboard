// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var apiKey = "428568c242a23aec5b8d74156afd47b7"
var city;
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

var searchButton = document.querySelector("#search")
var searchEl = document.querySelector("#searchfield")

searchButton.addEventListener("click", search)
    
function search(){
    city = searchEl.value.trim()
    console.log(city)   
    fetch (
        queryUrl
    ) .then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
    })
}