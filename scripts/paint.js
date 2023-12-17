document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('paintCanvas');
    const ctx = canvas.getContext('2d');

    let painting = false;
    let eraserMode = false;

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

        if (eraserMode) {
            ctx.globalCompositeOperation = 'destination-out'; // Set globalCompositeOperation to make content transparent
        } else {
            ctx.globalCompositeOperation = 'source-over'; // Restore default mode
            ctx.strokeStyle = document.getElementById('colorPicker').value;
        }

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function toggleEraserMode() {
        eraserMode = !eraserMode;
    }

    function changeColor(color) {
        ctx.strokeStyle = color;
        ctx.globalCompositeOperation = 'source-over';
        if (eraserMode) {
            toggleEraserMode();
        }
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
    document.getElementById('clearButton').addEventListener('click', clearCanvas);
    document.getElementById('eraserButton').addEventListener('click', toggleEraserMode);

    document.getElementById('brushSize').addEventListener('input', function () {
        ctx.lineWidth = this.value;
    });

    document.getElementById('colorPicker').addEventListener('input', function () {
        changeColor(this.value);
    });
});
