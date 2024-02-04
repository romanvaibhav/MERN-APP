const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Authenticate = require("../middleware/authenticate");
const router = express.Router();

// inluding database
require("../db/conn");
const User = require("../model/userSchema");

// npm i body-parser
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/*
{
    "name":"lokesh",
    "email":"lokesh@gmail.com",
    "phone":9899184757,
    "work":"coder",
    "password":"lokesh1234",
    "cpassword":"lokesh1234"
}

// Adding Data to Database Using Promises
router.post("/register", jsonParser, (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Plz fill all fields properly" });
  }
  // Checking before regitsation if User with same email already exists or not
  // This function returns a promise
  // LHS email is field email in our schema and RHS email is our email we filled
  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "Email already Exists" });
      }
      // const user = new User({ name:name, email:email, phone:phone, work:work, password:password, cpassword:cpassword });
      // LHS name , email etc is our field name and RHS are our values
      // We have same name for key and value so no need to write like above, write like below
      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });

      // user.save() returns us a promise
      user
        .save()
        .then(() => {
          res.status(201).json({ message: "User Registered Successfully" });
        })
        .catch((err) => {
          res.status(500).json({ error: "Failed to Register" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
  //   res.json({ message: req.body });
  //   res.send("register page");
});

// Delete this, this is not needed after deployment
router.get("/", (req, res) => {
  res.send("Hello world from auth");
});
*/

// Adding Data to Database using Async/Await
router.post("/register", jsonParser, async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Plz fill all fields properly" });
  }
  // Checking before regitsation if User with same email already exists or not
  // This function returns a promise
  // LHS email is field email in our schema and RHS email is our email we filled

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already Exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Password Does not match" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });
      // We need to hash our data before saving in database so that password and cpassword are safe from outsiders
      // we use bcrypt.js of npm for this
      const salt = await bcrypt.genSalt(12);
      // now we set user password and cpassword to hashed password before save()
      user.password = await bcrypt.hash(user.password, salt);
      user.cpassword = await bcrypt.hash(user.cpassword, salt);
      await user.save();
      res.status(201).json({ message: "User Registered Successfully" });
    }
  } catch (err) {
    console.log(err);
  }

  //   res.json({ message: req.body });
  //   res.send("register page");
});

// For Login we need to verify email and password and we verify them from the data entered by user during registration
// Login Route ( Verifying email and password and logging in)
router.post("/signin", jsonParser, async (req, res) => {
  const body = req.body;
  // console.log(req.body);
  // res.json({ message: "awesome" });
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Plz fill all fields properly" });
    }

    const userLogin = await User.findOne({ email: email });
    // userLogin contains all  details filled by user during registration if email matches
    console.log(userLogin);
    // Now we want to generate a JWT Token for the logged in user (Json Web Token)
    // We store that token in Cookies so that when user goes to about me we verify it that its same logged in user and then show the about details
    // Get Token from Cookies and verify the user
    // const token = userLogin.generateAuthToken();

    // Checking if password during registration matches the entered password for login using hashing only
    // we use compare method of bcrypt to do so
    if (userLogin) {
      const validPassword = await bcrypt.compare(
        body.password,
        userLogin.password
      );
      // Creating a Token through userSchema.js and calling here
      // token = await userLogin.generateToken();
      token = await userLogin.generateAuthToken();
      console.log(token);
      // Storing our token in cookies
      res.cookie("jwtoken", token, {
        // Session timeout expires in
        expires: new Date(Date.now() + 234500000),
        httpOnly: true,
      });
      if (!validPassword) {
        // if user does not matches show below error
        res.status(400).json({ error: "Invalid Password" });
      } else {
        res.status(200).json({ message: "Valid password" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// About us page
// we use authenticate as middleware to authenticate the user before moving to the about page in autehntciate.js inside middleware folder
router.get("/about", Authenticate, (req, res) => {
  console.log("Hello my about");
  // rootUser has all the data so we send it in /about from backend
  // and we get it in the frontend using GET Method in about.jsx
  res.send(req.rootUser);
});

// New Route to auto-fill details in contact us page and home page after user authentication
router.get("/getdata", Authenticate, (req, res) => {
  console.log("Hello my contact");
  res.send(req.rootUser);
});

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }));
// Contact Route to send the details filled in contact form to the backend
router.post("/contact", Authenticate, async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log("Error in contact form");
      return res.json({ error: "PlZ fill the error form" });
    }
    // req.userID is coming from authenticate.js to get the userid
    const userContact = await User.findOne({ _id: req.userID });
    // if user is found with same id
    if (userContact) {
      // Add this data of name, email,phone,message in that user collection
      // We do to userSchema.js
      // addMessage is a function with 4 parameters which we will define at userSchema.js
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json({ message: "User contact Successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Logout Page
router.get("/logout", (req, res) => {
  console.log("Hello my Logout Page");
  // As we store a jwt token when we login so
  // We just need to clear the cookie to do logout
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logout");
});

module.exports = router;
