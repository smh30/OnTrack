var colours = ["#FED00D", "#F37220", "#ED0617", "#D81681", "#782489", "#1D4EBC", "#139FDA", "#49BDA2", "#077C4A", "#72BF43"];

var gpa = [50, 55, 60, 65, 70, 75, 80, 85, 90];

var JSONtest = {
    "compx532": [
        {
            "name": "assg1",
            "worth": 10,
            "grade": 100,
            "submitted": true
        },
        {
            "name": "assg2",
            "worth": 10,
            "grade": 100,
            "submitted": true
        },
        {
            "name": "assg3",
            "worth": 10,
            "grade": 67,
            "submitted": true
        },
        {
            "name": "assg4",
            "worth": 20,
            "grade": 85,
            "submitted": true
        },
        {
            "name": "assg5",
            "worth": 40,
            "grade": null,
            "submitted": false
        },
        {
            "name": "participation",
            "worth": 10,
            "assume": true
        }
    ]
}
var cb = document.getElementById("cb");
var gb = document.getElementById("gb");
var filledTop = 0;
var filledBottom = 0;
var lost = 0;

//loop for participation type grades, assume 100%
for (let i = 0; i < JSONtest.compx532.length; i++) {
    if (JSONtest.compx532[i].name === "participation") {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width", JSONtest.compx532[i].worth + "%");
        rect.setAttribute("height", "15px");
        rect.setAttribute("x", filledTop + "%");
        //rect.setAttribute("y", "-2");
        rect.setAttribute("stroke", "grey");
        rect.setAttribute("fill", colours[i]);
        cb.appendChild(rect);
        filledTop += JSONtest.compx532[i].worth;


        var grade = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        grade.setAttribute("width", JSONtest.compx532[i].worth + "%");
        grade.setAttribute("height", "90px");
        grade.setAttribute("x", filledBottom + "%");
        grade.setAttribute("stroke", "grey");
        grade.setAttribute("fill", LightenDarkenColor(colours[i], 50));
        gb.appendChild(grade);
        filledBottom += JSONtest.compx532[i].worth;

    }
}

console.log(JSON.stringify(JSONtest.compx532[0].worth));
console.log("number of assgs" + JSONtest.compx532.length);


for (let i = 0; i < JSONtest.compx532.length; i++) {
    if (JSONtest.compx532[i].name !== "participation") {
    
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", JSONtest.compx532[i].worth + "%");
    rect.setAttribute("height", "15px");
    rect.setAttribute("x", filledTop + "%");
    //rect.setAttribute("y", "-2");
    rect.setAttribute("stroke", "grey");
    rect.setAttribute("fill", colours[i]);
    cb.appendChild(rect);
    filledTop += JSONtest.compx532[i].worth;

    if (JSONtest.compx532[i].grade != null) {
        var grade = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        var contribution = JSONtest.compx532[i].grade / 100 * JSONtest.compx532[i].worth;
        grade.setAttribute("width", contribution + "%");
        grade.setAttribute("height", "90px");
        grade.setAttribute("x", filledBottom + "%");
        grade.setAttribute("stroke", "grey");
        grade.setAttribute("fill", LightenDarkenColor(colours[i], 80));
        gb.appendChild(grade);
        filledBottom += contribution;

        //take the lost marks out of the possible total
lost += JSONtest.compx532[i].worth - contribution;
console.log("percents lost so far: " + lost);
    }
    }
}

var lostRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
lostRect.setAttribute("width", lost + "%");
lostRect.setAttribute("height", "90px");
lostRect.setAttribute("x", 100-lost + "%");
lostRect.setAttribute("stroke", "grey");
lostRect.setAttribute("fill", "grey");
gb.appendChild(lostRect);

var pm = document.getElementById("pm");
for (let i=0; i<gpa.length; i++){
var tri = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
tri.setAttribute("points", "10,0 20,20 0,20" );
tri.setAttribute("fill", "orange");
pm.appendChild(tri);
}
{/* <polygon points="10,0 20,20 0,20" fill="orange"></polygon> */}

//https://css-tricks.com/snippets/javascript/lighten-darken-color/
function LightenDarkenColor(col, amt) {

    var usePound = false;

    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

}