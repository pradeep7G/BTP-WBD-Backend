const multer = require("multer");

const fileStorageEngine= multer.diskStorage({
    destination:(req,res,cb)=>{
      cb(null,"./images")
    },
    filename: (req,file,cb) =>{
      cb(null,Date.now()+"=="+ file.originalname)
    },   
  });
  const upload = multer({storage:fileStorageEngine});

module.exports=upload;
// const express = require('express');
// const multer = require('multer');
// // const ejs = require('ejs');
// const path = require('path');

// // Set The Storage Engine
// const storage = multer.diskStorage({
//   destination: './public/uploads/',
//   filename: function(req, file, cb){
//     cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// // Init Upload
// const upload = multer({
//   storage: storage,
//   limits:{fileSize: 1000000},
//   fileFilter: function(req, file, cb){
//     checkFileType(file, cb);
//   }
// }).single('myImage');

// // Check File Type
// function checkFileType(file, cb){
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif/;
//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);

//   if(mimetype && extname){
//     return cb(null,true);
//   } else {
//     cb('Error: Images Only!');
//   }
// }

// // Init app
// const app = express();

// // EJS
// app.set('view engine', 'ejs');

// // Public Folder
// app.use(express.static('./public'));

// app.get('/', (req, res) => res.render('index'));

// app.post('/upload', (req, res) => {
//   upload(req, res, (err) => {
//     if(err){
//       res.render('index', {
//         msg: err
//       });
//     } else {
//       if(req.file == undefined){
//         res.render('index', {
//           msg: 'Error: No File Selected!'
//         });
//       } else {
//         res.render('index', {
//           msg: 'File Uploaded!',
//           file: `uploads/${req.file.filename}`
//         });
//       }
//     }
//   });
// });

// const port = 3000;

// app.listen(port, () => console.log(`Server started on port ${port}`));
  
// //   app.post("/single",upload.single("image"),(req,res)=>{
// //     console.log(req.file);
// //     res.send("Single File upload Success");
// //   });
  
// //   app.post("/multiple",upload.array("upload",3),(req,res)=>{
// //     console.log(req.files);
// //     res.send("Multiple files upload success")
// //   })
  

// //Optional Multer Code

// // app.use('/uploads', express.static(__dirname +'/uploads'));
// //  var storage = multer.diskStorage({
// //     destination: function (req, file, cb) {
// //       cb(null, 'uploads')
// //     },
// //     filename: function (req, file, cb) {
// //       cb(null, new Date().toISOString()+file.originalname)
// //     }
// //   })
   
// //   var upload = multer({ storage: storage })
// //   app.post('/upload', upload.single('myFile'), async(req, res, next) => {
// //     const file = req.file
// //     if (!file) {
// //       const error = new Error('Please upload a file')
// //       error.httpStatusCode = 400
// //       return next("hey error")
// //     }
      
      
// //       const imagepost= new model({
// //         image: file.path
// //       })
// //       const savedimage= await imagepost.save()
// //       res.json(savedimage)
    
// //   })

// //   app.get('/image',async(req, res)=>{
// //    const image = await model.find()
// //    res.json(image)
   
// //   })
