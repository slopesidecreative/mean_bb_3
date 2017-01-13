
console.log('POSTS controller');

var mongoose   =  require('mongoose');
var moment     =  require('moment');

var Posts      =  mongoose.model('Post');

module.exports = {

// "/messages"
// Index - show all
index: function (req, res){
   console.log('Show all items.');
   Posts.find({})
      .sort({created_at: -1})
      .populate('comments')
      .exec(function(err, data) {
        console.log('it executed',data);
         //res.render('index', {posts: data, moment:moment});
         res.json(data);
      });
},
/* POST "/messages"
   Create a new POST based on form submission.
*/
create: function(req,res){
   console.log('Create POST: action. Post: ',req.body);
   var post = new Posts({
      postedby: req.body.postedby,
      content: req.body.content
   });
   post.save(function(err,newpost){
      if(err){
         //console.log('error',err);
         //res.render('index', {title: 'you have errors!', errors: post.errors})
         res.json({
               errors: {
                    users: {
                        message: "Could not create comment!",
                        kind: "what didn't work",
                        path: "reference to the schema's name",
                        value: "cause of the initial error"
                    }
               },
               name: "Server error"
            });
      }else{
         console.log('YEAH! POST: ',newpost);
         res.json(newpost);
      }
   })
},
/*
   GET /posts/:id
   Show - view a single user by ID.
*/
show: function (req, res){
   console.log('POST->SHOW');

   // Posts.find({"_id":req.params.id})
   //    .sort({created_at: -1})
   //    .populate('comments')
   //    .exec(function(err, data) {
   //       console.log('Post find one executed: ',data);
   //       //res.render('index', {posts: data, moment:moment});
   //       res.json(data);
   //    });


     Posts.find({"_id": req.params.id})
     .populate('comments')
     .populate({
       path: 'comments',
       // Get comments of comments - populate the 'comments' array for every comment
       populate: { path: 'comments' }
     })
     .exec(function(err, data) {
        console.log('Post find one with comments of comments executed: ',data);
        //res.render('index', {posts: data, moment:moment});
        res.json(data);
     });




   // Posts.findOne(
   //    {
   //       _id: req.params.id
   //    },
   //    function(err, data) {
   //       if(err){
   //          console.log('server error! post not found!');
   //          res.json({
   //                  errors: {
   //                      users: {
   //                          message: "Post not found!",
   //                          kind: "what didn't work",
   //                          path: "reference to the schema's name",
   //                          value: "cause of the initial error"
   //                      }
   //                  },
   //                  name: "Server error"
   //              });
   //       }else{
   //          console.log('db found post: ',data);
   //          res.json(data);
   //       }
   // })




}

}
