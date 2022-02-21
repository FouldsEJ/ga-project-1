

//! 1) Creation of Grid

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



//! 2) Create a start and finish square
gridArray[0].classList.add('starting-square', 'successful-path');
gridArray[gridArray.length - 1].classList.add('finishing-square');








//! 3) Create successful path

// Generates a random number for new direction
function generateRandomNumber() {
  return (Math.floor(Math.random() * 4) + 1);
}

function generateRandomDirection(currentIndex) {
  randomNumber = generateRandomNumber();
  console.log("Current Index inside of ranodm number: ", currentIndex);
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

  console.log("New Index Inside randomNumber: ", newIndex);
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

    (checkIfWallPresent('left', index) === false && checkIfFakePathClass(moveLeft(index)) === false && checkIfSuccessfulPathClass(moveLeft(index)) === false))
}


let successfulPathArray = [0];
let fakePathArray = [];
let currentIndex = 0;
let randomNumber = null;
let newIndex = null;
let moveDirection = null;

function createSuccessfulPath() {

  // Checking if there is a possible exit
  while (checkPossibleExit(currentIndex) === false) {
    gridArray[currentIndex].classList.remove('successful-path')
    gridArray[currentIndex].classList.add('fake-path');
    // gridArray[currentIndex].style.borderTop = "thick solid #0000FF";
    fakePathArray.push(currentIndex);
    let poppedValue = successfulPathArray.pop();
    currentIndex = successfulPathArray[successfulPathArray.length - 1];
    // gridArray[currentIndex].style.border = "thick solid green";
    addBoarderAtIntersect(currentIndex, poppedValue)

  }


  // Once possible exit is known generate random direction
  generateRandomDirection(currentIndex);


  // Check to see if newIndex has successful-path class or fake-path class or is a wall, if true, re-run function, if not then add 
  // successful-path class to newIndex, add newIndex number to successfulPath array, remove borders from currentIndex and new Index
  // and update currentIndex to newIndex.
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
while (gridArray[currentIndex].classList.contains('finishing-square') === false) {
  createSuccessfulPath();

}



console.log("Current index: ", currentIndex);
console.log("newIndex: ", newIndex);
console.log("SuccessfulPath Array: ", successfulPathArray);
console.log("Fake path Array: ", fakePathArray);




//! 4) Deal with the boarder

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

// Adds a border for the unusual case of an intersect between fake-path and successful-path, missing a border
function addBoarderAtIntersect (currentIndex, previousIndex) {
  if (currentIndex - previousIndex === width) {
    gridArray[currentIndex].style.borderTop = 'green 1px solid'
  }
  else if (currentIndex - previousIndex === -width) {
    gridArray[currentIndex].style.borderBottom = 'green 1px solid'
  }
  else if (currentIndex - 1 === previousIndex) {
    gridArray[currentIndex].style.borderLeft = 'green 1px solid'
  }
  else if (currentIndex + 1 === previousIndex) {
    gridArray[currentIndex].style.borderRight = 'green 1px solid'

  }
}




// ! Removing first lot of fake path
gridArray.forEach((item) => {
  if (item.classList.contains('fake-path')) {
    item.classList.remove('fake-path');
    item.style.border = 'green 1px solid'
  }
})







//! Intoduce fake path in all grid squares not currently used



// Check for first grid cell without a class of succesful-path or fake-path

let emptyCell = gridArray.findIndex((item) => checkIfSuccessfulPathClass(item.id) === false && checkIfFakePathClass(item.id) === false);
let fakePathArrayTwo = [];
let array = [];

while (emptyCell != -1) {

  // Removes the left hand boarder of emptyCell square and right hand border of adjecent square,
  // as long as it is not in the first column, in which case it removes the top and bottom borders
  if (emptyCell % width === 0) {
    removeBorderTop(emptyCell);
    removeBorderBottom(emptyCell - width);
  }
  else {
    console.log("border left")
    removeBorderLeft(emptyCell)
    console.log("border left again")
    removeBorderRight(emptyCell - 1);
  }

  gridArray[emptyCell].classList.add('fake-path');
  fakePathArrayTwo.push(emptyCell);
  array.push(emptyCell);

  console.log("fakepatharraytwo: ", fakePathArrayTwo);
  console.log("array: ", array)

  while (array.length != 0) {
    let possibleExit = checkPossibleExit(emptyCell);
    console.log("Possible Exit: ", possibleExit);

    while (possibleExit === false) {
      array.pop();
      console.log("Array popped: ", array);
      emptyCell = array[array.length - 1];
      console.log("Empty cell: ", emptyCell);
      if (array.length === 0) {
        possibleExit = true;
      }
      else {
        possibleExit = checkPossibleExit(emptyCell)
      }
    }
    console.log("Success")

    if (array.length === 0) {


    }
    else {
      createFakePath();
    }
  }

  console.log("Fake path two Array:", fakePathArrayTwo);
  console.log("array: ", array);
  console.log("Empty Cell 1: ", emptyCell)
  emptyCell = gridArray.findIndex((item) => checkIfSuccessfulPathClass(item.id) === false && checkIfFakePathClass(item.id) === false);
  console.log("Empty Cell 2: ", emptyCell)
}

function createFakePath() {

  generateRandomDirection(emptyCell);

  if (checkIfWallPresent(moveDirection, emptyCell) === false && checkIfSuccessfulPathClass(newIndex) === false && checkIfFakePathClass(newIndex) === false) {
    gridArray[newIndex].classList.add('fake-path');
    fakePathArrayTwo.push(newIndex);
    array.push(newIndex);
    borderRemovalDecision(moveDirection, emptyCell, newIndex);
    emptyCell = newIndex;
  }
  else {
    console.log("Well done");
    createFakePath();
  }
}












//! Introduce "ball" into the game

let currentPlayerIndex = 0;
let newPlayerIndex = null;

function addBall(index) {
  gridArray[index].classList.add('ball');
}

function removeBall(index) {
  gridArray[index].classList.remove('ball');
}


document.addEventListener('keyup', handleKeyPress)

function handleKeyPress(event) {
  console.log(event);
  switch (event.which) {
    case 39:
      newPlayerIndex = moveRight(currentPlayerIndex);
      direction = 'right';
      break;
    case 37:
      newPlayerIndex = moveLeft(currentPlayerIndex);
      direction = 'left';
      break;
    case 38:
      newPlayerIndex = moveUp(currentPlayerIndex);
      direction = 'up';
      break;
    case 40:
      newPlayerIndex = moveDown(currentPlayerIndex);
      direction = 'down';
      break;
    default:
  }
  if (checkIfWallPresent(direction, currentPlayerIndex) === false && checkIfBoardersPresent(direction, currentPlayerIndex) === 'none') {
    removeBall(currentPlayerIndex);
    addBall(newPlayerIndex);
    currentPlayerIndex = newPlayerIndex;
  }
  else{};
  
}


function checkIfBoardersPresent(direction, currentPlayerIndex) {
  switch (direction) {
    case 'right':
      console.log(gridArray[currentPlayerIndex].style.borderRight);
      return (gridArray[currentPlayerIndex].style.borderRight)
      break;
    case 'left':
      return (gridArray[currentPlayerIndex].style.borderLeft);
      break;
    case 'up':
      return (gridArray[currentPlayerIndex].style.borderTop);
      break;
    case 'down':
      return (gridArray[currentPlayerIndex].style.borderBottom);
      break;
  }
}