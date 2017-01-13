app.controller('pollsNewController', function($scope, sessionFactory, pollsFactory, $location){
   // the logged in user
   $scope.cur_user = null;
   // the new message to create from  form
   $scope.newPoll = {};
   // track errors
   $scope.errors = [];

/* LOCKDOWN + + + + + + + + + + + + + + +  */

sessionFactory.getCurUser(function(data){
   //console.log('returned to client INDEX controller',data);
   if(typeof(data.data) == 'string'){
       $location.path('/');
      }else{
         //console.log('got it!!', data.data.data.curUser);
         $scope.cur_user = data.data.data.curUser;
      }
});

/* LOCKDOWN + + + + + + + + + + + + + + +  */

$scope.createPoll = function(){
   $scope.errors = [];
   console.log('$ CREATE THIS POLL: ', $scope.newPoll);
   $scope.newPoll.created_by = $scope.cur_user._id;
   console.log('FINAL make this poll:',$scope.newPoll);
   pollsFactory.create( $scope.newPoll, function newPollCreated(newPoll){

      console.log("!!!YES created New POLL",newPoll);

      // HANDLE ERRORS
      // - check for all other validations
      if ( newPoll.data.hasOwnProperty('errors') ) {
           for (var key in newPoll.data.errors) {
              if (newPoll.data.errors.hasOwnProperty(key)) {
                 var obj = newPoll.data.errors[key];
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
