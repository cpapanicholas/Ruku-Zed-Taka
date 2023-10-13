

document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "5685455f352d66e329e089055ab2fa22"; 


    const searchButton = document.getElementById("search-button");
    const cityInput = document.getElementById("city-input");
    const currentWeather = document.querySelector(".current-weather");
    const forecast = document.querySelector(".forecast");
    const searchHistoryList = document.getElementById("search-history-list");

    
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

        
        const currentWeatherHTML = `
            <h2>${city} - ${dateStr}</h2>
            <img src="${iconUrl}" alt="${description}">
            <p>Temperature: ${temperature}°F</p>
            <p>Description: ${description}</p>
            <p>Humidity: ${humidity}%</p> 
            <p>Wind Speed: ${speed} m/s</p>
        `;

        
        currentWeather.innerHTML = currentWeatherHTML;
    }

    
    function displayForecast(data) {
        forecast.innerHTML = ""; 

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

            
            const forecastCardHTML = `
                <div class="forecast-card">
                    <p>Date: ${dateStr}</p>
                    <img src="${iconUrl}" alt="Forecast">
                    <p>Temperature: ${temperature}°F</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${speed} m/s</p>
                </div>
            `;

            
            forecast.innerHTML += forecastCardHTML;
        });
    }

    
    function displayCityWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
                addToSearchHistory(city);
            })
            .catch(error => {
                console.error(error);
                currentWeather.innerHTML = "City not found.";
            });

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                displayForecast(data);
            })
            .catch(error => {
                console.error(error);
                forecast.innerHTML = "Forecast data not found.";
            });
    } 

    
    function addToSearchHistory(city) {
        
        const previousCities = getPreviousCities();
        previousCities.unshift(city); 
        savePreviousCities(previousCities);

        
        displaySearchHistory();
    }

   
    function getPreviousCities() {
        const previousCitiesJSON = localStorage.getItem("previousCities");
        return JSON.parse(previousCitiesJSON) || [];
    }

    
    function savePreviousCities(previousCities) {
        const previousCitiesJSON = JSON.stringify(previousCities);
        localStorage.setItem("previousCities", previousCitiesJSON);
    }

  
    function displaySearchHistory() {
        const previousCities = getPreviousCities();
        searchHistoryList.innerHTML = "";

        previousCities.forEach(city => {
            const listItem = document.createElement("li");
            listItem.textContent = city;
            searchHistoryList.appendChild(listItem);
        });
    }

    
    searchButton.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city === "") return;

        
        displayCityWeather(city);
    });

   
    searchHistoryList.addEventListener("click", event => {
        if (event.target.tagName === "LI") {
            const selectedCity = event.target.textContent;
            cityInput.value = selectedCity;
            displayCityWeather(selectedCity);
        }
    });

  
    displaySearchHistory();
});