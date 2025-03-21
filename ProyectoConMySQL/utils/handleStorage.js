const multer = require("multer");

const storage = multer.diskStorage({
    destination:function(req, file,callback){
        pathStorage = __dirname + "/../storage";
        callback(null, pathStorage);
    },
    filename:function(req, file, callback){
        console.log("file",  file);
        const ext = file.originalname.split('.').pop();
        const origName = file.originalname.split('.').shift();
        const filename = origName+"-file-"+ Date.now() + "." + ext;
        callback(null, filename);
    }
    
})
const memory = multer.memoryStorage();
const uploadMiddlewareMemory = multer({storage: memory, limits: {fileSize: 5*1024*1024}});

const uploadMiddleware = multer({storage, limits: {fileSize: 5*1024*1024}});
module.exports = {uploadMiddleware, uploadMiddlewareMemory};