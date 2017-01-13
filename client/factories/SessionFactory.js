app.factory('sessionFactory', function($http, $location){
    let factory = {};
    var curUser = {};

    factory.getCurUser = function(callback){
      //console.log('Client session factory  getCurUser called.....');
      // check for a current user first, then make http request
      // this doesn't persist if there is a hard refresh, but does save a call
      // to the database when navigating inside the site.
      if (curUser._id){
         console.log('there is a current user, just return it.',curUser._id);
         callback( {data:{ data: {curUser}}} );
      }else{
         console.log('there isnt one so get a user......');
         $location.path('/');
         // $http.get('/getcuruser').then(function(output){
         //    curUser = output.data;
         //    //console.log('curUser set in FACToRY',curUser);
         //     callback(output);
         // })
      }
    }

    factory.login = function(user,callback,errback){
        $http.post('/login', user).then(callback,errback);
    }

    return factory;
})
