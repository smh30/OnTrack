var colours = ["blue", "purple", "red", "orange", "yellow", "green"];

var cb = document.getElementById("cb");
for (let i=0; i<5; i++){
    console.log("i=" +i);
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "10%");
    rect.setAttribute("height", "100%");
    rect.setAttribute("x", i*10 + "%");
    rect.setAttribute("stroke", "blue");
    rect.setAttribute("fill", colours[i]);
    cb.appendChild(rect);
}