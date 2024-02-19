const express = require("express");
const client = require('../db')
const router = express.Router();
router.use(express.json()); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.post('/login',[
    body('username').notEmpty(),
    body('password').notEmpty(),
],async(req,res)=>{
    const JWT_SECRET = "secretkey";
    const { username, password } = req.body;

  try {

    const userResult = await client.query('SELECT * FROM users WHERE username = $1', [username]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const user = userResult.rows[0];

    // Compare entered password with stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    const data = {
      users : {
          name : username,
          password : password,
          expiresIn: '24h'
      }
  }
  
  const authToken = jwt.sign(data, JWT_SECRET);
                  
  //res.status(200).json({message: "User Login SuccessFully", result: user , authToken})
  res.status(200).header('Authorization', `Bearer ${authToken}`).json({ message: "User Login Successfully", result: user ,authToken });
  


    
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

})

router.post('/register',[
    body('username').isLength({ min: 3, max: 10 }).isAlpha(),
    body('password').notEmpty(),
], async (req, res) => {
    const { username, password } = req.body;
    
    
    const salt = await bcrypt.genSalt(10);

    const hashpassword = await bcrypt.hash(password,salt) 
  
    try {
        const checkuser = await client .query('select * from users where username = LOWER($1)', [username]);

        if (checkuser.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'User with this username already exists' });
          }

        const result = await client.query(
        'INSERT INTO users (username, password) VALUES (LOWER($1), $2) RETURNING *',
        [username, hashpassword]);

        

      res.json({ success: true, message: 'User registered successfully', user: result.rows[0]});
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;