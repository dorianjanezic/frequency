// window.addEventListener('load', () => {

// });

let socket = io();

socket.on('connect', () => {
    console.log("connected");
});

let cnv;
let osc; //base oscillator
let modulator; // oscillator will modulate frequency of the base osc
let playing, freq, amp;

let button, val;

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.mousePressed(playOscillator);
    background('lightblue');

    osc = new p5.Oscillator('triangle');
}

function draw() {

    freq = constrain(map(mouseX, 0, width, 100, 600), 100, 600);
    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

    textSize(16)
    text('Tap to Toggle ', width/2, 43);
6

    
    if (mouseIsPressed) {
        playing = !playing;
    }

    if (playing) {
        button = createButton('On');
        button.position(width/2 + 95, 15);
        button.style('background-color', "green");
        // playOscillator();
        osc.freq(freq, 0.1);
        osc.amp(amp, 0.1);
    } 
    else {
        val = "red";
        button = createButton('Off');
        button.position(width/2 + 95, 15);
        button.style('background-color', "red");
        osc.amp(0, 0.5);
    }
}

function playOscillator() {
    osc.start();
    // playing = true;

}

let value = 0;
function keyPressed() {
    if (value === 0) {
        console.log("spacebar pressed");
    }
}