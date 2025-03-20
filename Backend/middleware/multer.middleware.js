const multer = require('multer')

const storage = multer.diskStorage({
    
    //the destination of the folder where you want to save the temporary files
    destination: 
        function (req, file, cb){ 
            cb(null, "./public/temp") 
        } ,

    //name of the file which you want to save on cloudinary...
    filename: 
        function (req, file, cb) {
             cb(null, file.originalname) 
        }
})


const upload = multer({storage,})

module.exports = upload