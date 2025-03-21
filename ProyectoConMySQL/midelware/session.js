const {handleHttpError} = require ("../utils/handleError");
const {verifyToken} = require("../utils/handleJwt");
const {userModel} = require("../models/index.js");
const getProperties = require ('../utils/handlePropertiesEngine.js');
const propertiesKey = getProperties()

const authMiddleware = async (req, res, next ) =>{
    try{
        if(!req.headers.authoritation){
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }
        const token = req.headers.authoritation.split(' ').pop()
        const dataToken = await verifyToken(token)

        if(!dataToken){
            handleHttpError(res, "ERROR_ID_TOKEN", 401)
            return 
        }
        const query = {
            [propertiesKey.id]: dataToken[propertiesKey.id]
        }
        const user = await userModel.findOne(query)
        req.user = user
        next()
    }catch(err){
        handleHttpError(res, "NOT_SESSION", 401)
    }
}
module.exports = authMiddleware