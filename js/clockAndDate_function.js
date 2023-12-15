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
