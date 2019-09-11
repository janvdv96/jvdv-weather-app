const btnRun = document.getElementById("run");
const input = document.getElementById("input");
const display = document.getElementById("target");

const pictureDisplay = document.getElementById("picture");
const imgDisplay = document.getElementById("imgTarget");

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


btnRun.addEventListener("click", function () {
    let city = input.value;
    fetcher(city);
    picture(city);
});

function fetcher(city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=2cd6b9eab7541a2c6346e5fb3a63c539")
        .then(function (response) {
            return response.json();
        }).then(function (weather) {
        let list = weather.list;

        display.innerHTML = "";
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

        let myDate = new Date();
        let twoDay = new Date();
        twoDay.setDate(myDate.getDate() + 1);
        let threeDay = new Date();
        threeDay.setDate(twoDay.getDate() + 1);
        let fourDay = new Date();
        fourDay.setDate(threeDay.getDate() + 1);
        let fiveDay = new Date();
        fiveDay.setDate(fourDay.getDate() + 1);
        let sixDay = new Date();
        sixDay.setDate(fiveDay.getDate() + 1);

        for (let i = 0; i < list.length; i++) {

            let fullDateText = (list[i].dt_txt).slice(0, 10);
            let fullDateYear = parseInt("" + fullDateText.slice(0, 4));
            let fullDateDay = parseInt("" + fullDateText.slice(8, 10));
            let fullDateMonth = parseInt("" + fullDateText.slice(5, 7));
            let checker = new Date(fullDateYear, fullDateMonth - 1, fullDateDay);
            let checkDay = checker.getDay();

            let weatherPush = list[i].weather[0].main;
            let tempPush = list[i].main.temp;

            if (checkDay === myDate.getDay()) {
                oneWeather.push(weatherPush);
                oneTemps.push(tempPush);
            } else if (checkDay === twoDay.getDay()) {
                twoWeather.push(weatherPush);
                twoTemps.push(tempPush);
            } else if (checkDay === threeDay.getDay()) {
                threeWeather.push(weatherPush);
                threeTemps.push(tempPush);
            } else if (checkDay === fourDay.getDay()) {
                fourWeather.push(weatherPush);
                fourTemps.push(tempPush);
            } else if (checkDay === fiveDay.getDay()) {
                fiveWeather.push(weatherPush);
                fiveTemps.push(tempPush);
            } else if (checkDay === sixDay.getDay()) {
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

function picture(city) {
    fetch("https://api.unsplash.com/search/photos/?client_id=e74ca46b22fd8cbf5fbb5c231739839cb4730ae959f74a65d24583789012d6c3&page=1&query=" + city)
        .then(function (response) {
            return response.json()
        }).then(function (pictures) {
        console.log(pictures);

        let random = Math.floor(Math.random() * 10);
        console.log(random);

        imgDisplay.setAttribute("src", pictures.results[random].urls.regular);

    })
}

