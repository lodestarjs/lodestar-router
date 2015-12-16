export default {
  '/' : {

     controller: function() {  },
     childRoutes: {

        'home': {

           controller: function() {  },

           childRoutes: {

              ':id': {
                controller: function() {  },
                childRoutes: {
                  '*any': {
                    controller: function() {  }
                  }
                }

              }

           }

        }

     }

  }
};