const express = require('express')
const client = require('../db')
const router = express.Router();

// const pagination = async(tableName, page, limit, search, code) => {

//     const offSet = (page - 1) * limit

//     let params;

//     switch (tableName) {

//         case 'country':
            
//              pool.query = 
//             `select * from ${tableName} where isdeleted = false
//             and countryname ilike $1 or countrycode $1 or phonecode = $2
//             order by countryname asc limit $3 offset $4
//             `;
//             params = [%${search}%,code, limit,offSet]   
//             break;

//         case 'state':
            
//             pool.query = 
//             `select * from ${tableName} where isdeleted = false
//             and statename ilike $1
//             order by countryname asc limit $2 offset $3`;

//             params = [%${search}%, limit, offSet]   
//             break;

//         case 'city' :

//             pool.query = 
//             `select * from ${tableName} where isdeleted = false
//             and cityname ilike $1 order by cityname limit $2 offset $3`;

//             params = [%${search}%,limit,offSet]
//             break;
    
//         default:
//             throw new Error('Invalid table name');
//     }

// }
const pagination = async(tableName, page, limit, search, code) => {
    
    const offSet = (page - 1) * limit;
    
    let params;

    
    let codeparam = code || ''
    let intCode = parseInt(codeparam)
    console.log(  typeof intCode)

    
    
    switch (tableName) {
        case 'country':
            params = [`%${search}%`, `%${search}%`, intCode];
            return await client.query(
                `SELECT * FROM ${tableName} WHERE isdeleted = false
                AND (countryname ILIKE $1 OR countrycode ILIKE $2 OR phonecode::text ILIKE $3)`,
              params
             );
        case 'state':
             params = [`%${search}%`, limit, offSet]   
             return await client.query(
                `SELECT * FROM ${tableName} WHERE isdeleted = false
                 AND statename ILIKE $1
                 ORDER BY statename ASC
                 LIMIT $2 OFFSET $3`,
                params
             );
        case 'city':
             params = [`%${search}%`,limit,offSet];
             return await client.query(
                `SELECT * FROM ${tableName} WHERE isdeleted = false
                 AND cityname ILIKE $1
                 ORDER BY cityname ASC
                 LIMIT $2 OFFSET $3`,
                params
             );
        default:
            throw new Error('Invalid table name');
    }
}




router.post('/pagination/:tableName' , async(req,res)=> {

    try {

        const { tableName } = req.params;
        const { page,limit,code,search } = req.body
        
        // console.log(typeof code)
        const result = await pagination(tableName, page, limit, search, code)

        // console.log(result)

        res.status(200).json({result : result.rows})
    } catch (error) {
        console.error('Error during pagination:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

module.exports = router