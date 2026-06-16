const apiKey = "YOUR_API_KEY";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const condition = document.getElementById("condition");

const weatherCard = document.getElementById("weatherCard");
const errorMessage = document.getElementById("errorMessage");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    try {
        errorMessage.textContent = "";
        weatherCard.classList.add("hidden");

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

    } catch (error) {
        errorMessage.textContent =
            "Unable to fetch weather data. Please try again.";

        console.error(error);
    }
}

function displayWeather(data) {

    // Nested JSON extraction
    const city = data.name;
    const temp = data.main.temp;
    const hum = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherCondition = data.weather[0].main;

    cityName.textContent = city;
    temperature.textContent = temp;
    humidity.textContent = hum;
    wind.textContent = windSpeed;
    condition.textContent = weatherCondition;

    weatherCard.classList.remove("hidden");
}
