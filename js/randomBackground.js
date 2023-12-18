
// Laddar inden bakgrund som är sparad:

let background = localStorage.getItem("backgroundImage") || false;

console.log("background =" + background);

//Om ingen bakgrundsbild finns sparad så genererar vi en vid start:
if (background == false) {
    randomBackground();
};





async function randomBackground() {
    const res = await fetch("https://api.unsplash.com//photos/random?client_id=f2y4ugLr-LN3DUhX4ovHJ8GDfkfIAtuYm9ZqtFc8na8&query=nature&content_filter=high");

    if (res.ok) {

        const data = await res.json();

        //hämtar url till bilden plus parameter för bredden:
        const img = data.urls.raw + "&w=1900";

        //Uppdaterar backgrundvariabeln
        background = img;
        //skickar bilden till local storage:
        localStorage.setItem("backgroundImage", img);

        //renderar bakgrunden:
        renderBackround();

        // console.log(data);
        // console.log(img)
        console.log("background =" + background);

    } else {
        console.error(res);
    }

}




renderBackround();

function renderBackround() {
    const body = document.querySelector("body");
    console.log(body);

    body.style.backgroundImage = `url("${background}")`


};