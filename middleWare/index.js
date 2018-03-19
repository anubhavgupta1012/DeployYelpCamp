var middleWareObj={};
var y1=require("../models/campground");
var Comment=require("../models/comments");


middleWareObj.checkCampgroundOwnership=function(req,res,next){
    if(req.isAuthenticated()){
         y1.findById(req.params.id,function(err,fC){
        if(!err){
        if(fC.author.id.equals(req.user._id)){
        next();      
        }
        else{
        req.flash("error","You don't have the permission to do that");
        res.redirect("back");
        }}});
    
        
    }else
    {  req.flash("error","You must logged in for doing that");
        res.redirect("back");
        
    }
}

middleWareObj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
         Comment.findById(req.params.comment_id,function(err,fC){
        if(!err){
        if(fC.author.id.equals(req.user._id)){
        next();      
        }
        else{
            req.flash("error","You don't have the permission to do that !");
        res.redirect("back");
        }}});
    
        
    }else
    {   req.flash("error","You must logged in for doing that !");
        res.redirect("back");
        
    }
}

middleWareObj.isLoggedIn=function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Login First !");
    res.redirect("/login");
}


module.exports=middleWareObj;