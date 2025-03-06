const { default: mongoose } = require("mongoose");
const { userModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const getItems = async (req, res) =>{
    try{
        const data = await userModel.find({});
        res.send({data})    
    }catch (err){
        handleHttpError(res, 'ERROR_GET_ITEMS', 403)
    }
    
}
const getItem = async (req, res) =>{
    const data = await userModel.find({});
    res.send(data);
}
const createItem = async (req, res) =>{
    try{
        const body = matchedData (req);
        const data = await userModel.create(body);
        res.send(data)    
    }catch (err){
        handleHttpError(res, 'ERROR_CREATE_ITEM', 403)
    }
    
}
const updateItem = async (req, res) =>{
    const {id} = req.params;
    const data = await userModel.findOneAndReplace({"_id": id}, req.body, {new:true});
    res.send(data);
}
const updateRole = async (req, res) =>{
    const {id} = req.params;
    const data = await userModel.findOneAndUpdate({"_id": id}, req.body, {new:true});
    res.send(data);
}
const deleteItem = async (req, res) =>{
    const {id} = req.params;
    const data = await userModel.findByIdAndDelete(id);
    res.send(data)
}
module.exports = {getItems, getItem, createItem, updateItem, deleteItem, updateRole};