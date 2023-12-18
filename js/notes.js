

const notes_textarea = document.getElementById("notes_textarea");

//Laddar in sparade notes då sidan öppnas:
notes_textarea.value = localStorage.getItem("notes");

notes_textarea.addEventListener("input", () => {

    //Skickar löpande det som antecknas till local storage:
    localStorage.setItem("notes", notes_textarea.value);

    console.log(localStorage.getItem("notes"));

})
