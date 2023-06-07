function startSelectionSort() {
    var canvas = document.getElementById("boardCanvas");
    var context = canvas.getContext("2d");

    var anzahlRechtecke = 7;
    var distance = 20;

    var width = 100;
    var height = 100;

    var zahlenArray = [];

    var startX = (canvas.width - (anzahlRechtecke * width + (anzahlRechtecke - 1) * distance)) / 2;

    var animationPaused = false; // Variable zum Überprüfen, ob die Animation pausiert ist
    var currentIndex = 0; // Index des aktuellen Schritts in der Animation

    function drawRectangle(x, y, width, height, color, value) {
        context.fillStyle = color;
        context.fillRect(x, y, width, height);

        context.font = "20px Arial";
        context.fillStyle = "#FFFFFF";
        context.fillText(value, x + width / 2 - 10, y + height / 2 + 10);
    }

    function swapRectangles(indexA, indexB) {
        var temp = zahlenArray[indexA];
        zahlenArray[indexA] = zahlenArray[indexB];
        zahlenArray[indexB] = temp;
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

    async function animateSwap(i) {
        if (i >= zahlenArray.length - 1) {
            if (await selectionSortIteration()) {
                // Die Liste ist noch nicht vollständig sortiert, also erneut animieren
                animateSwap(0);
            }
            return;
        }

        var minIndex = i;
        for (var j = i + 1; j < zahlenArray.length; j++) {
            if (zahlenArray[j] < zahlenArray[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            var rectA = {
                index: i,
                x: startX + (width + distance) * i,
                y: 100,
                width: width,
                height: height,
                color: "#0000FF",
                value: zahlenArray[i]
            };

            var rectB = {
                index: minIndex,
                x: startX + (width + distance) * minIndex,
                y: 100,
                width: width,
                height: height,
                color: "#0000FF",
                value: zahlenArray[minIndex]
            };

            drawRectangle(rectA.x, rectA.y, rectA.width, rectA.height, rectA.color, rectA.value);
            drawRectangle(rectB.x, rectB.y, rectB.width, rectB.height, rectB.color, rectB.value);

            await new Promise((resolve) => setTimeout(resolve, 2000));

            swapRectangles(rectA.index, rectB.index);

            drawRectangles();

            await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        if (!animationPaused) {
            animateSwap(i + 1);
        } else {
            currentIndex = i + 1; // Speichern des aktuellen Index für die Fortsetzung
        }
    }

    async function selectionSortIteration() {
        var sorted = true;
        for (var i = 0; i < zahlenArray.length - 1; i++) {
            var minIndex = i;
            for (var j = i + 1; j < zahlenArray.length; j++) {
                if (zahlenArray[j] < zahlenArray[minIndex]) {
                    minIndex = j;
                }
            }

            if (minIndex !== i) {
                swapRectangles(i, minIndex);
                sorted = false;
            }
        }
        drawRectangles();
        return !sorted;
    }

    function selectionSort() {
        animateSwap(0);
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

    selectionSort();

    var pauseButton = document.getElementById("pauseButton");
    var resumeButton = document.getElementById("resumeButton");

    pauseButton.addEventListener("click", function() {
        animationPaused = true;
    });

    resumeButton.addEventListener("click", function() {
        if (animationPaused) {
            animationPaused = false;
            animateSwap(currentIndex);
        }
    });
}
