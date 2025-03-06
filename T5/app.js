const express = require("express")
const cors = require("cors");
require('dotenv').config();
const dbConnect = require("./config/mongo.js");
const router = require('./routes/index.js')

const app = express();

app.use(cors());
app.use(express.json())//para poder usar directamente el req.body de las peticiones que nos llegan

app.use(express.static("storage")); //http://localhost:3004/file.jpg

app.use("/api", router);

const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log("Servidor escuchando en el puerto " + port);
    dbConnect();
})