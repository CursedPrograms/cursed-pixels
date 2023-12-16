document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('paintCanvas');
    const fileInput = document.getElementById('fileInput');

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        if (file && file.type.startsWith('image/')) {
            loadImage(file);
        }
    }

    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);

    function loadImage(file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const image = new Image();
            image.onload = function () {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            };
            image.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }

    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];

        if (file && file.type.startsWith('image/')) {
            loadImage(file);
        }
    });
});
