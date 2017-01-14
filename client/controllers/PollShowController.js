app.controller('pollsShowController', ['$scope','sessionFactory','pollsFactory','$location','$routeParams',
function($scope,sessionFactory,pollsFactory, $location, rParams) {
   var _this = this;

   // current post
   $scope.poll = {};

   // voting
   $scope.allowVoting = true;

   /* LOCKDOWN + + + + + + + + + + + + + +  */
   sessionFactory.getCurUser(function(data){
      //console.log('returned to client INDEX controller',data);
      if(typeof(data.data) == 'string'){
          $location.path('/');
         }else{
            //console.log('got it!!', data.data.data.curUser);
            $scope.cur_user = data.data.data.curUser;
         }
   });
   /* end LOCKDOWN + + + + + + + + + + + + + +  */

   $scope.getPoll = function() {
      pollsFactory.show(rParams.id, function passedToPollsFactoryShow(poll) {
         console.log('POLL SHOW: ',poll);
         if ( poll.hasOwnProperty('errors') ) {
            // handle errors
            console.log('ERRORS', poll.errors);
            alert('Error! Could not find post!');
            $location.path("/");
         }else{
            // SUCCESS !!
            console.log("SUCC");

            // SET THE CUR POST - LOCAL
            $scope.poll = poll;

         }
    })
  }


  $scope.delete = function(id){
     pollsFactory.delete(id,function(data){
        console.log('POST DELETE: ',data);
        if ( data.hasOwnProperty('errors') ) {
           // handle errors
           console.log('ERRORS', data.errors);
           alert('Error! Could not delete!');
           $location.path("/dashboard");
        }else{
           // SUCCESS !!
           console.log('returned all the way, after voting ',data);
           //
           $scope.getPoll();
        }

     })
 }


  // VOTING + + + + + + + + + + + + + + + + + + + + + + +
  $scope.vote = function(vote,option){
     //console.log("vote!",vote,_id);
     // pass the comment id and the vote

     console.log('vote for me!!',$scope.poll._id);
     var theId = $scope.poll._id;
      var data = {"id":theId,"vote":vote,"option":option};
      pollsFactory.vote(data,function passedToFactory(data){
         console.log('POST VOTE: ',data);
         if ( data.hasOwnProperty('errors') ) {
            // handle errors
            console.log('ERRORS', data.errors);
            alert('Error! Could not vote!');
            $location.path("/dashboard");
         }else{
            // SUCCESS !!
            console.log('returned all the way, after voting ',data);
            //
            $scope.getPoll();
         }
      });
  }

   $scope.getPoll();

}]);
