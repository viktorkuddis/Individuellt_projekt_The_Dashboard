/* ============================ */
/* ----- KLOCKA OCH DATUM ----- */

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
//Anropar funktion varje funktion för att uppdatera innehållet.
setInterval(clockAndDate, 1000);



