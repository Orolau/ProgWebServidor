const {check} = require ("express-validator")
const validateResults = require("../utils/handleValidator")
const validatorCreateItem = [
    
    check("album").exists().withMessage("No existe").notEmpty().withMessage("Esta vacio"),
    check("cover").exists().withMessage("No existe").notEmpty(),
    check("artist").exists().withMessage("No existe").notEmpty(),
    check("artist.name").exists().withMessage("No existe").notEmpty(),
    check("artist.nickname").exists().withMessage("No existe").notEmpty(),
    check("artist.nationality").exists().withMessage("No existe").notEmpty(),
    check("duration").exists().withMessage("No existe").notEmpty(),
    check("duration.start").exists().withMessage("No existe").notEmpty(),
    check("duration.end").exists().withMessage("No existe").notEmpty(),
    check("mediaId").exists().withMessage("No existe").notEmpty(),
    validateResults
];

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) =>{
        return validateResults (req, res, next)
    }
]
module.exports={validatorCreateItem, validatorGetItem}