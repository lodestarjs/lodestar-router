import { copy } from '../utils/object';

function getRoutes() {

  return copy({}, this.routes);

}

export { getRoutes }

