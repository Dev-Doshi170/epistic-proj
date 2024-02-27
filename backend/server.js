// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors());
// app.use(express.json());


// const cookieParser = require('cookie-parser');
// app.use(cookieParser());
// //const client = require('./db')
// const bodyParser = require('body-parser')
// app.use(cookieParser());

// app.use(bodyParser.json())

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Update this with the origin of your React app
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
//     // Continue to the next middleware
//     next();
//   });
  
// app.listen(8000,() =>{
//     console.log("server started port no 8000")
// })

// const country = require('./Routes/country')
// const state = require('./Routes/state')
// const city = require('./Routes/city')
// const users = require('./Routes/users')
// const pagenation = require('./Routes/pagenation')
// const sort = require('./Routes/sort')

// app.use('/',country)
// app.use('/state',state)
// app.use('/city',city)
// app.use('/users',users)
// app.use('/api',pagenation)
// app.use('/sort',sort)

const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser'); // Add this line

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(8000, () => {
    console.log("Server started on port 8000");
});

// Your route handlers go here...
const country = require('./Routes/country');
const state = require('./Routes/state');
const city = require('./Routes/city');
const users = require('./Routes/users');
const pagenation = require('./Routes/pagenation');
const sort = require('./Routes/sort');

app.use('/', country);
app.use('/state', state);
app.use('/city', city);
app.use('/users', users);
app.use('/api', pagenation);
app.use('/sort', sort);


