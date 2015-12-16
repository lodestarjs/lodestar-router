/**
 * Format the route to a standard that the Router can understand
 * @param  {String} route, the route to format
 * @return {String}, the formatted route
 */
function formatRoute( route ) {

  if(route === '') {
    route = '/';
  }

  route = route.replace(/^(\/?[\#\!\?]+)/, '')
              .replace(/$\//, '');

  if ( this.config.basePath.length ) {
    route.replace( this.config.basePath, '');
  }

  return route;

}

/**
 * For createRoute() grab the parent specified in the []
 * @param  {String} url, the route to find a parent in
 * @return {String}, the parent URL
 */
function getParent( url ) {
  let begin = url.indexOf('[') + 1,
    end = url.indexOf(']');
  return url.substring(begin, end);
}



export { formatRoute, getParent };