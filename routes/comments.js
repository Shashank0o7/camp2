var express=require("express");
	var router=express.Router();
var Comment=require("../model/comment");
var Campground=require("../model/campground");

router.get("/campground/:id/new1",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err)
			console.log(err);
		else
			{
			// console.log(campground1);
			res.render("new1",{campground: campground,re:req.user});	
			}
	})
	
});
router.post("/campground/:id/new1",isLoggedIn,function(req,res){
Campground.findById(req.params.id,function(err,campground){
		if(err)
			console.log(err);
		else
			{
			 Comment.create(
				   req.body.comment
			   ,function(err,comment){
				   if(err)
			 		 console.log(err);
			       else{
					   
					    comment.author.id=req.user._id;
					   		 comment.author.username=req.user.username;
					   comment.save();
					   console.log(comment);
					   campground.save();
					   campground.comments.push(comment);
					   // campground.save();
					   // campground.comments=comment;
					   res.redirect("/campground/"+campground._id);
				   }
			   });
			// res.render("new1",{campground: campground});	
			}
	})
});
//EDIT COMMENT
router.get("/campground/:id/comment/:comment_id/edit",isLoggedIn,checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
			res.render("edit2.ejs",{campground_id:req.params.id, comment:foundComment,re:req.user});
	});
	
});
//udate comment
router.put("/campground/:id/comment/:comment_id",function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err)
			res.redirect("back");
		else
			{
				res.redirect("/campground/"+req.params.id);
			}
	})
});

//delete comment
router.delete("/campground/:id/comment/:comment_id",isLoggedIn,checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err)
			res.redirect("back");
		else
			res.redirect("/campground/"+req.params.id);
	});
});
function isLoggedIn(req,res,next)
	{
		if(req.isAuthenticated()){
			return next();
		}
		res.redirect("/login");
}

function checkCommentOwnership(req,res,next){
	if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id,function(err,foundComment)
			{
				if(err)
					res.redirect("back");
				else
					{
						console.log(foundComment.author.username);
						console.log(req.user._id);
					if(foundComment.author.id.equals(req.user._id))
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