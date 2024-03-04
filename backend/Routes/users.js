const express = require("express");
const client = require('../db')
const router = express.Router();
router.use(express.json()); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


router.post('/login', [
  body('username').notEmpty(),
  body('password').notEmpty(),
], async (req, res) => {
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

    const expirationTime = Date.now() + 30 * 1000; // 30 seconds expiration
    const data = {
      users: {
        name: username,
        password: password,
        expiresIn: expirationTime,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);

    // Save expirationTime to the database along with the user information

    res.status(200).json({ message: "User Login Successfully", result: user, authToken });

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





router.post(
  '/register',
  [
    body('username').isLength({ min: 3, max: 10 }).isAlpha(),
    body('password').notEmpty(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
    body('email').isEmail().withMessage('Enter a valid email address'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { username, password, email } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(password, salt);

      const checkuser = await client.query(
        'SELECT * FROM users WHERE username = LOWER($1) OR email = LOWER($2)',
        [username, email]
      );

      if (checkuser.rows.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'User with this username or email already exists',
        });
      }

      const result = await client.query(
        'INSERT INTO users (username, password, email) VALUES (LOWER($1), $2, LOWER($3)) RETURNING *',
        [username, hashpassword, email]
      );

      res.json({
        success: true,
        message: 'User registered successfully',
        user: result.rows[0],
      });
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
);


module.exports = router;