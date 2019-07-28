let clockWidth = 700;
let clockHeight = 700;
let timeSpeed = 1;
let scalingFactor = .7;

function setup() {
    createCanvas(clockWidth, clockHeight);
    // frameRate(10);
    // drawHands(clockWidth / 2, clockHeight / 2, (clockWidth / 2) * scalingFactor, 0, 1);
    strokeWeight(1);
    // stroke('rgba(255, 0, 0, .25)')
    colorMode(HSB);
    drawHands(clockWidth / 2, clockHeight / 2, (clockWidth / 5) * scalingFactor, 8, 52, 0);
}

let currentTime = 0;
// let currentTime1 = 8;
// let currentTime2 = 52;
function draw() {
    // clear();
    currentTime += deltaTime;
    strokeWeight(1);

    // print(time);
    let time1 = (currentTime / 1000) / 60;
    let time2 = currentTime / 1000;
    
    // if(time2 == 60) time2 = 0;
    console.log(time2);

    // drawHands(clockWidth / 2, clockHeight / 2, (clockWidth / 5) * scalingFactor, time1, time2, 0);
    
    //framerate 
    console.log("Frame Rate: ", 1 / (deltaTime / 1000) )
}

function drawHands(x, y, length, time1, time2, depth) {
    if(depth > 10 || length < 1){
        // console.log("Hit dat limit!")
        return 
    }

    drawLineWithTime(x, y, length, time1);
    drawLineWithTime(x, y, length, time2);
    const newX1 = x + (length * cos(-1 * timeToDegree(time1))); 
    const newY1 = y + (length * sin(-1 * timeToDegree(time1)));
    const newX2 = x + (length * cos(-1 * timeToDegree(time2))); 
    const newY2 = y + (length * sin(-1 * timeToDegree(time2)));
    // circle(newX1, newY1, 5);
    // circle(newX2, newY2, 5);

    drawHands(newX1, newY1, length * scalingFactor, time1 + time1, time1 + time2, depth + 1);
    drawHands(newX2, newY2, length * scalingFactor, time2 + time1, time2 + time2, depth + 1);
    // drawHands(newX1, newY1, length * scalingFactor, time1, time1 + time2, depth + 1);
    // drawHands(newX2, newY2, length * scalingFactor, time1 + time2, time2, depth + 1);

}

function drawLineWithTime(x, y, length, time) {
    drawLineWithAngle(x, y, length, timeToDegree(time));
}

function drawLineWithAngle(x, y, length, angle) {
    line(x, y, x + (length * cos(-1 * angle)), y + (length * sin(-1 * angle)));
}

function timeToDegree(time) {
    return map(time - 15, 0, 60, 2 * PI, 0);
}

function rainbowStyle(time){
    stroke(time % 60);
}

function increasedWidthStyle(depth){
    if(depth < 3){
        strokeWeight(1);
    }else if(depth < 6){
        strokeWeight(2);
    }else{
        strokeWeight(3);
    }
}