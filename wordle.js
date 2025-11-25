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
"A group of students who meet together for lessons.",
"To show someone how to do or understand something.",
"To get knowledge or a new skill.",
"To spend time trying to understand or remember something.",
"A score or mark that shows how well someone did.",
"A large flat surface used for writing or showing information in a room.",
"A piece of furniture with a seat and a back for one person.",
"Material used for writing or printing on.",
"Written or printed pages that are fastened together.",
"To form letters or words on a surface.",
"A living thing that grows in soil and has leaves or flowers.",
"A hard, often shiny material used to make tools and machines.",
"A firm state of matter that keeps its shape.",
"Energy that lets us see things.",
"Vibrations that we can hear.",
"Energy used to work machines or give electricity.",
"The planet people live on.",
"To say numbers one after another in order.",
"To find the answer to a problem.",
"The same in amount, size, or value.",
"A round fruit that is usually red, green, or yellow.",
"A small, sweet purple or green fruit that grows in bunches.",
"A yellow fruit that tastes sour.",
"A large, juicy fruit with a thick skin.",
"A soft, sweet fruit with fuzzy skin.",
"A sweet, tropical fruit with a large seed inside.",
"A vegetable with a strong smell and many layers.",
"A flat food with sauce, cheese, and other toppings, baked in an oven.",
"A dish of noodles often cooked and served with sauce.",
"Small pieces of raw fish with rice or seaweed, often from Japanese cooking.",
"A thick slice of meat cooked by grilling or frying.",
"Thin pieces of pork that are salted and often fried.",
"A dish made of raw or cooked vegetables, often served cold.",
"A food made from flour, water, and yeast, baked into a loaf.",
"Bread that has been heated until the surface is brown and crisp.",
"A thick dairy product made from milk.",
"A fine powder made from grain and used in baking.",
"A sweet substance used to make food and drinks taste sweet.",
"A thick, sweet liquid made by bees.",
"A sweet food often made with sugar and flavoring.",
"A small, sweet cake that is fried and often has a hole in the middle.",
"A clear liquid that people and animals drink.",
"A drink made from fruit or vegetables.",
"A tool used to measure length or draw straight lines.",
"A soft white stick used for writing or drawing on a special surface.",
"Colored liquid used to cover a surface or make pictures.",
"A tool with hairs or bristles used for painting or cleaning.",
"A small mark made with ink to show approval or for decoration.",
"A notebook where someone writes daily events or thoughts.",
"A piece of furniture with a seat and a back for one person.",
"Pieces of furniture with flat tops used by students for work.",
"A piece of furniture with a flat top and legs.",
"A piece of furniture with levels used to hold things like books.",
"A device that shows time.",
"A large flat surface used for writing or showing information in a room.",
"Metal objects that ring to make a sound.",
"Pieces of cloth with colors or designs used as symbols.",
"Written or printed pages that are fastened together.",
"Collections of documents kept together.",
"Short written reminders or summaries.",
"Small pieces of thick paper with information or pictures.",
"A single piece of thin material, often used for writing or printing.",
"Individual leaves of paper bound or grouped together.",
"Something that gives direction or help in doing something."
];


var gameOver = false;
let randomIndex = Math.floor(Math.random() * halloweenWordlist.length);
let word = halloweenWordlist[randomIndex];
//!Random word chosen already from here

console.log(word);
console.log(randomIndex+1)



window.onload = function() {
    initialize();
    document.getElementById("word-index").innerText = randomIndex + 1;

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



