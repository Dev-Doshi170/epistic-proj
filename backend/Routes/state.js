const express = require("express");
const client = require('../db')
const router = express.Router();
router.use(express.json()); 






router.post('/getstatedata', async (req, res) => {
  try {
    const { page, limit, order, column } = req.body;

    const totalCountQuery = await client.query('SELECT COUNT(*) FROM state WHERE isdeleted = false');
    const totalCount = totalCountQuery.rows[0].count;

    let query = 'SELECT state.*, country.countryname FROM state JOIN country ON state.countryid = country.countryid WHERE state.isdeleted = false';

    if (order && column) {
      query += ` ORDER BY ${column} ${order}`;
    }

    query += ' LIMIT $1 OFFSET $2';

    // Execute the query
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
    console.error('Error fetching state data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  router.get('/getcountrydata', async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM country WHERE isdeleted = false');
  
      res.status(200).json({
        data: result.rows,
      });
    } catch (error) {
      console.error('Error fetching state data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


  // router.delete('/deletestate', async (req, res) => {
  //   const { stateid } = req.body;
  
  //   let result = await client.query('UPDATE state SET isdeleted = true WHERE stateid = $1', [stateid]);
  
  //   if (result) {
  //     res.status(200).json({ message: "state deleted" });
  //   } else {
  //     console.log("Failed to delete state", err);
  //     res.status(500).json({ message: "Failed to remove state" });
  //   }
  // });
  
  // router.delete('/deletestate', async (req, res) => {
  //   try {
  //     const { stateid ,page, limit} = req.body;
  //     console.log( stateid ,page, limit)
  
  //     // Check if there are existing cities for the state
  //     const existingCities = await client.query(
  //       'SELECT COUNT(*) FROM city WHERE stateid = $1 AND isdeleted = false',
  //       [stateid]
  //     );
  
  //     if (existingCities.rows[0].count > 0) {
  //       // If there are existing cities, do not delete the state
  //       return res.status(200).json({ error: 'Cannot delete state with existing cities' });
  //     }
  
  //     // Update the state and mark it as deleted
  //     const result = await client.query('UPDATE state SET isdeleted = true WHERE stateid = $1', [stateid]);
  
  //     if (result) {

  //       const totalCountQuery = await client.query('SELECT COUNT(*) FROM state WHERE isdeleted = false');
  //     const totalCount = totalCountQuery.rows[0].count;

  //     let query =
  //       'SELECT state.*, country.countryname FROM state JOIN country ON state.countryid = country.countryid WHERE state.isdeleted = false LIMIT $1 OFFSET $2';

  //     // Execute the query
  //     const result = await client.query(query, [limit, (page - 1) * limit]);

  //     res.status(200).json({
  //       data: result.rows,
  //       pagination: {
  //         totalCount,
  //         totalPages: Math.ceil(totalCount / limit),
  //         currentPage: page,
  //         message: 'State deleted successfully' 
  //       },
  //     });
  //     } else {
  //       console.error('Failed to delete state');
  //       res.status(500).json({ error: 'Failed to remove state' });
  //     }
  //   } catch (error) {
  //     console.error('Error deleting state:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });

  router.delete('/deletestate', async (req, res) => {
    try {
      const { stateid, page = 1, limit = 5 } = req.body;
      console.log('Deleting state:', stateid, 'Page:', page, 'Limit:', limit);
  
      // Check if there are existing cities for the state
      const existingCities = await client.query(
        'SELECT COUNT(*) FROM city WHERE stateid = $1 AND isdeleted = false',
        [stateid]
      );
  
      if (existingCities.rows[0].count > 0) {
        // If there are existing cities, do not delete the state
        return res.status(200).json({ error: 'Cannot delete state with existing cities' });
      }
  
      // Update the state and mark it as deleted
      const result = await client.query('UPDATE state SET isdeleted = true WHERE stateid = $1', [stateid]);
  
      if (result) {
        const totalCountQuery = await client.query('SELECT COUNT(*) FROM state WHERE isdeleted = false');
        const totalCount = totalCountQuery.rows[0].count;
  
        let query =
          'SELECT state.*, country.countryname FROM state JOIN country ON state.countryid = country.countryid WHERE state.isdeleted = false LIMIT $1 OFFSET $2';
  
        // Execute the query
        const result = await client.query(query, [limit, (page - 1) * limit]);
  
        console.log('State deleted successfully:', result.rows);
  
        res.status(200).json({
          data: result.rows,
          pagination: {
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            message: 'State deleted successfully',
          },
        });
      } else {
        console.error('Failed to delete state');
        res.status(500).json({ error: 'Failed to remove state' });
      }
    } catch (error) {
      console.error('Error deleting state:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

router.post('/addstate', async (req, res) => {
  try {
    const { statename, countryid, page, limit } = req.body;


    // Check if a state with the same name and isdeleted = true exists

    const duplicateState = await client.query(
      'SELECT COUNT(*) FROM state WHERE LOWER(statename) = LOWER($1) AND countryid = $2 AND isdeleted = false',
      [statename, countryid]
    );

    if (duplicateState.rows[0].count > 0) {
      // Duplicate city found in the same state
      return res.status(400).json({ error: 'State with the same name already exists in the specified State' });
    }

    const existingState = await client.query(
      'SELECT * FROM state WHERE LOWER(statename) = LOWER($1) AND isdeleted = true',
      [statename]
    );

    if (existingState.rows.length > 0) {
      // Update the existing state with new countryid
      const updateResult = await client.query(
        'UPDATE state SET countryid = $1,statename = $2, isdeleted = false WHERE LOWER(statename) = LOWER($3) ',
        [countryid,statename, statename]
      );

      const totalCountQuery = await client.query('SELECT COUNT(*) FROM state WHERE isdeleted = false');
      const totalCount = totalCountQuery.rows[0].count;

      let query =
        'SELECT state.*, country.countryname FROM state JOIN country ON state.countryid = country.countryid WHERE state.isdeleted = false LIMIT $1 OFFSET $2';

      // Execute the query
      const result = await client.query(query, [limit, (page - 1) * limit]);

      res.status(200).json({
        data: result.rows,
        pagination: {
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page,
        },
      });
      // const updatedState = updateResult.rows[0];

      // res.status(200).json({
      //   data: updatedState, // Return an array with the updated state
      //   pagination: {
      //     totalCount: existingState.rows.length, // Update the total count accordingly
      //     totalPages: 1,
      //     currentPage: 1,
      //   },
      // });
    } else {
      // Insert a new state
      const insertResult = await client.query(
        'INSERT INTO state (statename, countryid) VALUES ($1, $2) RETURNING *',
        [statename, countryid]
      );

      const totalCountQuery = await client.query('SELECT COUNT(*) FROM state WHERE isdeleted = false');
      const totalCount = totalCountQuery.rows[0].count;

      let query =
        'SELECT state.*, country.countryname FROM state JOIN country ON state.countryid = country.countryid WHERE state.isdeleted = false LIMIT $1 OFFSET $2';

      // Execute the query
      const result = await client.query(query, [limit, (page - 1) * limit]);

      res.status(200).json({
        data: result.rows,
        pagination: {
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page,
        },
      });
    }
  } catch (error) {
    console.error('Error adding/updating state:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


    router.put('/stateupdate', async (req, res) => {
      try {
          const { stateid, statename, countryid } = req.body;
        
          const duplicateState = await client.query(
            'SELECT * FROM state WHERE LOWER(statename) = LOWER($1) AND isdeleted = false',
            [statename]
          );
            console.log(duplicateState.rows[0])
          if (duplicateState.rows[0].countryid === countryid && duplicateState.rows[0].statename === statename) {
            // Duplicate city found in the same state
            console.log(duplicateState.rows[0])
            return res.status(400).json({ error: 'State with the same name already exists in the specified State' });
          }

          const result = await client.query(
              'UPDATE state SET statename = $1, countryid = $2 WHERE stateid = $3 RETURNING *',
              [statename, countryid, stateid]
          );

          const fResult = await client.query(
            'SELECT s.*, c.countryname FROM state s JOIN country c ON s.countryid = c.countryid WHERE s.stateid = $1',
            [stateid]
          )
            console.log(fResult.rows[0])
          const updateddata = fResult.rows[0];
         
         if(!updateddata){
          res.status(404).json({ message: "State not found" });
         }else{
          res.status(200).json({updatedstate :updateddata});
         }
          
      } catch (error) {
          console.error('Error updating state:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  });
  
  router.post('/search', async (req, res) => {
    try {
      const { search } = req.body;
      const pageSize = 10; 
      const result = await client.query(
        `SELECT state.*, country.countryname 
         FROM state 
         JOIN country ON state.countryid = country.countryid
         WHERE state.isdeleted = false 
         AND (state.statename ILIKE $1 OR country.countryname ILIKE $1)`,
        [`%${search}%`]
      );
  
      // Calculate total pages and count based on the length of the result.rows array
      const totalPages = Math.ceil(result.rows.length / pageSize); // Adjust pageSize according to your needs
      const count = result.rows.length;
  
      res.status(200).json({ result: result.rows, totalPages, count });
    } catch (error) {
      console.error('Error during state search:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/sort/:tablename', async (req, res) => {
    try {
      const { page, limit, sortOrder,columnname } = req.body;
      const { tablename } = req.params;
  
      // First query to get the total count
      const totalCountQuery = await client.query(`SELECT COUNT(*) FROM ${tablename} WHERE isdeleted = false`);
      const totalCount = totalCountQuery.rows[0].count;
      let query
      if (columnname == "statename"){
        query = `
        SELECT ${tablename}.*, country.countryname
        FROM ${tablename}
        JOIN country ON ${tablename}.countryid = country.countryid
        WHERE ${tablename}.isdeleted = false 
        ORDER BY ${columnname} ${sortOrder === 'asc' ? 'ASC' : 'DESC'}
        LIMIT $1 OFFSET $2
        `;
      }

          if (columnname === 'countryname') {
            query = `
              SELECT ${tablename}.*, country.countryname
              FROM ${tablename}
              JOIN country ON ${tablename}.countryid = country.countryid
              WHERE ${tablename}.isdeleted = false 
              ORDER BY ${columnname} ${sortOrder === 'asc' ? 'ASC' : 'DESC'}
              LIMIT $1 OFFSET $2
            `;
          }
      
          
  
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

  // router.post('/checkDuplicateState', async (req, res) => {
  //   try {
  //     const { stateName,CountryId } = req.body;
  
  //     // Check for duplicate city name
  //     const duplicateCity = await client.query(
  //       'SELECT COUNT(*) FROM state WHERE LOWER(statename) = LOWER($1) AND isdeleted = false',
  //       [stateName]
  //     );
  
  //     res.status(200).json({
  //       isDuplicate: duplicateCity.rows[0].count > 0, // Check the count in the first row
  //     });
  //   } catch (error) {
  //     console.error('Error checking duplicate state name:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });

 
module.exports = router;