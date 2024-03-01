const express = require("express");
const client = require('../db')
const router = express.Router();
const verifyToken = require("./middelware/verifytoken")
router.use(express.json()); 

router.post('/', async (req, res) => {
  try {
    const { page, limit, order, column } = req.body;
   console.log(order,column)
    // First query to get the total count
    const totalCountQuery = await client.query('SELECT COUNT(*) FROM country WHERE isdeleted = false');
    const totalCount = totalCountQuery.rows[0].count;

    // Second query to get paginated data
    let query;
    let params = [limit, (page - 1) * limit];

    query = 'SELECT * FROM country WHERE isdeleted = false'

    if (order && column) {
      // If order and column are provided, add sorting to the query
      query += ` ORDER BY ${column} ${order === 'asc' ? 'ASC ' : 'DESC'} `;
    }

    query += ' LIMIT $1 OFFSET $2 '
    // Execute the query
    const result = await client.query(query, params);

    res.status(200).json({
      data: result.rows,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/addcountry', async (req, res) => {
  try {
      const { countryName, countryCode, phoneCode,page, limit,order,column } = req.body;
      console.log(countryName, countryCode, phoneCode,page, limit,order,column)

      // Check if the country name already exists
      const checkQuery = 'SELECT * FROM country WHERE LOWER(countryname) = LOWER($1)';
      const checkResult = await client.query(checkQuery, [countryName]);

      const duplicateCountry = await client.query(
        'SELECT COUNT(*) FROM country WHERE LOWER(countryname) = LOWER($1) AND isdeleted = false',
        [countryName.toLowerCase()]
      );

      if (duplicateCountry.rows[0].count > 0) {
        // Duplicate city found in the same state
        return res.status(400).json({ error: 'Country with the same name already exists ' });
      }

      if (checkResult.rows.length > 0) {
          // Country already exists
          const existingCountry = checkResult.rows[0];

          if (existingCountry.isdeleted ) {
            console.log(existingCountry.isdeleted)
              const updateQuery = 'UPDATE country SET isdeleted = false , countryname = $1,countrycode = $2,phonecode = $3  WHERE countryname = $4 ';
              const updateResult = await client.query(updateQuery, [countryName,countryCode, phoneCode,existingCountry.countryname]);
              const totalCountQuery = await client.query('SELECT COUNT(*) FROM country WHERE isdeleted = false');
    const totalCount = totalCountQuery.rows[0].count;

    // Second query to get paginated data
    let query;
    let params = [limit, (page - 1) * limit];

    query = 'SELECT * FROM country WHERE isdeleted = false'

    if (order && column) {
      // If order and column are provided, add sorting to the query
      query += ` ORDER BY ${column} ${order === 'asc' ? 'ASC ' : 'DESC'} `;
    }

    query += ' LIMIT $1 OFFSET $2 '
    // Execute the query
    const result = await client.query(query, params);

    res.status(200).json({
      finalStatus: 'success',
      
      data: result.rows,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      },
    });
          } else {
              // Country is deleted, update and return
              return res.status(409).json({ message: 'Country already exists.' });
          }
      } else {
          // Country does not exist, add country
          const insertQuery = 'INSERT INTO country (countryname, countrycode, phonecode) VALUES ($1, $2, $3) RETURNING *';
          const insertResult = await client.query(insertQuery, [countryName, countryCode, phoneCode]);

          const totalCountQuery = await client.query('SELECT COUNT(*) FROM country WHERE isdeleted = false');
    const totalCount = totalCountQuery.rows[0].count;

    // Second query to get paginated data
    let query;
    let params = [limit, (page - 1) * limit];

    query = 'SELECT * FROM country WHERE isdeleted = false'

    if (order && column) {
      // If order and column are provided, add sorting to the query
      query += ` ORDER BY ${column} ${order === 'asc' ? 'ASC ' : 'DESC'} `;
    }

    query += ' LIMIT $1 OFFSET $2 '
    // Execute the query
    const result = await client.query(query, params);

    res.status(200).json({
      finalStatus: 'success',
      message: insertResult.rows,
      data: result.rows,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      },
    });
          
      }

  } catch (err) {
      console.error(err);
      return res.status(500).json({ status: 'error', message: 'Internal server error.' });
  }
});

router.put('/countryupdate',async(req,res)=>{
  const {countryname, countrycode, phonecode, countryid, page, limit, order, column} = req.body;

  const duplicateCountry = await client.query(
    'SELECT * FROM country WHERE LOWER(countryname) = LOWER($1) AND isdeleted = false',
    [countryname.toLowerCase()]
  );

  if (duplicateCountry.rows[0].countryname === countryname && duplicateCountry.rows[0].countrycode === countrycode && duplicateCountry.rows[0].phonecode === phonecode ) {
    // Duplicate city found in the same state
    console.log("hii",duplicateCountry.rows[0])
    return res.status(400).json({ error: 'Country with the same name already exists ' });
  }


   let updateData = await client.query('UPDATE country SET countryname = $1, countrycode = $2, phonecode = $3 WHERE countryid = $4 RETURNING *',
  [countryname, countrycode, phonecode, countryid])
  //res.send(result.row)

    res.status(200).json("updated");
    
  })

router.delete('/countrydelete/:id', async (req, res) => {
  try {
    const countryid = req.params.id;
    const { page, limit, order, column } = req.body;

    // Check if there are any states for the given country
    const existingStates = await client.query(
      'SELECT * FROM state WHERE countryid = $1 AND isdeleted = false',
      [countryid]
    );

    if (existingStates.rows.length > 0) {
      return res.status(400).json({
        error: 'Cannot delete country with existing states',
      });
    }

    // No existing states, proceed with deleting the country
    const deletedresult = await client.query(
      'UPDATE country SET isdeleted = true WHERE countryid = $1 RETURNING *',
      [countryid]
    );

    const totalCountQuery = await client.query('SELECT COUNT(*) FROM country WHERE isdeleted = false');
    const totalCount = totalCountQuery.rows[0].count;

    let query;
    let params = [limit, (page - 1) * limit];

    query = 'SELECT * FROM country WHERE isdeleted = false'

    if (order && column) {
      // If order and column are provided, add sorting to the query
      query += ` ORDER BY ${column} ${order === 'asc' ? 'ASC ' : 'DESC'} `;
    }

    query += ' LIMIT $1 OFFSET $2 '
    // Execute the query
    const result = await client.query(query, params);

    console.log(page,limit)

    res.status(200).json({
      data: result.rows,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      },
    });


  } catch (error) {
    console.error('Error deleting country:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//     router.post('/checkDuplicateCountry', async (req, res) => {
//   try {
//     const { countryName } = req.body;

//     if (typeof countryName !== 'string') {
//       return res.status(400).json({ error: 'Invalid countryName provided' });
//     }

//     // Check for duplicate city name
//     const duplicateCity = await client.query(
//       'SELECT COUNT(*) FROM country WHERE LOWER(countryname) = LOWER($1) AND isdeleted = false',
//       [countryName.toLowerCase()]
//     );

//     res.status(200).json({
//       isDuplicate: duplicateCity.rows[0].count > 0, // Check the count in the first row
//     });
//   } catch (error) {
//     console.error('Error checking duplicate country name:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


module.exports = router;