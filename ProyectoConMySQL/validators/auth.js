const {check} = require ("express-validator")
const validateResults = require("../utils/handleValidator")
const validatorCreateItem = [
    check("name").exists().notEmpty().isLength({min:3, max:99}),
    check("age").exists().isNumeric(),
    check("email").exists().isEmail(),
    check("password").exists().isLength({min:8, max:16}),
    validateResults
];

const validatorLogin = [
    check("email").exists().isEmail(),
    check("password").exists().isLength({min:8, max:16}),
    validateResults
]
module.exports={validatorCreateItem, validatorLogin}