const express = require('express')
const app = express()
const PORT = 4000

// omogoca dostop do '/images/2_of_clubs.png
app.use(express.static('public'));

app.get('/deck/shuffled', (req, res) => {
    res.send(shuffleDeck(generateDeck()));
})

function generateDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
    const deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            const image = "http://localhost:4000/images/" + rank + "_of_"+ suit + ".png"
            deck.push({ suit, rank, image});
        }
    }

    return deck;
}

function getRandomIndex(max){
    return Math.floor(Math.random() * max);
}

function shuffleDeck(deck){
    let length = deck.length;
    for(let i = 0; i < length; i++){
        let index1 = getRandomIndex(length);
        let index2 = getRandomIndex(length);
        [deck[index1], deck[index2]] = [deck[index2], deck[index1]];
    }
    return deck;
}

app.listen(PORT, () => {
    console.log(`API ALIVE AND GOOD ON http://localhost:${PORT}`)
});