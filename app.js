let imageUrlArr = [];

$(() => {
    // modals
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

    const app = {
        player: this.playerName,
        cards: [1, 1, 2, 2, 3, 3],
        startScore: 0,
        addScore: 10,
        startCombo: 0,
        startHP: 100,

        startEasyGame() {
            app.playerName();
            app.generateDivs(6);
        },

        startMediumGame() {
            app.playerName();
            app.generateDivs(12);
        },

        startHardGame() {
            app.playerName();
            app.generateDivs(20);
        },

        // get player's name
        playerName() {
            player = prompt('Please type your name', 'Player');
            if (player === null) player = 'Player';
            $('#player-name').html('Player : ' + player);
        },

        generateDivs(numOfCards) {
            for (let i = 0; i < numOfCards; i++) {
                let $cardUnmatched = $('<div>').addClass('card unmatched');
                $('.container').append($cardUnmatched);
            }
            app.shuffle();
        },

        // shuffles cards
        shuffle() {
            let random = 0;
            let temp = 0;
            for (let i = 1; i < app.cards.length; i++) {
                random = Math.floor(Math.random() * i);
                console.log(random);
                temp = app.cards[i];
                app.cards[i] = app.cards[random];
                app.cards[random] = temp;
            }
            app.assignCards();
            // app.startTime();
            console.log('shuffled cards: ' + app.cards);
        },

        // score multiplier based on combo
        increaseScore() {
            if (this.startCombo < 2) {
                this.startScore = this.startScore + this.addScore;
                $('#score').html('Score: ' + this.startScore);
                // console.log(this.startScore);
            } else if (this.startCombo === 2) {
                this.startScore += this.addScore * 2;
                this.startHP += 5;
                $('#score').html('Score: ' + this.startScore);
                $('#hp').html('HP: ' + this.startHP);
                // console.log(this.startScore);
            } else if (this.startCombo > 2) {
                this.startScore += this.addScore * 3;
                this.startHP += 5;
                $('#score').html('Score: ' + this.startScore);
                $('#hp').html('HP: ' + this.startHP);
                // console.log(this.startScore);
            }
        },

        // reset combo if no match
        resetCombo() {
            this.startCombo = 0;
        },

        minusHP() {
            if (this.startHP > 0) {
                this.startHP -= 10;
            } else if (this.startHP === 0) {
                alert('You lose!');
            }
        },

        // assign cards to divs
        assignCards() {
            $('.card').each(function (index) {
                // assign value to card
                $(this).attr('data-card-value', app.cards[index]);
                //$(this).attr('src', imageArr[index]);
            });
            app.clickHandlers();
        },

        clickHandlers() {
            $('.card').on('click', function () {
                $(this)
                    .html('<p>' + $(this).data('cardValue') + '</p>')
                    .addClass('selected');
                app.checkMatch();
            });
        },

        checkMatch() {
            if ($('.selected').length === 2) {
                if (
                    $('.selected').first().data('cardValue') ==
                    $('.selected').last().data('cardValue')
                ) {
                    // make the cards invisible
                    $('.selected').each(function () {
                        $(this)
                            .animate({ opacity: 0 })
                            .removeClass('unmatched');
                    });

                    this.startCombo++;
                    this.increaseScore();
                    $('#score').html('Score: ' + this.startScore);
                    $('#combo').html('Match Combo: ' + this.startCombo);

                    // removes selected class
                    $('.selected').each(function () {
                        $(this).removeClass('selected');
                    });
                    // check for win after every match
                    this.checkWin();
                } else {
                    // flip cards over
                    setTimeout(function () {
                        $('.selected').each(function () {
                            $(this).html('').removeClass('selected');
                        });
                    }, 800);
                    this.resetCombo();
                    $('#combo').html('Match Combo: ' + this.startCombo);
                    this.minusHP();
                    $('#hp').html('HP: ' + this.startHP);
                }
            }
        },

        checkWin() {
            if ($('.unmatched').length === 0) {
                // apend you won text
                $('.container').html(`<h1>${player}, You Won!<h1>`);
            }
        },
    };

    // start easy game
    $easyBtn = $('#easy-btn');
    $easyBtn.on('click', app.startEasyGame);
    // start medium game
    $mediumBtn = $('#medium-btn');
    $mediumBtn.on('click', app.startMediumGame);
    // start hard game
    $hardBtn = $('#hard-btn');
    $hardBtn.on('click', app.startHardGame);

    const id = '1,2,3,4,5,6,7,8,9,10';
    const promiseData = $.ajax({
        url: 'https://rickandmortyapi.com/api/character/' + id,
        type: 'GET',
        data: {
            //   $limit: 10,
        },
    });

    promiseData.then((data) => {
        // const urls = [];
        for (let i = 0; i < 10; i++) {
            imageUrlArr.push(data[i].image);
            // pushed all the image urls into array
            // console.log(imageUrlArr);
        }

        // to append images - need to figure how to use this for assignCards()
        for (let i = 0; i < imageUrlArr.length; i++) {
            const myImg = $('<img />', {
                id: `image-${i + 1}`,
                src: data[i].image,
                alt: data.name,
            });
            $('.test').append(myImg);
            // console.log(myImg);
        }
    });
});
