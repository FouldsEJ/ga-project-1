

//! Creation of Grid
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


//! Create successful path

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


//! Border Removal Functions for creating the maze
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
    gridArray[currentIndex].style.borderTop = 'black 1px solid'
  }
  else if (currentIndex - previousIndex === -width) {
    gridArray[currentIndex].style.borderBottom = 'black 1px solid'
  }
  else if (currentIndex - 1 === previousIndex) {
    gridArray[currentIndex].style.borderLeft = 'black 1px solid'
  }
  else if (currentIndex + 1 === previousIndex) {
    gridArray[currentIndex].style.borderRight = 'black 1px solid'

  }
}

//! Create fake path functions
function createFakePath() {


  // Removes the left hand boarder of currentEmptyCell square and right hand border of adjacent square,
  // as long as it is not in the first column, in which case it removes the top and bottom borders
  if (currentIndex % width === 0) {
    removeBorderTop(currentIndex);
    removeBorderBottom(currentIndex - width);
  }
  else {
    removeBorderLeft(currentIndex)
    removeBorderRight(currentIndex - 1);
  }

  // Addes the fake-path class to the currentEmptyCell index and adds the index to the fakePath Array and fakePathBuilder array
  gridArray[currentIndex].classList.add('fake-path');
  fakePathArray.push(currentIndex);
  fakePathBuilder.push(currentIndex);


  // While the fakePathBuilder array has items in it run the following code
  // If the fakePathBuilder array is empty, then a new emptyCell needs to be found. There is no where
  // else to go on the possible path
  while (fakePathBuilder.length != 0) {

    // While there is no possible exit from the current cell, revert back to the previous cell (stored in
    // the fakePathBuilder array). If fakePathBuilderArray has nothing left in it, exit while loop
    let possibleExit = checkPossibleExit(currentIndex);
    while (possibleExit === false) {
      fakePathBuilder.pop();
      currentIndex = fakePathBuilder[fakePathBuilder.length - 1];
      if (fakePathBuilder.length === 0) {
        possibleExit = true;
      }
      else {
        possibleExit = checkPossibleExit(currentIndex)
      }
    }
    if (fakePathBuilder.length === 0) {
    }
    else {
      addToFakePath();
    }
  }
}

function addToFakePath() {

  generateRandomDirection(currentIndex);

  if (checkIfWallPresent(moveDirection, currentIndex) === false && checkIfSuccessfulPathClass(newIndex) === false && checkIfFakePathClass(newIndex) === false) {
    gridArray[newIndex].classList.add('fake-path');
    fakePathArray.push(newIndex);
    fakePathBuilder.push(newIndex);
    borderRemovalDecision(moveDirection, currentIndex, newIndex);
    currentIndex = newIndex;
  }
  else {
    addToFakePath();
  }
}


//! Functions for introducing and moving the "ball" in the game
function addBall(index) {
  gridArray[index].classList.add('ball');
}

function removeBall(index) {
  gridArray[index].classList.remove('ball');
}

function addPlayerFollow(index) {
  gridArray[index].classList.add('player-follower');
}

