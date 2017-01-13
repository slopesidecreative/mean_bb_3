app.controller('indexController', ['$scope','sessionFactory', '$location','moment',
function($scope, sessionFactory, $location, moment) {

/* LOCKDOWN + + + + + + + + + + + + + +  */
   $scope.cur_user = null;
   sessionFactory.getCurUser(function(data){
      //console.log('returned to client INDEX controller',data);
      if(typeof(data.data) == 'string'){
          $location.path('/');
         }else{
            $scope.cur_user = data;
         }
   });
/* end LOCKDOWN + + + + + + + + + + + + + +  */


// FILTERING AND SORTING
$scope.sortType     = 'content';
$scope.sortReverse  = false;
$scope.searchText   = '';

// INDEX  + + + + + + + + + + + + + + + + + + + + + + + + */
var index = function() {
   console.log('index controller -> index() called to kick things off...');

   // CURRENT USER IS SET DURING LOGIN VERIFICATION AS $scope.cur_user

   // GET DATA
   //  postsFactory.index(function beingPassedToTheFactoryIndexByThisController(postsFromTheFactory) {
   //     $scope.posts = postsFromTheFactory;
   //     console.log('GOT ME POSTS: ',$scope.posts);
   //  });

}


/* POSTS + + + + + + + + + + + + + + + + + + + + + + + + + + +  */

// $scope.deletePost = function(_id){
//    postsFactory.delete(_id, function redirectAfterDelete(data){
//       //console.log('User Deleted: ',data );
//       index();
//    });
// }

// $scope.showPost = function(_id){
//    $location.path('/posts/' + _id );
// }

// $scope.answerPost = function(_id){
//    console.log('anser posters',_id);
//    postsFactory.setCurPostId(_id);
//    $location.path('/question/' + _id + '/new_answer' );
// }

//
// $scope.updatePost = function(user_id) {
//    $location.path('/posts/' + post_id + '/edit');
//  }

/* INIT   + + + + + + + + + + + + + + + + + + + + + + + + + + +  */
console.log("loading the index controller...");
index();

}]);
