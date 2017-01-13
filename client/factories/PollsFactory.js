app.factory('pollsFactory', function($http, $location){
    let factory = {};
    var polls;
    var curPoll = {};
    var curPollId = '';


// GETTERS  + + + + + + + + + + + + + + + + + +
   //  factory.getCurPost = function(callback){
   //    if(curPost){
   //       callback( curPost );
   //    }else{
   //       console.log('NO CURRENT POST');
   //    }
   //  };
    //
   //  factory.getCurPostId = function(callback){
   //    if(curPostId){
   //       callback( curPostId );
   //    }else{
   //       console.log('NO  CURRENT POST');
   //    }
   //  };


// SETTERS  + + + + + + + + + + + + + + + + + +
   //  factory.setCurPost = function(post){
   //    console.log('set cur post!!',post);
   //    curPost = post;
   //    return curPost;
   // }
   //
   //  factory.setCurPostId = function(id){
   //    //alert('cur id set',id);
   //    curPostId = id;
   //    return curPostId;
   //  };

// INDEX + + + + + + + + + + + + + + + + + +
    factory.index = function(callback){
      //call this method if you want to update or set the friends variable
      $http.get('/polls').then(function(returned_data){
        //console.log('users factory - get users: ', returned_data.data);
        polls = returned_data.data;
        callback(polls);
      });
   };

// SHOW + + + + + + + + + + + + + + + + + +
  //  factory.show = function(_id,callback){
  //   //console.log(' this.show -> get one friend by id');
  //   $http.get('/posts/' + _id).then(function(returned_data){
  //    //console.log('got back this one friend: ', returned_data.data);
  //    curPost = returned_data.data;
  //    post = returned_data.data;
  //    callback(post);
  //   });
  // };

// CREATE + + + + + + + + + + + + + + + + + +
    factory.create = function(newpoll,callback){
      console.log('CLIENT POLLS FACTORY - MAKING NEW....');
      // check to be sure there is a name and some content
      if(!newpoll.question || !newpost.option1.length<3){
          alert('Must enter a question and all four options!');
          $location.path('/create');
      } else {
          $http.post('/polls', newpoll).then(function(returned_data){
            console.log('Client POLLS - attempt to create new poLL returned: ', returned_data.data);
            if (typeof(callback) == 'function'){
              curPoLL = returned_data.data;
              callback(returned_data.data);
            }
          });
       }
    };

    return factory;
})
