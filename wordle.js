var height = 6; // number of guesses
var width = 5; // number of letters

var row = 0; // current guess (attempt)
var col = 0; // current letter for that attempt.


const halloweenWordlist = [
  "CLASS",
  "TEACH",
  "LEARN",
  "STUDY",
  "GRADE",
  "BOARD",
  "CHAIR",
  "PAPER",
  "BOOKS",
  "WRITE",
  "PLANT",
  "METAL",
  "SOLID",
  "LIGHT",
  "SOUND",
  "POWER",
  "EARTH",
  "COUNT",
  "SOLVE",
  "EQUAL",
  "APPLE",
  "GRAPE",
  "LEMON",
  "MELON",
  "PEACH",
  "MANGO",
  "ONION",
  "PIZZA",
  "PASTA",
  "SUSHI",
  "STEAK",
  "BACON",
  "SALAD",
  "BREAD",
  "TOAST",
  "CREAM",
  "FLOUR",
  "SUGAR",
  "HONEY",
  "CANDY",
  "DONUT",
  "WATER",
  "JUICE",
  "RULER",
  "CHALK",
  "PAINT",
  "BRUSH",
  "STAMP",
  "DIARY",
  "CHAIR",
  "DESKS",
  "TABLE",
  "SHELF",
  "CLOCK",
  "BOARD",
  "BELLS",
  "FLAGS",
  "BOOKS",
  "FILES",
  "NOTES",
  "CARDS",
  "SHEET",
  "PAGES",
  "GUIDE"
]

const halloweenDefList = [
  "A group of students in a learning environment.",
  "To instruct or educate others.",
  "To gain knowledge or skills.",
  "To review or practice material for learning.",
  "A mark or score for academic work.",
  "A board for writing or displaying information in class.",
  "A seat for one person.",
  "Material used for writing or printing.",
  "A collection of written or printed pages bound together.",
  "To put words on paper or a board.",
  "A living organism in the plant kingdom.",
  "A solid material that conducts electricity and heat.",
  "A firm state of matter with a definite shape.",
  "Form of visible energy from the sun or a bulb.",
  "Vibrations that can be heard by our ears.",
  "The ability to do work or act.",
  "The planet we live on.",
  "To determine the number of items.",
  "To find an answer to a problem.",
  "Having the same value or amount.",
  "A round fruit, often red or green.",
  "A small, juicy fruit that grows in bunches.",
  "A yellow, sour citrus fruit.",
  "A round, sweet fruit with a green rind.",
  "A soft, sweet fruit with fuzzy skin.",
  "A tropical orange-yellow fruit.",
  "A vegetable with layers and a strong smell.",
  "Flat bread with sauce, cheese, and toppings.",
  "An Italian noodle dish.",
  "A Japanese dish of rice and raw fish.",
  "A slice of cooked beef.",
  "A salty, crispy pork meat often eaten at breakfast.",
  "A mix of raw vegetables.",
  "A staple food made from baked dough.",
  "Bread browned from heating.",
  "Thick milk used in cooking or desserts.",
  "Powder made from ground grains, used in baking.",
  "A sweet ingredient made from sugarcane or beets.",
  "A sweet, sticky food made by bees.",
  "A sweet food, often eaten as a treat.",
  "A fried ring-shaped sweet treat.",
  "The clear, tasteless liquid needed for life.",
  "A drink made from the liquid of fruits.",
  "A tool used to measure length.",
  "White or colored sticks for writing on boards.",
  "Colored substance used for art.",
  "A tool for applying paint.",
  "A tool for marking paper with ink.",
  "A notebook used to record daily events.",
  "A chair is a seat for one.",
  "Small tables used by students to work at.",
  "A piece of furniture with a flat surface and legs.",
  "A shelf is used for storing things.",
  "A device that shows time.",
  "A board for instructions or writing in class.",
  "Ringing devices to signal time in school.",
  "A cloth symbol representing a country.",
  "Books contain written, printed, or illustrated information.",
  "Folders for organizing papers.",
  "Short, written reminders for study.",
  "Small pieces of card used for learning.",
  "A single piece of paper.",
  "Pages are single sheets in a book.",
  "Directions or explanations to help understand something."
];


var gameOver = false;
let randomIndex = Math.floor(Math.random() * halloweenWordlist.length);
let word = halloweenWordlist[randomIndex];
//!Random word chosen already from here

console.log(word);
console.log(randomIndex+1)



window.onload = function() {
    initialize();
}

function initialize() {
    // Create the game board
    

    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -=1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }

        else if (e.code == "Enter") {
            update();
            row += 1; //start new row
            col = 0; //start at 0 for new row
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })
}

function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //Is it in the correct position?
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
        } // Is it in the word?
        else if (word.includes(letter)) {
            currTile.classList.add("present");
        } // Not in the word
        else {
            currTile.classList.add("absent");
        }

        if (correct == width) {
            gameOver = true;
        }
    }
}







function initialize() {
    // ... existing code ...
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }
    // Add event listeners for virtual keyboard
    document.querySelectorAll('.keyboard-button').forEach(button => {
        button.addEventListener('click', function() {
            if (gameOver) return;

            let letter = this.textContent;

            if (letter === '⌫') {
                deleteLetter();
            } else if (letter === 'Enter') {
                checkGuess();
            } else if (/^[A-Z]$/.test(letter)) {
                addLetter(letter);
            }
        });
    });
}

function addLetter(letter) {
    if (col < width) {
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        if (currTile.innerText == "") {
            currTile.innerText = letter;
            col += 1;
        }
    }
}

function deleteLetter() {
    if (0 < col && col <= width) {
        col -= 1;
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = "";
    }
}

function checkGuess() {
    if (col === width) {
        update();
        row += 1;
        col = 0;
    }

    if (!gameOver && row == height) {
        gameOver = true;
        document.getElementById("answer").innerText = word;
    }
}

let attempts = 0;

function update() {
    let correct = 0;
    let letterCount = {}; // count letters in the word

    // count each letter in the target word
    for (let i = 0; i < word.length; i++) {
        letterCount[word[i]] = (letterCount[word[i]] || 0) + 1;
    }

    // first pass: mark correct letters and decrease count
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        if (word[c] === letter) {
            currTile.classList.add("correct");
            correct += 1;
            letterCount[letter] -= 1;
        }
    }

    // second pass: mark present or absent letters based on remaining counts
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        if (!currTile.classList.contains("correct")) {
            if (letterCount[letter] > 0) {
                currTile.classList.add("present");
                letterCount[letter] -= 1;
            } else {
                currTile.classList.add("absent");
            }
        }
    }

    if (correct === width) {
        gameOver = true;
    }

    attempts++;

    if (attempts >= 3 && !gameOver) {
        let hintIndex = halloweenWordlist.indexOf(word);
        let hint = halloweenDefList[hintIndex];
        document.getElementById("hint").innerText = "Hint: " + hint;
    }
}



