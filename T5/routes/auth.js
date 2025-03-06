const express = require("express");
const router = express.Router();
const { validatorCreateItem, validatorLogin } = require("../validators/auth.js");
const { matchedData } = require("express-validator")
const { userModel } = require("../models/index.js");
const { encrypt, compare } = require("../utils/handlePassword.js");
const { tokenSign } = require("../utils/handleJwt.js");
const { default: mongoose } = require("mongoose");
const {handleHttpError} = require("../utils/handleError.js")

router.post("/register", validatorCreateItem, async (req, res) => {
    req = matchedData(req)
    const password = await encrypt(req.password)
    const body = { ...req, password }
    const dataUser = await userModel.create(body)
    dataUser.set('password', undefined, { strict: false })
    const data = {
        token: await tokenSign(dataUser),
        user: dataUser
    }
    res.send(data)
})

router.post("/login", validatorLogin, async (req, res) => {
    try {
        req = matchedData(req)
        const user = await userModel.findOne({ email: req.email }).select("password name role email")
        if (!user) {
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)
        if (!check) {
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }
        user.set("password", undefined, { strict: false }) //Si no queremos que se muestre el hash en la respuesta
        const data = {
            token: await tokenSign(user),
            user
        }
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
})

module.exports = router;