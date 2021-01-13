$(() => {
    let imageUrlArr = [];

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
        //cards: [1, 1, 2, 2, 3, 3],
        startScore: 0,
        addScore: 10,
        startCombo: 0,
        startHP: 100,

        startEasyGame() {
            app.playerName();
            app.generateDivs(6);
            app.displayStats();
        },

        startMediumGame() {
            app.playerName();
            app.generateDivs(12);
            app.displayStats();
        },

        startHardGame() {
            app.playerName();
            app.generateDivs(20);
            app.displayStats();
        },

        displayStats() {
            $('#hp').html('HP: ' + app.startHP);
            $('#score').html('Score: ' + app.startScore);
            $('#combo').html('Match Combo: ' + app.startCombo);
        },

        // get player's name
        playerName() {
            player = prompt('Please type your name', 'Player');
            if (player === null) player = 'Player';
            $('#player-name').html('Player: ' + player);
        },

        generateDivs(numOfCards) {
            for (let i = 0; i < numOfCards; i++) {
                let $cardUnmatched = $('<div>').addClass('card unmatched');
                $('.container').append($cardUnmatched);
            }
            this.assignImgs();
        },

        // shuffles cards
        shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }

            return array;
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
        // minus HP when don't match
        minusHP() {
            if (this.startHP > 0) {
                this.startHP -= 10;
            } else if (this.startHP === 0) {
                alert('You lose!');
            }
        },

        // assign values to cards
        // assignCards() {
        //     $('.card').each(function (index) {
        //         // assign value to card
        //         $(this).attr('data-card-value', app.cards[index]);
        //     });
        //     app.clickHandlers();
        // },

        // shuffle and assign images
        assignImgs() {
            let id = '1,2,3,4,5,6,7,8,9,10';
            let promiseData = $.ajax({
                url: 'https://rickandmortyapi.com/api/character/' + id,
                type: 'GET',
                data: {
                    //   $limit: 10,
                },
            });
            promiseData.then((data) => {
                for (let j = 0; j < 10; j++) {
                    imageUrlArr.push(data[j].image);
                    imageUrlArr.push(data[j].image);
                }
                let shuffledArray = this.shuffle(imageUrlArr);
                console.log(shuffledArray);

                for (let k = 0; k < shuffledArray.length; k++) {
                    const myImg = $('<img />', {
                        id: `image-${k + 1}`,
                        src: shuffledArray[k],
                    });

                    // append images to div using .each (NEED HELP)
                    // $('.card unmatched').each(function () {
                    //     $(this).append(myImg);
                    // });

                    //myImg.addClass('unmatched img');
                    $('.container').append(myImg);
                    this.match();
                }
            });
        },

        // clickHandlers() {
        //     $('.card').on('click', function () {
        //         $(this)
        //             // .html('<p>' + $(this).data('cardValue') + '</p>')
        //             .addClass('selected')
        //             .css('display', 'block');

        //         app.checkMatch();
        //     });
        // },

        // check match - need to test after appending image to divs
        match() {
            let firstUrl;
            let clickCount = 0;

            $('.card').on('click', (e) => {
                clickCount++;
                $(e.target).removeClass('card-unmatched');
                $(e.target).addClass('first');
                if (clickCount === 1) {
                    firstUrl = e.target.src;
                    console.log('first url is: ', firstUrl);
                }
                if (clickCount === 2) {
                    console.log('second url is: ', e.target.src);
                    if (e.target.src === firstUrl) {
                        console.log(`it's a match`);
                        $('.first').removeClass('.first');
                        firstUrl = '';
                        $(e.target).css('opacity', 0);
                        $('.first').css('opacity', 0);
                        clickCount = 0;

                        this.startCombo++;
                        this.increaseScore();
                        $('#score').html('Score: ' + this.startScore);
                        $('#combo').html('Match Combo: ' + this.startCombo);
                        this.checkWin();
                    } else {
                        $(e.target).addClass('card-unmatched');
                        $('.first')
                            .addClass('card-unmatched')
                            .removeClass('.first');
                        clickCount = 0;
                        this.resetCombo();
                        $('#combo').html('Match Combo: ' + this.startCombo);
                        this.minusHP();
                        $('#hp').html('HP: ' + this.startHP);
                    }
                }
            });
        },

        // checkMatch() {
        //     if ($('.selected').length === 2) {
        //         if (
        //             $('.selected').first().data('cardValue') ==
        //             $('.selected').last().data('cardValue')
        //         ) {
        //             // make the cards invisible
        //             $('.selected').each(function () {
        //                 $(this)
        //                     .animate({ opacity: 0 })
        //                     .removeClass('unmatched');
        //             });

        //             this.startCombo++;
        //             this.increaseScore();
        //             $('#score').html('Score: ' + this.startScore);
        //             $('#combo').html('Match Combo: ' + this.startCombo);

        //             // removes selected class
        //             $('.selected').each(function () {
        //                 $(this).removeClass('selected');
        //             });
        //             // check for win after every match
        //             this.checkWin();
        //         } else {
        //             // flip cards over
        //             setTimeout(function () {
        //                 $('.selected').each(function () {
        //                     $(this).html('').removeClass('selected');
        //                 });
        //             }, 800);
        //             this.resetCombo();
        //             $('#combo').html('Match Combo: ' + this.startCombo);
        //             this.minusHP();
        //             $('#hp').html('HP: ' + this.startHP);
        //         }
        //     }
        // },

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
});
