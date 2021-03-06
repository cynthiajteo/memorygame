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
    const $scoreBtn = $('#scoreBtn');
    const $scoring = $('#scoring');
    const $closeScoring = $('#closeScore');

    const openModal = () => {
        $modal.css('display', 'block');
    };

    const closeModal = () => {
        $modal.css('display', 'none');
    };

    const openScoreBtn = () => {
        $scoring.css('display', 'block');
    };

    const closeScoreBtn = () => {
        $scoring.css('display', 'none');
    };

    $openBtn.on('click', openModal);
    $closeBtn.on('click', closeModal);
    $scoreBtn.on('click', openScoreBtn);
    $closeScoring.on('click', closeScoreBtn);

    setTimeout(openModal, 0);

    const app = {
        player: this.playerName,
        startScore: 0,
        addScore: 10,
        startCombo: 0,
        startHP: 100,

        startGame() {
            $('.container').empty();
            app.resetGame();
            app.playerName();
            app.displayStats();
            $hintBtn.on('click', app.showAll);
            themeSong();
        },

        easyGame() {
            app.startGame();
            app.assignEasyImgs();
        },

        mediumGame() {
            app.startGame();
            app.assignMedImgs();
        },

        hardGame() {
            app.startGame();
            app.assignHardImgs();
        },

        resetGame() {
            (this.startScore = 0), (this.startCombo = 0), (this.startHP = 100);
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
            } else if (this.startCombo === 2) {
                this.startScore += this.addScore * 2;
                this.startHP += 10;
            } else if (this.startCombo > 2) {
                this.startScore += this.addScore * 3;
                this.startHP += 10;
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
            if (app.startHP > 0) {
                $('.card-unmatched').css('opacity', 1);
                setTimeout(function () {
                    $('.card-unmatched').css('opacity', 0);
                }, 2000);
                app.startHP -= 5;
                $('#hp').html('HP: ' + app.startHP);
            } else app.checkLose();
        },

        // display all images at the start of game
        firstShow() {
            $('.card-unmatched').css('opacity', 1);
            setTimeout(function () {
                $('.card-unmatched').css('opacity', 0);
            }, 1000);
        },

        // shuffle and assign images
        assignHardImgs() {
            let id = '1,2,3,4,5,6,7,8,9,10,22,23';
            let promiseData = $.ajax({
                url: 'https://rickandmortyapi.com/api/character/' + id,
                type: 'GET',
                data: {
                    //   $limit: 10,
                },
            });
            promiseData.then((data) => {
                let imageUrlArr = [];
                for (let j = 0; j < 12; j++) {
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

        assignMedImgs() {
            let id = '15,16,17,18,20,21,24,25';

            let promiseData = $.ajax({
                url: 'https://rickandmortyapi.com/api/character/' + id,
                type: 'GET',
                data: {
                    //   $limit: 10,
                },
            });
            promiseData.then((data) => {
                let imageUrlArr = [];
                for (let j = 0; j < 8; j++) {
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

        assignEasyImgs() {
            let id = '11,12,14,26,27';

            let promiseData = $.ajax({
                url: 'https://rickandmortyapi.com/api/character/' + id,
                type: 'GET',
                data: {
                    //   $limit: 10,
                },
            });
            promiseData.then((data) => {
                let imageUrlArr = [];
                for (let j = 0; j < 5; j++) {
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

            $('.card-unmatched').on('click', (e) => {
                $(e.target).css('opacity', 1);
                $(e.target).removeClass('card-unmatched');
                $(e.target).addClass('selected');
                console.log(e.target.src);
                if ($('.selected').length === 1) {
                    firstUrl = e.target.src;
                    // console.log('first url is: ', firstUrl);
                }
                if ($('.selected').length === 2) {
                    // console.log('second url is: ', e.target.src);
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
                        }, 500);

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
                        }, 400);

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
    $easyBtn.on('click', app.easyGame);

    // start medium game
    $mediumBtn = $('#medium-btn');
    $mediumBtn.on('click', app.mediumGame);

    // start hard game
    $hardBtn = $('#hard-btn');
    $hardBtn.on('click', app.hardGame);
});
