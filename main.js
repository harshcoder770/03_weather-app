const input = document.querySelector(".value");
const button = document.querySelector(".search");
const nextpage = document.querySelector(".search-button");
const content = document.createElement("div");
const form = document.querySelector(".input-box");
const data = document.querySelector(".data");
const date5 = document.querySelector(".upperdate");
// console.log(date5);
date5.innerHTML = datefunction();
let value = "";
input.addEventListener("input", (v) => {
  value = v.target.value;
  // console.log(v.target.value);
});
button.addEventListener("click", (e) => {
  request();
  e.preventDefault();
});

async function request() {
  try {
    const response = await fetch(
      `https://geocode.maps.co/search?q=${value}}&api_key=6791c4bd351f3760874411ksc9d5678`
    );
    if (!response.ok) {
      throw new Error("response 1 is giving an error");
    }

    const jsondata = await response.json();
    // console.log(jsondata[0]);
    const latitude = jsondata[0].lat;
    const longitude = jsondata[0].lon;
    const response2 = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${Number(
        latitude
      )}&lon=${Number(longitude)}&appid=66c5c35ce7de79e49f1dbe10a83a2b0f`
    );
    jsondata2 = await response2.json();
    // console.log(jsondata2);
    if (!response2.ok) {
      throw new Error("response 2 is giving an error");
    }
    const response3 = await fetch(
      `https://api.sunrisesunset.io/json?lat=${Number(latitude)}&lng=${Number(
        longitude
      )}`
    );
    const jsondata3 = await response3.json();
    // console.log(jsondata3);

    content.classList.add = "content";
    content.innerHTML = `
        <div class="head">
        <i class="fa-solid fa-cloud"></i>
        <h1 class="name">${value.replace(/\b\w/g, (char) =>
          String(char).toUpperCase()
        )}</h1>
      </div>
      <h4>${datefunction()}</h4>
      <div class="response1">
        <h1><u>Weather Info :</u></h1>
        <div class="response1detail">
          <h3>Description : <span>${jsondata2.weather[0].main}</span></h3>
        <h3>Temperature : <span>${(jsondata2.main.temp - 273.15).toFixed(
          2
        )}</span>°C</h3>
        <h3>Wind Speed : <span>${
          jsondata2.wind.speed
        }m/s</span> with angle <span>${jsondata2.wind.deg}°</span></h3>

        </div>
      </div>
      <div class="response2">
        <div class="first">
          <h1><u>Searched Place info :</u></h1>
          <h3>Latitude : <span>${jsondata[0].lat}</span></h3>
          <h3>Longitude : <span>${jsondata[0].lon}</span></h3>
          <h3>Sunrise : <span>${jsondata3.results.first_light}</span></h3>
          <h3>Sunset : <span>${jsondata3.results.last_light}</span></h3>

         
        </div>
        <div class="second">
          <h1><u>Temprature Details :</u> </h1>
          <h3>Actual temp : <span>${(jsondata2.main.temp - 273.15).toFixed(
            2
          )}</span>°C</h3>
          <h3>Feels Like : <span>${(jsondata2.main.feels_like - 273.15).toFixed(
            2
          )}</span>°C</h3>
          <h3>Temp min : <span>${(jsondata2.main.temp_min - 273.15).toFixed(
            2
          )}</span>°C</h3>
          <h3>Temp max : <span>${(jsondata2.main.temp_max - 273.15).toFixed(
            2
          )}</span>°C</h3>
        </div>
      </div>  

        `;
    data.append(content);
  } catch (error) {
    const popup = document.querySelector('.popup')
    const retry = document.querySelector('.ok-btn')
    const close = document.querySelector('.close-icon')

    popup.classList.add('open')
    retry.addEventListener('click' , () => {
      location.reload()
    })
    close.addEventListener('click' , () => {
      popup.classList.remove('open')
    })
   
    
  }
}

function datefunction() {
  const date = new Date();

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}



