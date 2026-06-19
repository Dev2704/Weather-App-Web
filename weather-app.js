async function getWeather(city) {
    try{
        const response = await fetch(
        `https://wttr.in/${city}?format=j1`
        );

        const data = await response.json();

        const temp = data.current_condition[0].temp_C;
        const feelsLike = data.current_condition[0].FeelsLikeC;
        const humidity = data.current_condition[0].humidity;
        const cloudCover = data.current_condition[0].cloudcover;
        const windSpeed = data.current_condition[0].windspeedKmph;

        return {
        city,
        temp,
        feelsLike,
        humidity,
        cloudCover,
        windSpeed
        };

    }

    catch (error){
        result.innerHTML = "Could not fetch weather data.";
        console.log(error.message);
    }
}

const input = document.getElementById("cityInput");
const result = document.getElementById("result")

const button = document.getElementById("getWeather");

async function weatherGet() {
    const formattedCity =
            input.value.charAt(0).toUpperCase() +
            input.value.slice(1).toLowerCase();
    
    if (input.value.trim() === ""){
        result.innerHTML = "⚠️Please Enter a City";
        return;
    } else{
        result.innerHTML = "🌥️Loading Weather...";

        const weather = await getWeather(formattedCity);

        input.value = "";

        result.innerHTML = 
            ` 📍City: ${weather.city} <br>
            🌡️Temperature: ${weather.temp}°C <br>
            ♨️Feels Like: ${weather.feelsLike}°C <br>
            💧Humidity: ${weather.humidity}% <br>
            ☁️Cloud Cover: ${weather.cloudCover}% <br> 
            💨Wind Speed: ${weather.windSpeed}kmph\n`;

    }
    
}

input.addEventListener("keypress", (event) =>{
    if (event.key === "Enter") {
        weatherGet();
    }
})

button.addEventListener("click", weatherGet);