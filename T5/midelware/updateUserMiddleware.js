const { handleHttpError } = require("../utils/handleError");
const updateUserMiddleware = (req, res, next) =>{
    try{
        const {id} = req.params;
        if(req.user.role.includes('admin'))
            next()
        else if(id === req.user._id){
            req.body.role = ['user']
            next()
        }
        else
            handleHttpError(res, 'NO_AUTORIZADO')
    }catch(error){
        handleHttpError(res, 'NO_AUTORIZADO')
    }
}
module.exports=updateUserMiddleware