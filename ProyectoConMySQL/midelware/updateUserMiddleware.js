const { handleHttpError } = require("../utils/handleError");
const updateUserMiddleware = (req, res, next) =>{
    try{
        const {id} = req.params;
        console.log(id)
        if(req.user.role.includes('admin'))
            next()
        else if(id === req.user.id){
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