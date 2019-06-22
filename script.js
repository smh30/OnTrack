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
            "grade": 100,
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
        rect.setAttribute("data-color", colours[i]);
        rect.addEventListener("mouseover", makeDarker);
            rect.addEventListener("mouseout", setBackColor);
        cb.appendChild(rect);
        filledTop += JSONtest.compx532[i].worth;


        var grade = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        grade.setAttribute("width", JSONtest.compx532[i].worth + "%");
        grade.setAttribute("height", "90px");
        grade.setAttribute("x", filledBottom + "%");
        grade.setAttribute("stroke", "grey");
        grade.setAttribute("fill", LightenDarkenColor(colours[i], 20));
        grade.setAttribute("data-color", LightenDarkenColor(colours[i], 20));
        grade.addEventListener("mouseover", makeLighter);
            grade.addEventListener("mouseout", setBackColor);
        gb.appendChild(grade);
        filledBottom += JSONtest.compx532[i].worth;

    }
}

console.log(JSON.stringify(JSONtest.compx532[0].worth));
console.log("number of assgs" + JSONtest.compx532.length);


for (let i = 0; i < JSONtest.compx532.length; i++) {
    if (JSONtest.compx532[i].name !== "participation") {

        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        var tip = document.createElementNS("http://www.w3.org/2000/svg", "title");
        tip.innerHTML = JSONtest.compx532[i].name;
        
        rect.setAttribute("width", JSONtest.compx532[i].worth + "%");
        rect.setAttribute("height", "15px");
        rect.setAttribute("x", filledTop + "%");
        rect.setAttribute("stroke", "grey");
        rect.setAttribute("fill", colours[i]);
        rect.setAttribute("data-color", colours[i]);
        rect.addEventListener("mouseover", makeDarker);
            rect.addEventListener("mouseout", setBackColor);
            rect.appendChild(tip);
        cb.appendChild(rect);
        filledTop += JSONtest.compx532[i].worth;

        if (JSONtest.compx532[i].grade != null) {
            var grade = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            var contribution = JSONtest.compx532[i].grade / 100 * JSONtest.compx532[i].worth;
            grade.setAttribute("width", contribution + "%");
            grade.setAttribute("height", "90px");
            grade.setAttribute("x", filledBottom + "%");
            grade.setAttribute("stroke", "grey");
            grade.setAttribute("fill", LightenDarkenColor(colours[i], 20));
            grade.setAttribute("data-color", LightenDarkenColor(colours[i], 20));
            grade.addEventListener("mouseover", makeLighter);
            grade.addEventListener("mouseout", setBackColor);
            gb.appendChild(grade);
            filledBottom += contribution;

            //take the lost marks out of the possible total
            lost += JSONtest.compx532[i].worth - contribution;
            
        }
    }
}

function makeLighter() {
    var segment = this;

    segment.setAttribute("fill", LightenDarkenColor(segment.getAttribute("data-color"), 40));
}

function makeDarker() {
    var segment = this;

    segment.setAttribute("fill", LightenDarkenColor(segment.getAttribute("data-color"), -10));
}

function setBackColor() {
    var segment = this;
    segment.setAttribute("fill", segment.getAttribute("data-color"));
    
}


var lostRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
lostRect.setAttribute("width", lost + "%");
lostRect.setAttribute("height", "90px");
lostRect.setAttribute("x", 100 - lost + "%");
lostRect.setAttribute("stroke", "grey");
lostRect.setAttribute("fill", "grey");
gb.appendChild(lostRect);



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

document.getElementById("btn").addEventListener("click", function(){
var name= document.getElementById("name").value;
console.log("entered name: " +name);
});

document.getElementById("add-grade").addEventListener("click", function(){
    //get the couse code of the associateed course and then:
//attach to the parent div, uder the svg...

const courseDiv = document.getElementsByClassName("body")[0];
const table = document.createElement("table");
const tableHead = document.createElement("thead");


})