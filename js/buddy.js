
/* 

getpokedex():
Först hämtas alla pokemon och filtreras ner 
till starters och skickas till arrayen buddys.
Funktionen anropar i sin tur funktioneen som renderar alternativen till domen
*/



const buddyList_div = document.getElementById("buddy-list");

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
    let buddyListToRender = buddys.map((pokemon) => {
        return `
            <button class="buddy-list">${pokemon.name.toUpperCase()}</button>`;
    });

    buddyList_div.innerHTML = buddyListToRender.join("");

    console.log(buddiListToRender);

}

