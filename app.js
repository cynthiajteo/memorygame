console.log($);
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
        cards: [0, 0, 1, 1, 2, 2, 3, 3],
        startScore: 0,
        defaultScore: 10,
        startCombo: 0,
        startHP: 100,
        startGame() {
            app.playerName();
        },

        // get player's name
        playerName() {
            player = prompt('Please type your name', 'Player');
            if (player === null) player = 'Player';
            $('#player-name').html('Player : ' + player);
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
                this.startScore + this.defaultScore;
            } else if (this.startCombo === 2) {
                this.startScore += this.defaultScore * 2;
            } else if (this.startCombo > 2) {
                this.startScore += this.defaultScore * 3;
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

        // startTime() {
        //     let timer = 0;
        //     const currentTime = setInterval(() => {
        //         //console.log(timer);
        //         $('#timer').html('Time: ' + timer);
        //         timer++;
        //     }, 1000);
        // },

        // assign cards to divs
        assignCards() {
            $('.card').each(function (index) {
                // assign value to card
                $(this).attr('data-card-value', app.cards[index]);
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
    $easyBtn = $('#easy-btn');
    $easyBtn.on('click', app.startGame);
});
