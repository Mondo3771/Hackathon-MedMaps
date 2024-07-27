const jose = require('node-jose');

module.exports = async function (context, req) {
    const jweToken = req.body.token; // Your JWE token here
    const key = process.env.DECRYPTION_KEY; // Your key here

    try {
        const result = await jose.JWK.asKey(key, 'json');
        const decrypted = await jose.JWE.createDecrypt(result).decrypt(jweToken);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: decrypted.plaintext.toString()
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: "Error decrypting token"
        };
    }
};