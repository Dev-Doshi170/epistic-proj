const { Pool } = require ('pg')

const client = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'dev',
})
   client.connect((err) => {   
    if (err) {
     console.error('connection error', err.stack)
    }else{
     console.log('connected')}
    })

   module.exports = client;

dont show the database credenetials direct in github
