const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  // console.log(req.headers)
  const authHeader = req.headers.token
  if (authHeader) {
    const token = authHeader.split(" ")[1]
    // console.log("token: ",token)
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      // console.log("error: ",err)
      if (err) res.status(403).json("Token is not valid!")
      // console.log("user: ",user)
      req.user = user
      next()
    })
  } else {
    return res.status(401).json("You are not authenticated!")
  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log("req.user: ", req.user)
    // console.log("req.params : ", req.params)
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      res.status(403).json("You are not alowed to do that!")
    }
  })
}

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next()
    } else {
      res.status(403).json("You are not alowed to do that!")
    }
  })
}

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
}
