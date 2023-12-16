/* ----- LÄNKLISTAN ---- */
//hämtar från local storage eller startar som tom array
const linksList_array = JSON.parse(localStorage.getItem("linkList")) || []
/* --------------------- */


//Kortet för alla länkar
const snabblänkar_activityCard = document.getElementById("snabblänkar_activity-card")

// Lagra lägg-till-knapp:
const addLink_btn = document.getElementById("add-link_btn");


const inputComponent = `
<div id="add-link_component">

    <div id="add-link-input_container">
        <p><strong>Lägg till länk: </strong></p>
        <input type="text" id="sidrubrik_input" placeholder="Sidrubrik här">
        <input type="text" id="webbadress_input" placeholder="Webbadress här">
    </div>

    <div id="add-link-buttons_container">
        <button id="confirm-add-Link_btn">Lägg till</button>
        <button id="exit-add-Link_btn">&#10005</button>
    </div>

</div>
`


// när initiala knappen klickas...
addLink_btn.addEventListener("click", () => {
    // initialknapp tars bort...
    snabblänkar_activityCard.removeChild(addLink_btn);
    // inputkomponent läggs till...
    snabblänkar_activityCard.innerHTML += inputComponent;

    //lagra område för knappar:
    const addLinkButtons_container = document.getElementById("add-link-buttons_container");
    //Eventlyssnare på knapparna:
    addLinkButtons_container.addEventListener("click", (event) => {

        //om exitknapp trycks på...
        if (event.target.id == "exit-add-Link_btn") {
            returnFromAddlinkDialog();
        }


        // när lägg-till knapp trycks
        if (event.target.id == "confirm-add-Link_btn") {
            console.log("läggtill knapp tryckt")

            const rubrik = document.getElementById("sidrubrik_input").value.trim();
            const webbadress = document.getElementById("webbadress_input").value.trim();

            //om båda rutorna är ifyllda...
            if (rubrik.length > 0 && webbadress.length > 0) {
                console.log("saker sker")

                //Skapar länkobjekt att lagra:
                const linkObject = {
                    name: rubrik,
                    link: webbadress
                };

                //skickar in i array
                linksList_array.push(linkObject);
                //Skickar arrayen in i local storage:
                localStorage.setItem("linkList", JSON.stringify(linksList_array));

                returnFromAddlinkDialog();

            };

        };

    });

});


function returnFromAddlinkDialog() {
    //tar bort hela add-link-komponenten
    snabblänkar_activityCard.removeChild(document.getElementById("add-link_component"));
    //Visar initiala knapp igen: 
    snabblänkar_activityCard.appendChild(addLink_btn);
};