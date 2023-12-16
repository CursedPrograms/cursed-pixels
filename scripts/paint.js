document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('paintCanvas');
    const ctx = canvas.getContext('2d');

    let painting = false;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;

        ctx.lineWidth = document.getElementById('brushSize').value;
        ctx.lineCap = 'round';

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function changeColor(color) {
        ctx.strokeStyle = color;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    document.getElementById('clearButton').addEventListener('click', clearCanvas);

    document.getElementById('blackColorButton').addEventListener('click', () => changeColor('black'));
    document.getElementById('redColorButton').addEventListener('click', () => changeColor('red'));
    document.getElementById('blueColorButton').addEventListener('click', () => changeColor('blue'));

    document.getElementById('brushSize').addEventListener('input', function () {
        ctx.lineWidth = this.value;
    });
    
    document.getElementById('colorPicker').addEventListener('input', function () {
        changeColor(this.value);
    });
});
