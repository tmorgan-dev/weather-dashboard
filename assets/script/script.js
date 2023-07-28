var apiKey = "428568c242a23aec5b8d74156afd47b7"
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?"


var searchButton = document.querySelector("#search")
var searchEl = document.querySelector("#searchfield")


function search(city) {
    var queryUrl2 = queryUrl + "q=" + city + "&appid=" + apiKey + "&units=imperial"
    fetch(queryUrl2)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var weatherData = {
                name: data.name,
                temp: data.main.temp,
                dayUtx: data.dt,
                icon: data.weather[0].icon,
                humidity: data.main.humidity,
                wind: data.wind.speed,
            }
            var day = dayjs(data.dayUtx).format('MMMM D, YYYY')
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

            var lat = data.coord.lat
            var lon = data.coord.lon

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
                .then(function (response) {
                    return response.json()
                })
                .then(function (fiveDayData) {
                    var fiveDayArray = fiveDayData.list
                    console.log(fiveDayArray)
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
}

function history() {
    var historyValue = searchEl.value.trim()
    var storage = JSON.parse(localStorage.getItem("storage")) || []
    storage.push(historyValue)
    localStorage.setItem("storage", JSON.stringify(storage))
    createbuttons(storage)
}

function createbuttons(storage) {
    var historySection = document.querySelector('#historysection')
    historySection.innerHTML = ""
    storage.forEach(function (city) {
        var cityList = document.createElement("li")
        cityList.textContent = city
        cityList.className += "searched-city"
        historySection.appendChild(cityList)

        cityList.addEventListener("click", function (event) {
            event.preventDefault()
            var oldCitySearch = cityList.textContent
            console.log(cityList)
            search(oldCitySearch)
        })
    })
}


searchButton.addEventListener("click", ()=>{search(searchEl.value.trim())})