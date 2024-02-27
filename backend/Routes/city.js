const express = require("express");
const client = require('../db')
const router = express.Router();
router.use(express.json()); 


// router.post('/addcity', async (req, res) => {
//   try {
//     const { countryId, stateId, city } = req.body;

//     if (!stateId || !countryId) {
//       return res.status(400).json({ error: 'Invalid state or country name' });
//     }

//     // Insert into the city table
//     const result = await client.query(
//       'INSERT INTO city (cityname, stateid, countryid) VALUES ($1, $2, $3) RETURNING *',
//       [city, stateId, countryId]
//     );

//     res.status(200).json({
//       data: result.rows[0],
//     });
//   } catch (error) {
//     console.error('Error adding city:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.post('/addcity', async (req, res) => {
//   try {
//     const { countryId, stateId, city } = req.body;

//     if (!stateId || !countryId) {
//       return res.status(400).json({ error: 'Invalid state or country name' });
//     }

//     // Check if a city with the same name and isdeleted = true exists
//     const existingCity = await client.query(
//       'SELECT * FROM city WHERE LOWER(cityname) = LOWER($1) AND isdeleted = true',
//       [city]
//     );

//     if (existingCity.rows.length > 0) {
//       // Update the existing city with new countryid and stateid
//       const updateResult = await client.query(
//         'UPDATE city SET stateid = $1, countryid = $2, isdeleted = false WHERE cityname = $3 RETURNING *',
//         [stateId, countryId, city]
//       );

//       return res.status(200).json({
//         data: updateResult.rows[0],
//       });
//     }

//     // If no existing city with isdeleted = true, insert a new one
//     const insertResult = await client.query(
//       'INSERT INTO city (cityname, stateid, countryid) VALUES ($1, $2, $3) RETURNING *',
//       [city, stateId, countryId]
//     );

//     res.status(200).json({
//       data: insertResult.rows[0],
//     });
//   } catch (error) {
//     console.error('Error adding/updating city:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

