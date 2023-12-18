
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

        const buddys = pokedex.filter((pokemon) => {

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

        console.log(buddys)







    } else {
        console.error(res);
    };
}