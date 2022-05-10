const express = require('express');
const User = require('../models/User');
const router= express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const JWT_SECRET ='Syedabdallah$boy'
const fetchuser = require('../middleware/fetchuser');
// const Otp = require('../models/otp');

const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
// const { response } = require('express');
// const { readFileSync } = require('jest-serializer');
const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
      api_key:"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"
  }
}))

// route 1 for creating user
router.post('/createuser',[
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),
],async(req, res)=>{
  let success= false
  // if there are errorsm return bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }
  // check whether the user with this email exists already
  // warping in try catch statement, for the safety  propose
  try{

  let user = await User.findOne({email:req.body.email})
  if(user){
    return res.status(400).json({error:"sorry a user with this email already exists"})
  }

  const salt = await bcrypt.genSalt(10);
  const secpass = await bcrypt.hash(req.body.password, salt)

  // creating the user 
  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secpass,
  })
  const data ={
    user:{
      id:user.id
    }
  }
  transporter.sendMail({
    to:user.email,
    from:"no-replay@notebook.com",
    subject:"password reset",
    html:`
    <p>You requested for password reset</p>
    <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
    `
})  
res.json({message:"check your email"})

  const authtoken=jwt.sign(data, JWT_SECRET);
  success= true;
  res.json({success,authtoken})
  
}catch (error){
  console.error(error.message)
  res.status(500).send("some error occured")
}
})

//Route 2 authenticate a user using: post "/api/auth/login", no login required
router.post('/login',[
 body('email','Enter a valid email').isEmail(),
  body('password', 'password cannot be blank ').exists(),
],async(req, res)=>{
  let success = false;
  // if there are errors return bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password}=req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
       success = false
      return res.status(400).json({success,error:"please try to login with correct credentials"})

    }

    const passwordCompare= await bcrypt.compare(password, user.password)
    if(!passwordCompare){
     success= false
      return res.status(400).json({success,error:"please try to login with correct credentials"})
    }
    const data ={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data, JWT_SECRET);
    success = true
    res.json({success,authtoken})

  } catch (error){
    console.error(error.message)
    res.status(500).send("Internal sever error ")
  }
})

// Route 3: get loggedin user details using: post"/api/auth/getuser".login required
router.post('/getuser',fetchuser,async(req, res)=>{
   // if there are errors return bad request
   try {
     userId = req.user.id;
     const user = await User.findById(userId).select("-password")
    res.send(user)
   } catch (error){
    console.error(error.message)
    res.status(500).send("Internal sever error ")
  }


 })

//  router 4: search the 
router.get('/search/:key',async(req, res)=>{
  let success = false;


  // if there are errors return bad request
try{
// var regex = await new RegExp(req.params.key,'i');
// User.find({key:regex}).then((result)=>{
//   res.status(200).json(result)

// })
// console.log(req.params.key)
let data = await User.find(
  {
    "$or":[
      {"name":{$regex:req.params.key}},
      {"email":{$regex:req.params.key}}
    ]
  }
)
success = true
res.send(data)
}

catch (error){
  console.error(error.message)
  res.status(500).send("Internal sever error ")
}



})

// router.post('/email-send',async(req, res)=>{
//   let success= false;
//   // if there are errors return bad request
// crypto.randomBytes(30,(err,buffer)=>{
//         if(err){
//             console.log(err)
//         }
  
//         const token = buffer.toString("hex")
       
//   try {
   
//     let data = await User.findOne({email:req.body.email})
//   //  const responseType={}
//    if(data){
    
//      let otpData ={
//          data.resetToken = token
//           data.expireToken = Date.now() + 4000000
//      }
   
//      let otpResponse = await otpData.save();
// transporter.sendMail({
//                     to:user.email,
//                     from:"no-replay@notebook.com",
//                     subject:"password reset",
//                     html:`
//                     <p>You requested for password reset</p>
//                     <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
//                     `
//                 })
//                 res.json({message:"check your email"})
//      success = true
     
//       return res.status(200).json({success,otpResponse,error:"please try to login with correct credentials"})
//     }
//     else{
//       success = false
//       return res.status(400).json({success,error:"email id not exist"})
//     }
  
//   } catch (error){
//    console.error(error.message)
//    res.status(500).send("Internal sever error ")
//  }


// })

router.post('/reset-password',(req,res)=>{
  crypto.randomBytes(30,(err,buffer)=>{
      if(err){
          console.log(err)
      }

      const token = buffer.toString("hex")
      User.findOne({email:req.body.email})
      .then(user=>{
          if(!user){
              return res.status(500).json({error:"User dont exists with that email"})
          }
          user.resetToken = token
          user.expireToken = Date.now() + 4000000
          user.save().then((result)=>{
              transporter.sendMail({
                  to:user.email,
                  from:"no-replay@notebook.com",
                  subject:"password reset",
                  html:`
                  <p>You requested for password reset</p>
                  <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                  `
              })
              res.json({message:"check your email"})
              
          }).catch(err => { console.log(err) });
      })
    
  })

})
  


module.exports = router