router.put('/cityupdate', async (req, res) => {
  try {
    const { cityname, cityid, stateid, countryid } = req.body;

    // Update city with cityname, stateid, and countryid
    const duplicateCityCheck = await client.query(
      'SELECT COUNT(*) FROM city WHERE LOWER(cityname) = LOWER($1) AND stateid = $2 AND isdeleted = false',
      [cityname.toLowerCase(), stateid]
    );

    if (duplicateCityCheck.rows[0].count > 0) {
      // Duplicate city found in the same state
      return res.status(400).json({ error: 'City with the same name already exists in the specified state' });
    }

    const result = await client.query('UPDATE city SET cityname = $1, stateid = $2, countryid = $3 WHERE cityid = $4 RETURNING *',
      [cityname, stateid, countryid, cityid]);

    if (result.rows.length > 0) {
      const updatedCity = result.rows[0];

      // Fetch additional details like statename and countryname from the state and country tables
      const detailsQuery = await client.query(
        'SELECT c.*, s.statename, co.countryname FROM city c JOIN state s ON c.stateid = s.stateid JOIN country co ON c.countryid = co.countryid WHERE c.cityid = $1 and c.isdeleted = false',
        [cityid]
      );

      const updatedDataWithDetails = detailsQuery.rows[0];

      res.status(200).json({
        updatedcity: updatedDataWithDetails, // Send the updated city data with additional details in the response
      });
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (error) {
    console.error('Error updating city:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.post('/addcity', async (req, res) => {
//   try {
//     const { countryId, stateId, city, limit, page } = req.body;

//     if (!stateId || !countryId) {
//       return res.status(400).json({ error: 'Invalid state or country name' });
//     }

//     // Check if a city with the same name and isdeleted = true exists
//     const existingCity = await client.query(
//       'SELECT * FROM city WHERE LOWER(cityname) = LOWER($1) AND isdeleted = true',
//       [city]
//     );

//     if (existingCity.rows.length > 0) {
//       // Update the existing city with new countryid and stateid
//       const updateResult = await client.query(
//         'UPDATE city SET stateid = $1, countryid = $2, isdeleted = false WHERE cityname = $3 RETURNING *',
//         [stateId, countryId, city]
//       );

//       // Fetch paginated data for the entire page
//       const offset = (page - 1) * limit;
//       const allData = await client.query(
//         'SELECT city.*, state.statename, country.countryname FROM city JOIN state ON city.stateid = state.stateid JOIN country ON city.countryid = country.countryid WHERE city.isdeleted = false LIMIT $1 OFFSET $2',
//         [limit, offset]
//       );

//       return res.status(200).json({
//         data: allData.rows,
//         pagination: {
//           totalCount: allData.rowCount,
//           totalPages: Math.ceil(allData.rowCount / limit),
//           currentPage: page,
//         },
//       });
//     } else {
//       // Insert a new city
//       const insertResult = await client.query(
//         'INSERT INTO city (cityname, stateid, countryid) VALUES ($1, $2, $3) RETURNING *',
//         [city, stateId, countryId]
//       );

//       // Fetch paginated data for the entire page after insertion
//       const offset = (page - 1) * limit;
//       const allData = await client.query(
//         'SELECT city.*, state.statename, country.countryname FROM city JOIN state ON city.stateid = state.stateid JOIN country ON city.countryid = country.countryid WHERE city.isdeleted = false LIMIT $1 OFFSET $2',
//         [limit, offset]
//       );

//       const totalCountQuery = await client.query('SELECT COUNT(*) FROM city WHERE isdeleted = false');
//     const totalCount = totalCountQuery.rows[0].count;

//       return res.status(200).json({
//         data: allData.rows,
//         pagination: {
//           totalCount,
//           totalPages: Math.ceil(totalCount / limit),
//           currentPage: page,
//         },
//       });
//     }
//   } catch (error) {
//     console.error('Error adding/updating city:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

router.post('/addcity', async (req, res) => {
  try {
    const { countryId, stateId, city, limit, page } = req.body;

    if (!stateId || !countryId) {
      return res.status(400).json({ error: 'Invalid state or country name' });
    }

    const duplicateCityCheck = await client.query(
      'SELECT COUNT(*) FROM city WHERE LOWER(cityname) = LOWER($1) AND stateid = $2 AND isdeleted = false',
      [city.toLowerCase(), stateId]
    );

    if (duplicateCityCheck.rows[0].count > 0) {
      // Duplicate city found in the same state
      return res.status(400).json({ error: 'City with the same name already exists in the specified state' });
    }

    // Check if a city with the same name and isdeleted = true exists
    const existingCity = await client.query(
      'SELECT * FROM city WHERE LOWER(cityname) = LOWER($1) AND isdeleted = true',
      [city]
    );

    if (existingCity.rows.length > 0) {
      // Update the existing city with new countryid and stateid
      const updateResult = await client.query(
        'UPDATE city SET stateid = $1, countryid = $2, isdeleted = false WHERE cityname = $3 RETURNING *',
        [stateId, countryId, city]
      );

      // Fetch paginated data for the entire page
      const offset = (page - 1) * limit;
      const allData = await client.query(
        'SELECT city.*, state.statename, country.countryname FROM city JOIN state ON city.stateid = state.stateid JOIN country ON city.countryid = country.countryid WHERE city.isdeleted = false LIMIT $1 OFFSET $2',
        [limit, offset]
      );

      return res.status(200).json({
        data: allData.rows,
        pagination: {
          totalCount: allData.rowCount,
          totalPages: Math.ceil(allData.rowCount / limit),
          currentPage: page,
        },
      });
    } else {
      // Insert a new city
      const insertResult = await client.query(
        'INSERT INTO city (cityname, stateid, countryid) VALUES ($1, $2, $3) RETURNING *',
        [city, stateId, countryId]
      );

      // Fetch paginated data for the entire page after insertion
      const offset = (page - 1) * limit;
      const allData = await client.query(
        'SELECT city.*, state.statename, country.countryname FROM city JOIN state ON city.stateid = state.stateid JOIN country ON city.countryid = country.countryid WHERE city.isdeleted = false LIMIT $1 OFFSET $2',
        [limit, offset]
      );

      const totalCountQuery = await client.query('SELECT COUNT(*) FROM city WHERE isdeleted = false');
      const totalCount = totalCountQuery.rows[0].count;

      return res.status(200).json({
        data: allData.rows,
        pagination: {
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page,
        },
      });
    }
  } catch (error) {
    console.error('Error adding/updating city:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/deletecity', async (req, res) => {
  try {
    const { cityid,page, limit, sort ,column } = req.body;
    console.log(cityid)
    let Deleteresult = await client.query('UPDATE city SET isdeleted = true WHERE cityid = $1', [cityid]);

    const totalCountQuery = await client.query('SELECT COUNT(*) FROM city WHERE isdeleted = false');
    const totalCount = totalCountQuery.rows[0].count;

    // Second query to get paginated city data with additional details
    let query = 'SELECT city.*, state.statename, country.countryname ' +
                'FROM city ' +
                'INNER JOIN state ON city.stateid = state.stateid ' +
                'INNER JOIN country ON city.countryid = country.countryid ' +
                'WHERE city.isdeleted = false ';

    if (sort && column) {
      query += `ORDER BY ${column} ${sort === 'desc' ? 'DESC' : 'ASC'} `;
    } 

    query += 'LIMIT $1 OFFSET $2';

    const result = await client.query(query, [limit, (page - 1) * limit]);

    res.status(200).json({
      data: result.rows,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      },
      message: "City deleted",
    });

    if (result) {
      //res.status(200).json({ message: "City deleted" });
    } else {
      console.log("Failed to delete city", err);
      res.status(500).json({ message: "Failed to remove city" });
    }
  } catch (error) {
    console.error('Error deleting city:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// router.put('/cityupdate', async (req, res) => {
//   try {
//     const { cityname, cityid, stateid, countryid } = req.body;
//     console.log(cityname, cityid, stateid, countryid )

//     // Update city with cityname, stateid, and countryid
//     const result = await client.query('UPDATE city SET cityname = $1, stateid = $2, countryid = $3 WHERE cityid = $4 RETURNING *',
//       [cityname, stateid, countryid, cityid]);

//     if (result.rows.length > 0) {
//       res.status(200).json({
//         data: result.rows[0], // Send the updated city data in the response
//       });
//     } else {
//       res.status(404).json({ error: 'City not found' });
//     }
//   } catch (error) {
//     console.error('Error updating city:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.post('/getcity', async (req, res) => {
//     try {
//       const { page, limit } = req.body;
//         console.log(typeof page,typeof limit )
//       // First query to get the total count
//       const totalCountQuery = await client.query('SELECT COUNT(*) FROM city WHERE isdeleted = false');
//       const totalCount = totalCountQuery.rows[0].count;
  
//       // Second query to get paginated city data with additional details
//       const result = await client.query(
//         'SELECT city.*, state.statename, country.countryname ' +
//         'FROM city ' +
//         'INNER JOIN state ON city.stateid = state.stateid ' +
//         'INNER JOIN country ON city.countryid = country.countryid ' +
//         'WHERE city.isdeleted = false ' +
//         'LIMIT $1 OFFSET $2',
//         [limit, (page - 1) * limit]
//       );
  
//       res.status(200).json({
//         data: result.rows,
//         pagination: {
//           totalCount,
//           totalPages: Math.ceil(totalCount / limit),
//           currentPage: page,
//         },
//       });
//     } catch (error) {
//       console.error('Error fetching city data:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });


router.post('/getcity', async (req, res) => {
  try {
    const { page, limit, sort ,column} = req.body;

    // First query to get the total count
    const totalCountQuery = await client.query('SELECT COUNT(*) FROM city WHERE isdeleted = false');
    const totalCount = totalCountQuery.rows[0].count;

    // Second query to get paginated city data with additional details
    let query = 'SELECT city.*, state.statename, country.countryname ' +
                'FROM city ' +
                'INNER JOIN state ON city.stateid = state.stateid ' +
                'INNER JOIN country ON city.countryid = country.countryid ' +
                'WHERE city.isdeleted = false ';

    if (sort && column) {
      query += `ORDER BY ${column} ${sort === 'desc' ? 'DESC' : 'ASC'} `;
    } 

    query += 'LIMIT $1 OFFSET $2';

    const result = await client.query(query, [limit, (page - 1) * limit]);

    res.status(200).json({
      data: result.rows,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    console.error('Error fetching city data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  router.post('/getstatedata', async (req, res) => {
    try {
      const { countryname } = req.body;
  
      // Check if countryName is provided
      if (!countryname) {
        return res.status(400).json({ error: 'Country name is required' });
      }
  
      // Use a join to get states for the given country
      const result = await client.query('SELECT state.* FROM state JOIN country ON state.countryid = country.countryid WHERE country.countryname = $1 AND state.isdeleted = false', [countryname]);
  
      res.status(200).json({
        data: result.rows,
      });
    } catch (error) {
      console.error('Error fetching state data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/search', async (req, res) => {
    try {
        const { search } = req.body;
        const pageSize = 10;
        const result = await client.query(
            `SELECT city.*, state.statename, country.countryname
             FROM city
             JOIN state ON city.stateid = state.stateid
             JOIN country ON city.countryid = country.countryid
             WHERE city.isdeleted = false 
             AND (city.cityname ILIKE $1 OR state.statename ILIKE $1 OR country.countryname ILIKE $1)`,
            [`%${search}%`]
        );
  
        // Calculate total pages and count based on the length of the result.rows array
        const totalPages = Math.ceil(result.rows.length / pageSize); // Adjust pageSize according to your needs
        const totalCount = result.rows.length;
        const currentPage = 0;
        res.status(200).json({
            data: result.rows,
            pagination: {
                totalPages,
                totalCount,
                currentPage,
            },
        });
    } catch (error) {
        console.error('Error during city search:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  router.post('/sort/:tablename', async (req, res) => {
    try {
      const { page, limit, sortOrder, columnname } = req.body;
      const { tablename } = req.params;
  
      // Validate the columnname to prevent SQL injection
      const allowedColumns = ['countryname', 'statename', 'cityname'];
      if (!allowedColumns.includes(columnname)) {
        return res.status(400).json({ error: 'Invalid column name' });
      }
  
      // First query to get the total count
      const totalCountQuery = await client.query(`SELECT COUNT(*) FROM ${tablename} WHERE isdeleted = false`);
      const totalCount = totalCountQuery.rows[0].count;
  
      // Build the dynamic query based on the column name
      const query = `
        SELECT ${tablename}.*, country.countryname, state.statename
        FROM ${tablename}
        JOIN country ON ${tablename}.countryid = country.countryid
        JOIN state ON ${tablename}.stateid = state.stateid
        WHERE ${tablename}.isdeleted = false
        ORDER BY ${columnname} ${sortOrder === 'asc' ? 'ASC' : 'DESC'}
        LIMIT $1 OFFSET $2
      `;
  
      const result = await client.query(query, [limit, (page - 1) * limit]);
  
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
  
//   router.post('/checkDuplicateCity', async (req, res) => {
//   try {
//     const { cityName,StateID } = req.body;

//     // Check for duplicate city name
//     // const duplicateCity = await client.query(
//     //   'SELECT COUNT(*) FROM city WHERE LOWER(cityname) = LOWER($1) AND isdeleted = false',
//     //   [cityName.toLowerCase()]
//     // );

//     const duplicateCity = await client.query(
//       'SELECT COUNT(*) FROM city WHERE LOWER(cityname) = LOWER($1) AND stateid = $2 AND isdeleted = false',
//       [cityName.toLowerCase(), StateID]
//     );

//     res.status(200).json({
//       isDuplicate: duplicateCity.rows[0].count > 0, // Check the count in the first row
//     });
//   } catch (error) {
//     console.error('Error checking duplicate city name:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
  
  

module.exports = router;