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

        /*
        console.log("===== Weather =====\n");
        console.log(` City: ${city}`);
        console.log(` Temperature: ${temp}°C`);
        console.log(` Feels Like: ${feelsLike}°C`);
        console.log(` Humidity: ${humidity}%`);
        console.log(` Cloud Cover: ${cloudCover}%`);
        console.log(` Wind Speed: ${windSpeed}kmph\n`);
        console.log("==================");
        */

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
        console.log("Could not fetch weather data.");
        console.log(error.message);
    }
}

const input = document.getElementById("cityInput");
const result = document.getElementById("result")

const button = document.getElementById("getWeather");
button.addEventListener("click", async () => {

    const formattedCity =
            input.value.charAt(0).toUpperCase() +
            input.value.slice(1).toLowerCase();

    const weather = await getWeather(formattedCity);
    result.innerHTML = 
    ` City: ${weather.city} <br>
    Temperature: ${weather.temp}°C <br>
    Feels Like: ${weather.feelsLike}°C <br>
    Humidity: ${weather.humidity}% <br>
    Cloud Cover: ${weather.cloudCover}% <br> 
    Wind Speed: ${weather.windSpeed}kmph\n`;
});