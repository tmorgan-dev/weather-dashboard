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

            resultBody.value = ""

            var bodyContentName = document.createElement('p');
            var bodyContentDate = document.createElement('p');
            var bodyContentTemp = document.createElement('p');
            var bodyContentHumidity = document.createElement('p');
            var bodyContentWind = document.createElement('p');
            var bodyContentIcon = document.createElement('img');

            bodyContentName.textContent = "Name: " + weatherData.name
            bodyContentDate.textContent = "Date: " + time
            bodyContentTemp.textContent = "Temp: " + weatherData.temp + " °F"
            bodyContentHumidity.textContent = "Humidity: " + weatherData.humidity + " %"
            bodyContentWind.textContent = "Wind Speed: " + weatherData.wind + " MPH"
            bodyContentIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherData.icon + "@2x.png")

            // resultCard.value = ""
            

            resultBody.append(bodyContentName);
            resultBody.append(bodyContentDate);
            resultBody.append(bodyContentTemp);
            resultBody.append(bodyContentHumidity);
            resultBody.append(bodyContentWind);
            resultBody.append(bodyContentIcon);

            resultContentEl.append(resultCard);

            var lat = data.coord.lat
            var lon = data.coord.lon

            fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
            ).then(function (response) {
                return response.json()
            }).then(function (fiveDayData) {
                var fiveDayArray = fiveDayData.list
                console.log(fiveDayArray)
                var fiveDaySection = document.querySelector('#fivedaysection')
                var fiveDayEl = ""
                for (var i = 0; i <= 4; i++) {
                    var dayOfTheWeek = new Date(fiveDayArray[i].dt_txt).toLocaleString().split(",")[0]
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
            search(oldCitySearch)
        })
    })
}

searchButton.addEventListener("click", search)

