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
            }
            // has duplicate data
            // console.log(dataArr);
            console.log(pairImagesArrUrls);

            // shuffle(pairImagesArr);
        },
        () => {
            console.log('bad');
        },
    );

    var easyGame = {
        cards: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],

        init() {
            easyGame.shuffle();
        },

        shuffle() {
            let random = 0;
            let temp = 0;
            for (let i = 0; i < easyGame.cards.length; i++) {
                random = Math.round(Math.random() * i);

                temp = easyGame.cards[i];
                easyGame.cards[i] = easyGame.cards[random];
                easyGame.cards[random] = temp;
            }
            console.log('shuffled card array ' + easyGame.cards);
            easyGame.assignCards();
        },

        assignCards() {
            $('.card').each(function (index) {
                $(this).attr('data-card-value', easyGame.cards[index]);
            });
            easyGame.clickHandler();
        },

        clickHandler() {
            $('.card').on('click', function () {
                $(this)
                    .html('<p>' + $(this).data('cardValue') + '</p>')
                    .addClass('selected');
                easyGame.checkMatch();
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
                    easyGame.checkWin();
                } else {
                    //flip card back over
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

    easyGame.init();
});
