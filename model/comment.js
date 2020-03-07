var mongoose=require("mongoose");
// var User=require("../model/user");
// var Campground=require("./model/campground");
// var Campground=require("./model/campground");
var commentSchema=mongoose.Schema({
	text:String,
	author: {
		id: {
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
	}
});
module.exports=mongoose.model("Comment",commentSchema);