const { handleHttpError } = require("../utils/handleError");

const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key;
        if(apiKey === process.env.API_KEY){
            next()
        }else{
            handleHttpError(res, 'API_KEY_INCORRECTA')
            res.send('API_KEY_INCORRECTA')
        }
    }catch (err){
        res.status(403).send(err)
    }
}
module.exports = customHeader;