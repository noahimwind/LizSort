function chooseSortingAlgorithm(buttonId) {
    let url = buttonId.concat(".html");
    window.location.href = url;
}

window.addEventListener('DOMContentLoaded', function() {
    var divContainer = document.querySelector('.whiteboard');
    var canvas = document.getElementById('boardCanvas');

    canvas.width = divContainer.clientWidth;
    canvas.height = divContainer.clientHeight;
})

