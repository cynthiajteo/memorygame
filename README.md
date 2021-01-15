# Rick and Morty Memory Game

## About the game:
This is a game to test your memory! All you have to do is open one card at a time and remember the image and match it with another card that has the exact image. Watch out for your HP, make sure you don't reach 0.

There are 3 levels:
* Easy: 10 cards with 5 pairs of images
* Medium: 16 cards with 8 pairs of images
* Hard: 24 cards with 12 pairs of images

You will start with:
* HP: 100
* Combo: 0
* Score: 0

Combo System:
* Increases after every consecutive match
* Resets to 0 if miss a match and - 5 HP

 Score System:
 * Combo: 0 - add 10 points
 * Combo: 1 - add 10 points 
 * Combo: 2 - add 20 points + 10 HP
 * Combo: 3 & above - add 30 points + 10 HP


## Game Link:
https://cynthiajteo.github.io/memorygame/index.html

## Game Tutorial:
Use your mouse to click on the images to form a pair. You win by matching all the pairs before your HP runs out.

## API Used:
https://rickandmortyapi.com/
Used to generate images for playing cards

## Technologies Used:
* HTML 5
* CSS
* Javascript
* JQuery
* Ajax

## Approach Taken:
My aim was to create a simple memory game by using Rick and Morty Characters because I used to watch a few episodes a long time back. Looked back at the memory game we did in class and also did some research on how others did their memory game. 

This game was created by using object and built on by adding:
* Score and combo functions
* Using HP for lives

## Difficulties Faced:
* Not doing enough planning before starting the actual code
* Mostly game logic lacked planning
* Getting the images out from API then using for the game

## Known Issues:
* Users are able to open more than 2 images if they click fast enough
* Hint will minus 10 HP if user starts another level and will continue to work after winning the game

## Screenshots:
* Welcome Page
![Welcome Page](/img/Welcome Modal.png)

* Scoring System
![Scoring System](/img/Scoring System Modal.png)

* Main Page with levels to choose
![Main Page](/img/Main Page.png)

* Easy Mode
![Easy Mode](/img/Easy Mode.png)

* Hint - show all images
![Hint](/img/Hint - show all images.png)


## Further Improvements:
* Fix opening more than 2 images
* Fix hint function
* Add animation for flipping cards
* Adding and storing high score board
* Adding timer for users to beat their personal best
