const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fetch = require('isomorphic-unfetch');
const spotify = require('spotify-url-info');
const bodyParser = require('body-parser');
const Preview = spotify.Preview;
const { getData, getPreview, getTracks, getDetails } = spotify(fetch);

const uri = "mongodb+srv://erenakhan:erenakhan123@cluster0.nkwtsfn.mongodb.net/?retryWrites=true&w=majority"

const Point = require('./models/point.js');

const port = 5000;
const app = express();

const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'https://findthesong.vercel.app'],
    credentials: true,
  };

app.use(express.json())
app.use(bodyParser.json())
app.use(cors(corsOptions));

const baseURL = "https://open.spotify.com/track/";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const trHits = [];
const globalHits = [];
const globalHits20 =[];
const trHits90=[];

const lists = {
    trHits: [],
    globalHits: [],
    globalHits20 :[],
    trHits90:[],
};

getTracks('https://open.spotify.com/playlist/37i9dQZF1DX0FGW2dUyDef').then(list => {  
    list.forEach(song => {
        trHits.push(song)});
})
getTracks('https://open.spotify.com/playlist/37i9dQZF1DX0kbJZpiYdZl')
.then(list => {
    list.forEach(song => {
        globalHits.push(song)});
    })

getTracks('https://open.spotify.com/playlist/37i9dQZF1DX4o1oenSJRJd')
.then(list => {
    list.forEach(song => {
        globalHits20.push(song)});
    })
getTracks('https://open.spotify.com/playlist/37i9dQZF1DXb7MJRXLczzR')
.then(list => {
    list.forEach(song => {
        trHits90.push(song)});
    })

 app.get('/songTr' ,(req, res) => {
        res.send(trHits);
    });
app.get('/songGlobal' ,(req, res) => {
        res.send(globalHits);
    });
 app.get('/songTr90' ,(req, res) => {
        res.send(trHits90);
    });
app.get('/songGlobal20' ,(req, res) => {
        res.send(globalHits20);
    });

app.post("/addPoint", async(req, res) => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const {name,point,mongooseType} =req.body;
    const newPoint = new Point({name,point,mongooseType});
    const userDoc = await newPoint.save();
    res.send(userDoc);
})

app.get("/getPoint",async (req, res) =>{
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const points = await Point.find();
  res.send(points)
})


app.get('/', (req, res) => {
    res.send(`Server is running on  ${port}`)
});

app.listen(port, () => {
    console.log(`Server is listening on  ${port}`);
});