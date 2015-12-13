import { getParent, formatRoute } from '../utils/format';
import { routes } from './globals';
import { traverse } from './search'

function map( routeObject ) {

  for ( let key in routeObject ) {

    routes[key] = routeObject[key];

  }

}

function createRoute( routeObject ) {

  if ( !routeObject ) throw new Error('No route object defined.')

  if ( !routeObject.path ) throw new Error('Please define the route to use.');

  if ( !routeObject.controller || typeof routeObject.controller !== 'function' ) throw new Error('Please define the function that should be executed.');

  let parentUrls = '';

  if(routeObject.path.indexOf('[') > -1){

    parentUrls = getParent(routeObject.path);

    traverse( parentUrls, routeObject );

  } else {

    routeObject.path = formatRoute(routeObject.path);
    routes[routeObject.path] = {};
    routes[routeObject.path].controller = routeObject.controller;

  }

}

export { map, createRoute }