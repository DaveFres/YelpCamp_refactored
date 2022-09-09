var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

//requring routes 
var commentRoutes    = require("./routes/comments"),
    reviewRoutes     = require("./routes/reviews"), //new
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
    

var DATABASEURL = "mongodb://david:rW87jq7SVzmhHRmdHbC5@ds149344.mlab.com:49344/david_n_yelpcamp";    
var url = DATABASEURL || "mongodb://localhost:27017/yelp_camp_v12";
mongoose.connect(url, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();  // seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "it could be anything!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error =req.flash("error");
    res.locals.success =req.flash("success");
    next();
});

// Moment js
app.locals.moment = require('moment');

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);
app.use("/campgrounds", campgroundRoutes);

//process.env.PORT, process.env.IP
app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started!"); 
}); 