//  RukuZedTakaAPI = dd00af83e89105441c591b1fdc8aa109

document.addEventListener("DOMContentLoaded", () => {
    const RukuZedTakaAPI = "dd00af83e89105441c591b1fdc8aa109 "; 

    const searchButton = document.getElementById("search-button");
    const cityInput = document.getElementById("city-input");
    const weatherInfo = document.querySelector(".weather-info");
    const searchHistoryList = document.getElementById("search-history-list");
    const forecastList = document.getElementById("forecast-list");

    
    function displayWeather(data) {
        const {
            name: city,
            main: { temp, humidity },
            weather: [{ description, icon }],
            wind: { speed },
            dt
        } = data;

        const temperature = Math.round((temp - 273.15) * 9/5 + 32); 
        const date = new Date(dt * 1000);
        const dateStr = date.toLocaleDateString();
        const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`; 

        
        const cityCard = document.createElement("div");
        cityCard.classList.add("city-card");
        cityCard.innerHTML = `
            <h2>${city} - ${dateStr}</h2>
            <img src="${iconUrl}" alt="${description}">
            <p>Temperature: ${temperature}°F</p>
            <p>Description: ${description}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${speed} m/s</p>
        `;

        weatherInfo.appendChild(cityCard);
    }

    
    function displayForecast(data) {
        forecastList.innerHTML = "";

        data.list.forEach(item => {
            const {
                dt,
                weather: [{ icon }],
                main: { temp, humidity },
                wind: { speed }
            } = item;

            const date = new Date(dt * 1000); 
            const dateStr = date.toLocaleDateString();
            const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`; 
            const temperature = Math.round((temp - 273.15) * 9/5 + 32); 

            
            const forecastCard = document.createElement("div");
            forecastCard.classList.add("forecast-card");
            forecastCard.innerHTML = `
                <p>Date: ${dateStr}</p>
                <img src="${iconUrl}" alt="Forecast">
                <p>Temperature: ${temperature}°F</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${speed} m/s</p>
            `;

            forecastList.appendChild(forecastCard);
        });
    }

        
        function displayCityWeather(city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${dd00af83e89105441c591b1fdc8aa109}`)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                    addToSearchHistory(city);
                })
                .catch(error => {
                    console.error(error);
                    weatherInfo.innerHTML = "City not found.";
                });
    
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${dd00af83e89105441c591b1fdc8aa109}`)
                .then(response => response.json())
                .then(data => {
                    displayForecast(data);
                })
                .catch(error => {
                    console.error(error);
                    forecastList.innerHTML = "Forecast data not found.";
                });
        }
    