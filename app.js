$(() => {
    const themeSong = () => {
        $('#theme-song').prop('volume', '0.3');
        $('#theme-song').trigger('play');
    };

    // modals
    const $openBtn = $('#openModal');
    const $modal = $('#modal');
    const $closeBtn = $('#close');
    const $hintBtn = $('#hint');

    const openModal = () => {
        $modal.css('display', 'block');
    };

    const closeModal = () => {
        $modal.css('display', 'none');
    };

    $openBtn.on('click', openModal);
    $closeBtn.on('click', closeModal);

    setTimeout(openModal, 0);

    const app = {
        player: this.playerName,
        startScore: 0,
        addScore: 10,
        startCombo: 0,
        startHP: 100,

        startEasyGame() {
            $('.container').empty();
            themeSong();
            app.playerName();
            app.displayStats();
            app.assignImgs();
            $hintBtn.on('click', app.showAll);
        },

        startMediumGame() {
            $('.container').empty();
            themeSong();
            app.playerName();
            app.displayStats();
            app.assignImgs();
            $hintBtn.on('click', app.showAll);
        },

        startHardGame() {
            $('.container').empty();
            themeSong();
            app.playerName();
            app.displayStats();
            app.assignImgs();
            $hintBtn.on('click', app.showAll);
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
                this.startHP += 10;
                $('#score').html('Score: ' + this.startScore);
                $('#hp').html('HP: ' + this.startHP);
                // console.log(this.startScore);
            } else if (this.startCombo > 2) {
                this.startScore += this.addScore * 3;
                this.startHP += 10;
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
                this.startHP -= 5;
            }
        },

        // display all images for 2 seconds - for hint
        showAll() {
            $('.card-unmatched').css('opacity', 1);
            setTimeout(function () {
                $('.card-unmatched').css('opacity', 0);
            }, 2000);
            app.startHP -= 5;
            $('#hp').html('HP: ' + app.startHP);
            // console.log(app.startHP);
        },

        // display all images at the start of game
        firstShow() {
            $('.card-unmatched').css('opacity', 1);
            setTimeout(function () {
                $('.card-unmatched').css('opacity', 0);
            }, 1000);
        },

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
                let imageUrlArr = [];
                for (let j = 0; j < 10; j++) {
                    imageUrlArr.push(data[j].image);
                    imageUrlArr.push(data[j].image);
                }
                let shuffledArray = this.shuffle(imageUrlArr);
                // console.log(shuffledArray);
                for (let k = 0; k < shuffledArray.length; k++) {
                    let $div = $('<div>').addClass('card-back');
                    $('.container').append($div);
                    $div.append(
                        $('<img>', {
                            id: `image-${k + 1}`,
                            src: shuffledArray[k],
                        }).addClass('card-unmatched'),
                    );
                }
                this.firstShow();
                this.checkMatch();
            });
        },

        // check match - need to test after appending image to divs
        checkMatch() {
            let firstUrl;
            // let clickCount = 0;
            $('.card-unmatched').on('click', (e) => {
                // clickCount++;
                // console.log(clickCount);
                $(e.target).css('opacity', 1);
                $(e.target).removeClass('card-unmatched');
                $(e.target).addClass('selected');
                console.log(e.target.src);
                if ($('.selected').length === 1) {
                    firstUrl = e.target.src;
                    // console.log('first url is: ', firstUrl);
                }
                if ($('.selected').length === 2) {
                    // clickCount = 0;
                    // console.log('second url is: ', e.target.src);
                    // $('.card-unmatched').unbind('click');
                    // $('.selected').unbind('click');
                    if (e.target.src === firstUrl) {
                        // console.log(`it's a match`);
                        firstUrl = '';

                        setTimeout(function () {
                            $(e.target).css('opacity', 0);
                            $(e.target).parent().css('opacity', 0);
                            $('.selected')
                                .css('display', 'none')
                                .removeClass('selected')
                                .toggleClass('card-back')
                                .parent()
                                .css('opacity', 0);
                        }, 400);

                        this.startCombo++;
                        this.increaseScore();
                        this.displayStats();
                        this.checkWin();
                    } else {
                        setTimeout(function () {
                            $(e.target).addClass('card-unmatched');
                            $('.selected')
                                .addClass('card-unmatched')
                                .removeClass('selected')
                                .css('opacity', 0);
                        }, 1000);
                        // clickCount = 0;

                        this.checkLose();
                        this.resetCombo();
                        this.minusHP();
                        this.displayStats();
                    }
                }
            });
        },

        checkWin() {
            if ($('.card-unmatched').length === 0) {
                // apend you won text
                $('.container').html(`<h1>${player}, You Won!<h1>`);
            }
        },

        checkLose() {
            if (this.startHP === 0) {
                alert('You lose!');
                $('.container').empty();
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
