const {check} = require ("express-validator")
const validateResults = require("../utils/handleValidator")
const validatorCreateItem = [
    check("name").exists(),
    check("album").exists().withMessage("No existe").notEmpty().withMessage("Esta vacio"),
    check("cover").exists().withMessage("No existe").notEmpty(),
    check("artist_name").exists().withMessage("No existe").notEmpty(),
    check("artist_nickname").exists().withMessage("No existe").notEmpty(),
    check("artist_nationality").exists().withMessage("No existe").notEmpty(),
    check("duration_start").exists().withMessage("No existe").notEmpty(),
    check("duration_end").exists().withMessage("No existe").notEmpty(),
    check("mediaId").exists().withMessage("No existe").notEmpty(),
    validateResults
];

const validatorGetItem = [
    check("id").exists().notEmpty(),
    (req, res, next) =>{
        return validateResults (req, res, next)
    }
]
module.exports={validatorCreateItem, validatorGetItem}