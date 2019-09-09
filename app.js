
const btnRun = document.getElementById("run");
const input = document.getElementById("input");
const display = document.getElementById("target");

const weekdays = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let date = new Date();
let test = Math.round(date.getTime() / 1000);

btnRun.addEventListener("click", function () {
    let city = input.value;
    fetcher(city);
});

function fetcher(city) {
    fetch("http://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=metric&appid=2cd6b9eab7541a2c6346e5fb3a63c539")
        .then(function (response) {
            return response.json();
        }).then(function (weather) {
            console.log(weather.list);
            console.log(test);

            display.innerHTML = "";

        for (let i = 0; i < 5; i++){

            let temp = document.getElementById("template");
            let day = temp.content.getElementById("day");
            let weatherIcon = temp.content.getElementById("icon");
            let weatherText = temp.content.getElementById("weatherType");
            let temperatureText = temp.content.getElementById("temperature");

            day.innerText = weekdays[date.getDay() + i];
            weatherIcon.setAttribute("src", "https://via.placeholder.com/150");
            weatherText.innerText = weather.list[i].weather[0].description;
            temperatureText.innerText = weather.list[i].main.temp + " °C";

            let clone = temp.content.cloneNode(true);
            display.appendChild(clone);
        }


    });
}

