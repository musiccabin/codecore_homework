$(document).ready(() => {

    // $('a').attr('class', 'highlight');
    // $('#purple-container, #green-container').children().remove();
    // $('#purple-container, #green-container').empty();

    // $('#reset').html('launch doggos!');
    // $('a').map((index,link) => {
    //     return $(link).html();
    // })

    // $('td').html('yaas');
    // $('td').parent();

    // e0 = $("<div class='test'>New Div</div>"); //create new element
    // $('#green-container').append(e0);
    // $('#green-container').prepend(e0.clone());

    const data = {
        'this animal is common in canada.': 'beaver',
        'a giant cloud of dust in the space.': 'nebula',
        'couples and friends sometimes have this.': 'arguments',
        'feeling uncomfortable or embarrased.': 'awkward',
        'color white.': 'ivory',
        'scary but immortal.': 'zombie',
        'something you cannot live without.': 'oxygen',
        'think of a number that rhymes with elf.': 'twelfth',
        'made with rice and seaweed.': 'sushi',
        'think of NBA champions': 'raptors',
        "why does the name of this fruit have a person's name in it?": 'jackfruit',
        'captures memories.': 'camera'
    };
    const hints = Object.keys(data);
    const hint = hints[Math.floor(Math.random() * (hints.length))];
    const playingLetters = data[hint].toUpperCase();
    let guessedLetters = '';
    let wrongGuesses = 0;

    $('.hint').text(hint);

    $('img').addClass('hide-image');
    $(`#img${wrongGuesses}`).removeClass('hide-image');

    for (letter of playingLetters) {
        console.log(letter);
        let ep = $("<p class = 'not-guessed'></p>");
        ep.text(letter);
        eLi = $('<li></li>');
        eLi.html(ep);
        $('ul').append(eLi);
    }

    $('button').on('click', (event) => {
        $(event.target).attr('class', 'button-selected');
        const letter = $(event.target).text();
        playGame(letter);
    })

    $(document).keypress(function (event) {
        event.preventDefault();
        const letter = event.key.toUpperCase();
        $(`button:contains(${letter})`).attr('class', 'button-selected');
        playGame(letter);

    })

    const player = $('audio').get(0);

    function playGame(letter) {
        if (playingLetters.includes(letter)) {
            $(`p:contains(${letter})`).removeClass('not-guessed');
        } else {
            if (!guessedLetters.includes(letter)) {
                player.play();
                wrongGuesses += 1;
                setTimeout(function() {
                    $('img').addClass('hide-image');
                    $(`#img${wrongGuesses}`).removeClass('hide-image');
                },700)
            }
        }
        guessedLetters += letter;
        console.log(wrongGuesses)
        if (wrongGuesses === 6) {
            setTimeout(function () {
                const popup = confirm("sorry, you died *.* try again?");
                finishGame(popup);
            }, 1000);
        }
        if (guessedLetters.includes(playingLetters)) {
            setTimeout(function () {
                const popup = confirm("congratulations, smarty pants!! =D try another one?");
                finishGame(popup);
            }, 1000);
        }
    }

    function finishGame(popup) {
        if (popup == true) {
            location.reload();
        } else {
            $('body').replaceWith("<h1 class='goodbye'>thanks for playing! goodbye =)</h1>");
        }
    }






    //     $('.blue.circle').on('mouseleave', () => {
    //         console.log("Blue Circle: Goodbye!");
    //     })

    //     $('#button-1').on('click', () => {
    //         $('.shape').remove();
    //     })

    //     $('#button-2').on('click', () => {
    //         $('#button-2').attr('disabled', true);
    //     })

    //     $('#button-3').on('click', () => {
    //         alert('button 3 was clicked!');
    //     })

    //     $('tr').on('mouseover', (event) => {
    //         const {
    //             currentTarget
    //         } = event;
    //         $(currentTarget).addClass('highlight');
    //     })

    //     $('tr').on('mouseleave', (event) => {
    //         const {
    //             currentTarget
    //         } = event;
    //         $(currentTarget).removeClass('highlight');
    //     })

})