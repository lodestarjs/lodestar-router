import { welcome } from './utils/log';
import { modifyConfig, initConfig } from './config/defaults';
import { createRoute, map } from './router/create';
import { getRoutes } from './router/retrieve';
import { resolve } from './router/search';

function Router( options ) {

  initConfig(this);

  modifyConfig(this, options);

  welcome();

}

Router.prototype = {

  createRoute,
  map,
  getRoutes,
  resolve,
  notFound: function(callback) { this.userNotFound = callback; }

};

export default Router;
