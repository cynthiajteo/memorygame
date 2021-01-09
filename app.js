// store images for playing cards/tiles
let imageArr = [];

// store opened cards
let handOfCards = [];

// // default image for closed card
// let defaultImage

// declare score and match combos
let currentScore = 0;
let defaultMatchPoint = 10;
let matchComboOne = 1;
let matchComboTwo = 2;
let matchComboThree = 3;
let matchComboMoreThanThree = 4;

// cards setup
let cards = [6, 12, 20];
let images = [3, 6, 10];

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
});

const clickCard = (card) => {
    console.log('card is', card);
    // need to push something to handOfCards
    handOfCards.push(card);
    console.log('adding to', handOfCards);
    console.log($(handOfCards[0]).children().eq(1).text());

    if (handOfCards.length === 2) {
        console.log('checking', handOfCards);
        console.log($(handOfCards[0]).children().eq(1).text());
        if (
            $(handOfCards[0]).children().eq(1).text() ===
            $(handOfCards[1]).children().eq(1).text()
        ) {
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
    // code runs when document is ready or dom is loaded
    $('.card').on('click', (event) => {
        console.log(event);
        // console.log(event.currentTarget);
        // console.log($(event.currentTarget));
        if ($(event.currentTarget).hasClass('card-back')) {
            $(event.currentTarget).toggleClass('card-back');
            clickCard(event.currentTarget);
        }
    });

    // $('.card').on('click', () => {
    //     $('.card').toggleClass('card-back');
    // });

    // $('#card-2').on('click', () => {
    //     $('.card').toggleClass('card-back');
    // });

    // $('#card-3').on('click', () => {
    //     $('.card').toggleClass('card-back');
    // });

    // $('#card-4').on('click', () => {
    //     $('.card').toggleClass('card-back');
    // });
});
