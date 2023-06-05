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
            if (await bubbleSortIteration()) {
                // Die Liste ist noch nicht vollständig sortiert, also erneut animieren
                await animateSwap(0);
            }
            return;
        }

        if (zahlenArray[i] > zahlenArray[i + 1]) {
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
                index: i + 1,
                x: startX + (width + distance) * (i + 1),
                y: 100,
                width: width,
                height: height,
                color: "#0000FF",
                value: zahlenArray[i + 1]
            };

            drawRectangle(rectA.x, rectA.y, rectA.width, rectA.height, rectA.color, rectA.value);
            drawRectangle(rectB.x, rectB.y, rectB.width, rectB.height, rectB.color, rectB.value);

            await new Promise((resolve) => setTimeout(resolve, 2000));

            swapRectangles(rectA.index, rectB.index);

            await new Promise((resolve) => setTimeout(resolve, 2000));

            drawRectangles();
        }

        await animateSwap(i + 1);
    }

    async function bubbleSortIteration() {
        var swapped = false;
        for (var i = 0; i < zahlenArray.length - 1; i++) {
            if (zahlenArray[i] > zahlenArray[i + 1]) {
                swapRectangles(i, i + 1);
                swapped = true;
            }
        }
        drawRectangles();
        return swapped;
    }

    function bubbleSort() {
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

    bubbleSort();
}