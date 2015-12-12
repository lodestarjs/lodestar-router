import { routes } from './globals.js';
import { copy } from '../utils/object';

function getRoutes() {

  return copy({}, routes);

}

export { getRoutes }

