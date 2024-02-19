const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const cookieParser = require('cookie-parser');

//const client = require('./db')
const bodyParser = require('body-parser')
app.use(cookieParser());

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Update this with the origin of your React app
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Continue to the next middleware
    next();
  });
  
app.listen(8000,() =>{
    console.log("server started port no 8000")
})

const country = require('./Routes/country')
const state = require('./Routes/state')
const city = require('./Routes/city')
const users = require('./Routes/users')
const pagenation = require('./Routes/pagenation')
const sort = require('./Routes/sort')

app.use('/',country)
app.use('/state',state)
app.use('/city',city)
app.use('/users',users)
app.use('/api',pagenation)
app.use('/sort',sort)

