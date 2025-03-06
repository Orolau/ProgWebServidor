const express = require("express");
const router = express.Router();
const {getItems, getItem, createItem, updateItem, deleteItem, updateRole} = require("../controllers/user.js");
const {validatorCreateItem, validatorGetItem} = require("../validators/user.js");
const customHeader = require("../midelware/customHeader.js");
const authMiddleware = require("../midelware/session.js");
const checkRole = require("../midelware/checkRole.js")
const updateUserMiddleware = require("../midelware/updateUserMiddleware.js")

router.get("/", customHeader, getItems);
router.get("/:id",validatorGetItem, customHeader, getItem);
router.post("/", validatorCreateItem, customHeader, createItem);
router.delete("/:id", validatorCreateItem, customHeader, deleteItem);
router.put("/:id", validatorCreateItem, authMiddleware, updateUserMiddleware , customHeader, updateItem);
router.put("/role/:id", customHeader, authMiddleware, checkRole(['admin']), updateRole);

module.exports = router;