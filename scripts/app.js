

// 1) Creation of Grid

const width = 10;
const gridSize = width * width;
const gridArray = [];

const gridWrapper = document.querySelector('.grid-wrapper');


function createGrid() {

  for (let i = 0; i < gridSize; i++) {
    const gridSquare = document.createElement('div');
    gridArray.push(gridSquare);
    gridSquare.id = i;
    gridWrapper.appendChild(gridSquare);
  }

}

createGrid();




// 2) Create successful path

// Set variables
let currentIndex = 0;
let randomNumber = null;

// Generates a random number for new direction
function generateRandomNumber() {
  return (Math.floor(Math.random() * 4) + 1);
}

function moveRight(index) {
  return index + 1;
}

function moveLeft(index) {
  return index - 1;
}

function moveUp(index) {
  return index - width;
}

function moveDown(index) {
  return index + width;
}

// Function to check if move from currentIndex is possible, or if there is a wall
function checkIfWallPresent(direction, currentIndex) {
  const xPosition = currentIndex % width;
  const yPosition = Math.floor(currentIndex / width);
  
  // Considers direction and current index x/y positions to see if it can move.
  // If false is returned, then cannot move in that direction
  switch (direction) {
    case 'right':
      return (xPosition < (width - 1))
      break;
    case 'left':
      return (xPosition > 0);
      break;
    case 'up':
      return (yPosition > 0);
      break;
    case 'down':
      return (yPosition < (width - 1));
      break;
  }
}

// Function to check if index has successful path class
function checkIfSuccessfulPathClass(index) {
  console.log(gridArray[index]);
  return gridArray[index].classList.contains('successfulPath');
}

// Function to check if index has fake path class
function checkIfFakePathClass(index) {
  console.log(gridArray[index]);
  return gridArray[index].classList.contains('fakePath');
}






console.log(gridArray);
gridArray[2].classList.add('successfulPath');
console.log(checkIfSuccessfulPathClass(2));
gridArray[2].classList.add('fakePath');
console.log(checkIfFakePathClass(2));

// console.log(checkIfWallPresent('down',7));

// let number = 0;
// const xPosition = number % width;
// const yPosition = Math.floor(number / width);
// console.log('Can move left: ', xPosition > 0);
// console.log('Can move right: ', xPosition < (width - 1));
// console.log('Can move up: ', yPosition > 0);
// console.log('Can move down: ', yPosition < (width - 1));
// console.log()

// console.log(moveRight(currentIndex));
// console.log(moveLeft(currentIndex));
// console.log(moveUp(currentIndex));
// console.log(moveDown(currentIndex));

// randomNumber = generateRandomNumber();
// console.log(randomNumber);