function checkIfBoardersPresent(direction, currentPlayerIndex) {
  switch (direction) {
    case 'right':
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


// ! Funtions for displaying and hiding the maze
function hideMaze() {
  for (let i = 0; i < gridSize; i++) {
    gridArray[i].classList.add('starter-screen');
  }
}

function unhideMaze() {
  for (let i = 0; i < gridSize; i++) {
    gridArray[i].classList.remove('starter-screen');

  }
}

function animatedShowMaze() {
  let i = -1;
  const increaseNumber = setInterval(() => {
    i = i + 1;
  }, 50)


  if (i < gridSize) {
    const displayMaze = setInterval(() => {
      gridArray[i].classList.remove('starter-screen');
      gridArray[i].style.border

    }, 50)
  }
  else {
    clearInterval(increaseNumber);
    clearInterval(displayMaze);
  }
}



// ! Functions for managing the user pressing buttons/clicking
function managePlayGameButton(event) {
  openingBanner.style.visibility = 'hidden';
  unhideMaze();
  document.addEventListener('keydown', handleKeyPress);
  displayScore();
  countDown();
}

function managePlayAgainButtons(event) {
  document.addEventListener('keydown', handleKeyPress);
  reset();
  createGameBoard();
  countDown();

}

function manageRetryLevelButton(event) {
  console.log("Retry level");
  currentPlayerIndex = 0;
  newPlayerIndex = null;
  playerMoves = 0;
  timer = undefined;
  countDown();
  for (let i = 0; i < gridSize; i++) {
    gridArray[i].classList.remove('player-follower', 'ball')
  }
  winnerBanner.style.visibility = 'hidden';
}

function manageNextLevelButton(event) {
  console.log("Next level");
  let currentWidth = width;
  let currentLevel = level;
  let currenScore = score;
  reset();
  console.log(width);
  level = currentLevel + 1;
  width = currentWidth + 2;
  score = currenScore + 5000;
  gridSize = width * width;
  console.log(width);
  createGameBoard();
  displayScore();
  levelTime = levelTime + startingSeconds;
  countDown();
}

function manageInstructionsButton(event) {
  sideBar.classList.toggle('side-bar-visible');
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
    score = score - 10;
    displayScore()
    if (gridArray[currentPlayerIndex].classList.contains('finishing-square')) {
      displayAndFormatWinnerBanner();
    }
    else if (gridArray[currentPlayerIndex].classList.contains('gold-coin')) {
      collectGoldCoins(currentPlayerIndex);
    }
  }


}

function managePlayGameSideBarButton(event) {
  sideBar.classList.toggle('side-bar-visible');
  clearInterval(timer);
  reset();
  createGameBoard();
  countDown();
  openingBanner.style.visibility = 'hidden';
  document.addEventListener('keydown', handleKeyPress);
  displayScore();
}

function manageMazeInOwnTime(event) {
  sideBar.classList.toggle('side-bar-visible');
  openingBanner.style.visibility = 'hidden';
  document.addEventListener('keydown', handleKeyPress);
  clearInterval(timer);
  const hardness = event.target.value;
  reset();
  switch (hardness) {
    case 'easy':
      width = 10;
      break;
    case 'medium':
      width = 25;
      break;
    case 'hard':
      width = 50;
      break;
    case 'crazy-hard':
      width = 100;
      break;
  }
  gameStyle = 'mazeAlone';
  gridSize = width * width;
  createGameBoard();
  displayScore();
  timerScreen.innerHTML = `00:00`;
  showAnswerButton.style.visibility = 'visible';


}

function manageShowAnswerButton(event) {
  const successfulPath = document.querySelectorAll('.successful-path');
  if (event.type === 'mousedown') {
    for (let i = 0; i < successfulPath.length; i++) {
      successfulPath[i].style.backgroundColor = 'red';
    }
  }
  else {
    for (let i = 0; i < successfulPath.length; i++) {
      successfulPath[i].style.backgroundColor = '#f6f7d4';
    }
  }
}

// ! Functions for formatting Winning Banner
function displayAndFormatWinnerBanner() {
  winnerBanner.style.visibility = 'visible';
  const winnerBannerH2 = document.querySelector('.winner-display h2');
  const winnerBannerP = document.querySelector('.winner-display p');
  const winnerButtons = document.querySelector('.winner-buttons');

  if (gameStyle === 'gamePlay') {
    winnerBannerH2.innerText = `Congratulations!! You completed level ${level}`;
    winnerBannerP.innerText = `You mangaged it in: ${playerMoves} moves\nThe minimum number of moves was: ${successfulPathArray.length - 1} moves`;
    clearInterval(timer);
  }
  else {
    winnerBannerH2.innerText = `Congratulations!! You completed the maze`
    winnerBannerP.innerText = `You mangaged it in: ${playerMoves} moves\nThe minimum number of moves was: ${successfulPathArray.length - 1} moves`;
    winnerButtons.innerHTML = '';
    const btns = mazeInOwnTimeButtons.inner;
    console.log(btns);
    // winnerButtons.appendChild(btn);
  }
}


// ! Function to add timer to the game
function countDown() {
  startingSeconds = levelTime;
  let minutes = Math.floor(startingSeconds / 60);
  let seconds = startingSeconds % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  timerScreen.innerHTML = `${minutes}:${seconds}`;

  timer = setInterval(() => {
    if (startingSeconds > 0) {
      startingSeconds--
      minutes = Math.floor(startingSeconds / 60);
      seconds = startingSeconds % 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      timerScreen.innerHTML = `${minutes}:${seconds}`;
    }
    else {
      clearInterval(timer);
      losingBanner.style.visibility = 'visible';
      document.removeEventListener('keydown', handleKeyPress)

    }
  }, 1000)
}

function displayScore() {
  const scoreValue = document.querySelector('.score');
  if (gameStyle === 'gamePlay') {
    scoreValue.innerText = `Score: ${score}`;
  }
  else {
    scoreValue.innerText = `Score: 0`
  }
}


//! ALL CODE FLOW
let levelTime = 20;
let level = 1;
let score = 1000;
let gameStyle = 'gamePlay';  // Option of gamePlay or mazeAlone

let width = 4;
let gridSize = width * width;
let gridArray = [];

let successfulPathArray = [0];
let fakePathArray = [];
let currentIndex = 0;
let newIndex = null;
let randomNumber = null;
let moveDirection = null;
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
const retryLevelButton = document.querySelector('.retry-level')
const nextLevelButton = document.querySelector('.next-level');
const instructionsButton = document.querySelector('.instructions')
const sideBar = document.querySelector('.side-bar');
const playMazeMadnessSideBarButton = document.querySelector('.play-side-bar-button')
const mazeInOwnTimeButtons = document.querySelectorAll('.maze-alone')
const showAnswer = document.querySelector('.show-answer');
const timerScreen = document.querySelector('.timer');
const showAnswerButton = document.querySelector('.show-answer');

playGameButton.addEventListener('click', managePlayGameButton);
playGameAgainButtons.forEach(btn => btn.addEventListener('click', managePlayAgainButtons));
retryLevelButton.addEventListener('click', manageRetryLevelButton);
nextLevelButton.addEventListener('click', manageNextLevelButton);
instructionsButton.addEventListener('click', manageInstructionsButton);
playMazeMadnessSideBarButton.addEventListener('click', managePlayGameSideBarButton);
mazeInOwnTimeButtons.forEach(btn => btn.addEventListener('click', manageMazeInOwnTime));
showAnswer.addEventListener('mousedown', manageShowAnswerButton);
showAnswer.addEventListener('mouseup', manageShowAnswerButton);


// ! Function which creates the maze
function createGameBoard() {
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
      item.style.border = 'black 1px solid'
      fakePathArray = [];
    }
  })

  // 5 - Creates a fake path in all squares not taken up with a successful-path class
  // Check for first grid cell without a class of succesful-path or fake-path
  currentIndex = gridArray.findIndex((item) => checkIfSuccessfulPathClass(item.id) === false && checkIfFakePathClass(item.id) === false);
  while (currentIndex != -1) {
    // Creates a fake path in next block of cells
    createFakePath();
    // Updates currentIndex to next empty cell
    currentIndex = gridArray.findIndex((item) => checkIfSuccessfulPathClass(item.id) === false && checkIfFakePathClass(item.id) === false);
  }

  if (gameStyle === 'gamePlay') {
    addGoldCoins();
  }

}

