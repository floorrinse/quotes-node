require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const { ObjectId } = require('mongodb');
const app = express();
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;


const PORT = process.env.PORT || 3000;
const quotesConnection = encodeURIComponent(`${process.env.PCKG}`);
const connectionString = `mongodb+srv://${process.env.WORKER}:${quotesConnection}@cluster0.20cax.mongodb.net/?retryWrites=true&w=majority`

MongoClient.connect(connectionString)
  .then(client => {
    console.log('connected to database');

    const db = client.db('kardashian-quotes');
    const quotesCollection = db.collection('quotes');

    app.use(cors());
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json())
    app.listen(PORT, () => { console.log(`listening on port ${PORT}`) })

    //READ - get quotes
    app.get('/', (req, res) => {
      // res.sendFile(__dirname + '/index.html');
      db.collection('quotes').find().toArray()
        .then(results => {
          res.render('index.ejs', { quotes: results })
        })
        .catch(err => console.error(err))
    })

    //CREATE - add a quote
    app.post('/quotes/add', (req, res) => {
      console.log(req.body);
      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/');
          // console.log(result);
        })
        .catch(err => console.log(err))
    })

    //UPDATE - edit a quote
    app.put('/quotes/edit/:quoteId', (req, res) => {
      let quoteId = req.params.quoteId;
      console.log(req.body.name, req.body.quote)
       quotesCollection.findOneAndUpdate(
        //query
        { _id: ObjectId(quoteId) },
        //update
        { $set: {
            name: req.body.name,
            quote: req.body.quote
        }}, 
        //options
        { upsert: true }
      )
      .then(result => {
        res.json('quote updated!')
      })
      .catch(err => console.error(err))
    })

    //DELETE - delete a quote
    app.delete('/quotes/delete', (req, res) => {
      const quoteId = req.body._id;
      const personName = req.body.name;
      const quote = req.body.quote;
      console.log(req.body)
      quotesCollection.deleteOne(
        { _id: ObjectId(quoteId),
          name: personName,
          quote: quote
        }
      )
      .then(result => {
        res.json(`Deleted ${quoteId} quote: ${personName}: ${quote}`)
      })
      .catch(err => console.error(err))
    })

  })
  .catch(err => console.error(err))
