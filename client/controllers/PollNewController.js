app.controller('pollsNewController', function($scope, sessionFactory, pollsFactory, $location){
   // the logged in user
   $scope.cur_user = null;
   // the new message to create from  form
   $scope.newPoll = {};
   // track errors
   $scope.errors = [];

/* LOCKDOWN + + + + + + + + + + + + + + +  */
    sessionFactory.getCurUser(function(data){
      console.log('Polls create controller got the current user: ',data.data.data.curUser);
      $scope.cur_user = data.data.data.curUser;
      if(!$scope.cur_user){
         $location.url('/');
      }
   });
/* LOCKDOWN + + + + + + + + + + + + + + +  */

$scope.addPoll = function(){
   $scope.errors = [];
   console.log('$ CREATE THIS POLL: ', $scope.newPoll);
   pollsFactory.create( $scope.newPoll, function newPollCreated(newPoll){

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
           $scope.newPoll = {};
      }
      console.log('new poll errors: ',$scope.errors);
      // - if no errors, the poll has been created
      if($scope.errors.length == 0){
         $location.path("/dashboard");
      }
   });
}

});
