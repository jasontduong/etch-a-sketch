const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'draw';

let currentMode = DEFAULT_MODE;

const grid = document.querySelector('.grid');
const slider = document.getElementById('myRange');
const output = document.querySelector('.sliderdisplay');
output.innerHTML = slider.value + " x " + slider.value;

slider.oninput = function () {
    updateGridValue();
}

slider.onchange = function () {
    resizeGrid();
}

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function setCurrentMode(newMode) {
    currentMode = newMode
}

function updateGridValue() {
    output.innerHTML = slider.value + " x " + slider.value;
}
function resizeGrid() {
    grid.innerHTML = '';
    makeGrid(slider.value);
}

function removeAddBorder() {
    var gridExist = document.getElementsByClassName('gridBorder');
    var gridExistAlt = document.getElementsByClassName('gridBorderAlt');
    if (gridExist.length > 0 || gridExistAlt.length > 0) {
        const gridSquares = document.querySelectorAll('.gridSquare');
        gridSquares.forEach(gridSquare => {
            gridSquare.classList.remove('gridBorder');
            gridSquare.classList.remove('gridBorderAlt');
        });
    } else {
        const gridSquares = document.querySelectorAll('.gridSquare');
        gridSquares.forEach(gridSquare => {
            gridSquare.classList.add('gridBorderAlt');
        });
    }

}
function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;

    if (currentMode === 'draw') {
        e.target.classList.add('gridAlter');
    }

    if (currentMode === 'erase') {
        e.target.classList.remove('gridAlter');
    }
}

function drawMode() {
    setCurrentMode('draw');
}
function eraseMode() {
    setCurrentMode('erase');
}

function clearGrid() {
    const gridSquares = document.querySelectorAll('.gridSquare');
    gridSquares.forEach(gridSquare => {
        gridSquare.classList.remove('gridAlter');
    });
}

function makeGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridSquare = document.createElement('div')
        gridSquare.classList.add('gridSquare')
        gridSquare.classList.add('gridBorder')
        gridSquare.addEventListener('mouseover', changeColor)
        gridSquare.addEventListener('mousedown', changeColor)
        grid.appendChild(gridSquare)
    }
}

window.onload = () => {
    makeGrid(DEFAULT_SIZE)
}