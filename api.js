import { getCharacter } from 'rickmortyapi' 

$(() => {
    
    $('.easy-btn').on('click', (event) => {
        event.preventDefault();

        let easyModeCards = 6;

        $.ajax({
            url: 'https://rickandmortyapi.com/api/character',
            data: {
                $limit: easyModeCards,

            },
        }).then(
            (data) => {
                $('.game-area').html(data.Title);
            },
            () => {
                console.log('bad');
            },
        );
    });
});
