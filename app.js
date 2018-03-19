var express=require("express");
var app=express();
var bP =require("body-parser");
var mongoose=require("mongoose");
var Comment=require("./models/comments"),
passport=require("passport"),
flash=require("connect-flash"),
LocalStrategy=require("passport-local"),
User=require("./models/user"),
MO=require("method-override");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bP.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

var y1=require("./models/campground");

var seedDB=require("./seed");

//seedDB();//seed DB 

// Passport configuration=========================
app.use(require("express-session")({
    secret:"Once agin Rusty was best",
    resave:false,
    saveUninitialized:false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(MO("_method"));
app.use(flash());
//=========================================================

app.use(function(req,res,next){
    res.locals.USER=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});// So that we dont have to sent USER data for nav bar on each ejs file

 var commentRoutes   =   require("./routes/comments.js"),
        campgroundRoutes=   require("./routes/campgrounds.js"),
        indexRoutes      =   require("./routes/index.js");
        
app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes); 
app.use("/campgrounds/:id/comments",commentRoutes);


// y1.create(
//         {
//             name:"las vegas" ,
//             Image:"https://res.cloudinary.com/simpleview/image/upload/c_limit,f_auto,h_1200,q_75,w_1200/v1/clients/lasvegas/strip_b86ddbea-3add-4995-b449-ac85d700b027.jpg"
//           , Description:"Los Ageles is awesome ci"
            
//         } , function(err,res)
//                 {
//                     if(err)
//                         {
//                             console.log("The error occured");
//                             console.log(err);
//                         }
        
//                     else
//                         { 
//                             console.log("The data saved in the DB");
//                             console.log(res);
//                         }
//     });


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp is Starting!!");
});
