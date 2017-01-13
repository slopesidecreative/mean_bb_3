app.controller('postsNewController', function($scope, sessionFactory, postsFactory, $location){
   // the logged in user
   $scope.cur_user = null;
   // the new message to create from  form
   $scope.message = {};
   // track errors
   $scope.errors = [];

/* LOCKDOWN + + + + + + + + + + + + + + +  */
    sessionFactory.getCurUser(function(data){
      //console.log('returned to client session controller',data);
      $scope.cur_user = data;
      if(!$scope.cur_user){
         $location.url('/index');
      }
   });
/* LOCKDOWN + + + + + + + + + + + + + + +  */


$scope.addPost = function(){
   $scope.errors = [];
   console.log('$ CREATE THIS POST: ', $scope.newPost);
   postsFactory.create( $scope.newPost, function newPostCreatedNowRedirect(newPost){
      //console.log('USER created and recd by new user controller -> redirect coming...', newUser);

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
         $location.path("/");
      }
   });
}

});
