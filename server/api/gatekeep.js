//middleware between server and response

const res = require("express/lib/response");
const { User } = require("../db");

const requireToken = async( req, res, next) => {
  try {
    console.log(req.headers)
    const token = req.headers.authorization
    const user = await User.findByToken(token)
    req.user = user
    console.log(req.user, 'what we seeing')
    next()
  }
  catch(err) {next(err)}
}

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin){
    return res.status(403).send('Not Found')
  }
  else {
    next()
  }
}


module.exports = {
  requireToken,
  isAdmin
}
