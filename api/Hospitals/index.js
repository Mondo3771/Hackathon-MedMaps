const { sql, config } = require('../dbconfig');
const axios = require('axios');

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
        const token = req.headers['Authorization'];
        result = await pool.request()
        .input('key', sql.VarChar(255), token)
        .query(`
        select * from Admin where [key] = @key
        `)
        if(result.recordset.len != 0){
            const clinicData = req.body;
      console.log(typeof process.env.AUTH0_MANAGEMENT_API_TOKEN);
      const t = process.env.AUTH0_MANAGEMENT_API_TOKEN;
      const mtoken = t.trim();
            // Create a new user in Auth0
            const auth0Response = await axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users`, {
                connection: 'Username-Password-Authentication', // Replace with your connection name
                email: clinicData.Email,
                password: clinicData.Password,
                username: clinicData.Name.split(' ').join(''),
                user_metadata: { /* Any additional user metadata */ }
            }, {
                headers: { authorization: `Bearer ${mtoken}` }
            });
            const auth0UserId = auth0Response.data.user_id;
            console.log(auth0UserId);
            console.log(clinicData.openingTime);
            result = await pool.request()
                .input('name', sql.VarChar(255), clinicData.Name)
                .input('address', sql.VarChar(255), clinicData.Address)
                .input('tel', sql.VarChar(50), clinicData.tel)
                .input('openingTime', sql.Time, new Date(`1970-01-01T${clinicData.OpeningTime}Z`))
                .input('closingTime', sql.Time, new Date(`1970-01-01T${clinicData.ClosingTime}Z`))
                .input('isClinic', sql.Bit, clinicData.isClinic)
                .input('public', sql.Bit, clinicData.public)
                .input('open24Hours', sql.Bit, clinicData.Open24Hours)
                .input('email', sql.VarChar(255), clinicData.Email)
                .input('website', sql.VarChar(255), clinicData.Website)
                .input('key',sql.NVarChar(255),auth0UserId)
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
            const clinicId = result.recordset[0].id;
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
        }
        else{
            context.res ={
                status :200,
                body:"Incorrect Sub"
            }
        }
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
context.res={
    body : "Clinic Updated successfully"
}
          break;
    
        default:
          console.log('Invalid method');
      }  
    }
    catch (err) {
        console.log(err);
        context.res = {
            status: 500,
            body: "Error connecting to the database",err
        };
    } finally {
        sql.close();
    }
    };