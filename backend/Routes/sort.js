const express = require('express')
const client = require('../db')
const router = express.Router();


router.post('/sort/:tablename', async (req, res) => {
  try {
    const { page, limit, sortOrder,columnname } = req.body;
    const { tablename } = req.params;

    // First query to get the total count
    const totalCountQuery = await client.query(`SELECT COUNT(*) FROM ${tablename} WHERE isdeleted = false`);
    const totalCount = totalCountQuery.rows[0].count;

    // Construct the SQL query with sorting
    const query = `
      SELECT * FROM ${tablename}
      WHERE isdeleted = false 
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


  module.exports = router