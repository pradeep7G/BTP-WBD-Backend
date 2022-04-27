const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const multer = require("multer")
const upload = multer({ dest: "./uploads/" })
dotenv.config()
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe")
const cors = require("cors")

//Morgan Middleware
const morgan = require("morgan")
const { accessLogStream } = require("./middlewares/morgan")

//Swagger API
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDocument = YAML.load("./swagger.yaml")

//Cloudinary Images Upload through Multer Middleware
// const upload = require("./middlewares/multer")
// const cloudinary=require("./cloud uploads/cloudinary")
const fs = require("fs")
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err)
  })

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Customer API",
      description: "API Information",
      contact: {
        name: "AirShop"
      },
      servers: ["http://localhost:5000"]
    }
  },
  apis: [".routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.static("build"))
app.use(cors())
app.use(morgan("combined", { stream: accessLogStream }))
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/checkout", stripeRoute)
app.use(express.static(`./uploads`))

app.use("/uploads", express.static(__dirname + "/uploads"))

app.post("/uploadFile", upload.single("image"), (req, res) => {
  let fileType = req.file.mimetype.split("/")[1]
  let newFileName = req.file.filename + "." + fileType
  console.log("newFileName: ", newFileName)
  fs.rename(
    `./uploads/${req.file.filename}`,
    `./uploads/${newFileName}`,
    function () {}
  )
  res.status(200).json({
    message: "successfully uploaded",
    filename: newFileName
  })
})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Backend server is running at ${PORT}`)
})

module.exports = app