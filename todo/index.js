const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe")
const contactRoute = require("./routes/contact")

// //Morgan Middleware
// const cors = require("cors");
// const path = require("path");
// const morgan = require("morgan");
// const rfs = require("rotating-file-stream");

//Morgan Middleware
const cors = require("cors")
const morgan = require("morgan")
const { accessLogStream } = require("./middlewares/morgan")

//Swagger API
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDocument = YAML.load("./swagger.yaml")

//Cloudinary Images Upload through Multer Middleware
const upload = require("./middlewares/multer")
const cloudinary = require("./cloud uploads/cloudinary")
const fs = require("fs")

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err)
  })

// let accessLogStream = rfs.createStream("access.log", {
//   interval: "1h",
//   path: "./access_logs"
// });

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Green Grocery"
      },
      servers: ["http://localhost:5000"]
    }
  },
  // ['.routes/*.js']
  apis: [".routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(cors())
app.use(morgan("combined", { stream: accessLogStream }))
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/checkout", stripeRoute)
app.use("/api/contact", contactRoute)
app.use("/upload-images", upload.array("image"), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, "Images")
  if (req.method === "POST") {
    const urls = []
    const files = req.files
    for (const file of files) {
      const { path } = file
      const newPath = await uploader(path)
      urls.push(newPath)
      fs.unlinkSync(path)
    }
    res.status(200).json({
      message: "Images Uploaded Successfully",
      data: urls
    })
  } else {
    res.status(405).json({
      err: "Images not uploaded Successfully"
    })
  }
})

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!")
})
