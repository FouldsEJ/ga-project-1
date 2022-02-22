

//! 1) Creation of Grid
function createGrid() {

  for (let i = 0; i < gridSize; i++) {
    const gridSquare = document.createElement('div');
    gridArray.push(gridSquare);
    gridSquare.id = i;
    gridArray[i].style.width = `${100 / width}%`;
    gridArray[i].style.height = `${100 / width}%`;
    gridWrapper.appendChild(gridSquare);
  }

}


//! 3) Create successful path

// Generates a random number for new direction
function generateRandomNumber() {
  return (Math.floor(Math.random() * 4) + 1);
}

function generateRandomDirection(currentIndex) {
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

function createSuccessfulPath() {

  // Checking if there is a possible exit - whilst there isn't revert back to previous gridSquare
  // Also remove succesful-path class and add fake-path class to square
  while (checkPossibleExit(currentIndex) === false) {
    gridArray[currentIndex].classList.remove('successful-path')
    gridArray[currentIndex].classList.add('fake-path');
    fakePathArray.push(currentIndex);
    let poppedValue = successfulPathArray.pop();
    currentIndex = successfulPathArray[successfulPathArray.length - 1];
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


//! 4) Deal with the boarder
// Function to decide on which borders to remove when create paths.
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

// Remove top border function
function removeBorderTop(index) {
  gridArray[index].style.borderTop = "none";
}

// Remove bottom border function
function removeBorderBottom(index) {
  gridArray[index].style.borderBottom = "none";
}

// Remove right border function
function removeBorderRight(index) {
  gridArray[index].style.borderRight = "none";
}

// Remove left border function
function removeBorderLeft(index) {
  gridArray[index].style.borderLeft = "none";
}

// Adds a border for the unusual case of an intersect between fake-path and successful-path, missing a border
function addBoarderAtIntersect(currentIndex, previousIndex) {
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



//! Intoduce fake path in all grid squares not currently used
function createFakePath() {


  // Removes the left hand boarder of currentEmptyCell square and right hand border of adjacent square,
  // as long as it is not in the first column, in which case it removes the top and bottom borders
  if (currentEmptyCell % width === 0) {
    removeBorderTop(currentEmptyCell);
    removeBorderBottom(currentEmptyCell - width);
  }
  else {
    removeBorderLeft(currentEmptyCell)
    removeBorderRight(currentEmptyCell - 1);
  }

  // Addes the fake-path class to the currentEmptyCell index and adds the index to the fakePathTwo Array and fakePathBuilder array
  gridArray[currentEmptyCell].classList.add('fake-path');
  fakePathArrayTwo.push(currentEmptyCell);
  fakePathBuilder.push(currentEmptyCell);



  while (fakePathBuilder.length != 0) {
    let possibleExit = checkPossibleExit(currentEmptyCell);

    while (possibleExit === false) {
      fakePathBuilder.pop();
      currentEmptyCell = fakePathBuilder[fakePathBuilder.length - 1];
      if (fakePathBuilder.length === 0) {
        possibleExit = true;
      }
      else {
        possibleExit = checkPossibleExit(currentEmptyCell)
      }
    }
    if (fakePathBuilder.length === 0) {
    }
    else {
      addToFakePath();
    }
  }
  currentEmptyCell = gridArray.findIndex((item) => checkIfSuccessfulPathClass(item.id) === false && checkIfFakePathClass(item.id) === false);
}

function addToFakePath() {

  generateRandomDirection(currentEmptyCell);

  if (checkIfWallPresent(moveDirection, currentEmptyCell) === false && checkIfSuccessfulPathClass(newIndex) === false && checkIfFakePathClass(newIndex) === false) {
    gridArray[newIndex].classList.add('fake-path');
    fakePathArrayTwo.push(newIndex);
    fakePathBuilder.push(newIndex);
    borderRemovalDecision(moveDirection, currentEmptyCell, newIndex);
    currentEmptyCell = newIndex;
  }
  else {
    addToFakePath();
  }
}


//! Introduce "ball" into the game
function addBall(index) {
  gridArray[index].classList.add('ball');
}

function removeBall(index) {
  gridArray[index].classList.remove('ball');
}

function addPlayerFollow(index) {
  gridArray[index].classList.add('player-follower');
}

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
    addPlayerFollow(currentPlayerIndex);
    addBall(newPlayerIndex);
    currentPlayerIndex = newPlayerIndex;
    playerMoves++;
    console.log("Player moves: ", playerMoves);
    if (gridArray[currentPlayerIndex].classList.contains('finishing-square')) {
      winnerBanner.style.visibility = 'visible';
      clearInterval(timer);
    }
  }
  else { };

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


// ! Displaying maze
function removeMaze() {
  for (let i = 0; i < gridSize; i++) {
    gridArray[i].classList.add('starter-screen');
  }
}

function addMaze() {
  for (let i = 0; i < gridSize; i++) {
    gridArray[i].classList.remove('starter-screen');
    
  }
}

function animatedShowMaze() {
  let i = -1;
  const increaseNumber = setInterval(() => {
    i = i + 1;
  }, 2000)


  if (i < gridSize) {
    const displayMaze = setInterval(() => {
      gridArray[i].classList.remove('starter-screen');
      gridArray[i].style.border

    }, 2000)
  }
  else {
    clearInterval(increaseNumber);
    clearInterval(displayMaze);
  }
}



// ! Managing press play button
function managePlayGameButton(event) {
  console.log(event);
  openingBanner.style.visibility = 'hidden';
  addMaze()
  countDown();
}

function managePlayAgainButtons(event) {
  console.log("You pressed it")
}



// // ! Adding golden nuggets
// const goldenNuggets = [];

// for (let i=0; i<(width/2); i++) {
//   const n = (Math.floor(Math.random() * 100));
//   goldenNuggets[i] = n;
//   gridArray[n].classList.add('golden-nugget');
// }

// console.log(goldenNuggets);



// ! Adding timer to game
function countDown() {
  const timerScreen = document.querySelector('.timer');
  let startingSeconds = 65;

  timer = setInterval(() => {
    if (startingSeconds > 0) {
      startingSeconds--
      let minutes = Math.floor(startingSeconds / 60);
      let seconds = startingSeconds % 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      timerScreen.innerHTML = `${minutes}:${seconds}`;
    }
    else {
      clearInterval(timer);
      console.log("finished");
    }
  }, 1000)
}



//! ALL CODE FLOW



console.log("Hello")
const width = 5;
const gridSize = width * width;
console.log(gridSize);
const gridArray = [];

let successfulPathArray = [0];
let fakePathArray = [];
let currentIndex = 0;
let newIndex = null;
let randomNumber = null;
let moveDirection = null;

let currentEmptyCell = null;
let fakePathArrayTwo = [];
let fakePathBuilder = [];

let currentPlayerIndex = 0;
let newPlayerIndex = null;
let playerMoves = 0;

let timer = undefined;

const gridWrapper = document.querySelector('.grid-wrapper');
const openingBanner = document.querySelector('.start-menu-display');
const playGameButton = document.querySelector('.play-game')
const losingBanner = document.querySelector('.loser-display');
const winnerBanner = document.querySelector('.winner-display');
const playGameAgainButtons = document.querySelectorAll('.play-again')
playGameButton.addEventListener('click', managePlayGameButton);
playGameAgainButtons.forEach(btn => btn.addEventListener('click', managePlayAgainButtons));
document.addEventListener('keydown', handleKeyPress)


losingBanner.style.visibility = 'hidden';
winnerBanner.style.visibility = 'hidden';

// 1 - Create the grid for the maze to be generated in
createGrid();

// 2 - Assign a start and finish to the maze at the first grid square and the last
gridArray[0].classList.add('starting-square', 'successful-path');
gridArray[gridArray.length - 1].classList.add('finishing-square');

// 3 - Run createMaze function
while (gridArray[currentIndex].classList.contains('finishing-square') === false) {
  createSuccessfulPath();
}

// 4 - Removes fake-path class from all grid squares containing it, leaving just a successful path.
// This is done to improve the genuineness of the fake path trails when they are created as one
gridArray.forEach((item) => {
  if (item.classList.contains('fake-path')) {
    item.classList.remove('fake-path');
    item.style.border = 'green 1px solid'
  }
})

// 5 - Creates a fake path in all squares not taken up with a successful-path class
// Check for first grid cell without a class of succesful-path or fake-path
currentEmptyCell = gridArray.findIndex((item) => checkIfSuccessfulPathClass(item.id) === false && checkIfFakePathClass(item.id) === false);
while (currentEmptyCell != -1) {
  createFakePath();
}

removeMaze();