 var express=require("express");
var app=express();
var bodyparser=require("body-parser");
 var mongoose=require("mongoose");
 var passport=require("passport");
var localstrategy=require("passport-local");
var User=require("./model/user");
// var seedDB=require("./seed");
var methodOverride=require("method-override");
var Campground=require("./model/campground");
var Comment=require("./model/comment");
// var re="lo";
// const fetch = require('node-fetch');
var campgroundRoutes=require("./routes/campgrounds");
var commentRoutes=require("./routes/comments");
var indexRoutes=require("./routes/index");
// fetch('/api/foo', {credentials: 'include'});
// seedDB();



mongoose.connect('mongodb://localhost:27017/newtest', {useNewUrlParser:true,
	useCreateIndex:true,
	useUnifiedTopology:true
}).then(()=>{
	console.log('connected to db');
}).catch(err=>{
	console.log('error'.err.message); });



// mongoose.connect('mongodb+srv://ADMINUSER:dec19981213dec@cluster0-mqbxb.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser:true,
// 	useCreateIndex:true,
// 	useUnifiedTopology:true
// }).then(()=>{
// 	console.log('connected to db');
// }).catch(err=>{
// 	console.log('error'.err.message); });
// mongoose.connect('mongodb+srv://ADMINUSER:dec19981213dec@cluster0-mqbxb.mongodb.net/test?retryWrites=true&w=majority',{
// 	useNewUrlParser:true, 
// 	useCreateIndex:true,
// 	useUnifiedTopology:true
// }).then(()=>{
// 	console.log('connected to db');
// }).catch(err=>{
// 	console.log('error'.err.message);
// });
app.use( methodOverride("_method"));
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(require("express-session")({
	secret:"I AM SHANK hello shank",
	resave:true,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.re=req.User;
	next();
});

// var campgroundSchema=new mongoose.Schema({
// 	name:String,
// 	image:String,
// 	des:String
// });
//  var Campground=mongoose.model("Campground",campgroundSchema);
// Campground.create({
// 	name:"shank2",
// 	image:"https://images.unsplash.com/photo-1521412644187-c49fa049e84d?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60",		
// 	des:"NO.1 HILL"
	
// },function(err,campground){
// 	if(err){
// 		console.log("err");
// 	}else{
// 		console.log("created");
// 		console.log(campground);
// 	}
// });

// var campground=[
// 		{name:"shank1",image:"https://images.unsplash.com/photo-1521412644187-c49fa049e84d?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60"},
// {name:"shank2",image:"https://images.unsplash.com/photo-1521412644187-c49fa049e84d?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60"},
// 	{name:"shank4",image:"https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
// {name:"shank3",image:"https://images.unsplash.com/photo-1521412644187-c49fa049e84d?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60"},

// {name:"shank5",image:"https://images.unsplash.com/photo-1521412644187-c49fa049e84d?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60"},
// 	{name:"shank6",image:"https://images.unsplash.com/photo-1521412644187-c49fa049e84d?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60"}
// 	];
// app.get("/",function(req,res){
// 	res.send("hello");
// });

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

// app.listen(3000,function(){
// 	console.log("server started");
// });
app.listen(process.env.PORT || 5000, function() {
    console.log("Server started.......");
});
// app.listen(process.env.PORT,process.env.IP,function(){
// 	console.log("server started");
// });
 