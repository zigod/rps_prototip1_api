const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const app = express()
const PORT = 4000



const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL
const url = 'mongodb+srv://admin:admin@cluster0.infym86.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection URL


// MongoDB connection URL
//const url = 'mongodb://admin:admin@<host>:<port>/<database>'; // Replace with your MongoDB connection URL

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }
  console.log('Connection successful');

  // Access a collection
  const db = client.db();
  const collection = db.collection('users'); // Replace with your collection name

  // Retrieve data from the collection
  collection.find({_id:2}).toArray((err, docs) => {
    if (err) {
      console.error('Failed to retrieve data:', err);
      client.close();
      return;
    }
    console.log('Data:', docs); // Display received data
    client.close();
  });
});

/*
const url = "mongodb+srv://tilenhostnik:schoolIsShit@cluster0.infym86.mongodb.net/test";

const shema = new mongoose.Schema({
    id: String,
    name: String,
    points: String
  });

const User = mongoose.model('User', shema);

mongoose.connect(url, {

    console.log("deljuje")
  }).catch(err => console.log(err.reason));


*/

// omogoca dostop do '/images/2_of_clubs.png
app.use(cors())
app.use(express.static('public'));

app.get('/deck/shuffled', (req, res) => {
    res.send(shuffleDeck(generateDeck()));
})


function generateDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
    const deck = [];
    let value;
    for (const suit of suits) {
        for (const rank of ranks) {
            if (isNaN(rank)){
                value = 10 
            } else value = parseInt(rank) 

            const image = "http://localhost:4000/images/" + rank + "_of_"+ suit + ".png"
            deck.push({ value, suit, rank, image });
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