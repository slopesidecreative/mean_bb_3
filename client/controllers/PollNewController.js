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

 $scope.validated_poll = false;

 if($scope.newPoll.question){
    if($scope.newPoll.question.length > 7){
      if($scope.newPoll.option1){
         if($scope.newPoll.option1.length > 2){
            if($scope.newPoll.option2){
               if($scope.newPoll.option2.length >2){
                  if($scope.newPoll.option3){
                     if($scope.newPoll.option3.length>2){
                        if($scope.newPoll.option4){
                           if($scope.newPoll.option4.length>2){
                              $scope.validated_poll = true;
                           }
                        }
                     }
                  }
               }
            }
         }
      }
   }
}



// if($scope.newPoll.question.length < 8){
//    alert('Question must be entered and longer.');
// }else if(
//    $scope.newPoll.option1.length > 2 &&
//    $scope.newPoll.option2.length > 2 &&
//    $scope.newPoll.option3.length > 2 &&
//    $scope.newPoll.option4.length > 2
// ){
//    $scope.validated_poll = true;
// }


 console.log($scope.validated_poll);
if($scope.validated_poll == true){
   pollsFactory.create( $scope.newPoll, function newPollCreated(newPoll){

      console.log("created New POLL?",newPoll);

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

}else{
   alert('Ask and appropriate question and add all options, please.');
}

}

});