// ! A function that resets everything to its initial value
function reset() {
  levelTime = 20;
  level = 1;
  score = 1000;
  gameStyle = 'gamePlay';
  width = 5;
  gridSize = width * width;
  gridArray = [];
  successfulPathArray = [0];
  fakePathArray = [];
  currentIndex = 0;
  newIndex = null;
  randomNumber = null;
  moveDirection = null;
  fakePathBuilder = [];
  currentPlayerIndex = 0;
  newPlayerIndex = null;
  playerMoves = 0;
  timer = undefined;

  gridWrapper.innerHTML = "";
  showAnswerButton.style.visibility = 'hidden';
}



createGameBoard();

hideMaze();








// ! Adding golden nuggets

function addGoldCoins() {
  const numberOfGoldCoins = width / 4;

  for (let i = 0; i < Math.floor(numberOfGoldCoins); i++) {
    let indexOfGoldCoin = (Math.floor(Math.random() * gridSize));
    while (indexOfGoldCoin === 0 || indexOfGoldCoin === gridSize - 1) {
      indexOfGoldCoin = (Math.floor(Math.random() * gridSize))
    }
    gridArray[indexOfGoldCoin].classList.add('gold-coin');
  }
}

function collectGoldCoins(currentPlayerIndex) {
  startingSeconds = startingSeconds + 10;
  gridArray[currentPlayerIndex].classList.remove('gold-coin');
}



// class Level {
//   constructor(width, time) {
//     this.width = width;
//     this.time = time;
//   }
// }


// const levelOne = new Level(5, 20);
