let clockWidth;
let clockHeight;
let clockHandLength;
let timeSpeed = 1;
let scalingFactor = .7;

let currentTime = 0;
let currentTime1 = 8;
let currentTime2 = 52;

let theCanvas;
let context;

let previousTime = 0;

window.onload = function () {
    setupCanvas();
}

function setupCanvas(){
    theCanvas = document.createElement('canvas');

    clockWidth = document.getElementsByTagName("body")[0].clientWidth - 20;
    clockHeight = document.getElementsByTagName("body")[0].clientHeight - 20;

    if(clockWidth > clockHeight){
        clockHandLength = clockHeight;
    }else{
        clockHandLength = clockWidth;
    }
    clockHandLength = clockHandLength / 5;


    theCanvas.width = clockWidth;
    theCanvas.height = clockHeight;
    document.getElementsByTagName("body")[0].appendChild(theCanvas);

    context = theCanvas.getContext('2d');

    previousTime = Date.now();

    window.requestAnimationFrame(drawStep);
}

function drawStep() {

    let deltaTime = Date.now() - previousTime;
    // console.log(Date.now(), " - ", previousTime, " - ", deltaTime);
    previousTime = Date.now();

    currentTime += deltaTime;
    currentTime1 = (currentTime / 1000) / 60;
    currentTime2 = currentTime / 1000;

    // console.log(currentTime);
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);

    drawHands(clockWidth / 2, clockHeight / 2, (clockHandLength) * scalingFactor, currentTime1, currentTime2, 0);

    console.log("Frame Rate: ", 1 / (deltaTime / 1000))

    window.requestAnimationFrame(drawStep);
}

function drawHands(x, y, length, time1, time2, depth) {
    if (depth > 10 || length < 2) {
        // console.log("Hit dat limit!")
        return
    }

    drawLineWithTime(x, y, length, time1);
    drawLineWithTime(x, y, length, time2);
    const newX1 = x + (length * Math.cos(-1 * timeToDegree(time1)));
    const newY1 = y + (length * Math.sin(-1 * timeToDegree(time1)));
    const newX2 = x + (length * Math.cos(-1 * timeToDegree(time2)));
    const newY2 = y + (length * Math.sin(-1 * timeToDegree(time2)));
    // circle(newX1, newY1, 5);
    // circle(newX2, newY2, 5);

    drawHands(newX1, newY1, length * scalingFactor, time1 + currentTime1, time1 + currentTime2, depth + 1);
    drawHands(newX2, newY2, length * scalingFactor, time2 + currentTime1, time2 + currentTime2, depth + 1);
}

function drawLineWithTime(x, y, length, time) {
    drawLineWithAngle(x, y, length, timeToDegree(time));
}

function drawLineWithAngle(x, y, length, angle) {
    drawLine(x, y, x + (length * Math.cos(-1 * angle)), y + (length * Math.sin(-1 * angle)));
}

function timeToDegree(time) {
    return map(time - 15, 0, 60, 2 * Math.PI, 0);
}

function map(value, x1, x2, y1, y2) {
    // return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
    return (value - x1) * (y2 - y1) / (x2 - x1) + y2;
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1 , y1);
    context.lineTo(x2, y2);
    context.stroke();
}

/////////// OLD ///////////
// function setup() {
//     createCanvas(clockWidth, clockHeight);

//     strokeWeight(1);
//     // stroke('rgba(255, 0, 0, .25)')
//     // drawHands(clockWidth / 2, clockHeight / 2, (clockWidth / 5) * scalingFactor, currentTime1, currentTime2, 0);
// }

// function draw() {
//     clear();
//     currentTime += deltaTime;
//     strokeWeight(1);

//     // print(time);
//     currentTime1 = (currentTime / 1000) / 60;
//     currentTime2 = currentTime / 1000;


//     rainbowStyle(currentTime);

//     drawHands(clockWidth / 2, clockHeight / 2, (clockWidth / 5) * scalingFactor, currentTime1, currentTime2, 0);

//     //framerate 
//     console.log("Frame Rate: ", 1 / (deltaTime / 1000))
// }

// function drawHands(x, y, length, time1, time2, depth) {
//     if (depth > 10 || length < 2) {
//         // console.log("Hit dat limit!")
//         return
//     }

//     drawLineWithTime(x, y, length, time1);
//     drawLineWithTime(x, y, length, time2);
//     const newX1 = x + (length * cos(-1 * timeToDegree(time1)));
//     const newY1 = y + (length * sin(-1 * timeToDegree(time1)));
//     const newX2 = x + (length * cos(-1 * timeToDegree(time2)));
//     const newY2 = y + (length * sin(-1 * timeToDegree(time2)));
//     // circle(newX1, newY1, 5);
//     // circle(newX2, newY2, 5);

//     drawHands(newX1, newY1, length * scalingFactor, time1 + currentTime1, time1 + currentTime2, depth + 1);
//     drawHands(newX2, newY2, length * scalingFactor, time2 + currentTime1, time2 + currentTime2, depth + 1);
// }

// function drawLineWithTime(x, y, length, time) {
//     drawLineWithAngle(x, y, length, timeToDegree(time));
// }

// function drawLineWithAngle(x, y, length, angle) {
//     line(x, y, x + (length * cos(-1 * angle)), y + (length * sin(-1 * angle)));
// }

// function timeToDegree(time) {
//     return map(time - 15, 0, 60, 2 * PI, 0);
// }



//////////   STYLE   //////////////
// function rainbowStyle(time) {
//     const color = map(time % 60, 0, 60, 0, 255);
//     console.log("calculated color: ", color);

//     // stroke(`rgba(255, 255, 255, 1.0)`)
// }

// function increasedWidthStyle(depth) {
//     if (depth < 3) {
//         strokeWeight(1);
//     } else if (depth < 6) {
//         strokeWeight(2);
//     } else {
//         strokeWeight(3);
//     }
// }