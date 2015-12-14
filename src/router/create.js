import { getParent, formatRoute } from '../utils/format';
import { routes, privateConfig } from './globals';
import { traverse } from './search';
import { listener } from './listener';

function map( routeObject ) {

  if ( privateConfig.usingMap === false ) throw new Error('Do not use map() as well as createRoute().');

  for ( let key in routeObject ) {

    routes[key] = routeObject[key];

  }

  privateConfig.usingMap = true;

}

function createRoute( routeObject ) {

  if ( privateConfig.usingMap === true ) throw new Error('Do not use createRoute() as well as map().');

  if ( !routeObject ) throw new Error('No route object defined.');

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

  privateConfig.usingMap = false;

  listener();

}

export { map, createRoute }