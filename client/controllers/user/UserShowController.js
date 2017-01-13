app.controller('userShowController', ['usersFactory','sessionFactory','$location','$routeParams',
function(usersFactory, sessionFactory, $location, rParams) {
   var _this = this;
   _this.user = {};

   /* LOCKDOWN + + + + + + + + + + + + + +  */
      _this.cur_user = null;
      sessionFactory.getCurUser(function(data){
         console.log('getCurUser',data);
         if(typeof(data.data) == 'string'){
             console.log('its a string! there is not a logged in user!');
             $location.path('/dashboard');
            }else{
               console.log('there is a logged in user!');
               _this.cur_user = data.data;
            }
      });
   /* end LOCKDOWN + + + + + + + + + + + + + +  */

   _this.getUser = function() {
      usersFactory.show(rParams.id, function passedToUsersFactoryShow(user) {
         if ( user.hasOwnProperty('errors') ) {
            // handle errors
            console.log('ERRORS', user.errors);
            alert('Error! Could not find user!');
            $location.path("/");
         }else{
            //console.log('this is the user we found, based on the id: ',user);
            // ANGULAR requires a type="date" field to be tied to Date object
            user.created_birthday = new Date(user.birthday);
            // console.log('friend: IsO',friend.created_birthday.toISOString());
            _this.user = user;
         }
    })
  }
   _this.getUser();

}]);
