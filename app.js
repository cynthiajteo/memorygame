/////// DECLARE VARIABLES ///////
// store images for playing cards/tiles
let imagesArr = [];

// store pair images url for playing cards/tiles
// let pairImagesArr = [];

// array to store opened cards
let handOfCards = [];

// default image for closed card
let defaultImage =
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/fe64ac74016525.5c1d539a92f45.jpg';

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
// let numOfCards = [6, 12, 20];
// let numOfImages = [3, 6, 10];

// game mode number of cards setup - need to link this to button & function
let easyModeCards = 6;
let mediumModeCards = 12;
let hardModeCards = 20;

// game mode number of images setup
let easyModeNumOfImages = 3;
let mediumModeNumOfImages = 6;
let hardModeNumOfImages = 10;

// player name
let playerName;

// get player's name
const getPlayerName = () => {
    player = prompt('Please type your name', 'Player');
    if (player === null) player = 'Player';
    $('#player-name').html('Player : ' + player);
};

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

// shuffle cards function
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// click card
const clickCard = (card) => {
    handOfCards.push(card);
    console.log('adding to', handOfCards);
    console.log($(handOfCards[0]).children().eq(1).text());

    if (handOfCards.length === 2) {
        // console.log('checking', handOfCards);
        // console.log($(handOfCards[0]).children().eq(1).text());
        if ($(handOfCards[0]).attr('id') === $(handOfCards[1]).attr('id')) {
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

$(() => {
    $.ajax({
        url: 'https://rickandmortyapi.com/api/character/?page=2',
        type: 'GET',
        data: {
            status: 'Alive',
        },
    }).then(
        (data) => {
            const dataArr = [];
            let pairImagesArrUrls = [];
            // let singleImagesArr = [];
            let id = 0;
            for (let i = 0; i < 10; i++) {
                dataArr.push(data.results[i]);
                dataArr.push(data.results[i]);
                // to get image url
                pairImagesArrUrls.push(data.results[i].image);
                pairImagesArrUrls.push(data.results[i].image);

                let singleImagesArr = [
                    $('<img />', {
                        class: 'open-card',
                        id: id++,
                        src: data.results[i].image,
                    }),
                ];

                $('.game-area').append(singleImagesArr);
                console.log(singleImagesArr);

                // let pairImagesArr = [];
                // for (let i = 0; i < 2; i++) {
                //     pairImagesArrUrls.push(singleImagesArr);
                //     console.log(pairImagesArr);
                // }
            }
            // has duplicate data
            // console.log(dataArr);
            // console.log(pairImagesArrUrls);

            // shuffle(pairImagesArr);
        },
        () => {
            console.log('bad');
        },
    );

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

    setTimeout(openModal, 0);
    getPlayerName();

    // generate playing divs for cards to be inside
    // how to customize inputs for diff levels?
    const generateDivsForEasy = () => {
        let id = 0;
        $('.game-area').empty();
        for (let k = 0; k < 6; k++) {
            const $divCards = $('<img />')
                .addClass('default-card')
                .attr('id', id++)
                .attr('src', defaultImage);
            $('.game-area').append($divCards);
        }
    };

    const generateDivsForMed = () => {
        let id = 0;
        $('.game-area').empty();
        for (let k = 0; k < 12; k++) {
            const $divCards = $('<img />')
                .addClass('default-card')
                .attr('id', id++)
                .attr('src', defaultImage);
            $('.game-area').append($divCards);
        }
    };

    const generateDivsForHard = () => {
        let id = 0;
        $('.game-area').empty();
        for (let k = 0; k < 20; k++) {
            const $divCards = $('<img />')
                .addClass('default-card')
                .attr('id', id++)
                .attr('src', defaultImage);
            $('.game-area').append($divCards);
        }
    };
    // linked level buttons to number of cards - will need to change, should start game instead
    $easyBtn = $('#easy-btn');
    $easyBtn.on('click', generateDivsForEasy);
    $medBtn = $('#medium-btn');
    $medBtn.on('click', generateDivsForMed);
    $hardBtn = $('#hard-btn');
    $hardBtn.on('click', generateDivsForHard);

    $('.default-card').on('click', (clickCard) => {
        //console.log(event);
        console.log(event.currentTarget.id);
        console.log(handOfCards);

        // use currentTarger.id ===  to match
        // console.log($(event.currentTarget));
        if ($(event.currentTarget.id).hasClass('card-back')) {
            $(event.currentTarget).toggleClass('card-back');
            clickCard(event.currentTarget);
        }
    });
});

// create check cards function
// create matched cards function
// create unmatched cards function
// create win function
// create lose function
