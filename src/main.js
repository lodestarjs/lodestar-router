import { welcome } from './utils/log';
import { config, modifyConfig, initConfig } from './config/defaults';
import { createRoute, map } from './router/create';
import { getRoutes } from './router/retrieve';
import { resolve } from './router/search';
import { listener } from './router/listener';
import { merge } from './utils/object';

function Router( options ) {

  initConfig(this);

  modifyConfig(this, options);

  welcome();

}

Router.prototype = {

  createRoute,
  map,
  getRoutes,
  resolve

};

export default Router;
