const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    res.send(generateDeck())
})

function generateDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            const image = "http://localhost:3000/static/img/" + suit + rank + ".png"

            deck.push({ suit, rank, image});
        }
    }

    return deck;
}

app.listen(3000);