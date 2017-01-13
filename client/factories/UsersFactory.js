console.log('users factory js file loaded....');

app.factory('usersFactory', ['$http','$location', function($http,$location) {

  var users = [];
  var user = {};

  function UsersFactory(){
    var _this = this;

    _this.index = function(callback){
      //call this method if you want to update or set the friends variable
      $http.get('/users').then(function(returned_data){
        //console.log('users factory - get users: ', returned_data.data);
        users = returned_data.data;
        callback(users);
      });
   };

   _this.create = function(newuser,callback){
      console.log('CLIENT USER FACTORY - MAKING NEW....');
      if(!newuser.birthday){
         alert('Must enter a date!');
         $location.path('/dashboard');
      } else {
         $http.post('/users', newuser).then(function(returned_data){
           console.log('Client UF - attempt to create new user returned: ', returned_data.data);
           if (typeof(callback) == 'function'){
             callback(returned_data.data);
           }
         });
      }
    };

    _this.update = function(userToUpdate,callback){
      console.log('$$$$$$$FF UPDATE GOT: ', userToUpdate);
      var updateuri = '/users/' + userToUpdate._id;
      //console.log('update to this url: ',updateuri);
      $http.put(updateuri, userToUpdate).then(function(returned_data){
        //console.log('got back an updated friend!',returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
         });
    };

    _this.delete = function(_id,callback){
      //console.log('You said to delete: ', _id);
      $http.delete('/users/' + _id).then(function(returned_data){
         //console.log('client user factory on delete got back: ', returned_data);
        if (typeof(callback) == 'function'){
          callback(returned_data);
        }
      })
    };
    _this.show = function(_id,callback){
     //console.log(' this.show -> get one friend by id');
     $http.get('/users/' + _id).then(function(returned_data){
      //console.log('got back this one friend: ', returned_data.data);
      users = returned_data.data;
      callback(users);
     });
   };

// GETTERS ----------

   _this.getUsers = function(callback){
      callback(users);
   };
   _this.getUser = function(callback){
      callback(user);
   };


}
  //console.log(new FriendsFactory());
  return new UsersFactory();
}]);
