const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const WIN_WIDTH = 800;
const WIN_HEIGHT = 600;

const BAR_WIDTH = 50;
const BAR_HEIGHT = 400;

const X_PADDING = 20;
const Y_PADDING = 40;

const BG_COLOR = "rgb(240, 240, 240)";
const BAR_COLOR = "rgb(0, 122, 255)";
const BORDER_COLOR = "rgb(0, 0, 0)";

const N = 11;

const bars = new Array(N);

const renderBackground = () => {
    ctx.save();

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, WIN_WIDTH, WIN_HEIGHT);
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

const init = () => {
    canvas.width = WIN_WIDTH;
    canvas.height = WIN_HEIGHT;

    // fill bars with random height
    for (let i = 0; i < bars.length; i++) {
        bars[i] = Math.random() * BAR_HEIGHT;
    }

    window.requestAnimationFrame(draw)        
}

const draw = () => {
    ctx.save();

    ctx.clearRect(0 ,0, WIN_WIDTH, WIN_HEIGHT);

    renderBackground();

    renderBorder();

    renderBars();

    ctx.restore();
    window.requestAnimationFrame(draw);
}

window.onload = init;