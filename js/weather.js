const väder_headding = document.getElementById("väder_headding")
const weatherContent_container = document.getElementById("väder-content_container")

const iconWeathertoday = document.getElementById("icon-weather_today")
const tempToday_label = document.getElementById("temp_today");
const weatherDescriptionToday_label = document.getElementById("weatherDescription_today");

const iconWeathertomorrow = document.getElementById("icon-weather_tomorrow")
const timestampWeathertomorrow_label = document.getElementById("timetamp-weathertomorrow")
const tempTomorrow_label = document.getElementById("temp_tomorrow");
const weatherDescriptionTomorrow_label = document.getElementById("weatherDescription_tomorrow");

const labelsContainer_today = document.getElementById("labelsContainer_today");
const labelsContainer_tomorrow = document.getElementById("labelsContainer_tomorrow")



//Hämtar Geolocation
navigator.geolocation.getCurrentPosition(successcallback, errorcallback);

// om geolocation misslyckas...
function errorcallback(e) {
    console.error(e);
    weatherLoadingErrorDisplay(weatherContent_container)
};

//om geolocation lyckas...
//hämtar väder api och skickar ut info i domen.
//(hämtar från 2 olika api)
function successcallback(position) {
    console.log("Position:"); console.log(position);

    const lon = position.coords.longitude;
    const lat = position.coords.latitude;

    const apikey = "0665c46959a53cecf58adb701dda45c0";


    //detta är nuvarande väder
    getCurrentWeather();
    async function getCurrentWeather() {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=sv&appid=${apikey}`);
        console.log("Respons current:"); console.log(res);

        //Om ok
        if (res.ok) {
            let data = await res.json();
            console.log("Data current:"); console.log(data);

            //Skickar ut i domen:
            iconWeathertoday.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">`
            tempToday_label.innerHTML = Math.round(data.main.temp) + "°C";
            weatherDescriptionToday_label.innerHTML = data.weather[0].description;

            //Skickar ut stad i domen:
            väder_headding.innerHTML += " - " + data.name;

        } else {
            // om misslyckat....
            weatherLoadingErrorDisplay(labelsContainer_today);
        }
    };

    //detta är prognos
    getWeatherprognos();
    async function getWeatherprognos() {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=sv&appid=${apikey}`);
        console.log("Respons forecast:"); console.log(res);

        if (res.ok) {
            let data = await res.json()
            console.log("Data forecast:"); console.log(data);

            //Skickar ut i domen:

            /* klockslaget att presentera är 1 dygn från nuvarande klockslag + 1 indexposition till. Prognosen kommer i steg om 3 h.
            Nuvarande klockslag är indexposition 0. 
            1 dygn = 8 steg från nu  = index 8. 
            index 8 + 1 index = index 9 */


            iconWeathertomorrow.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[9].weather[0].icon}@2x.png" alt="icon">`
            timestampWeathertomorrow_label.innerHTML = (data.list[9].dt_txt).split(" ")[1].slice(0, 5);//plockar ut klockslaget ut tidsstämpeln
            tempTomorrow_label.innerHTML = Math.round(data.list[9].main.temp) + "°C";
            weatherDescriptionTomorrow_label.innerHTML = data.list[9].weather[0].description;

        } else {
            // om misslyckat....
            weatherLoadingErrorDisplay(labelsContainer_tomorrow);
        }

    };





};




function weatherLoadingErrorDisplay(elementforDisplay) {
    elementforDisplay.innerHTML = "Gick inte att ladda väderdata."
}