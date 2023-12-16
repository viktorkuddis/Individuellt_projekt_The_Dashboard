const snabblänkar_activityCard = document.getElementById("snabblänkar_activity-card")

// Lagra knapp:
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

    //område för knappar:
    const addLinkButtons_container = document.getElementById("add-link-buttons_container");

    //Eventlyssnare på knapparna:
    addLinkButtons_container.addEventListener("click", (event) => {

        //om exitknapp trycks på...
        if (event.target.id == "exit-add-Link_btn") {
            //tar bort hela add-link-komponenten
            snabblänkar_activityCard.removeChild(document.getElementById("add-link_component"));
            //Visar initiala knapp igen: 
            snabblänkar_activityCard.appendChild(addLink_btn);
        }

    })
});
