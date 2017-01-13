app.controller('postsController', ['$scope','postsFactory','commentsFactory','sessionFactory', '$location','moment',
function($scope, postsFactory, commentsFactory, sessionFactory, $location, moment) {

/* LOCKDOWN + + + + + + + + + + + + + +  */
   $scope.cur_user = null;
   $scope.newComment = {};
   $scope.newPost = {};

   sessionFactory.getCurUser(function(data){
      //console.log('returned to client MESSAGES controller',data);
      if(typeof(data.data) == 'string'){
          $location.path('/index');
         }else{
            $scope.cur_user = data;
         }
   });
/* end LOCKDOWN + + + + + + + + + + + + + +  */

$scope.addPost = function(){
   $scope.errors = [];
   console.log('$ CREATE THIS POST: ', $scope.newPost);
   postsFactory.create( $scope.newPost, function newPostCreatedNowRedirect(newPost){
      // HANDLE ERRORS
      // - check for all other validations
      if ( newPost.hasOwnProperty('errors') ) {
           for (var key in newPost.errors) {
              if (newPost.errors.hasOwnProperty(key)) {
                 var obj = newPost.errors[key];
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
         index();
         //$location.path("/messages");
      }
   });
}

$scope.addComment = function(id){
   $scope.errors = [];
   console.log('CREATE THIS COMMENT: ', id);
   commentsFactory.create( id, $scope.newComment, function newCommentCreatedNowRedirect(newcomment){

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
         //$location.path("/messages");
         index();
      }
   });
}

var index = function() {
   console.log('messages index controller -> index() called to kick things off...');
   $scope.newComment = {};
   $scope.newPost = {};

    postsFactory.index(function handleReturnedPosts(posts) {
      $scope.posts = posts;
    });
}
// /* USERS + + + + + + + + + + + + + + + + + + + + + + + + + + +  */
//
// $scope.deleteUser = function(_id){
//    usersFactory.delete(_id, function redirectAfterDelete(data){
//       //console.log('User Deleted: ',data );
//       index();
//    });
// }
//
// $scope.showUser = function(_id, context){
//    $location.path('/users/' + _id );
// }
//
// $scope.updateUser = function(user_id) {
//    $location.path('/users/' + user_id + '/edit');
//  }

/* INIT   + + + + + + + + + + + + + + + + + + + + + + + + + + +  */
console.log("loading the messages controller...");
index();

}]);
