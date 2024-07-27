const { sql, config } = require('../dbconfig');

module.exports = async function (context, req) {
    try {
    const pool = await sql.connect(config);

    switch (req.method) {
        case 'GET':
            if(req.query.id){
                const result =await pool.request().query(`SELECT Clinic.*, 
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
            }
            else{

            }
          // Handle GET request
          console.log('Handling GET request');
          break;
        case 'POST':
    // Handle PUT request
    // console.log('Handling PUT request');
    const clinicData = req.body;

    const result = await pool.request()
    .input('id',sql.Int,7)
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
        .query(`
                INSERT INTO Clinic (
                    id,
                    name, 
                    address, 
                    tel, 
                    openingTime,
                    closingTime,
                    isClinic, 
                    [public], 
                    open24Hours, 
                    email, 
                    website
                ) VALUES (
                    @id,
                    @name, 
                    @address, 
                    @tel, 
                    @openingTime,
                    @closingTime,
                    @isClinic, 
                    @public, 
                    @open24Hours, 
                    @email, 
                    @website
                );
                SELECT SCOPE_IDENTITY() AS id;
            `);
    console.log(result);
    const clinicId = 7;
    // console.log(clinicId);
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
        // case 'PUT':
        //   // Handle PUT request
        //   console.log('Handling PUT request');
        //   break;
        // case 'DELETE':
        //   // Handle DELETE request
        //   console.log('Handling DELETE request');
        //   break;
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