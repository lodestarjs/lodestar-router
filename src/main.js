import { welcome } from './utils/log';
import { config, modifyConfig } from './config/defaults';
import { createRoute, map } from './router/create';
import { getRoutes } from './router/retrieve';
import { resolve } from './router/search';


function Router( options ) {

  if (options)
    modifyConfig(options);

  welcome();

}

Router.prototype = {

  createRoute,
  map,
  getRoutes,
  resolve

};

export default Router;
