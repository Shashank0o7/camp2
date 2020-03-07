var express=require("express");
	var router=express.Router();
var Campground=require("../model/campground");
router.get("/campground",function(req,res){
	//get all the campground from the db
	var re;
	// console.log(req.user);
	if(!(req.user))
		 re=0;
	else
		re=1;
	// console.log(re);
Campground.find({},function(err,allCampground){
		if(err){
			console.log("error");
		}
		else{
			res.render("campground",{campground:allCampground,re:req.user});
		}
	});
});
router.get("/campground/new",isLoggedIn,function(req,res){
	res.render("new",{re:req.user});
});
router.get("/campground/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
		if(err){
			console.log(err);
		}
		else{
			// console.log(foundCamp);
		    res.render("show",{campground:foundCamp,re:req.user});
		}
	});
});
router.post("/campground",isLoggedIn,function(req,res){
	var name=req.body.name;
	var image=req.body.link;
	var des=req.body.desc;
	var author={
		id: req.user._id,
		username: req.user.username
	};
	var newCampground={name: name, image: image, des: des,author:author}
Campground.create(newCampground,function(err,newCampgrounds){
		if(err){
			console.log("error");
		}
		else
			{
				 console.log(newCampgrounds);
			res.redirect('/campground');
			}
	});
});
//EDIT
 router.get("/campground/:id/edit",isLoggedIn,checkCampgroundOwnership,function(req,res){
	 Campground.findById(req.params.id,function(err,foundCampground){
			res.render("edit.ejs",{campground:foundCampground,re:req.user}); 
	})
	
 });
//UPDATE
router.put("/campground/:id",checkCampgroundOwnership,function(req,res){
	//combination of find and update.
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCamp){
		if(err)
			res.redirect("/campground");
		else
			{
				res.redirect("/campground/"+req.params.id);
			}
	})
});
//destroy any campground
router.delete("/campground/:id",isLoggedIn,checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err)
			res.redirect("/campground");
		else
			res.redirect("/campground");
	});
});
function isLoggedIn(req,res,next)
	{
		if(req.isAuthenticated()){
			return next();
		}
		res.redirect("/login");
}
function checkCampgroundOwnership(req,res,next){
	if(req.isAuthenticated()){
			Campground.findById(req.params.id,function(err,foundCampground)
			{
				if(err)
					res.redirect("back");
				else
					{
					if(foundCampground.author.id.equals(req.user._id))
						{
							next();
						}
					else
							res.send("you r not authorised to perform this action");
					}
			})
	}
}
module.exports=router;