var express = require("express");
var router 	= express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comments = require("../models/comment");

// NEW Comment
router.get("/new", isLoggedIn, function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
		res.render("comments/new", {campground: campground});	
		}
	})
});

// CREATE Comment
router.post("/", isLoggedIn, function(req, res){
	//lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
	//create new comment
	Comment.create(req.body.comment, function(err, comment){
		if(err){
			console.log(err);
		} else {
	//connect new comment to campground
			campground.comments.push(comment);
			campground.save();
	//redirect to campground show page
			res.redirect("/campgrounds/" + campground._id);
		}
	});
			
		}
	});
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

module.exports = router;