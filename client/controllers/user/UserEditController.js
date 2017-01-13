app.controller('userEditController', ['usersFactory','sessionFactory', '$location', '$routeParams', function(usersFactory, sessionFactory, $location, rParams) {

   var _this = this;
   _this.user = {};
   _this.controlValue = "Current Name:";

   /* LOCKDOWN + + + + + + + + + + + + + +  */
      _this.cur_user = null;
      sessionFactory.getCurUser(function(data){
         if(typeof(data.data) == 'string'){
             $location.path('/dashboard');
            }else{
               _this.cur_user = data;
            }
      });
   /* end LOCKDOWN + + + + + + + + + + + + + +  */

   _this.getUser = function() {
      usersFactory.show(rParams.id, function passedToUsersFactoryShow(user) {
      //console.log('this is the friend, based on the id: ',friend);
      // ANGULAR requires a type="date" field to be tied to Date object
      user.created_birthday = new Date(user.birthday);
      // console.log('friend: IsO',friend.created_birthday.toISOString());
      _this.user = user;
    })
  }

  _this.updateUser = function(){
     console.log('Update user called', _this.user);
     _this.user.birthday = _this.user.created_birthday.toISOString();
      usersFactory.update(_this.user, function gotUpdatedUser(updatedUser){
      _this.user = updatedUser;
      _this.controlValue = "Updated Name: ";
      $location.path("/index");
    })
  }

  _this.getUser();
  //console.log(_this);
}]);
