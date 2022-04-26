const router = require("express").Router()
const User = require("../models/User")
const Cart = require("../models/Cart")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    fullname: req.body.fullname,
    phonenumber: req.body.phonenumber,
    address: req.body.address,
    isAdmin: req.body.isAdmin,
    img: req.body.img
  })
  console.log(newUser)
  try {
    const savedUser = await newUser.save()
    console.log(savedUser)
    const newCart = new Cart({
      userId: savedUser["_id"].toString(),
      products: [],
      quantity: 0,
      total: 0
    })
    const savedCart = await newCart.save()
    res.status(201).json({ savedUser, savedCart })
  } catch (err) {
    res.status(500).json(err)
  }
})

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    !user && res.status(401).json("Wrong credentials!")

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    )
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

    OriginalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!")
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    )

    const { password, ...others } = user._doc

    res.status(200).json({ ...others, accessToken })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
