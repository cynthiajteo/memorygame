// player name
let playerName;

// declare score and match combos
let currentScore = 0;
let defaultMatchPoint = 10;

// declare default combo count
let comboCount = 0;

// declare score multipliers
let matchComboTwo = 2;
let matchComboThree = 3;
let matchComboMoreThanThree = 4;

// get player's name
const getPlayerName = () => {
    player = prompt('Please type your name', 'Player');
    if (player === null) player = 'Player';
    $('#player-name').html('Player : ' + player);
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

    setTimeout(openModal, 0);
    getPlayerName();

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
            }
            // has duplicate data
            // console.log(dataArr);
            console.log(pairImagesArrUrls);
        },
        () => {
            console.log('bad');
        },
    );

    const game = {
        cards: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
        init() {
            game.shuffle();
        },

        shuffle() {
            let random = 0;
            let temp = 0;
            for (let i = 0; i < game.cards.length; i++) {
                random = Math.round(Math.random() * i);

                temp = game.cards[i];
                game.cards[i] = game.cards[random];
                game.cards[random] = temp;
            }
            console.log('shuffled card array ' + game.cards);
            game.assignCards();
        },

        assignCards() {
            $('.card').each(function (index) {
                $(this).attr('data-card-value', game.cards[index]);
            });
            game.clickHandler();
        },

        clickHandler() {
            $('.card').on('click', function () {
                $(this)
                    .html('<p>' + $(this).data('cardValue') + '</p>')
                    .addClass('selected');
                game.checkMatch();
            });
        },

        checkMatch() {
            if ($('.selected').length === 2) {
                if (
                    $('.selected').first().data('cardValue') ==
                    $('.selected').last().data('cardValue')
                ) {
                    //remove card
                    $('.selected').each(function () {
                        $(this)
                            .animate({ opacity: 0 })
                            .removeClass('unmatched')
                            .removeClass('selected');
                    });
                    increaseCombo();
                    scoreCounter();
                    game.checkWin();
                } else {
                    restartCombo();
                    // flip card back over
                    setTimeout(function () {
                        $('.selected').each(function () {
                            $(this).html('').removeClass('selected');
                        });
                    }, 800);
                }
            }
        },

        checkWin() {
            if ($('.unmatched').length === 0) {
                $('.container').html(
                    '<div class="result"> <h1>GAME OVER </h1>' +
                        '<h1>YOU WON </h1>' +
                        ' <button class="playAgain">Play Again</button> </div>',
                );
            }
            $('.playAgain').click(function () {
                location.reload();
            });
        },
    };
    $easyBtn = $('#easy-btn');
    $easyBtn.on('click', game.init);
});
