
document.getElementById("ChangeColor").onclick = function  (){
    const doimau = document.getElementById("textmau");

    const colors = ["red", "blue", "green", "yellow", "pink", "orange"];
    const randowColor = colors[Math.floor(Math.random() * colors.length)];
    doimau.style.color = randowColor;

}