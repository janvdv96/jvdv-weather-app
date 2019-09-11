const btnRun = document.getElementById("run");
const input = document.getElementById("input");
const display = document.getElementById("target");

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


btnRun.addEventListener("click", function () {
    let city = input.value;
    fetcher(city);
});

function fetcher(city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=2cd6b9eab7541a2c6346e5fb3a63c539")
        .then(function (response) {
            return response.json();
        }).then(function (weather) {

        display.innerHTML = "";
        let list = weather.list;
        console.log(list);

        let dataWeather = [];
        let dataTemps = [];

        let oneWeather = [];
        let oneTemps = [];
        let twoWeather = [];
        let twoTemps = [];
        let threeWeather = [];
        let threeTemps = [];
        let fourWeather = [];
        let fourTemps = [];
        let fiveWeather = [];
        let fiveTemps = [];

        let date = new Date();

        let TODAY = date.getDate();
        let MONTH = date.getMonth() + 1;
        let YEAR = date.getFullYear();

        //console.log(("0" + MONTH).slice(-2));

        let fullDateToday = YEAR + ("0" + MONTH).slice(-2) + TODAY;
        //console.log("fullDateToday:" + fullDateToday);

        for (let i = 0; i < list.length; i++) {

            let fullDateText = (list[i].dt_txt).slice(0, 10);
            let fullDateYear = fullDateText.slice(0, 4);
            let fullDateDay = parseInt("" + fullDateText.slice(8, 10));
            let fullDateMonth = parseInt("" + fullDateText.slice(5, 7));

            let dateNumber = parseInt((list[i].dt_txt).slice(8, 10));

            let weatherPush = list[i].weather[0].main;
            let tempPush = list[i].main.temp;

            if (dateNumber === TODAY) {
                oneWeather.push(weatherPush);
                oneTemps.push(tempPush);
            } else if (dateNumber === TODAY + 1) {
                twoWeather.push(weatherPush);
                twoTemps.push(tempPush);
            } else if (dateNumber === TODAY + 2) {
                threeWeather.push(weatherPush);
                threeTemps.push(tempPush);
            } else if (dateNumber === TODAY + 3) {
                fourWeather.push(weatherPush);
                fourTemps.push(tempPush);
            } else if (dateNumber === TODAY + 4) {
                fiveWeather.push(weatherPush);
                fiveTemps.push(tempPush);
            } else if (dateNumber === TODAY + 5) {
                console.log("leftovers");
            }
        }

        dataWeather = [oneWeather, twoWeather, threeWeather, fourWeather, fiveWeather];
        dataTemps = [oneTemps, twoTemps, threeTemps, fourTemps, fiveTemps];

        for (let i = 0; i < 5; i++) {

            let temp = document.getElementById("template");
            let day = temp.content.getElementById("day");
            let weatherIcon = temp.content.getElementById("icon");
            let weatherText = temp.content.getElementById("weatherType");
            let temperatureText = temp.content.getElementById("temperature");
            let mintemperatureText = temp.content.getElementById("mintemperature");
            let maxtemperatureText = temp.content.getElementById("maxtemperature");

            let avgWeather = dataWeather[i].sort((a, b) =>
                dataWeather[i].filter(v => v === a).length
                - dataWeather[i].filter(v => v === b).length
            ).pop();

            let sumTemps = 0;
            sumTemps = dataTemps[i].reduce((a, b) => a + b, 0);
            let avgTemps = Math.round(sumTemps / dataTemps[i].length);

            let maxTemp = Math.round(Math.max.apply(null, dataTemps[i]));
            let minTemp = Math.round(Math.min.apply(null, dataTemps[i]));

            day.innerText = weekdays[date.getDay() + i];
            weatherText.innerText = avgWeather.toString();
            temperatureText.innerText = avgTemps + " °C";
            maxtemperatureText.innerText = "max: " + maxTemp + " °C";
            mintemperatureText.innerText = "min: " + minTemp + " °C";

            switch (avgWeather) {

                case "Clouds":
                    weatherIcon.setAttribute("src", "src/cloud.png");
                    break;

                case "Clear":
                    weatherIcon.setAttribute("src", "src/sun.png");
                    break;

                case "Rain":
                    weatherIcon.setAttribute("src", "src/raining.png");
                    break;

                default:
                    weatherIcon.setAttribute("src", "https://via.placeholder.com/64");
            }

            let clone = temp.content.cloneNode(true);
            display.appendChild(clone);
        }


    });
}

