var express=require("express");
var router=express.Router();
var passport=require("passport"),
 User=require("../models/user");
 var middleWare=require("../middleWare");



router.get("/",function(req,res){
    
    res.render("landing.ejs",{USER:req.user});
});

// =============================\
// AUTH ROUTES
// =============================

//Register
router.get("/register",function(req, res) {
    res.render("register.ejs");
});

router.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err,User){
       if(err){
        req.flash("error",err.message);
        return   res.redirect("/register");
       } 
       
       passport.authenticate("local")(req, res, function(){
         req.flash("success","Welcome to YelpCamp "+req.body.username+" !");
           res.redirect("/campgrounds");
       });
    });
});


//LOGIN Route
router.get("/login",function(req, res) {
    res.render("login.ejs");
});

router.post("/login", passport.authenticate("local",{

   successRedirect: "/campgrounds",
   failureRedirect: "/login"
}),function(req, res) { });

//LogOut Route

router.get("/logout",function(req, res) {
    req.logout();
        req.flash("success","You Successfully logged out !");
    res.redirect("/login");
});

module.exports=router;