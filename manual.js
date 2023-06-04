window.onload = function addRandomCard() {
    var canvas = document.getElementById("boardCanvas");
    var context = canvas.getContext("2d");
    var rectangles = []; // Array zum Speichern der Rechtecke
    var selectedRectangle = null; // Aktuell ausgewähltes Rechteck
    var offsetX = 0; // Offset zwischen der Mausposition und dem linken oberen Punkt des Rechtecks
    var offsetY = 0;

    function drawRectangle(x, y, width, height, color, value) {
        context.fillStyle = color;
        context.fillRect(x, y, width, height);
        
        // Text im Rechteck
        context.font = "20px Arial";
        context.fillStyle = "#FFFFFF"; // Farbe des Texts (weiß)
        context.fillText(value, x + width/2 - 10, y + height/2 + 10); // Positionieren und Zeichnen des Texts
    }

    function drawRectangles() {
        context.clearRect(0, 0, canvas.width, canvas.height); // Canvas löschen

        for (var i = 0; i < rectangles.length; i++) {
            var rect = rectangles[i];
            drawRectangle(rect.x, rect.y, rect.width, rect.height, rect.color, rect.value);
        }
    }

    function handleMouseDown(e) {
        var mouseX = e.clientX - canvas.offsetLeft;
        var mouseY = e.clientY - canvas.offsetTop;

        for (var i = rectangles.length - 1; i >= 0; i--) {
            var rect = rectangles[i];
            if (
                mouseX >= rect.x &&
                mouseX <= rect.x + rect.width &&
                mouseY >= rect.y &&
                mouseY <= rect.y + rect.height
            ) {
                selectedRectangle = rect;
                offsetX = mouseX - rect.x;
                offsetY = mouseY - rect.y;
                break;
            }
        }
    }

    function handleMouseMove(e) {
        if (selectedRectangle !== null) {
            selectedRectangle.x = e.clientX - canvas.offsetLeft - offsetX;
            selectedRectangle.y = e.clientY - canvas.offsetTop - offsetY;
            drawRectangles();
        }
    }

    function handleMouseUp(e) {
        selectedRectangle = null;
    }

    var randomCard = document.getElementById("addRandomCard");
    randomCard.addEventListener("click", function() {
        var x = Math.random() * (canvas.width - 100);
        var y = Math.random() * (canvas.height - 100);
        var width = 100;
        var height = 100;
        var color = "#808080";
        var value = Math.floor(Math.random() * 20) + 1;
        var rect = { x: x, y: y, width: width, height: height, color: color, value: value };
        rectangles.push(rect);
        drawRectangles();
    });

    var clearButton = document.getElementById("deleteAll");
    clearButton.addEventListener("click", function() {
        rectangles = [];
        drawRectangles();
    });

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
};

window.addEventListener('DOMContentLoaded', function() {
    var divContainer = document.querySelector('.whiteboard');
    var canvas = document.getElementById('boardCanvas');

    canvas.width = divContainer.clientWidth;
    canvas.height = divContainer.clientHeight;
})

