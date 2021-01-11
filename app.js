/////// DECLARE VARIABLES ///////
// store images for playing cards/tiles
let imagesArr = [];

// store pair images for playing cards/tiles
let pairImagesArr = [];

// array to store opened cards
let handOfCards = [];

// default image for closed card
let defaultImage = 'img/default img.jpeg';

// declare score and match combos
let currentScore = 0;
let defaultMatchPoint = 10;

// declare default combo count
let comboCount = 0;

// declare score multipliers
let matchComboTwo = 2;
let matchComboThree = 3;
let matchComboMoreThanThree = 4;

// cards setup based on levels
let numOfCards = [6, 12, 20];
let numOfImages = [3, 6, 10];

// game mode number of cards setup - need to link this to button & function
let easyModeCards = 6;
let mediumModeCards = 12;
let hardModeCards = 20;

// game mode number of images setup (to limit images from API - need to figure how to duplicate a set e.g. 3 images x 2) - for API
let easyModeNumOfImages = 3;
let mediumModeNumOfImages = 6;
let hardModeNumOfImages = 10;

// initialize timer
const startTime = () => {
    let countTime = 180;
    const currentTime = setInterval(() => {
        console.log(countTime);
        $('#timer').html('Time: ' + countTime);
        countTime--;

        if (countTime === 0) {
            clearInterval(currentTime);
            timesUp();
        }
    }, 1000);
};

// initialize time's up
const timesUp = () => {
    alert(`Time's up, you lose!`);
};

// initialize scoring & combos
// Increase combo counter
const increaseCombo = () => {
    comboCount = comboCount++;
    $('#combo').html('Match Combo: ' + comboCount);
};

// Combo counter and reflect in html
const restartCombo = () => {
    comboCount = 0;
    $('#combo').html('Match Combo: ' + comboCount);
};

// Score counter and reflect in html
const scoreCounter = () => {
    if (comboCount < 2) {
        currentScore += defaultMatchPoint;
    } else if (comboCount === 2) {
        currentScore += defaultMatchPoint * matchComboTwo;
    } else if (comboCount === 3) {
        currentScore += defaultMatchPoint * matchComboThree;
    } else if (comboCount > 3) {
        currentScore += defaultMatchPoint * matchComboMoreThanThree;
    }
    $('#score').html('Score: ' + currentScore);
};

$(() => {
    // Grabbing Elements
    const $openBtn = $('#openModal');
    const $modal = $('#modal');
    const $closeBtn = $('#close');

    // Event Handlers
    const openModal = () => {
        $modal.css('display', 'block');
    };

    const closeModal = () => {
        $modal.css('display', 'none');
    };

    // Event Listeners
    $openBtn.on('click', openModal);
    $closeBtn.on('click', closeModal);

    setTimeout(openModal, 10);

    // function to select card and push to handOfCards array
    const clickCard = (card) => {
        console.log('card clicked');
        // push clicked card to handOfCards so can check later
        handOfCards.push(card);
        console.log('pushed selected card to', handOfCards);
        console.log($(handOfCards[0]).children().eq(1).text());

        ///// NEED TO CHANGE THIS TO CHECK CARDS FUNCTION ///////

        const checkCards = () => {
            if (handOfCards.length === 2) {
                console.log('checking', handOfCards);
                console.log($(handOfCards[0]));
                if ($(handOfCards[0]) === $(handOfCards[1])) {
                    console.log('we have matching cards');
                    $(handOfCards[0]).hide('slow');
                    $(handOfCards[1]).hide('slow');
                    handOfCards = [];
                } else {
                    console.log('we dont have matching cards');
                    $(handOfCards[0]).toggleClass('card-back');
                    $(handOfCards[1]).toggleClass('card-back');
                    handOfCards = [];
                }
            }
        };
        // if (handOfCards.length === 2) {
        //     console.log('checking', handOfCards);
        //     console.log($(handOfCards[0]).children().eq(1).text());
        //     if (
        //         $(handOfCards[0]).children().eq(1).text() ===
        //         $(handOfCards[1]).children().eq(1).text()
        //     ) {
        //         console.log('we have matching cards');
        //         $(handOfCards[0]).hide('slow');
        //         $(handOfCards[1]).hide('slow');
        //         handOfCards = [];
        //     } else {
        //         console.log('we dont have matching cards');
        //         $(handOfCards[0]).toggleClass('card-back');
        //         $(handOfCards[1]).toggleClass('card-back');
        //         handOfCards = [];
        //     }
        // }
        // code runs when document is ready or dom is loaded - put in jQuery, remove the above
        $('.card').on('click', (event) => {
            console.log(event);
            // console.log(event.currentTarget);
            // console.log($(event.currentTarget));
            if ($(event.currentTarget).hasClass('card-back')) {
                $(event.currentTarget).toggleClass('card-back');
                clickCard(event.currentTarget);
            }
        });
    };
});

// create check cards function
// create matched cards function
// create unmatched cards function
// create win function
// create lose function
