app.factory('postsFactory', function($http, $location){
    let factory = {};
    var posts;
    var curPost = {};
    var curPostId = '';


// GETTERS  + + + + + + + + + + + + + + + + + +
    factory.getCurPost = function(callback){
      if(curPost){
         callback( curPost );
      }else{
         console.log('NO CURRENT POST');
      }
    };

    factory.getCurPostId = function(callback){
      if(curPostId){
         callback( curPostId );
      }else{
         console.log('NO  CURRENT POST');
      }
    };


// SETTERS  + + + + + + + + + + + + + + + + + +
    factory.setCurPost = function(post){
      console.log('set cur post!!',post);
      curPost = post;
      return curPost;
   }

    factory.setCurPostId = function(id){
      //alert('cur id set',id);
      curPostId = id;
      return curPostId;
    };

// INDEX + + + + + + + + + + + + + + + + + +
    factory.index = function(callback){
      //call this method if you want to update or set the friends variable
      $http.get('/messages').then(function(returned_data){
        //console.log('users factory - get users: ', returned_data.data);
        posts = returned_data.data;
        callback(posts);
      });
   };

// SHOW + + + + + + + + + + + + + + + + + +
   factory.show = function(_id,callback){
    //console.log(' this.show -> get one friend by id');
    $http.get('/posts/' + _id).then(function(returned_data){
     //console.log('got back this one friend: ', returned_data.data);
     curPost = returned_data.data;
     post = returned_data.data;
     callback(post);
    });
  };

// CREATE + + + + + + + + + + + + + + + + + +
    factory.create = function(newpost,callback){
      console.log('CLIENT POSTS FACTORY - MAKING NEW....');
      // check to be sure there is a name and some content
      if(!newpost.postedby || !newpost.content){
          alert('Must enter a name and a post!');
          $location.path('/messages');
      } else {
          $http.post('/messages', newpost).then(function(returned_data){
            console.log('Client POSTS F - attempt to create new post returned: ', returned_data.data);
            if (typeof(callback) == 'function'){
               curPost = returned_data.data;
              callback(returned_data.data);
            }
          });
       }
    };

    return factory;
})
