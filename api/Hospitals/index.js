const { sql, config } = require('../dbconfig');

module.exports = async function (context, req) {
    try {
    const pool = await sql.connect(config);
    let result="";
    switch (req.method) {
        case 'GET':
          
             result =await pool.request().query(`SELECT Clinic.*, 
            STUFF((SELECT ', ' + Specialty.specialty 
            FROM Specialty 
            WHERE Clinic.id = Specialty.clinicId 
            FOR XML PATH('')), 1, 2, '') AS Specialties
            FROM Clinic`);
            const specialisations = await pool.request().quer
            console.log(result);
            context.res={
                body : result
            }
          // Handle GET request
          console.log('Handling GET request');
          break;
    case 'POST':
    // Handle PUT request
    // console.log('Handling PUT request');
    const clinicData = req.body;

    result = await pool.request()
        .input('name', sql.VarChar(255), clinicData.name)
        .input('address', sql.VarChar(255), clinicData.address)
        .input('tel', sql.VarChar(50), clinicData.tel)
 .input('openingTime', sql.Time, new Date(`1970-01-01T${clinicData.openingTime}Z`))
 .input('closingTime', sql.Time, new Date(`1970-01-01T${clinicData.closingTime}Z`))
        .input('isClinic', sql.Bit, clinicData.isClinic)
        .input('public', sql.Bit, clinicData.public)
        .input('open24Hours', sql.Bit, clinicData.open24Hours)
        .input('email', sql.VarChar(255), clinicData.email)
        .input('website', sql.VarChar(255), clinicData.website)
        .input('key',sql.NVarChar(255),clinicData.key)
        .query(`
                INSERT INTO Clinic (
               
                    name, 
                    address, 
                    tel, 
                    openingTime,
                    closingTime,
                    isClinic, 
                    [public], 
                    open24Hours, 
                    email, 
                    website,
                    [key]
                ) VALUES (
                   @name, 
                    @address, 
                    @tel, 
                    @openingTime,
                    @closingTime,
                    @isClinic, 
                    @public, 
                    @open24Hours, 
                    @email, 
                    @website,
                    @key
                );
                SELECT SCOPE_IDENTITY() AS id;
            `);
    console.log(result);
    const clinicId =result.recordset[0].id;
    console.log(clinicId);
    const specialties = clinicData.Specialties.split(",");
    for (let specialty of specialties) {
        await pool.request()
            .input('clinicId', sql.Int, clinicId)
            .input('specialty', sql.VarChar(255), specialty.trim())
            .query(`INSERT INTO Specialty (clinicId, specialty) 
                    VALUES (@clinicId, @specialty);`);
    }
    context.res = {
        status: 200,
        body: "Clinic and specialties added successfully"
    };
    break;
        case 'PUT':
            const Data = req.body;
            result = await pool.request()
            .input('id',sql.Int , Data.id)
            .input('name', sql.VarChar(255), Data.name)
            .input('address', sql.VarChar(255), Data.address)
            .input('tel', sql.VarChar(50), Data.tel)
            .input('openingTime', sql.Time, new Date(`1970-01-01T${Data.openingTime}Z`))
            .input('closingTime', sql.Time, new Date(`1970-01-01T${Data.closingTime}Z`))
            .input('isClinic', sql.Bit, Data.isClinic)
            .input('public', sql.Bit, Data.public)
            .input('open24Hours', sql.Bit, Data.open24Hours)
            .input('email', sql.VarChar(255), Data.email)
            .input('website', sql.VarChar(255), Data.website)
            .input('key',sql.NVarChar(255),Data.key)
            .query(`
                    UPDATE Clinic SET
                        name = @name, 
                        address = @address, 
                        tel = @tel, 
                        openingTime = @openingTime,
                        closingTime = @closingTime,
                        isClinic = @isClinic, 
                        [public] = @public, 
                        open24Hours = @open24Hours, 
                        email = @email, 
                        website = @website,
                        [key] = @key
                    WHERE id = @id;
                `);
                // Delete existing specialties for clinic with id 1
await pool.request()
.input('clinicId', sql.Int, Data.id)
.query('DELETE FROM Specialty WHERE clinicId = @clinicId');

// Insert new specialties for clinic with id 1
// Assuming newSpecialties is an array of new specialties for the clinic
const s = Data.Specialties;
const newSpecialties = s.split(",");
console.log(s);
for (let specialty of newSpecialties) {
await pool.request()
    .input('clinicId', sql.Int, Data.id)
    .input('specialty', sql.VarChar(255), specialty)
    .query(`
        INSERT INTO Specialty (clinicId, specialty)
        VALUES (@clinicId, @specialty);
    `);
}

// Select all specialties for clinic with id 1
let selectResult = await pool.request()
.input('clinicId', sql.Int, Data.id)
.query(`
        SELECT * FROM Specialty WHERE clinicId = @clinicId;
    `);

console.log(selectResult.recordset); // This will log all specialties for the clinic with id 1
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