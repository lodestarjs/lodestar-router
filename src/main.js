import { welcome } from './utils/log';
import { modifyConfig, initConfig } from './config/defaults';
import { createRoute, map } from './router/create';
import { resolve } from './router/search';

function Router( options ) {

  initConfig(this);

  modifyConfig(this, options);

  welcome();

}

Router.prototype = {

  createRoute,
  map,
  resolve,
  notFound: function(callback) { this.userNotFound = callback; }

};

export default Router;
