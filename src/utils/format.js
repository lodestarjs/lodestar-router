import { config } from '../config/defaults';

function formatRoute( route ) {

  if(route === '') {
    route = '/';
  }

  route = route.replace(/^(\/?[\#\!\?]+)/, '')
                .replace(/$\//, '');

  if ( config.basePath.length ) {
    route.replace( config.basePath, '');
  }

  return route;

}

function getParent( url ) {
  let begin = url.indexOf('[') + 1,
      end = url.indexOf(']');
  return url.substring(begin, end);
};



export { formatRoute, getParent }