const API_KEY = "ed8fcde594c14978c0c372d44c306aa1"
let weeklyChartInstance;

function getWeather() {
    const cityInput = document.getElementById('city-input');
    const cityName = cityInput.value;

    axios
        .get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)
        .then((response) => {
            const weatherData = response.data;
            populateHourlyForecast(weatherData);
            populateWeeklyChart(weatherData);

            console.log(weatherData)
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
}

function populateHourlyForecast(weatherData) {
    const hourlyForecastContainer = document.getElementById('hourly-forecast');
    hourlyForecastContainer.innerHTML = '';

    const hourlyData = weatherData.list.slice(0, 6);

    hourlyData.forEach((data) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const time = document.createElement('p');
        time.textContent = new Date(data.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const temperature = document.createElement('p');
        temperature.textContent = `${Math.round(data.main.temp - 273.15)}°C`;

        const description = document.createElement('p');
        description.textContent = data.weather[0].description;

        const icon = document.createElement('img');
        const iconCode = data.weather[0].icon;
        icon.src = `http://openweathermap.org/img/wn/${iconCode}.png`;

        card.appendChild(time);
        card.appendChild(icon);
        card.appendChild(temperature);
        card.appendChild(description);

        hourlyForecastContainer.appendChild(card);
    });

    console.log(hourlyForecastContainer);

    const weatherContainerHTML = document.getElementById("weather-container");

    weatherContainerHTML.classList.remove('hidden');
}

function populateWeeklyChart(weatherData) {
    const weeklyChartContainer = document.getElementById("weekly-chart");

    if (weeklyChartInstance) {
        weeklyChartInstance.destroy();
    }

    const weeklyData = weatherData.list;

    const labels = weeklyData.map((data) => new Date(data.dt * 1000).toLocaleDateString([], {weekday: 'short'}));
    const temperatures = weeklyData.map((data) => Math.round(data.main.temp - 273.15));
    const feelTemp = weeklyData.map((data) => Math.round(data.main.feels_like - 273.15));

    weeklyChartInstance = new Chart(weeklyChartContainer, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Main Temperature (°C)',
                    data: temperatures,
                    backgroundColor: 'rgb(75, 192, 192, 0.2)',
                    borderColor: 'rgb(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Feels Like (°C)',
                    data: feelTemp,
                    backgroundColor: 'rgb(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 50,
                },
            },
        },
    });

}
