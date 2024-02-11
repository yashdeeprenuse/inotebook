const express = require('express');
const router =express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'Harryisagoodb$oy';



// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',

[
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
],



async (req, res)=>{

  let succ = false;

const errors  = validationResult(req);
if(!errors.isEmpty()){
  
  return res.status(400).json({succ, errors: errors.array() })
}
try{


let user = await User.findOne({ email: req.body.email });
if (user) {
  return res.status(400).json({succ, error: "Sorry a user with this email already exists" })
}

const salt = await bcrypt.genSalt(10);
const secPass = await bcrypt.hash(req.body.password, salt);

user = await User.create({
  name : req.body.name,
  password: secPass,
  email:req.body.email,
 })
  

//  .then(user => res.json(user)).catch(err =>{
//   console.log(err)
// res.json({error: "please enter a unique value for email"})
// }
// )
// res.json(user);

const data = {
  user: {
    id: user.id
  }
}
const authtoken = jwt.sign(data, JWT_SECRET);
succ = true;
res.json({succ, authtoken })
}catch(error){
  console.log(error.message)
  res.status(500).send("some error occured")
}

})


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  // let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  var success=false;

  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array()});
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      
      return res.status(400).json({success, error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {

      return res.status(400).json({ success:success, error: "Please try to login with correct credentials"});
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
   success= true;
    res.json({success:success, authtoken})

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

});


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})





module.exports = router;
