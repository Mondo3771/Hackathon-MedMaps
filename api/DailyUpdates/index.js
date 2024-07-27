const { sql, config } = require('../dbconfig');

module.exports = async function (context, req) {
    try {
        const pool = await sql.connect(config);
        let result="";
        let clinicId;
        let data;
        switch (req.method) {
            case 'GET':
         clinicId =req.query.id ; // replace with your clinic ID
     result = await pool.request()
        .input('clinicId', sql.Int, clinicId)
        .query(`
           SELECT Capacity, Beds, EmergencyRooms, Ailment
FROM Clinic
WHERE clinicId = @clinicId
        `);
    
    console.log(result.recordset);
    context.res = {
    body:result.recordset
    }
              break;
            case 'PUT':
    let Data = req.body;
    const updateResult = await pool.request()
        .input('clinicId', sql.Int, Data.clinicId)
        .input('Capacity', sql.VarChar, Data.Capacity)
        .input('Beds', sql.Int, Data.Beds)
        .input('EmergencyRooms', sql.Bit, Data.EmergencyRooms)
        .input('Ailment', sql.NVarChar, Data.Ailment)
        .query(`
            UPDATE Clinic
            SET Capacity = @Capacity, Beds = @Beds, EmergencyRooms = @EmergencyRooms, Ailment = @Ailment
            WHERE id = @clinicId
        `);
    context.res = {
        body: "Clinic updated successfully"
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