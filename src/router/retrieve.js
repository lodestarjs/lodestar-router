import { copy } from '../utils/object';

/**
 * Returns all of the current routes in this instance of the Router.
 * @return {Object} returns the routes.
 */
function getRoutes() {

  return copy({}, this.routes);

}

export { getRoutes };

