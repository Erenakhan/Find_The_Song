const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fetch = require('isomorphic-unfetch');
const spotify = require('spotify-url-info');
const { Preview,getData, getPreview, getTracks, getDetails } = spotify(fetch);
require('dotenv').config()

const uri = process.env.MONGO_Uri

const Point = require('./models/point.js');

const port = 5000;
const app = express();


const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'https://findthesong.vercel.app'],
    credentials: true,
  };
  

app.use(express.json())
app.use(cors(corsOptions));


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
const list = []; 

let globalAccsess = null;

    app.post('/api/acsessToken', async (req, res) => {
        const { accessToken } = req.body;
        console.log("token Route", accessToken);
        globalAccsess = accessToken;
        res.send(accessToken);
    });


   

    app.get('/api/songTr', async (req, res) => {
        const artistParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  globalAccsess
            }
        }
            const artistIDResponse = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DX0FGW2dUyDef/tracks', artistParameters);
            const data = await artistIDResponse.json();
            res.send(data);  
    });
    
    
    
app.get('/api/songGlobal' , async (req, res) => {
    const artistParameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  globalAccsess
        }
    }
            const artistIDResponse = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DX0kbJZpiYdZl/tracks', artistParameters);
            const data = await artistIDResponse.json();
            res.send(data);  
    });

 app.get('/api/songTr90' , async (req, res) => {
    const artistParameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  globalAccsess
        }
    }
            const artistIDResponse = await fetch('https://api.spotify.com/v1/playlists/6TWKL25TbMP6mtxSH5XIAN/tracks', artistParameters);
            const data = await artistIDResponse.json();
            res.send(data);  
    });

app.get('/api/songGlobal20' , async (req, res) => {
    const artistParameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  globalAccsess
        }
    }
            const artistIDResponse = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DX4o1oenSJRJd/tracks', artistParameters);
            const data = await artistIDResponse.json();
            res.send(data);  
    });

app.post("/api/addPoint", async(req, res) => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const {name,point,mongooseType} =req.body;
    const newPoint = new Point({name,point,mongooseType});
    const userDoc = await newPoint.save();
    res.send(userDoc);
})

app.get("/api/getPoint",async (req, res) =>{
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
