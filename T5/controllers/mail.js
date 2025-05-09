const { sendEmail } = require('../utils/handleEmail.js');
const { handleHttpError}  = require('../utils/handleError.js')
const { matchedData } = require('express-validator');

const send = async (req, res) => {
    try{
        const info = matchedData(req)
        const data = await sendEmail(info)
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_SEND_EMAIL')
    }
}
module.exports = { send }