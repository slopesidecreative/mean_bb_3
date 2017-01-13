console.log('server -> routes.js is loading....');
/* THE JOB OF ROUTES IS TO CALL THE CORRECT CONTRLLER METHOD BASED ON ROUTE */

/* LOAD CONTROLLERS ----------------------------------------- */

var session = require('../controllers/session.js');
//console.log('session conroller: ', session);
var Users =  require('../controllers/users.js');
//console.log('Users conroller: ', Users);

//var Posts =  require('../controllers/posts.js');
//console.log('Posts conroller: ', Posts);
//var Comments =  require('../controllers/comments.js');
//console.log('Comments conroller: ', Comments);

module.exports = function(app) {

/* ROOT    --------------------------------------------------- */
   // "/"
   // Root - show all
   // HANDLED BY ANGULAR...
   app.get('/', function (req, res){
      res.json('Blackbelt! You should not see this message!');
   });

/* LOGIN + REGISTRATION   ------------------------------------- */

   app.post('/login', function(req, res){
      session.login(req,res);
   })
   app.get('/getcuruser', function(req, res){
      session.getCurUser(req, res)
   })
   app.get('/logout', function(req, res){
      session.logOut(req, res)
   })

/* USERS --------------------------------------------------- */

      // GET /users
      // returns all users
      app.get('/users', function (req, res){
         console.log(' GET index /  ');
         Users.index(req,res);
      });
      /* GET /users/:id
         Show: view a single user by ID.
      */
      app.get('/users/:id', function (req, res){
         console.log('GET show /users/:id ', req.params.id);
         Users.show(req,res);
      });
      /* POST
         /users
         Create a new user based on form submission.
      */
      app.post('/users', function (req, res){
         console.log('POST create /users');
         Users.create(req,res);
      });
      /*
         POST /users/:id
         PUT: process editing a user by ID.
      */
      app.put('/users/:id', function (req, res){
         console.log('PUT user update!!');
         Users.update(req,res);
      });
      /*
         DELETE /users/:id
         Delete: process deleting a user by ID.
      */
      app.delete('/users/:id', function (req, res){
         console.log('DELETE /users/:id');
         Users.delete(req,res);
      });

/* MESSAGE BOARD ------------------------------------------------ */

      // // GET "/messages"
      // // Root - show all
      // app.get('/messages', function (req, res){
      //    console.log(' GET messages index /messages  ');
      //    //Posts.index(req,res);
      // });
      //
      // /* POST "/messages"
      //    Create a new POST based on form submission.
      // */
      // app.post('/messages', function (req, res){
      //    console.log(' POST messages create /messages  ');
      //    //Posts.create(req,res);
      // });
      //
      // /* GET /users/:id
      //    Show: view a single user by ID.
      // */
      // app.get('/posts/:id', function (req, res){
      //    console.log('GET show /posts/:id ', req.params.id);
      //    //Posts.show(req,res);
      // });
      //
      // /* POST "/messages/posts/:id/comments"
      //    Create a new COMMENT based on form submission.
      // */
      // app.post('/messages/posts/:id/comments', function (req, res){
      //    console.log('SERVER!! Create COMMENT ',req.body);
      //    //Comments.create(req,res);
      // });
      //
      // /* POST "/messages/comments/:id/comments"
      //    Create a new COMMENT comment based on form submission.
      // */
      // app.post('/messages/comments/:id/comments', function (req, res){
      //    console.log('SERVER!! Create COMMENT COMMENT!! ',req.body);
      //    //Comments.add(req,res);
      // });
      //
      //
      // /* POST "/messages/vote"
      //    Increment the vote count on a comment.
      // */
      // app.post('/messages/vote', function (req, res){
      //    console.log('SERVER!! VOTE COMMENT ',req.body);
      //    //Comments.vote(req,res);
      // });




      // Extra route for development
      // app.get('/messages/:id', function (req, res){
      //    console.log('Show a message by ID.');
      //     Post.findOne({_id: req.params.id})
      //      .populate('comments')
      //      .exec(function(err, post) {
      //           res.render('index', {posts: {post}, moment:moment});
      //             });
      // });
      // Extra route for development
      // app.get('/messages/posts/:id', function (req, res){
      //    console.log('Show a post by ID');
      //     Post.findOne({_id: req.params.id})
      //      .populate('comments')
      //      .exec(function(err, post) {
      //           res.render('index', {posts: {post}});
      //             });
      // });

} // CLOSES EXPORTS
