let socket = io('/mod');

socket.on('connect', () => {
    console.log("connected");
});

let freqButton = document.getElementById('send-freq')
let playButton = document.getElementById('play-button');

let cnv;
let osc; //base oscillator
let modulator; // oscillator will modulate frequency of the base osc
let playing, freq, amp;

window.addEventListener('load', () => {
    
    freqButton.addEventListener("click", () => {
        freq = random(100, 500);
        osc.freq(freq);
        console.log(freq);

        let freqData = {
            "freq" : freq
        };
        socket.emit('freqData', freqData)
    })
    
    playButton.addEventListener("click", () => {
        playing = !playing;

        if (playing) {
        osc.start();
        playButton.style.background = "lawngreen";
        playButton.innerHTML = "Play";
        }
        else {
            osc.stop();
            playButton.style.background = "crimson";
            playButton.innerHTML = "Pause";
        }
    })
});

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    // cnv.mousePressed(playOscillator);
    background('pink');

    osc = new p5.Oscillator('triangle');
}

function draw() {

    // freq = constrain(map(mouseX, 0, width, 100, 600), 100, 600);
    // amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);


}


let value = 0;
function keyPressed() {
    if (value === 0) {
        console.log("spacebar pressed");
    }
}