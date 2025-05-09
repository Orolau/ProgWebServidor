const {check} = require ("express-validator")
const validateResults = require("../utils/handleValidator")
const validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("age").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("password").exists().notEmpty(),
    check("role").exists().notEmpty(),
    check("age").isInt(),
    check("email").isEmail(),
    validateResults
];

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) =>{
        return validateResults (req, res, next)
    }
]
module.exports={validatorCreateItem, validatorGetItem}