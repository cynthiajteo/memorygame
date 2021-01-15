# Project Post Mortem
## Approach and Process

### What in my process and approach to this project would I do differently next time?
- Start and plan early and properly (pseudocode)
- Start small, make sure game logic work before adding more things

### What in my process and approach to this project went well that I would repeat next time?
- Just. Keep. Trying.
- Google/YouTube things I don't know
- Ask for help

## Code and Code Design
### What in my code and program design in the project would I do differently next time?
- Refactor by using class
- Tidy up my code 
- Do multiple tests to ensure all scenarios are covered

```javascript
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
```

### What in my code and program design in the project went well? Is there anything I would do the same next time?
- Game logic works overall
- Managed to add audio in

```javascript
const themeSong = () => {
        $('#theme-song').prop('volume', '0.3');
        $('#theme-song').trigger('play');
    };
```

## Unit 1 Post Mortem
### What habits did I use during this unit that helped me?
- Google and read documentations, or how other people use certain functions

### What habits did I have during this unit that I can improve on?
- Refactor 
- Be creative in finding solutions
- Commit more often

### How is the overall level of the course during this unit? (instruction, course materials, etc.)
- So far it's ok, but I feel I need to do more reading/testing/learning on my part to understand better
