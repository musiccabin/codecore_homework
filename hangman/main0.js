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

    const data = {'this animal is common in canada.': 'beaver', 'A giant cloud of dust in the space.': 'nebula', 'Couples and friends sometimes have this.':'arguments'};
    const hints = Object.keys(data);
    const hint = hints[Math.floor(Math.random()*(hints.length))];
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
        if (playingLetters.includes(letter)) {
            $(`p:contains(${letter})`).removeClass('not-guessed');
        } else {
            if (!guessedLetters.includes(letter)) {
                wrongGuesses += 1;
                $('img').addClass('hide-image');
                $(`#img${wrongGuesses}`).removeClass('hide-image');
            }
        }
        guessedLetters += letter;
        if (wrongGuesses === 7) {
            alert('sorry! better luck next time!');
        }
        if (guessedLetters.includes(playingLetters)) {
            alert('congratulations! you won!')
        }
    })

    
    

    

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
    