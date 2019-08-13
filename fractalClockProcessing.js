
let ClockControls = function () {
    this.clockWidth = 0
    this.clockHeight = 0
    this.clockHandLength = 0
    this.timeSpeed = 1
    this.scalingFactor = .7
    this.maxDepth = 11
    this.minLength = 2.0
    this.currentTime1 = 0;
    this.currentTime2 = 0;
};

let clockControls;
function setupControls() {
    clockControls = new ClockControls();
    var gui = new dat.GUI();
    gui.add(clockControls, 'clockHandLength', 0, 500).listen();
    gui.add(clockControls, 'scalingFactor', 0, 1).listen();
    
    gui.add(clockControls, 'currentTime1', 0, 60).listen();
    gui.add(clockControls, 'currentTime2', 0, 60).listen();

    gui.add(clockControls, 'maxDepth', 1, 20).listen();
    gui.add(clockControls, 'minLength', 0, 5.0).listen();

    gui.add(clockControls, 'timeSpeed', 0, 100).listen();
}

let theCanvas;
let context;

let previousTime = 0;

function setup() {
    setupControls();

    clockControls.clockWidth = document.getElementsByTagName("body")[0].clientWidth - 20;
    clockControls.clockHeight = document.getElementsByTagName("body")[0].clientHeight - 20;

    if (clockControls.clockWidth > clockControls.clockHeight) {
        clockControls.clockHandLength = clockControls.clockHeight;
    } else {
        clockControls.clockHandLength = clockControls.clockWidth;
    }
    clockControls.clockHandLength = clockControls.clockHandLength / 5;

    createCanvas(clockControls.clockWidth, clockControls.clockHeight);

    strokeWeight(1);
}

function draw() {
    clear();
    strokeWeight(1);

    // print(time);
    clockControls.currentTime1 = clockControls.currentTime1 + ((deltaTime * clockControls.timeSpeed) / 1000 / 60);
    clockControls.currentTime2 = clockControls.currentTime2 + ((deltaTime * clockControls.timeSpeed) / 1000);

    if(clockControls.currentTime1 >= 60) clockControls.currentTime1 = 0;
    if(clockControls.currentTime2 >= 60) clockControls.currentTime2 = 0;


    drawHands(clockControls.clockWidth / 2, clockControls.clockHeight / 2, (clockControls.clockHandLength) * clockControls.scalingFactor, clockControls.currentTime1, clockControls.currentTime2, 0);

    //framerate 
    console.log("Frame Rate: ", 1 / (deltaTime / 1000))
}

function drawHands(x, y, length, time1, time2, depth) {
    if (depth >= clockControls.maxDepth || length < clockControls.minLength) {
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

    drawHands(newX1, newY1, length * clockControls.scalingFactor, time1 + clockControls.currentTime1, time1 + clockControls.currentTime2, depth + 1);
    drawHands(newX2, newY2, length * clockControls.scalingFactor, time2 + clockControls.currentTime1, time2 + clockControls.currentTime2, depth + 1);
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
