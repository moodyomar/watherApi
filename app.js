const api = {
     key: "f738629a362bfb615e811eeeda4f40a1",
     baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(e) {
     if (e.keyCode == 13) {
          getResults(searchBox.value);
     }
}

function getResults(query) {
     fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(weather => {
               return weather.json();
          })
          .then(displayResults);
}

function displayResults(weather) {
     console.log(weather);
     let city = document.querySelector('.location .city');
     city.innerText = `${weather.name}, ${weather.sys.country}`
     let now = new Date();
     let date = document.querySelector('.location .date');
     date.innerText = dateBuilder(now);
     let temp = document.querySelector('.current .temp');
     temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`
     let weather_elm = document.querySelector('.current .weather');
     weather_elm.innerText = weather.weather[0].main
     let theWeather = weather.weather[0].main
     let hilow = document.querySelector('.hi-low');
     hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
     changeBg(theWeather)
}

function dateBuilder(d) {
     let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     let day = days[d.getDay()];
     let date = d.getDate();
     let month = months[d.getMonth()];
     let year = d.getFullYear();
     return `${day} ${date} ${month} ${year}`
}
const changeBg = (weather) => {
     let weatherIcon = document.querySelector('.weatherIcon');
     let bodyBg = document.querySelector('body');
     console.log(weather)
     // console.log(bodyBg)
     weatherIcon.innerHTML = `
     <img src="images/${weather}.png" alt="${weather} weather photo" class="icon">
     `
     bodyBg.style.backgroundImage =  `url(images/bg${weather}.png)`
console.log(bodyBg.style.backgroundImage)
}
