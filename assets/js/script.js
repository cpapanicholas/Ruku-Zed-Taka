 RukuZedTakaAPI = dd00af83e89105441c591b1fdc8aa109

document.addEventListener("DOMContentLoaded", () => {
    const RukuZedTakaAPI = "dd00af83e89105441c591b1fdc8aa109 "; 

    const searchButton = document.getElementById("search-button");
    const cityInput = document.getElementById("city-input");
    const weatherInfo = document.querySelector(".weather-info");
    const searchHistoryList = document.getElementById("search-history-list");


    function displayWeather(data) {
        const city = data.name;
        const temperature = Math.round((data.main.temp - 273.15) * 9/5 + 32);
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        const date = new Date(data.dt * 1000);
        const dateStr = date.toLocaleDateString();
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`; // Weather icon URL

        // Create a card to display weather information for each city
        const cityCard = document.createElement("div");
        cityCard.classList.add("city-card");
        cityCard.innerHTML = `
            <h2>${city} - ${dateStr}</h2>
            <img src="${iconUrl}" alt="${description}">
            <p>Temperature: ${temperature}°F</p>
            <p>Description: ${description}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;

        weatherInfo.appendChild(cityCard);
    }