const express = require("express");
const router = express.Router();
const {uploadMiddleware, uploadMiddlewareMemory} = require("../utils/handleStorage.js");


const {postImage, uploadImage} = require("../controllers/storage.js");

router.post("/local", uploadMiddleware.single("image"), postImage);
router.post("/memory", uploadMiddlewareMemory.single("image"),(err, req, res, next) => {
    if(err){
        res.status(413).send("Error: "+ err.message)
    }
} , uploadImage)


module.exports = router;