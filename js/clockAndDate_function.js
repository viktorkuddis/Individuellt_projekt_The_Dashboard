//hämtar element från dom
const dateAndTime_section = document.getElementById("date-and-time_section");
const timeContainer = dateAndTime_section.querySelector("#time-container");
const dateContainer = dateAndTime_section.querySelector("#date-container");
// definerar månader och dagarnas namn åt funktionen
const nameOfMonths = [
    "januari",
    "februar",
    "mars",
    "april",
    "maj",
    "juni",
    "juli",
    "augusti",
    "september",
    "oktober",
    "noveber",
    "december"
];
const nameOfDay = [
    "söndag",
    "måndag",
    "tisdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lördag"
];


//Anropar funktion. Sedan en gång varje sekund.
clockAndDate();
setInterval(clockAndDate, 1000);

function clockAndDate() {

    // timme, minut datum månad år
    const clock = new Date();

    //bryter ut klockan i delar:
    let hour = clock.getHours().toString().padStart(2, "0");
    let min = clock.getMinutes().toString().padStart(2, "0");
    // let sec = clock.getSeconds().toString().padStart(2, "0");
    let day = clock.getDay();
    let date = clock.getDate();
    let month = clock.getMonth();
    let year = clock.getFullYear();

    //console.log(`${hour}:${min}:${sec}   ${nameOfDay[day]} ${date} ${nameOfMonths[month]} ${year}`);

    //skapar en string av mina datumkomponenter och matar in i domen
    timeContainer.innerHTML = `${hour}:${min}`;
    dateContainer.innerHTML = `${nameOfDay[day]} ${date} ${nameOfMonths[month]} ${year}`;

}
