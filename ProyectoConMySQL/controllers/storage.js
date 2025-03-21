const { default: mongoose } = require("mongoose");
const { storageModel } = require("../models");
const { uploadToPinata } = require("../utils/handleUploadIPFS");
require("dotenv").config();

const postImage  = async (req, res) =>{
    const {body, file} = req;
    const fileData = {
        filename : file.filename,
        url : process.env.PUBLIC_URL+"/"+file.filename
    };
    const data = await storageModel.create(fileData);
    res.json(data);
}
const uploadImage = async (req, res) =>{
    try{
        const fileBuffer = req.file.buffer;
        const fileName = req.file.originalname;
        const pinataResponse = await uploadToPinata(fileBuffer, fileName);
        console.log(pinataResponse)
        const ipfsFile = pinataResponse.IpfsHash;
        const ipfs = `https://${process.env.PINATA_GATEWAY}/ipfs/${ipfsFile}`;
        const data = await storageModel.create({url: ipfs});
        console.log(data)
        res.send(data)
    }catch(err){
        console.log(err);
        res.status(500).send("ERROR_UPLOAD _COMPANY_IMAGE")
    }
}
module.exports = {postImage, uploadImage};