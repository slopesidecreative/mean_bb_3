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


   // VOTE + + + + + + + + + + + + + + + + + +
   factory.vote = function(data,callback){
         console.log('polls factory vote:',data, callback);
         $http.post('/polls/vote',data).then(function(returned_data){
            console.log('Client COMMENTS VOTE attempt to create comment vote returned: ', returned_data.data);
            if (typeof(callback) == 'function'){
              callback(returned_data.data);
            }
         });
      }

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
   factory.show = function(_id,callback){
    //console.log(' this.show -> get one friend by id');
    $http.get('/polls/' + _id).then(function(returned_data){
     console.log('got back this one poll: ', returned_data);

     if(returned_data.data){
        callback(returned_data.data);

     }
   //   curPoll = returned_data.data;
   //   poll = returned_data.data;

    });
  };


 factory.delete = function(id,cb){
    console.log('factory delete called',id);
    $http.get('/delete/' + id).then(function(returned_data){

      console.log('delte and retured;',returned_data);
      cb(returned_data);


   //   //console.log('Client POLLS - attempt to create new poLL returned: ', returned_data.data);
   //   if (typeof(callback) == 'function'){
   //      console.log('CLIENT FACTORY DEL',returned_data);
   //   //   curPoLL = returned_data.data;
   //     callback(returned_data);
   //   }
   });
}

// CREATE + + + + + + + + + + + + + + + + + +
    factory.create = function(newpoll,callback){
      console.log('CLIENT POLLS FACTORY - MAKING NEW....',newpoll);


      // check to be sure there is a name and some content
      if(true == false){
          alert('Must enter a question and all four options!');
          $location.path('/create');
      } else {
          $http.post('/polls', newpoll).then(function(returned_data){
            //console.log('Client POLLS - attempt to create new poLL returned: ', returned_data.data);
            if (typeof(callback) == 'function'){
               console.log('CLIENT FACTORY SAYS SUCCESS POLL CREAATED',returned_data);
            //   curPoLL = returned_data.data;
              callback(returned_data);
            }
          });
       }
    };

    return factory;
})
