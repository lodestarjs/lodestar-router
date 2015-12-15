import { routes } from '../config/defaults';
import { copy } from '../utils/object';

function getRoutes() {

  return copy({}, routes);

}

export { getRoutes }

