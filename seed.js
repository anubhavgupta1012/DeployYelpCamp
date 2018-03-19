
var x=require("./models/campground");
var Comment=require("./models/comments");
var data=[
    {
        name:"Charlie pond",
        Image:"http://www.makeyourdayhere.com/ImageRepository/Document?documentID=51",
        Description:"It is a nice place "
    },
    
    {
        name:"Charlie pond 2",
        Image:"https://media-cdn.tripadvisor.com/media/photo-s/06/40/73/68/conesus-lake-campgrounds.jpg",
        Description:"It is a nice place "
    },
    
    {
        name:"Charlie pond 3",
        Image:"https://www.massvacation.com/wp-content/uploads/2013/06/70_Campgrounds_0000_CapeWelfleetCamping-0091.jpg?x90875",
        Description:"It is a nice place It is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice placeIt is a nice place"
    }
];

function seedDB(){
    
x.remove({},function(err,responce){
    if(!err)
    {
        console.log("Removed Campgrounds");
        data.forEach(function(y){
                        x.create(y,function(errr,res){
                        if(!errr){
                        console.log("one campground added");
                
                         // creating cooments
                        Comment.create({
                         text:"this place is greate , i hope internet would work here" ,
                        author:"Anubhav"
                                         },function(err,comment){
                                                                if(!err)
                                                                    {
                                                                        res.comments.push(comment);
                                                                        res.save();
                                                                         console.log("created new comment");
                            
                                                                    }
                                    });
                             }
            });
            
        });
    }
    
});
}
    
module.exports=seedDB;