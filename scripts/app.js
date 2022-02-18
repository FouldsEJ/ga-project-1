

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



// 2) Create a start and finish square
gridArray[0].classList.add('starting-square', 'successful-path');
gridArray[gridArray.length-1].classList.add('finishing-square');








// 3) Create successful path

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
  // Returns false if no wall in that direction
  switch (direction) {
    case 'right':
      return (xPosition >= (width - 1))
      break;
    case 'left':
      return (xPosition <= 0);
      break;
    case 'up':
      return (yPosition <= 0);
      break;
    case 'down':
      return (yPosition >= (width - 1));
      break;
  }
}

// Function to check if index has successful path class. Returns false if class not present
function checkIfSuccessfulPathClass(index) {
  return gridArray[index].classList.contains('successful-path');
}

// Function to check if index has fake path class. Returns false if class not present
function checkIfFakePathClass(index) {
  return gridArray[index].classList.contains('fake-path');
}

// Checks if index has any possible exits that do not contain a successfulPath or fakePath class or if its a wall
function checkPossibleExit(index) {
  return ((checkIfWallPresent('up', index) === false && checkIfFakePathClass(moveUp(index)) === false && checkIfSuccessfulPathClass(moveUp(index)) === false) || 
  
    (checkIfWallPresent('right', index) === false && checkIfFakePathClass(moveRight(index)) === false && checkIfSuccessfulPathClass(moveRight(index)) === false) ||
  
    (checkIfWallPresent('down', index) === false && checkIfFakePathClass(moveDown(index)) === false && checkIfSuccessfulPathClass(moveDown(index)) === false) ||
  
    (checkIfWallPresent('left', index) === false && checkIfFakePathClass(moveLeft(index)) === false && checkIfSuccessfulPathClass(moveLeft(index)) === false) )
}





let successfulPathArray = [0];
let fakePathArray =[];
let currentIndex = 0;
let randomNumber = null;
let newIndex = null;
let moveDirection = null;

function createSuccessfulPath() {

// Checking if there is a possible exit
while (checkPossibleExit(currentIndex) === false) {
  gridArray[currentIndex].classList.remove('successful-path')
  gridArray[currentIndex].classList.add('fake-path');
  fakePathArray.push(currentIndex);
  successfulPathArray.pop();
  currentIndex = successfulPathArray[successfulPathArray.length - 1];
}


  // Once possible exit is known generate random direction
  randomNumber = generateRandomNumber();
  switch (randomNumber) {
    case 1:
      newIndex = moveUp(currentIndex);
      moveDirection = 'up';
      break;
    case 2:
      newIndex = moveRight(currentIndex);
      moveDirection = 'right';
      break;
    case 3:
      newIndex = moveDown(currentIndex);
      moveDirection = 'down';
      break;
    case 4:
      newIndex = moveLeft(currentIndex);
      moveDirection = 'left';
      break;
  }



  // Check to see if newIndex has successful-path class or fake-path class or is a wall, if true, re-run function, if not then add 
  // successful-path class to newIndex, add newIndex number to successfulPath array, and update currentIndex
  // to newIndex.
  if (checkIfWallPresent(moveDirection, currentIndex) === false && checkIfSuccessfulPathClass(newIndex) === false && checkIfFakePathClass(newIndex) === false) {
    gridArray[newIndex].classList.add('successful-path');
    successfulPathArray.push(newIndex);
    borderRemovalDecision(moveDirection, currentIndex, newIndex);
    currentIndex = newIndex;
  }
  else {
    createSuccessfulPath();
  }
}

// Run createMaze function
while (gridArray[currentIndex].classList.contains('finishing-square')===false) {
  createSuccessfulPath();

}



console.log("Current index: ", currentIndex);
console.log("newIndex: ", newIndex);
console.log("SuccessfulPath Array: ", successfulPathArray);
console.log("Fake path Array: ", fakePathArray);





// 4) Deal with the boarder

function borderRemovalDecision(direction, currentIndex, newIndex) {
  switch (direction) {
    case 'right':
      removeBorderRight(currentIndex);
      removeBorderLeft(newIndex);
      break;
    case 'left':
      removeBorderLeft(currentIndex);
      removeBorderRight(newIndex);
      break;
    case 'up':
      removeBorderTop(currentIndex);
      removeBorderBottom(newIndex);
      break;
    case 'down':
      removeBorderBottom(currentIndex);
      removeBorderTop(newIndex);
      break;
  }
}



function removeBorderTop(index) {
  gridArray[index].style.borderTop = "none";
}
function removeBorderBottom(index) {
  gridArray[index].style.borderBottom = "none";
}
function removeBorderRight(index) {
  gridArray[index].style.borderRight = "none";
}
function removeBorderLeft(index) {
  gridArray[index].style.borderLeft = "none";
}


