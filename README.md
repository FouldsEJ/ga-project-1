# Maze Madness - SEI Project 1

## Project Overview

Maze Madness is a random, self-generating maze game, requiring a player to guide an object through the maze from start to finish. The grid-based game was a solo project and my first project on the General Assembly Software Engineering Immersive course. It was built using JavaScript and some CSS and HTML over a 6 day period.

**TECHNOLOGIES USED:** HTML, CSS, JavaScript

**LINK:** https://fouldsej.github.io/ga-project-1/

# The Brief

- **Render a working grid based game in the browser**
- **Design logic for winning with visual representation of completion**
- **Include separate HTML / CSS / JavaScript files**
- **Use DRY JavaScript for DOM manipulation**
- **Deploy your game online and make it publicly accessible**
- **Use semantic markup for HTML and CSS**

## Approach

### **1) Planning**

The first step of the project was planning how I wanted the game work and how it was to be played. The course of the first day was entirely spent developing a mind-map and pseudocode for the game. I initially listed out the steps required for the game to be played at a very high level and then broke these down into separate sections and pseudocoded them in far more detail (particularly the generation of the maze).

![High level game logic image](images/readme-image/high-level-game-play.png)

### **2) Functionality**

### Creating a playing grid

A simple for loop initialised the playing grid, looping from 0 through to the specified size of the grid. Each grid square was created as a div and assigned an id number relating to its position in the grid.

![Grid creation](images/readme-image/grid-creation.png)

### Initialise the start and finish of the maze

The top left and bottom right hand grid squares were given a class of starting-square and finishing-square respectively.

### Generating the Maze:

Creation of the maze was by far the hardest section of the project! This was broken down into two sections; the generation of a 'successful' path, i.e. one from start to finish, and the generation of 'fake' paths around this.

A number of initial functions were constructed:

- A random number generator between 1 - 4, to specify the direction of the next gridSquare e.g. 1 being up, 2 being right, 3 being down and 4 being left.
- A set of functions to moveLeft, moveRight etc which take the current index and update it to the new gridSquare index.
- A set of functions to check that the next gridSquare was empty e.g. check to see it is not already part of the successful path or fake path classes, check to see if it is the wall of the grid.
- A function to check if the current grid square has a possible exit i.e. it is not surrounded by squares which are not possible to move into because they already have a class of 'successful-path', 'fake-path' or are the wall of the grid.

Once these functions were in place the successful path was constructed by starting at the top-left of the grid and randomly generating a number to choose the next grid square. The current index was updated to the new index and assigned a class of successful-path. This continued until the current index was the bottom right hand corner of the grid (i.e. had a class of finishing-square).

On the occasion where the next grid square was already part of the successful path, fake path, or was the wall of the grid, the random number would be generated again until a direction was chosen which was available to move into.

On the occasion where the current grid square had no possible exit (i.e. all four adjoining squares were not possible to move into), the current grid square would revert to the previous square, removing the class of 'successful-path' and adding the class of 'fake-path' and the code would be run again.

On the completion of the successful path, the same logic was used to create the fake paths. However, the difference this time was that the starting position for the first fake path was the first grid-square without a class of 'successful-path' or 'fake-path'. The code was then run, until all the grid squares in that section of the maze had no possible exits. The next empty grid square was then found and the same code ran until no further possible exits and then the next empty grid square was found and so on. (The image below helps to describe this. The red line being the successful path and the orange lines being the generated fake paths). These code runs were implemented with while loops.

![Fake Path Generation image](images/readme-image/fake-path-generation.png)
![First basic maze grid](images/readme-image/initial-maze-logic.png)

### Border Generation

To generate the borders of the successful and fake paths a function was created consisting of a switch case. Depending on the move direction from the currentIndex to the newIndex, the border was removed from the current grid square and the new grid square.
![Add image here of switch case used in borderRemovalDecision function]

### Creating a ball

The ball was given a class of ball and assigned to the top-left hand grid square at index 0. An initial variable of currentPlayerIndex was assigned to 0.

### Handling the User Inputs to move the ball

Event listeners were added to handle the user's arrow key presses. When each arrow key was pressed a switch statement was run to assess which function should be called to update the currentPlayerIndex (i.e. move Right, moveLeft etc). In the same way the maze was generated, when the currentPlayerIndex was updated, an assessment was made to ensure that the next grid square was not the wall of the grid and likewise to ensure that the player wasn't moving through a border using the function checkIfBordersPresent.

### Finish result

The player finishes the game either when they reach the 'finishing-square' or the timer runs out (which was introduced as additional functionality).

### Additional features

Some additional features were added to the MVP including:

- Welcome screen
- Game timer
- Game score
- In game gold collection
- Game play side menu
- Instruction tab

These were all introduced in the HTML, while event listeners and functions were added in the JavaScript to handle user interactions such as button clicks. A setInterval was used for the timer.

## Wins & Blockers

### **Wins:**

- Developing code which could be used to randomly generate a maze of any grid size required
- Creating a dynamic sidebar and menu, which looked good as well as functioned well.
- Designing an easily navigable and user friendly interface
- Implementation of a counter, timer and gold collection

### **Blockers:**

- Initially, developing the "fake-path" was a challenge and figuring out how to do this on paper was difficult, before even putting it into code. However, after sketching out a few different solutions, the logic made sense and putting this into pseudocode then made the actual coding process relatively straight forward.

## Bugs

- There is an occasional issue where a small gap appears on some of the mazes between the edge of the maze and its right hand and bottom border. It does not affect game play, but is an unfortunate styling issue. (Believed to potentially be down to dynamically creating the width of the grid.)
- The side-bar menu doesn't close when a player clicks off it.

## Future Improvements

- To implement a two player style game, where competitors can compete against one another to see who can complete the maze fastest.
- Animate the appearance of the maze when "Play game" is clicked.

## Key Takeaways

I was delighted with the way the project went. It was a great opportunity to put my skills to the test and implement the knowledge I have to produce a real end product. A key takeaway was seeing how beneficial pseudocoding and planning was before starting to code; particularly when developing the logic to create the self-generating maze. Pseudocoding beforehand made the coding process far more efficient and also produced code which was very adaptable for late additions to the product.

## Contact:

- Github: github.com/FouldsEJ
- Linkedin: linkedin.com/in/edwardfoulds
- Portfolio: edwardfoulds.co.uk
