const { sql, config } = require('../dbconfig');

module.exports = async function (context, req) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('Select * from Test');
        console.log(result);
        context.res = {
            body: "Connected to the database"
        };
    } catch (err) {
        console.log(err);
        context.res = {
            status: 500,
            body: "Error connecting to the database"
        };
    } finally {
        sql.close();
    }
};