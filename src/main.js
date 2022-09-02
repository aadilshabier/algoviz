// SETUP
"use-strict";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const WIN_WIDTH = 1100;
const WIN_HEIGHT = 600;

const BAR_WIDTH = 20;
const BAR_HEIGHT = 500;

const X_PADDING = 10;
const Y_PADDING = 15;

const BG_COLOR = "rgb(240, 220, 220)";
const BAR_COLOR = "rgb(0, 122, 255)";
const BORDER_COLOR = "rgb(0, 0, 0)";

const N = 36;

const bars = new Float32Array(N);

let sorter;
let done = false;

// RENDERING

const renderBackground = () => {
    ctx.save();

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, WIN_WIDTH, WIN_HEIGHT);

    ctx.restore();
}

const renderBorder = () => {
    ctx.save();

    ctx.strokeStyle = BORDER_COLOR;
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, WIN_WIDTH, WIN_HEIGHT);

    ctx.restore();
}

const renderBars = () => {
    ctx.save();

    ctx.fillStyle = BAR_COLOR;
    for (let i = 0; i < bars.length; i++) {
        const height = bars[i];
        
        const x = i * (X_PADDING + BAR_WIDTH) + X_PADDING;
        const y = WIN_HEIGHT - (Y_PADDING + height);

        ctx.fillRect(x, y, BAR_WIDTH, height);
    }

    ctx.restore();
}

// SORTING

const bubblesort = function*(array) {
    for (let i = array.length -1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (array[j] > array[j+1]) {
                // swap
                const t = array[j];
                array[j] = array[j+1];
                array[j+1] = t;
                yield;
            }
        }
    }
}

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ENTRY POINT

const init = () => {
    canvas.width = WIN_WIDTH;
    canvas.height = WIN_HEIGHT;

    // fill bars with random height
    for (let i = 0; i < bars.length; i++) {
        bars[i] = Math.random() * BAR_HEIGHT;
    }

    sorter = bubblesort(bars);

    window.requestAnimationFrame(draw)        
}

const draw = () => {
    ctx.save();

    ctx.clearRect(0 ,0, WIN_WIDTH, WIN_HEIGHT);

    renderBackground();

    renderBorder();

    renderBars();

    if (!done) {
        done = sorter.next().done;
        // await sleep(1000);
    }

    ctx.restore();
    window.requestAnimationFrame(draw);
}

window.onload = init;