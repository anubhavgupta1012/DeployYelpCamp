var express=require("express");
var router=express.Router({mergeParams:true});

var y1=require("../models/campground");
var Comment=require("../models/comments");
 var middleWare=require("../middleWare");


//===========================================
// COMMENTS ROUTS
//===========================================

router.get("/new",middleWare.isLoggedIn,function(req, res) {
    y1.findById(req.params.id,function(err,res2){
        if(!err)
           res.render("new.ejs",{x:res2});

        
    });
});
router.post("/",function(req,res){
    y1.findById(req.params.id,function(err2,res2){
       if(!err2)
       {
           Comment.create(req.body.comment,function(err3,res3){
               if(!err3)
               {    // add username 
               res3.author.id=req.user._id;
                res3.author.username=req.user.username;
                res3.save();
                   res2.comments.push(res3);
                   res2.save();
                   res.redirect("/campgrounds/"+res2._id);
               }
           });
       }
    });
    
});
// COmment edit 
router.get("/:comment_id/edit",middleWare.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err2, res2) {
       if(!err2){
                   res.render("editComments.ejs",{xx:req.params.id
                                                    ,comment:res2});
       }

       
    });
});

// Comments Update 
///////////////////////////////
//////////////////////////////
//////////////////////////////why req.params .id is refering to id of campground.
//////////////////////////
///////////////////////////////////
////////////////////////////////
/////////////////////////////////
///////////////////////////////////
router.put("/:comment_id",middleWare.checkCommentOwnership,function(req,res){
    console.log("HIIiiiiiiiiiiiii"+req);
Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,res2){
    if(!err)
    {        req.flash("success","Comment Updated !");
    res.redirect("/campgrounds/"+req.params.id);
}
    
});
    
});

// Deleting the route
router.delete("/:comment_id",middleWare.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(!err)
        req.flash("success","Comment Deleted");
        res.redirect("/campgrounds/" + req.params.id);
    });
});



module.exports=router;