// const bodyParser = require("body-parser");
const express = require("express");
// var firebase = require('firebase');
// const functions = require('firebase-functions');
// const admin = require("firebase-admin");
const nodemailer = require('nodemailer');
const dotenv = require("dotenv")
const class1 = require('./routes/class')
const subject1 = require('./routes/subject')
const chapter1 = require('./routes/chapter')
const router = require('./routes/payment')

let global;
// require('./public/js/firebase_config.js');
dotenv.config()
const PORT = process.env.PORT || 5000;
const app = express();
var path = require("path");
app.use('/',class1)
app.use('/',subject1)
app.use('/',chapter1)
app.use('/',router)
// const { env, getMaxListeners } = require("process");
// const { VPC_EGRESS_SETTINGS_OPTIONS } = require("firebase-functions");

app.use(express.urlencoded({
	extended: true
}))




app.use(express.urlencoded({
	extended: true
}))
app.use(express.json());

app.engine("html", require("ejs").renderFile);

app.use("/public", express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public')))
// app.get("/Class12", function (req, res) {
// 	res.render("courses-class-12.html");
// });
app.get("/login", function (req, res) {
  	res.render("login.html");
});
app.get("/admin", function (req, res) {
	res.render("admin.html");
});
app.get("/video", function (req, res) {
	res.render("video.html");
});
app.get("/quiz/:course",function(req,res){
	console.log(path.join(__dirname, 'public'))
	res.render("quiz.html",{data:req.params.id});
});	
// app.post('/mcqs', function(req, res, next) {
// 	// Do something with posted data
// 	next();
//   })
app.post("/mcqs",function(req,res){
	// for (let [key, value] of Object.entries(localStorage)) {
	// 	console.log(`${key}: ${value}`);
	//   }
	console.log(req.body)
	// let arr = localStorage.getItem('neerajnaik125@gmail.com')
	// let arr = Object.keys(req.body)
	// console.lo
	// req.body.hasOwnProperty('neeraj');
	console.log(req.body.hasOwnProperty('neeraj.n@somaiya.edu'))
	global = req.body.hasOwnProperty('neeraj.n@somaiya.edu')
	console.log('sdss'+global)
	if(req.body.hasOwnProperty('neeraj.n@somaiya.edu'))
	{
		console.log('has')
		res.send('suc')
	res.render("mcqs.html");
	}
	else{
		console.log('dhas')
		res.send('er')
	}
});

app.get("/payments/:id",(req,res)=>{
    var rid= req.params.id;
    console.log(rid);
    // console.log(postId);

    // Post.findOne({"posts._id": postId},{posts:{ $elemMatch:{_id:postId}}},function(err,result){
    //        if(err){
    //            console.log(err);
    //        }
    //        else{    
    //            var payAmount = result.posts[0].cost;
    //            res.render("payment",{key: process.env.KEY_ID,rid:rid,payAmount:payAmount,currentUser: req.user,pid:postId});
               
    //        }
    //    });    

	res.render("payment.html",{key: process.env.KEY_ID,rid:rid,payAmount:10,currentUser: "123"});
});


app.get("/mcqs", function (req, res) {
	// if(global){

	// 	res.render("mcqs.html");
	// }
	// else{
	// 	res.send({error:'user is not an admin'})
	// }
	res.render("mcqs.html");
});


app.get("/register", function (req, res) {
  	res.render("register.html");
});

app.get("/", function (req, res) {
	res.render("index.html");
});

app.get("/dropdown", function (req, res) {
	res.render("dropdown.html");
});



app.get("/bookClass", function (req, res) {
	res.render("book-a-free-class.html");
});

app.post("/trial", function (req, res) { //coming from quiz.js
	console.log('hiqwq');
	console.log('in trial'+JSON.stringify(req.body));
	console.log('in trial'+JSON.stringify(req.body.markString));
	console.log('in trial'+JSON.stringify(req.body.mymail));
	// console.log('in trial2'+req.body);

	
		const output = `
		  <h3>Test Details</h3>
		  <ul>  
			<li>Course Name: ${req.body.courseName}</li>
			<li>Email: ${req.body.mymail}</li>
			<li>Body: ${req.body.markString}</li>
		  </ul>
		`;
	  
		console.log(output);
	  
		
	  
		// setup email data with unicode symbols
		var smtpTransport = nodemailer.createTransport({
		  service: 'gmail',
		  auth: {
			user: 'djangonan123@gmail.com',
			pass: process.env.password
		  }
		});
	  
		var mailOptions = {
		  to: 'vinit.mundra@somaiya.edu', //change this, for now u have hardcoded
		  from: 'djangonan123@gmail.com',
		  subject: 'Your Score for todays quiz',
		  html: 
		  `<div style=" width:350px; margin:50px auto; background-color: #cad2de; padding: 20px; font-size: 18px; size: 20px; font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">
		
		   
			<p>Your Score <b>Test Score.</b></p>
			<div style="text-align: center; margin-bottom: 20px;">
				  
				  ${output}
				  
			</div>
	  
		
			</div>`
		};   
	  
		smtpTransport.sendMail(mailOptions, function(err,res) {
		
		  console.log(res);
		});
	  
	  
});
 
app.post("/demo", function (req, res) { //coming from book-a-free-class.html
	console.log('hiqwq');
	console.log('in demo'+JSON.stringify(req.body));
	// console.log('in trial2'+req.body);


	const output = `
		  <h3>User Details</h3>
		  <ul>  
			<li>Parent Name: ${req.body.parent_name}</li>
			<li>Parent Mobile No.: ${req.body.parent_phoneNo}</li>
			<li>Child Name: ${req.body.child_name}</li>
			<li>Laptop: ${req.body.laptop}</li>
			<li>Standard: ${req.body.child_class}</li>
		  </ul>
		`;
	  
		console.log(output);
	  
		
	  
		// setup email data with unicode symbols
		var smtpTransport = nodemailer.createTransport({
		  service: 'gmail',
		  auth: {
			user: 'djangonan123@gmail.com',
			pass: process.env.password
		  }
		});
	  
		var mailOptions = {
		  to: 'vinit.mundra@somaiya.edu',
		  from: 'djangonan123@gmail.com',
		  subject: 'Thanx for filling the form, look at ur details',
		  html: 
		  `<div style=" width:350px; margin:50px auto; background-color: #cad2de; padding: 20px; font-size: 18px; size: 20px; font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">
		
		   
			<p>Test details Score <b>User Details.</b></p>
			<div style="text-align: center; margin-bottom: 20px;">
				  
				  ${output}
				  
			</div>	  
		
			</div>`
		};   
	  
		smtpTransport.sendMail(mailOptions, function(err,res) {
		  if(err){
			  
			console.log(err);
		  }
		  else{
		  	console.log(res);
		  }
		});
});


app.get('/mail', (req, res) => {
  res.render('sending.html');
});




app.listen(PORT, () => {
  	console.log(`Listening on http://localhost:${PORT}`);
});
