const express = require("express");
const client = require('../db')
const router = express.Router();
router.use(express.json()); 




// router.get('/getstate',async(req,res)=>{
//     //res.send("hello");
//     const { countryid } = req.body;
//     //const { statename, countryname } = req.body; 

//     let result = await client.query('Select * from state where countryid = $1', [countryid]);
//     res.send(result.rows)
// })

router.post('/getstatedata', async (req, res) => {
    try {
      const { page, limit } = req.body;

      const totalCountQuery = await client.query('SELECT COUNT(*) FROM state WHERE isdeleted = false ');
      const totalCount = totalCountQuery.rows[0].count;
  
      // Second query to get paginated states for the specified country
      const result = await client.query(
        'SELECT state.*, country.countryname FROM state JOIN country ON state.countryid = country.countryid WHERE state.isdeleted = false LIMIT $1 OFFSET $2; ',
        [limit, (page - 1) * limit]
      );
  
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
  


  router.delete('/deletestate', async (req, res) => {
    const { stateid } = req.body;
  
    let result = await client.query('UPDATE state SET isdeleted = true WHERE stateid = $1', [stateid]);
  
    if (result) {
      res.status(200).json({ message: "state deleted" });
    } else {
      console.log("Failed to delete state", err);
      res.status(500).json({ message: "Failed to remove state" });
    }
  });
  

router.post('/addstate', async(req,res)=>{
    const { statename, countryid } = req.body;

    const result =  await client.query(
        'INSERT INTO state (statename,countryid) VALUES ($1, (SELECT countryid FROM country WHERE countryname = $2)) RETURNING *',[statename, countryid]
    )
        
    if(result) {
        res.status(200).json({message: "state added"})
    }else{
        console.log("Failed to add state", err)
        res.status(500).json({message: "Failed to add state"})
    }
    })

    router.put('/stateupdate', async (req, res) => {
      try {
          const { stateid, statename, countryid } = req.body;
  
       
          const result = await client.query(
              'UPDATE state SET statename = $1, countryid = $2 WHERE stateid = $3 RETURNING *',
              [statename, countryid, stateid]
          );
  
         
          if (result.rowCount > 0) {
              res.status(200).json(result.rows[0]);
          } else {
              res.status(404).json({ message: "State not found" });
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

  router.post('/checkDuplicateState', async (req, res) => {
    try {
      const { stateName } = req.body;
  
      // Check for duplicate city name
      const duplicateCity = await client.query(
        'SELECT COUNT(*) FROM state WHERE LOWER(statename) = LOWER($1) AND isdeleted = false',
        [stateName.toLowerCase()]
      );
  
      res.status(200).json({
        isDuplicate: duplicateCity.rows[0].count > 0, // Check the count in the first row
      });
    } catch (error) {
      console.error('Error checking duplicate state name:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;