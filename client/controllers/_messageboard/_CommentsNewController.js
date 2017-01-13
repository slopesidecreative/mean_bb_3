
app.controller('commentsNewController', ['$scope','postsFactory','commentsFactory','sessionFactory', '$location','moment',
function($scope, postsFactory, commentsFactory, sessionFactory, $location, moment) {

// the new message to create from  form
$scope.message = {};
// track errors
$scope.errors = [];
// init
$scope.newComment = {};


/* LOCKDOWN + + + + + + + + + + + + + + +  */
$scope.cur_user = null;
sessionFactory.getCurUser(function(data){
   //console.log('returned to client INDEX controller',data);
   if(typeof(data.data) == 'string'){
       $location.path('/index');
      }else{
         $scope.cur_user = data;
      }
});
/* LOCKDOWN      + + + + + ++ + + + + + + + + + + + + + +  */


/* INITIALIZE   + + + + + + + + + + + + + + + + + + + + +  */

$scope.getCurPost = function(){
   postsFactory.getCurPost(function(data){
      //console.log('YES - GOT CUURENT POST',data);
      if(data._id){
         $scope.curPost = data;
      }else{
         //console.log('get the id');
         postsFactory.getCurPostId(function(curPostId){
            //console.log('got the id',curPostId);
            $scope.curPost = {_id:curPostId};
         });
      }
   });
}

/* CONTROLLER METHODS  + + + + + + + + + + + + + + + +  */

// ADD COMMENT
$scope.addComment = function(){
   $scope.errors = [];

   //postsFactory.getCurPost(function(curPostId){
      commentsFactory.create( $scope.curPost._id, $scope.newComment, function newCommentCreatedNowRedirect(newcomment){
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
              $scope.newComment = {};
              $scope.newPost = {};
         }
         console.log('new post errors: ',$scope.errors);
         // - if no errors, the post has been created
         if($scope.errors.length == 0){
            // winner!
            $location.path("/");
         }
      });
   //});
}

/* FIRE UP THE CONTROLLER       + + + + + + + + + + + + + + + +  */

$scope.getCurPost();

}]);
