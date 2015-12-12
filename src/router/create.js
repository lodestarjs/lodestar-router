import { getParent, formatRoute } from '../utils/format';
import { routes } from './globals';
import { traverse } from './search'

function map( routeObject ) {

  for ( let key in routeObject ) {

    routes[key] = routeObject[key];

  }

}

function createRoute( route, controller ) {

  if ( !route ) throw new Error('Please define the route to use.');

  if ( !controller || typeof controller !== 'function' ) throw new Error('Please define the function that should be executed.')

  let parentUrls = '';

  if(route.indexOf('[') > -1){

    parentUrls = getParent(route);

    traverse( parentUrls, route, controller );

  } else {

    route = formatRoute(route);

    routes[route] = {};
    routes[route].controller = controller;

  }

}

// var splitUrl = '',
//   parentUrl = false,
//   formattedName = '',
//   dynamicName = '';

// if(url.indexOf('[') > -1){
//   parentUrl = getParent(url);
// }

// url = url.replace(/[\[\]]*/g, '');

// formattedName = formatRoute(url);

// routes[formattedName] = {};

// routes[formattedName].controller = stuff;

// if(parentUrl){
//   routes[formattedName].parent = parentUrl === '' ? '/' : parentUrl;
// }

// dynamicName = formattedName.replace(/(\*[a-z0-9]*)\/?/gi, '.*').replace(/(\:[a-z0-9]*)\/?/gi, '[^\\/]*\/?');

// if(currentRoute().match('^' + dynamicName + '$')) {
//   executeRoute(currentRoute());
// }

export { map, createRoute }