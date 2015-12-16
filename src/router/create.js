import { getParent, formatRoute } from '../utils/format';
import { traverse } from './search';
import { listener } from './listener';

function map( routeObject ) {

  if ( this.config.usingMap === false ) throw new Error('Do not use map() as well as createRoute().');

  for ( let key in routeObject ) {

    this.routes[key] = routeObject[key];

  }

  this.config.usingMap = true;

  listener.call(this);

}

function createRoute( routeObject ) {

  if ( this.config.usingMap === true ) throw new Error('Do not use createRoute() as well as map().');

  if ( !routeObject ) throw new Error('No route object defined.');

  if ( !routeObject.path ) throw new Error('Please define the route to use.');

  if ( !routeObject.controller || typeof routeObject.controller !== 'function' ) throw new Error('Please define the function that should be executed.');

  let parentUrls = '';

  if(routeObject.path.indexOf('[') > -1){

    parentUrls = getParent(routeObject.path);

    traverse.call( this, parentUrls, routeObject );

  } else {

    routeObject.path = formatRoute.call(this, routeObject.path);
    this.routes[routeObject.path] = {};
    this.routes[routeObject.path].controller = routeObject.controller;

  }

  if ( this.config.usingMap === '' ) {

    setTimeout(() => {
      listener.call( this );
    }, 0);

  }

  this.config.usingMap = false;

}

export { map, createRoute }