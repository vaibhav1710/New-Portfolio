var express = require('express');
var router = express.Router();

const nodemailer = require("nodemailer");
const path = require("path")


let isDarkMode = false;


router.use((req,res,next)=>{
  //req.user stores all the information of the signedIn user because of we are using passport
  res.locals.isDarkMode = isDarkMode;
  next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {isDarkMode});
});

router.get('/toggle', (req, res) => {
  isDarkMode = !isDarkMode;
  res.redirect('back');
});

router.get('/about', function(req, res, next) {
  res.render('about', {isDarkMode});
});

router.get('/projects', function(req, res, next) {
  res.render('projects',  {isDarkMode});
});

router.get('/contact', function(req, res, next) {
  res.render('contact' ,  {isDarkMode});
});

router.get("/success", function(req,res,next){
  if (req.session.formSubmitted) {
    res.render('success');
  } else {
    res.redirect('/');
  }
})


// router.get("/insta", function(req,res,next){
//   res.render("colors");
// })

router.post("/send", async function(req,res,next){
  
  const { name, email, subject, message } = req.body;

  const transporter = await nodemailer.createTransport({
   service:"gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "testnodejs1710@gmail.com",
      pass: "wsttvwswpxequlxi",
    },
  });
  
  const mailOptions = {
    from: `${name}  <${email}>`,
    to: "vaibhav1710hanu@gmail.com",
    subject: `${subject}`,
    text: `${message}`
  };

  console.log(mailOptions);

  transporter.sendMail(mailOptions, function(error,info){
    if(error){
      console.log(error);
    }else{
      console.log("Email sent successfully: " + info.response);
      res.render("success");
    }
  });

})


router.get('/downloadCV', (req, res) => {
 res.download("./public/Vaibhav_Singh_Resume.pdf");
});

module.exports = router;
