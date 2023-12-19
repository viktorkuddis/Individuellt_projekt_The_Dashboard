
/* 

getpokedex():
Först hämtas alla pokemon och filtreras ner 
till starters och skickas till arrayen buddys.
Funktionen anropar i sin tur funktioneen som renderar alternativen till domen
*/



const buddyList_div = document.getElementById("buddy-list");
const buddy_container = document.getElementById("buddy_container");
const buddyReturn_button = document.getElementById("buddy-return_button");

//Döljer return-button initialt:
buddyReturn_button.style.display = "none";



let buddys = [];


getPokedex();



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

        console.log(buddys);

        renderBudyList();

    } else {
        console.error(res);
    };
};



function renderBudyList() {
    let buddyListToRender = buddys.map((pokemon, index) => {
        return `
            <button class="buddy-list" id="buddyIndex:${index}">${pokemon.name.toUpperCase()}</button>`;
    });

    buddyList_div.innerHTML = buddyListToRender.join("");

}

//lyssnar efter knapptryck på buddylistan:
buddyList_div.addEventListener("click", (event) => {
    console.log(event);

    if (event.target.nodeName == "BUTTON") {
        // console.log(event.target.innerHTML);

        //hämtar index från knappen som assosieras med buddyns arrayposition
        const selectedByddi_Index = event.target.id.replace("buddyIndex:", "");
        // console.log(byddiIndex);


        renderPokemon();

        async function renderPokemon() {
            //Hämta subpage som tillhär den vaöda pokemon:

            const res = await fetch(buddys[selectedByddi_Index].url);
            if (res.ok) {
                // console.log(res);
                const buddy = await res.json();
                // console.log(buddy);
                const buddyName = buddy.name.toUpperCase();

                // renderar ut bild i domen
                buddy_container.innerHTML = `<img src="${buddy.sprites.front_default}" alt="buddy">`

                //Visar knapp för att låta pokemon återvända:
                buddyReturn_button.removeAttribute("style");
                buddyReturn_button.innerHTML = `${buddyName}, ÅTERVÄND!`
                //när knappen klickas återvänder pokemonen
                buddyReturn_button.addEventListener("click", () => {
                    buddy_container.innerHTML = "";
                })

            } else {
                console.error(res);
            }
        };




    }
});


console.log(buddyList_div);