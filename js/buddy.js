


const buddyList_div = document.getElementById("buddy-list");
const buddy_container = document.getElementById("buddy_container");
const buddyReturn_button = document.getElementById("buddy-return_button");
const buddySubheadding = document.getElementById("buddy-subheadding")

//Döljer return-button initialt:
buddyReturn_button.style.display = "none";


let buddyName = localStorage.getItem("buddyName") || "";
let buddyImg = localStorage.getItem("buddyImg") || "";

//boolean:
buddyIsActive = JSON.parse(localStorage.getItem("buddyIsActive"));
// console.log(buddyIsActive);

//om det finns en buddy så renderas den
if (buddyIsActive) {
    renderBuddy()
}



//-------------------------------------------



/* 
getpokedex():
Först hämtas alla pokemon och filtreras ner 
till starters och skickas till arrayen buddys.
Funktionen anropar i sin tur funktioneen som renderar alternativen till domen
*/
getPokedex();

let buddys = [];

async function getPokedex() {
    //anropar pokedex med limit på 151 st
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?&limit=151");
    // console.log(res);

    if (res.ok) {
        let pokedex = await res.json();
        // console.log(pokedex);

        //plockar ut arrayen med alla pokemon:
        pokedex = pokedex.results;
        // console.log(pokedex);

        // skickar buddys till buddys array.
        buddys = pokedex.filter((pokemon) => {

            let namesToReturn =
                [
                    "bulbasaur",
                    "charmander",
                    "squirtle",
                    "pikachu"
                ];

            /* För varje itteration över pokemon från pokedexen 
            så ittererar vi över alla möjliga namn och kollar 
            om de motsvarar den aktuella pokemonens namn. 
            om det är sant så returnerar vi pokemonen. 
            "finns pokemonens namn i arrayen över namesToReturn?" */
            return namesToReturn.includes(pokemon.name);
        });

        // console.log(buddys);

        renderBudyList();


        //gtag- Vilken pokemon är poppulärast????
        buddyList_div.addEventListener("click", (e) => {
            if (e.target.nodeName == "BUTTON") {
                console.log(e.target);
                gtag("event", "clicked_pokemon", {
                    "pokemon": e.target.innerHTML
                })
                console.log(e.target.innerHTML);
            };
        });

    } else {
        console.error(res);
    };
};





//renderar de möjliga buddys till domen
function renderBudyList() {
    let buddyListToRender = buddys.map((pokemon, index) => {
        return `
            <button class="buddy-list" id="buddyIndex:${index}">${pokemon.name.toUpperCase()}</button>`;
    });

    buddyList_div.innerHTML = buddyListToRender.join("");

}








/* 
    -lyssnar efter knapptryck på buddylistan för 
    att hämta merinfo om den valda buddyn.
    -Lagrar buddyns bild och namn i local storage.
    Sedan anropar funktionen renderBuddy()
*/
buddyList_div.addEventListener("click", (event) => {
    // console.log(event);

    if (event.target.nodeName == "BUTTON") {
        // console.log(event.target.innerHTML);

        //hämtar index från knappen som assosieras med buddyns arrayposition
        const selectedBuddy_Index = event.target.id.replace("buddyIndex:", "");


        //Hämta subpage som tillhör den valda pokemon:
        fetchPokemon();
        async function fetchPokemon() {

            const res = await fetch(buddys[selectedBuddy_Index].url);
            if (res.ok) {
                // console.log(res);
                const buddy = await res.json();
                // console.log(buddy);


                //Sparar buddyns namn och bild:
                buddyName = buddy.name.toUpperCase();
                buddyImg = buddy.sprites.front_default;
                //skickar nan och bild till local Storage:
                localStorage.setItem("buddyName", buddyName);
                localStorage.setItem("buddyImg", buddyImg);

                //Skickar bolean som indikerar på att det finns en buddy vald
                localStorage.setItem("buddyIsActive", "true");

                renderBuddy();

            } else {
                console.error(res);
            }
        };


    }
});






/* Renderar bild och namn på budy, 
samt knapp för att återkalla */
function renderBuddy() {

    // renderar ut bild i domen
    buddy_container.innerHTML = `<img src="${buddyImg}" alt="buddy">`

    buddySubheadding.innerHTML = ` - ${buddyName}`
    //Visar knapp för att låta pokemon återvända:
    buddyReturn_button.removeAttribute("style");
    buddyReturn_button.innerHTML = `${buddyName}, ÅTERVÄND!`

    //när knappen klickas återvänder pokemonen
    buddyReturn_button.addEventListener("click", () => {


        buddy_container.innerHTML = "";
        buddySubheadding.innerHTML = ""
        buddyReturn_button.style.display = "none"

        localStorage.removeItem("buddyName");
        localStorage.removeItem("buddyImg");

        localStorage.setItem("buddyIsActive", "false");

    })

};
