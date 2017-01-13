app.factory('commentsFactory', function($http, $location){
    var factory = {};
    var comments;
    var curComment = {};

// CREATE + + + + + + + + + + + + + + + + + +
    factory.create = function(id, newcomment,callback){
      console.log('CLIENT COMMENT FACTORY - MAKING NEW....', newcomment);
      //check to be sure there is a name and some content
      if(!newcomment.commentby.length > 2 || !newcomment.content.length > 2){
          alert('Must enter a name and a post!');
          $location.path('/message');
      } else {
      // id is the post that the comment relates to
      newcomment.post_id = id;

    $http.post('/messages/posts/' + id + '/comments', newcomment).then(function(returned_data){
         console.log('Client COMMENTS F - attempt to create new comment returned: ', returned_data.data);
         if (typeof(callback) == 'function'){
           callback(returned_data.data);
         }
       });
      }
    };

 // ADD + + + + + + + + + + + + + + + + + +
 // adds a comment to a comment
     factory.add = function(comment_id, newcomment, callback){
       console.log('CLIENT COMMENT FACTORY - ADD COMMENT TO COMMENT....', newcomment);
       //check to be sure there is a name and some content
       if(!newcomment.commentby.length > 2 || !newcomment.content.length > 2){
           alert('Must enter a name and a post!');
           $location.path('/message');
       } else {
       // id is the comment that the comment relates to
       newcomment.comment_id = comment_id;

     $http.post('/messages/comments/' + comment_id + '/comments', newcomment).then(function(returned_data){
          console.log('Client COMMENTS COMMENTS - attempt to create new comment comment returned: ', returned_data.data);
          if (typeof(callback) == 'function'){
            callback(returned_data.data);
          }
        });
       }
     };

// VOTE + + + + + + + + + + + + + + + + + +
    factory.vote = function(data,callback){
      console.log('comments factory vote:',data, callback);
      $http.post('/messages/vote',data).then(function(returned_data){
         console.log('Client COMMENTS VOTE attempt to create comment vote returned: ', returned_data.data);
         if (typeof(callback) == 'function'){
           callback(returned_data.data);
         }
      });
   }

    return factory;
})
