// OpenWeatherMap API key
var apiKey = "428568c242a23aec5b8d74156afd47b7"
// Base URL for weather data
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?"

var searchButton = document.querySelector("#search")
var searchEl = document.querySelector("#searchfield")

// Function to perform a weather search for a given city
function search(city) {
     // Construct the URL for the weather API request
    var queryUrl2 = queryUrl + "q=" + city + "&appid=" + apiKey + "&units=imperial"
    // Fetch data from the OpenWeatherMap API
    fetch(queryUrl2)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // Extract relevant weather data
            var weatherData = {
                name: data.name,
                temp: data.main.temp,
                dayUtx: data.dt,
                icon: data.weather[0].icon,
                humidity: data.main.humidity,
                wind: data.wind.speed,
            }
             // Format the date using dayjs library
            var day = dayjs(data.dayUtx).format('MMMM D, YYYY')
            // Update the result section with the retrieved weather information
            var resultContent = document.querySelector('#resultsection')
            var resultEl = ""
            var iconCode = weatherData.icon
            var iconImage = `<img src="http://openweathermap.org/img/wn/${iconCode}.png">`
            resultEl += `
            <div class='result'>
                <p>Name: ${weatherData.name}</p>
                <p>Date: ${day}</p>
                <p>${iconImage}</p>
                <p>Temp: ${weatherData.temp} °F</p>
                <p>Humidity: ${weatherData.humidity} %</p>
                <p>Wind Speed: ${weatherData.wind} MPH</p>
            </div>`;
            resultContent.innerHTML = resultEl

            // Extract latitude and longitude for the city
            var lat = data.coord.lat
            var lon = data.coord.lon

            // Fetch 5-day forecast data
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
                .then(function (response) {
                    return response.json()
                })
                .then(function (fiveDayData) {
                    // Extract relevant data for the next 5 days
                    var fiveDayArray = fiveDayData.list
                    console.log(fiveDayArray)
                    // Update the 5-day forecast section with retrieved data
                    var fiveDaySection = document.querySelector('#fivedaysection')
                    var fiveDayEl = ""
                    for (var i = 0; i <= 40; i += 8) {
                        var dayOfTheWeek = new Date(fiveDayArray[i].dt_txt).toLocaleString().split(",")[0]
                        console.log(dayOfTheWeek)
                        console.log(fiveDayArray[i].dt_txt)
                        var iconCode = fiveDayArray[i].weather[0].icon
                        var iconImage = `<img src="http://openweathermap.org/img/wn/${iconCode}.png">`
                        fiveDayEl += `
                        <div class='fivedaycard'>
                            <p>Date: ${dayOfTheWeek}</p>
                            <p>${iconImage}</p>
                            <p>Temp: ${fiveDayArray[i].main.temp} °F</p>
                            <p>Humidity: ${fiveDayArray[i].main.humidity} %</p>
                            <p>Wind Speed: ${fiveDayArray[i].wind.speed} MPH</p>
                        </div>`;
                        fiveDaySection.innerHTML = fiveDayEl
                    }
                })
        })
    history()
    clearText()
}

// Function to store the searched city in local storage
function history() {
    var historyValue = searchEl.value.trim()
    if (historyValue !== "") {
        // Retrieve existing search history from local storage or create an empty array
        var storage = JSON.parse(localStorage.getItem("storage")) || []
        // Add the current search to the history
        storage.push(historyValue)
        // Update local storage with the new history
        localStorage.setItem("storage", JSON.stringify(storage))
        // Create and update buttons for each city in the search history
        createbuttons(storage)
    }
}

// Function to create and update buttons for each city in the search history
function createbuttons(storage) {
    var historySection = document.querySelector('#historysection')
    historySection.innerHTML = ""
    storage.forEach(function (city) {
        var cityList = document.createElement("p")
        cityList.textContent = city
        cityList.className += "searched-city"
        historySection.appendChild(cityList)
        // Add event listener to each button to perform a new search when clicked
        cityList.addEventListener("click", function (event) {
            event.preventDefault()
            var oldCitySearch = cityList.textContent
            search(oldCitySearch)
        })
    })
}

// Event listener for the search button to trigger a search when clicked
searchButton.addEventListener("click", ()=>{search(searchEl.value.trim())})

// Function to clear the text input after a search
function clearText() {
   var input1 = document.getElementById('searchfield');
   input1.value = "";
}
