var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware"); // check out bookmark about index.js files
var Review = require("../models/review");


// INDEX - show all campgrounds
router.get("/", function (req, res) {
    var perPage = 8;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    Campground.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
        Campground.countDocuments().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/index", {
                    campgrounds: allCampgrounds,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
});


//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };  
    var newCampground = {name : name, image : image, description: desc, author: author, price: price};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           //console.log(newlyCreated);
           res.redirect("/campgrounds");
       }
    });
    
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
   res.render("campgrounds/new"); 
});

// // SHOW - shows more info about one campground
// router.get("/:id", function(req, res) {
//     // find the campground with provided ID
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//       if(err || !foundCampground){
//           req.flash("error", 'Campground not found');
//           res.redirect("back");
//       } else {
//           console.log(foundCampground);
//           // render the show template with that campground
//           res.render("campgrounds/show", {campground: foundCampground});
//       }
//     });
// });

// SHOW - shows more info about one campground
router.get("/:id", function (req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").populate({
        path: "reviews",
        options: {sort: {createdAt: -1}}
    }).exec(function (err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", 'Campground not found');
            res.redirect("back");
        } else {
            //render show template with that campground
            
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
    
});
// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    // redirect somewhere (show page)
});

// // DESTROY CAMPGROUND ROUTE
// router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
//     Campground.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             res.redirect("/campgrounds");
//         } else {
//             res.redirect("/campgrounds");
//         }
//     });
// });


// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            // deletes all comments associated with the campground
            Comment.remove({"_id": {$in: campground.comments}}, function (err) {
                if (err) {
                    console.log(err);
                    return res.redirect("/campgrounds");
                }
                // deletes all reviews associated with the campground
                Review.remove({"_id": {$in: campground.reviews}}, function (err) {
                    if (err) {
                        console.log(err);
                        return res.redirect("/campgrounds");
                    }
                    //  delete the campground
                    campground.remove();
                    req.flash("success", "Campground deleted successfully!");
                    res.redirect("/campgrounds");
                });
            });
        }
    });
});

module.exports = router;