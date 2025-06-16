let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

let key = "414da4448ae8e0b24ee48fc380012880";

let getWeather = () => {
  let cityValue = cityRef.value.trim();

  if (cityValue === "") {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
    return;
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;

  fetch(url)
    .then((resp) => {
      if (!resp.ok) {
        return resp.json().then((err) => {
          throw new Error(err.message || "Error fetching data");
        });
      }
      return resp.json();
    })
    .then((data) => {
      result.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${data.main.temp} &#176;C</h1>
        <div class="temp-container">
            <div>
                <h4 class="title">Min</h4>
                <h4 class="temp">${data.main.temp_min}&#176;C</h4>
            </div>
            <div>
                <h4 class="title">Max</h4>
                <h4 class="temp">${data.main.temp_max}&#176;C</h4>
            </div>
        </div>
      `;
    })
    .catch((error) => {
      console.error("API Error:", error);
      result.innerHTML = `<h3 class="msg">City not found or API error</h3>`;
    });

  cityRef.value = "";
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", () => {
  cityRef.value = "Mumbai"; // Default city on load
  getWeather();
});
