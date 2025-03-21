const { default: mongoose } = require("mongoose");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const getItems = async (req, res) =>{
    try{
        const user = req.user;
        const data = await tracksModel.find({});
        res.send({data, user});
    }catch (err){
        handleHttpError(res, 'ERROR_GET_ITEMS', 403);
    }
    
}
const getItem = async (req, res) =>{
    const data = await tracksModel.find({});
    res.send(data);
}
const createItem = async (req, res) =>{
    try{
        //const user = req.user;
        const body = matchedData (req);
        console.log(body)
        const data = await tracksModel.create(body);
        
        res.send(data);
        // if(user.role.includes('admin')){
        //     const data = await tracksModel.create(body);
        //     res.send(data);     
        // }else{
        //     res.status(403).send({error: "AUTHORITATION_ERROR"})
        // }
           
    }catch (err){
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS', 403);
    }
    
}
const updateItem = async (req, res) =>{
    const {id} = req.params;
    const data = await tracksModel.findOneAndReplace({"_id": id}, req.body, {new:true});
    res.send(data);
}
const deleteItem = async (req, res) =>{
    const {id} = req.params;
    const data = await tracksModel.delete({_id: id});
    res.send(data)
}
module.exports = {getItems, getItem, createItem, updateItem, deleteItem};