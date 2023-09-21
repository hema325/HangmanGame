import { wordList } from "/js/word-list.js";

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const keyboard = $("#keyboard");
const imageElement = $("#image");
const failedElement = $("#failed-tries");
const wordLetters = $("#word-letters");

let currentWord = '';
let wrongTriesCount = 0;
let foundLettersCount = 0;
const maxTries = 6;

for (let cnt = 97; cnt <= 122; ++cnt) {
    $("<span>" + String.fromCharCode(cnt) + "</span>").appendTo(keyboard);
}

const resetGame = () => {
    const { word, hint } = wordList[getRandom(0, 3)]
    $("#hint").text(hint);
    wordLetters.html(Array.from({ length: word.length }, () => '<span>_</span>'));
    currentWord = word;

    wrongTriesCount = 0;
    foundLettersCount = 0;

    failedElement.text(wrongTriesCount + " / " + maxTries);
    keyboard.children().removeClass("disabled");
    imageElement.attr("src", `images/hangman-${wrongTriesCount}.svg`);
}

resetGame();

keyboard.children().click(function () {
    if (!$(this).is(".disabled")) {
        $(this).addClass("disabled");
        let clickedLetter = $(this).text();

        if (currentWord.includes(clickedLetter)) {
            Array.from(currentWord).forEach((letter, index) => {
                if (clickedLetter === letter) {
                    wordLetters.children().eq(index).text(letter.toUpperCase());
                    ++foundLettersCount;

                    if (foundLettersCount === currentWord.length) {
                        $("#word-found").addClass("show").find("#correct-word").text(currentWord);
                    }
                }
            });
        }
        else {
            ++wrongTriesCount;
            failedElement.text(wrongTriesCount + " / " + maxTries);

            if (wrongTriesCount === maxTries) {
                $("#game-over").addClass("show").find("#correct-word").text(currentWord);
                return;
            }

            imageElement.attr("src", `images/hangman-${wrongTriesCount}.svg`);
        }
    }
});

$(".popup>button").click(function () {
    resetGame();
    $(this).parents(".popup-wrapper").removeClass("show");
})
