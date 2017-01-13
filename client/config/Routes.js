/* configuration for angular route */
app.config(function($routeProvider) {
  $routeProvider

/* ROOT   ----------------- */
   .when('/dashboard', {
      // show all
     templateUrl: '/partials/index.html',
     controller: 'indexController'
   })

/* LOGIN REGSISTRATION   -------------------------------- */
 .when('/', {
   templateUrl: 'partials/dashboard.html',
   controller: 'sessionController'

 })

/* POLLS   -------------------------------- */

.when('/create', {
  templateUrl: 'partials/pollCreate.html',
  controller: 'pollsNewController'

})

//  .when('/new/questions', {
//    templateUrl: '/partials/postNew.html',
//    controller: 'postsNewController',
//    controllerAs: 'nC'
// })
// .when('/posts/:id', {
//   templateUrl: '/partials/postShow.html',
//   controller: 'postsShowController',
//   controllerAs: 'sC'
// })

/* COMMENTS  -------------------------------- */

// .when('/question/:id/new_answer', {
//   templateUrl: '/partials/commentsNew.html',
//   controller: 'commentsNewController',
//   controllerAs: 'nC'
// })



/* USERS   -------------------------------- */
   .when('/users/:id/edit/', {
     templateUrl: '/partials/userEdit.html',
     controller: 'userEditController',
     controllerAs: 'eC'
   })
   .when('/users/:id', {
     templateUrl: '/partials/userShow.html',
     controller: 'userShowController',
     controllerAs: 'sC'
   })
   .when('/new/user', {
     templateUrl: '/partials/userNew.html',
     controller: 'userNewController',
     controllerAs: 'nC'
   })


/* DEFAULT -------------------------------- */
    .otherwise({
      redirectTo: '/dashboard'
    });
});
