import { notFoundLog } from './log';

/**
 * Clears the routes cache of no longer needed active routes
 * @param  {String} key, the original to not remove active from
 * @param  {Object} pointer, the pointer to clear the cache from
 * @return {Void}, nothing returned
 */
function clearCache ( key, pointer ) {

  let props = Object.getOwnPropertyNames(pointer);

  for (let i = 0, ii = props.length; i < ii; i++) {

    if (props[i] !== key) {

      pointer[props[i]].active = false;

      if ( pointer[props[i]].childRoutes ) {

        clearCache(false, pointer[props[i]].childRoutes);

      }

    }

  }

}

/**
 * Splits the dynamic part
 * @param  {String} path, the current path to match the dynamic section
 * @param  {Array} splitKey, the path split into dynamic segments
 * @return {Object}, the object to map the dynamic segments into
 */
function dynamicSplit ( path, splitKey ) {

  let output = {};

  splitKey.shift();

  for( let i = 0, ii = splitKey.length; i < ii; i++){

    output[splitKey[i].replace(/\//g, '')] = path.match(/[^\/]*/g)[i !== 0 ? i + i: i];

  }

  return output;

}

/**
 * The page not found function, will execute a not found function that the user sets up
 * @param  {String} path, the current path that was not found
 * @param  {String} originalPath, the parent of the current path that was not found
 * @return {Void}, nothing returned
 */
function pageNotFound ( path, originalPath ) {

  if ( typeof this.userNotFound !== 'undefined' ) this.userNotFound();

  notFoundLog( path, originalPath );

}

function getParentController ( pointer ) {

  return pointer.controller;

}

export { dynamicSplit, clearCache, pageNotFound, notFound, getParentController };