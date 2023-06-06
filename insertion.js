function startInsertionSort() {
    var canvas = document.getElementById("boardCanvas");
    var context = canvas.getContext("2d");

    var anzahlRechtecke = 7;
    var distance = 20;

    var width = 100;
    var height = 100;

    var zahlenArray = [];

    var startX = (canvas.width - (anzahlRechtecke * width + (anzahlRechtecke - 1) * distance)) / 2;

    var animationPaused = false; // Variable zum Überprüfen, ob die Animation pausiert ist
    var currentIndex = 1; // Index des aktuellen Schritts in der Animation

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
        if (i >= zahlenArray.length) {
            return;
        }

        var key = zahlenArray[i];
        var j = i - 1;

        while (j >= 0 && zahlenArray[j] > key) {
            var rectA = {
                index: j,
                x: startX + (width + distance) * j,
                y: 100,
                width: width,
                height: height,
                color: "#0000FF",
                value: zahlenArray[j]
            };

            var rectB = {
                index: j + 1,
                x: startX + (width + distance) * (j + 1),
                y: 100,
                width: width,
                height: height,
                color: "#0000FF",
                value: zahlenArray[j + 1]
            };

            drawRectangle(rectA.x, rectA.y, rectA.width, rectA.height, rectA.color, rectA.value);
            drawRectangle(rectB.x, rectB.y, rectB.width, rectB.height, rectB.color, rectB.value);

            await new Promise((resolve) => setTimeout(resolve, 3000));

            swapRectangles(rectA.index, rectB.index);

            drawRectangles();

            await new Promise((resolve) => setTimeout(resolve, 3000));

            j--;
        }

        if (!animationPaused) {
            animateSwap(i + 1);
        } else {
            currentIndex = i; // Speichern des aktuellen Index für die Fortsetzung
        }
    }

    async function insertionSort() {
        for (var i = 1; i < zahlenArray.length; i++) {
            var key = zahlenArray[i];
            var j = i - 1;
            while (j >= 0 && zahlenArray[j] > key) {
                zahlenArray[j + 1] = zahlenArray[j];
                j--;
            }
            zahlenArray[j + 1] = key;
            drawRectangles();
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
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

    insertionSort();

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