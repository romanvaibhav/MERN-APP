const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

// Now once user clicks the about page first we check either user is valid or not through its jwt Token
// We basically Authenticate
// Authenticate is a middleware
const Authenticate = async (req, res, next) => {
  try {
    // getting the token
    const token = req.cookies.jwtoken;
    // console.log("token is ", token);
    // verifying it with the SERCRET KEY we gave in our env file
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    // console.log("verify token is ", verifyToken);
    // Checking if there any user exist with that id and token
    // Out tokens folder inside our mongodb collection is Array of objects and each object consists of 2 fields _id and token so we get id using verifyToken and tokens.token
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    // if user not found
    if (!rootUser) {
      throw new Error("User not Found");
    }

    // if user is found store its information inside rootUser
    req.token = token;
    req.rootUser = rootUser;
    // Getting the id of user
    req.userID = rootUser._id;

    // Now move to next() function after using middleware means show the about page if user is found
    next();
  } catch (err) {
    // if token does not match
    res.status(401).send * "Unauthorized : No Token Provided";
    console.log(err);
  }
};

// import autenticate in auth.js
module.exports = Authenticate;
