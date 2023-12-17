//Hämtar Geolocation
navigator.geolocation.getCurrentPosition(successcallback, errorcallback);

function successcallback(position) {
    console.log(position);

    const lon = position.lon;
    const lat = position.lat;

    const apikey = "0665c46959a53cecf58adb701dda45c0";

    //detta är nuvarande väder
    getCurrentWeather();
    async function getCurrentWeather() {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`);
        console.log(res);

        if (res.ok) {
            let data = await res.json()
            console.log(data)
        } else { console.log("fel") }
    };

    //detta är prognos
    // getWeatherprognos();
    // async function getWeatherprognos() {
    //     let res = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=65.3211858&lon=21.4763408&appid=0665c46959a53cecf58adb701dda45c0");
    //     console.log(res);

    //     if (res.ok) {
    //         let data = await res.json()
    //         console.log(data)
    //     } else { (console.log("nåt gick fel")) }
    // };





};

function errorcallback(e) {
    console.error(e)
};
