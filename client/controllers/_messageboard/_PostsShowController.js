app.controller('postsShowController', ['$scope','postsFactory','commentsFactory','sessionFactory','$location','$routeParams',
function($scope,postsFactory,commentsFactory, sessionFactory, $location, rParams) {
   var _this = this;

   // current post
   $scope.post = {};

   // voting
   $scope.allowVoting = true;

   /* LOCKDOWN + + + + + + + + + + + + + +  */
   $scope.cur_user = null;
   sessionFactory.getCurUser(function(data){
      if(typeof(data.data) == 'string'){
          $location.path('/index');
         }else{
            $scope.cur_user = data;
         }
   });
   /* end LOCKDOWN + + + + + + + + + + + + + +  */

// GET A SINGLE POST (& ITS COMMENTS)
   $scope.getMessage = function() {
      postsFactory.show(rParams.id, function passedToMessagesFactoryShow(post) {
         console.log('POST SHOW: ',post);
         if ( post.hasOwnProperty('errors') ) {
            // handle errors
            console.log('ERRORS', post.errors);
            alert('Error! Could not find post!');
            $location.path("/index");
         }else{
            // SUCCESS !!

            // SET THE CUR POST - LOCAL
            $scope.post = post[0];
            // SET the CURRENT POST - GLOBAL
            postsFactory.setCurPost($scope.post);

         }
      });
  }

  // ADD COMMENT TO A COMMENT
  $scope.newCommentComment = {};

  $scope.addCommentComment = function(comment_id){
     console.log('add comment comment called',comment_id);
     $scope.errors = [];

     commentsFactory.add(comment_id, $scope.newCommentComment, function newCommentCommentCreated(newcomment){
        // HANDLE ERRORS
        // - check for all other validations
        if ( newcomment.hasOwnProperty('errors') ) {
             for (var key in newcomment.errors) {
                if (newcomment.errors.hasOwnProperty(key)) {
                   var obj = newcomment.errors[key];
                   for (var prop in obj) {
                      if (obj.hasOwnProperty(prop) && prop == 'message') {
                          //alert(obj[prop]);
                          console.log(obj[prop]);
                          $scope.errors.push(obj[prop]);
                      }
                   }
                }
             }
             $scope.newCommentComment = {};
             $scope.newPost = {};
        }
        console.log('new comment comment errors: ',$scope.errors);
        // - if no errors, the post has been created
        if($scope.errors.length == 0){
           // winner!
           $location.path("/");
        }
     });
  }

  // VOTING + + + + + + + + + + + + + + + + + + + + + + +
  $scope.vote = function(vote,_id){
     //console.log("vote!",vote,_id);
     // pass the comment id and the vote
      var data = {"id":_id,"vote":vote};
      commentsFactory.vote(data,function passedToFactory(data){
         console.log('POST VOTE: ',data);
         if ( data.hasOwnProperty('errors') ) {
            // handle errors
            console.log('ERRORS', data.errors);
            alert('Error! Could not vote!');
            $location.path("/index");
         }else{
            // SUCCESS !!
            //console.log('returned all the way, after voting ',data);
            //
            $scope.getMessage();
         }
      });
  }

   $scope.getMessage();

}]);
