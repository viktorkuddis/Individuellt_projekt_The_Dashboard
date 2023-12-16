// ====== ÖVERSKRIFTEN =======

const defaultTextTeadding = "[ Överskrift här ]"
const headding = document.querySelector("h1");

// Ladda in överskriften när sidan laddas.
headding.textContent = localStorage.getItem("dashboardHeadding") || defaultTextTeadding;

//Skickar in titletag baserat på överskriften.
titleTag();

//Rubriken har contenteditable="true" i html vilket gör att man kan klika på den och ändra innehållet.

//När man trycker enter så avmarkeras överskriften.
headding.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        headding.blur();
    }
})

// När överskriften inte längre är i fokus ...
headding.addEventListener("blur", () => {

    // lagra innehållet från överskriften i variabel. White space i början och slutet tars bort
    const dashboardHeadding = headding.innerText.trim();
    // console.log(dashboardHeadding);

    // Skicka in innehållet i local storage.
    localStorage.setItem("dashboardHeadding", dashboardHeadding);

    //skriv innehåll till domen
    headding.textContent = dashboardHeadding || defaultTextTeadding;

    //Skickar in titletag baserat på överskriften.
    titleTag();

});





// ====== TITEELTAGG =======

// titleTag() tar överskriften och skickar in den i HTMLens titeltag.
function titleTag() {

    const title = document.querySelector("title");
    title.innerHTML = `${headding.textContent} | THE DASHBOARD`;
}


