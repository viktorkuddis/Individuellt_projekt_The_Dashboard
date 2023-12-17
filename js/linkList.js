const snabblänkarContent_container = document.getElementById("snabblänkar-content_container");
const addLinkDialog_container = document.getElementById("add-link-dialog_container");

const addLink_btn = document.getElementById("add-link_btn");

const sidrubrik_input = document.getElementById("sidrubrik_input");
const webbadress_input = document.getElementById("webbadress_input");

const confirmAddLink_btn = document.getElementById("confirm-add-Link_btn");
const exitAddLink_btn = document.getElementById("exit-add-Link_btn");

let linksList_array = JSON.parse(localStorage.getItem("linkList")) || [];


addLinkDialog_container.style.display = "none";

renderLinklist();


addLink_btn.addEventListener("click", () => {
    addLinkDialog_container.removeAttribute("style");
    addLink_btn.style.display = "none";

    exitAddLink_btn.addEventListener("click", () => {
        sidrubrik_input.value = "";
        webbadress_input.value = "";

        addLinkDialog_container.style.display = "none";
        addLink_btn.removeAttribute("style")
    });

    confirmAddLink_btn.addEventListener("click", () => {

        const sidrubrik = sidrubrik_input.value.trim();
        let webbadress = webbadress_input.value.trim();
        // console.log(sidrubrik, webbadress); 


        if (sidrubrik.length > 0 && webbadress.length > 0) {
            console.log("värde finns")

            if (!webbadress.includes("http")) {
                console.log("http saknas");
                webbadress = "http://" + webbadress;
                console.log(webbadress);
            };

            const listItem = {
                name: sidrubrik,
                link: webbadress,
                id: sidrubrik + webbadress
            };
            // console.log(listItem);

            if (linksList_array.some((item) => { return item.id === listItem.id })) {
                sidrubrik_input.value = "";
                webbadress_input.value = "";
                alert("Dubblett finns.");
            } else {
                linksList_array.push(listItem);
                console.log(linksList_array);

                localStorage.setItem("linkList", JSON.stringify(linksList_array));
                renderLinklist();
                sidrubrik_input.value = "";
                webbadress_input.value = "";

                addLinkDialog_container.style.display = "none";
                addLink_btn.removeAttribute("style")

            }

        }

    });





})






function renderLinklist() {
    let listItemsRoRender = linksList_array.map((item) => {
        return `
        
        <div class="card-item">
        <a href="${item.link}" target="_blank">
            <p>${item.name}</p>
        </a>
            <div class="cross" id="linkId:${item.id}">&#10005;</div>
          
        </div>
       
            `;
    });

    listItemsRoRender = listItemsRoRender.join("");
    snabblänkarContent_container.innerHTML = listItemsRoRender;







};



snabblänkarContent_container.addEventListener("click", (event) => {

    console.log(event)

    if (event.target.className == "cross") {
        // console.log("kryss var klickad");
        const crossId = event.target.id.replace("linkId:", "");
        // console.log(crossId);

        linksList_array = linksList_array.reduce((acc, item) => {

            if (item.id !== crossId) {
                acc.push(item)
            }
            return acc

        }, [])

        console.log(linksList_array);
        localStorage.setItem("linkList", JSON.stringify(linksList_array));
        renderLinklist();

    }


});