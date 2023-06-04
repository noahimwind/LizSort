function startBubbleSort() {
    var canvas = document.getElementById("boardCanvas");
    var context = canvas.getContext("2d");

    var anzahlRechtecke = 7;
    var distance = 20;

    var width = 100;
    var height = 100;

    var zahlenArray = [];

    var startX = (canvas.width - (anzahlRechtecke * width + (anzahlRechtecke - 1) * distance)) / 2;

    function drawRectangle(x, y, width, height, color, value) {
        context.fillStyle = color;
        context.fillRect(x, y, width, height);

        context.font = "20px Arial";
        context.fillStyle = "#FFFFFF";
        context.fillText(value, x + width/2 - 10, y + height/2 + 10);
    }

    // Hilfsfunktion zum Tauschen der Rechtecke im Array
    function swapRectangles(indexA, indexB) {
        var temp = zahlenArray[indexA];
        zahlenArray[indexA] = zahlenArray[indexB];
        zahlenArray[indexB] = temp;

        // Visuelle Darstellung des Tauschs
        var rectA = {
            x: startX + (width + distance) * indexA,
            y: 100,
            width: width,
            height: height,
            color: "#808080",
            value: zahlenArray[indexA]
        };

        var rectB = {
            x: startX + (width + distance) * indexB,
            y: 100,
            width: width,
            height: height,
            color: "#808080",
            value: zahlenArray[indexB]
        };

        // Zeichne die Rechtecke neu
        drawRectangle(rectA.x, rectA.y, rectA.width, rectA.height, rectA.color, rectA.value);
        drawRectangle(rectB.x, rectB.y, rectB.width, rectB.height, rectB.color, rectB.value);
    }

    // Bubble-Sortieralgorithmus
    function bubbleSort() {
        var n = zahlenArray.length;
        var swapped = true;
        var passes = 0;

        function logArray() {
            console.log("Schritt " + passes + ": ", zahlenArray);
        }

        function drawRectangles() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < anzahlRechtecke; i++) {
                var x = startX + (width + distance) * i;
                var y = 100;
                var value = zahlenArray[i];
                var color = "#808080";
                drawRectangle(x, y, width, height, color, value);
            }
        }

        function animateSwap(i) {
            if (i >= n - 1 - passes) {
                passes++;
                if (!swapped) {
                    // Sortierung abgeschlossen
                    console.log("Sortierung abgeschlossen: ", zahlenArray);
                    return;
                }
                swapped = false;
                animateSwap(0);
                return;
            }

            if (zahlenArray[i] > zahlenArray[i + 1]) {
                swapRectangles(i, i + 1);
                swapped = true;
                drawRectangles();
            }

            setTimeout(function() {
                animateSwap(i + 1);
            }, 2000);
        }

        drawRectangles();
        animateSwap(0);
        logArray();
    }

    function isDuplicate(value) {
        return zahlenArray.includes(value);
    }

    function generateUniqueNumber() {
        var value = Math.floor(Math.random() * 20) + 1;
        while (isDuplicate(value)) {
            value = Math.floor(Math.random() * 20) + 1;
        }
        return value;
    }

    for (var i = 0; i < anzahlRechtecke; i++) {
        var value = generateUniqueNumber();
        var x = startX + (width + distance) * i;
        var y = 100;

        zahlenArray.push(value);

        var color = "#808080";
        var rect = { x: x, y: y, width: width, height: height, color: color, value: value };
        drawRectangle(rect.x, rect.y, rect.width, rect.height, rect.color, rect.value);
    }

    bubbleSort();
}