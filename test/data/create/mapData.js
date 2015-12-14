export default {
  '/' : {

     controller: function() { console.log('index'); },
     childRoutes: {

        'home': {

           controller: function() { console.log('home'); },

           childRoutes: {

              ':id': {
                controller: function() { console.log(':id'); },
                childRoutes: {
                  '*any': {
                    controller: function() { console.log('*any'); }
                  }
                }

              }

           }

        }

     }

  }
};