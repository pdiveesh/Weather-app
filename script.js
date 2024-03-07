async function fetchWeather() {
    let searchInput = document.getElementById('search').value;
    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.style.display = "block";
  
    const apiKey = "ENTER_YOUR_API";
  
    if(searchInput == "") {
      weatherDataSection.innerHTML = `
      <div>
      <h2>Empty Input!</h2>
      <p>Please try again with a valid <u>city name</u>.</p>
      </div>
      `;
      return;
    }
  
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}`
    const response = await fetch(weatherURL);
  
    if(!response.ok) {
        weatherDataSection.innerHTML = `
        <div>
        <h2>Invalid Input: "${searchInput}"</h2>
        <p>Please try again with a valid <u>city name</u>.</p>
        </div>
        `;
        return;
    }
  
    const data = await response.json();
    weatherDataSection.style.display = "flex";
    weatherDataSection.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
    <div>
      <h2>${data.name}</h2>
      <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
      <p><strong>Description:</strong> ${data.weather[0].description}</p>
    </div>
    `
  
    document.getElementById("search").value = "";
}