// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, 
// the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var apiKey = "428568c242a23aec5b8d74156afd47b7"
var city;
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?"

var searchButton = document.querySelector("#search")
var searchEl = document.querySelector("#searchfield")

var resultContentEl = document.querySelector('#result-content')

function search() {
    city = searchEl.value.trim()
    var queryUrl2 = queryUrl + "q=" + city + "&appid=" + apiKey + "&units=imperial"
    fetch(queryUrl2)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            var weatherData = {
                name: data.name,
                temp: data.main.temp,
                UtcTime: data.dt,
                icon: data.weather[0].icon,
                humidity: data.main.humidity,
                wind: data.wind.speed,
            }
            var time = dayjs(data.UtcTime).format('MMMM D, YYYY')
            var resultCard = document.createElement('div')
            resultCard.classList.add('card')

            var resultBody = document.createElement('div');
            resultBody.classList.add('card-body');
            resultCard.append(resultBody);

            var bodyContentName = document.createElement('p');
            var bodyContentDate = document.createElement('p');
            var bodyContentTemp = document.createElement('p');
            var bodyContentHumidity = document.createElement('p');
            var bodyContentWind = document.createElement('p');
            var bodyContentIcon = document.createElement('img');

            bodyContentName.textContent = "Name: " + weatherData.name
            bodyContentDate.textContent = "Date: " + time
            bodyContentTemp.textContent = "Temp: " + weatherData.temp
            bodyContentHumidity.textContent = "Humidity: " + weatherData.humidity
            bodyContentWind.textContent = "Wind Speed: " + weatherData.wind
            bodyContentIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherData.icon + "@2x.png")

            resultBody.append(bodyContentName);
            resultBody.append(bodyContentDate);
            resultBody.append(bodyContentTemp);
            resultBody.append(bodyContentHumidity);
            resultBody.append(bodyContentWind);
            resultBody.append(bodyContentIcon);

            resultContentEl.append(resultCard);
        })
}
searchButton.addEventListener("click", search)