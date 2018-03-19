var express=require("express");
var router=express.Router();

var y1=require("../models/campground");
var middleWare=require("../middleWare");


router.get("/",function(req,res){
    
    y1.find({},function(err,res2){
        if(err)
        console.log(err);
        
        else
        res.render("index.ejs",{A:res2});
    });
});


// NEw Campgrounds
router.get("/newcampgrounds",middleWare.isLoggedIn,function(req,res){
    res.render("newcamp.ejs");
    
});

    // Creating a new Campground Route
router.post("/",isLoggedIn,function(req,res){
    var x=req.body.name;
    var y=req.body.image;
    var z=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var  nc={name:x,Image:y,Description:z,author:author};
    
    // Creating a new Campground
    y1.create(nc,function(err,res2){
        if(err)
        console.log(err);
        
        else
        res.redirect("/campgrounds");
    });
});



/// Showing a perticular campground
router.get("/:id",function(req,res){
    y1.findById(req.params.id).populate("comments").exec(function(err,res2){
        if(err)
        console.log(err);
        
        else
        {
            console.log(res2);
        res.render("show.ejs",{info:res2});
            
        }
    });

});

// Edit Campgrounds
router.get("/:id/edit",middleWare.checkCampgroundOwnership,function(req,res){

         y1.findById(req.params.id,function(err,fC){
        
        res.render("edit.ejs",{xyz:fC});
        });
      
});

// Update campgrounds 
router.put("/:id",middleWare.checkCampgroundOwnership,function(req,res){
   y1.findByIdAndUpdate(req.params.id,req.body.x1,function(err,res2){
       if(!err)
       res.redirect("/campgrounds/"+req.params.id);
   }); 
});

// Delete route
router.delete("/:id",middleWare.checkCampgroundOwnership,function(req,res) {
   y1.findByIdAndRemove(req.params.id,function(err,res2){
       if(!err)
   res.redirect("/campgrounds");
   });
});



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports=router;