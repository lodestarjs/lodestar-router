import { notFoundLog } from './log';

/**
 * Clears the routes cache of no longer needed active routes
 * @param  {String} path, The current path
 * @return {Void}, nothing returned
 */
function clearCache( path ) {

  let cachedPath = this.cachedPath,
    i = cachedPath.length;

  while ( i-- ) {

    let key = Object.keys(cachedPath[i])[0];

    if ( path.indexOf( key ) === -1 ) {

      cachedPath[ i ][ key ].active = false;
      cachedPath.splice( i, 1 );

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

  while ( path.length && splitKey.length )  {

    if ( splitKey[0].indexOf(':') > -1 ) {

      output[splitKey[0].split('/')[0].replace(/[\/\:]*/g, '')] = path.slice(0, path.indexOf('/') > -1 ? path.indexOf('/') : path.length);

    }

    path = path.substring(path.indexOf('/') + 1);
    splitKey.shift();

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

function getParentPointer ( pointer ) {

  return pointer;

}

export { dynamicSplit, clearCache, pageNotFound, notFound, getParentPointer };