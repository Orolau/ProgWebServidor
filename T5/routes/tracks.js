const express = require("express");
const router = express.Router();
const {getItems, getItem, createItem, updateItem, deleteItem} = require("../controllers/tracks.js");
const {validatorCreateItem, validatorGetItem} = require("../validators/tracks.js");
const customHeader = require("../midelware/customHeader.js");
const authMiddleware = require("../midelware/session.js");
const checkRole = require("../midelware/checkRole.js")

router.get("/", customHeader, authMiddleware, getItems);
router.get("/:id", validatorGetItem, customHeader, getItem);
router.post("/", validatorCreateItem, authMiddleware, checkRole(['admin']), customHeader, createItem);
router.delete("/:id", validatorGetItem, customHeader, deleteItem);
router.put("/:id", validatorGetItem, customHeader, updateItem);

module.exports = router;