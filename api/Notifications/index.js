const { sql, config } = require('../dbconfig');

module.exports = async function (context, req) {
    let Data;
    try {
    const pool = await sql.connect(config);
    let result="";
    switch (req.method) {
        case 'GET':
      let clinicId =req.query.id ; // replace with your clinic ID
const result = await pool.request()
    .input('clinicId', sql.Int, clinicId)
    .query(`
        SELECT * 
        FROM Notifications 
        WHERE clinicId = @clinicId
    `);

console.log(result.recordset);
context.res = {
body:result.recordset
}
          break;
   case 'POST':
     Data = req.body;
    console.log(Data.time);
    console.log(Data);
    const insertResult = await pool.request()
        .input('title', sql.NVarChar, Data.title)
        .input('details', sql.Text, Data.details)
        .input('time', sql.DateTime, new Date(Data.time))
        .input('clinicId', sql.Int, Data.clinicId)
        .query(`
            INSERT INTO Notifications ( title, details, time, clinicId)
            VALUES ( @title, @details, @time, @clinicId)
        `);
    context.res = {
        body: "Notification inserted successfully"
    };
    break;
    case 'DELETE':
     Data = req.body;
    const deleteResult = await pool.request()
        .input('messageID', sql.Int, Data.messageID)
        .query(`
            DELETE FROM Notifications 
            WHERE messageID = @messageID
        `);
    context.res = {
        body: "Notification deleted successfully"
    };
        break;
        default:
          console.log('Invalid method');
      }  
    }
    catch (err) {
        console.log(err);
        context.res = {
            status: 500,
            body: "Error connecting to the database"
        };
    } finally {
        sql.close();
    }
    };