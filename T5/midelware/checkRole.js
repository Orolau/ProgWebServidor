const {handleHttpError} = require ("../utils/handleError");

const checkRoleMiddleware = (roles) => (req, res, next) =>{
    try{
        const user = req.user
        const userRole = user.role
        if(roles.includes(userRole[0]))
            next()
        else
            handleHttpError(res, "NO_AUTORIZADO", 403)
        
    }catch(err){
        handleHttpError(res, "NO_AUTORIZADO", 403)
    }
}
module.exports = checkRoleMiddleware