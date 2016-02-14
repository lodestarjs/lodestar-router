import { logger } from '../utils/log';
import { pageNotFound } from '../utils/route';
import { clearCache, dynamicSplit, getParentPointer } from '../utils/route';

/**
 * This goes through the entire routing tree, executing the matching paths.
 *
 * It also makes use of caching as in that it will only need to execute the
 * paths that are necessary.
 *
 * @param  {String} path, the current path that we are on
 * @return {Void}, nothing returned
 */
function resolve ( path ) {

  if ( path === '' ) path = '/';
  if ( !path ) return;

  let pointer = this.routes,
    parent = false,
    originalPath = path,
    isFinal = false,
    keyCache = '',
    matchedParent = false,
    currentPath = [];

  while( path.length ) {

    let routeData = {};

    // For each child of the current pointer which is some child of routes
    for ( let key in pointer ) {

      let dynamicKey = false;

      keyCache = key;

      // If contains : then it has dynamic segments
      if ( key.indexOf(':') > -1 ) {

        let splitKey = key.split(/(?=[:])/);

        // If there are more : than expected then there are multiple dynamic segments
        if ( splitKey.length >= 2 ) {

          routeData = dynamicSplit( path, splitKey );
          dynamicKey = key.replace(/\:[^\/]*/g, '[^\\/]*');

        } else {

          routeData[key.match(/\:[^\/]*/g)[0].replace(/(\:|\/)/g, '')] = path.match(/[^\/]*/)[0];
          dynamicKey = key.replace(/\*[^\/]*/g, '').replace(/\:[^\/]*/g, '[^\\/]*');

        }

      }

      // If contains * then there is a wildcard segment
      if (key.match(/\*[a-z]+/i)) {

        let temp = key.match(/.+?(?=\*)/);
        routeData[key.match(/\*[a-z]+/i)[0].replace(/\*/gi, '')] = path.replace(temp, '').replace(new RegExp(dynamicKey), '').match(/.*/)[0].split('/');
        dynamicKey = '.*';

      }

      matchedParent = path.match('^' + (dynamicKey || key ));

      // Find out if we're on the final run
      isFinal = matchedParent &&
                  path.replace( matchedParent[0], '' )
                  .replace(/^\//, '')
                  .replace(/\/$/, '').length === 0 ? true : false;

      if( path.length && matchedParent ) {

        // This will be used to clear the cache
        let obj = {};
        obj[ key ] = pointer[ key ];
        currentPath.push( key );
        this.cachedPath.push( obj );

        // If it's not the final run and the current route is not active, execute it
        if ( !pointer[ key ].active && !isFinal ) {

          pointer[ key ].routeData = routeData;
          pointer[ key ].active = true;
          if ( parent ) pointer[ key ].getParent = function() { return getParentPointer( parent ); };
          pointer[ key ].controller();

        }

        // Remove current part from the path
        path = path.replace( matchedParent[0], '' )
                  .replace(/^\//, '')
                  .replace(/\/$/, '');

        // If it is not final then re-assign the pointer
        if ( pointer[key].childRoutes && !isFinal ) {

          parent  = pointer[ key ];
          pointer = pointer[ key ].childRoutes;

        } else if ( !isFinal ) {

          pageNotFound.call( this, path, originalPath );
          path = '';

        }

        break;

      }

    }

    // If it's the final page, re-execute it and set to active
    if ( isFinal ) {

      pointer[ keyCache ].routeData = routeData;
      pointer[ keyCache ].active = true;
      if ( parent ) pointer[ keyCache ].getParent = function() { return getParentPointer( parent ); };
      pointer[ keyCache ].controller();
      clearCache.call(this, currentPath);

    } else if ( !matchedParent ) {

      pageNotFound.call( this, path, originalPath );
      clearCache.call(this, currentPath);
      path = '';
      break;

    }

  }

}


/**
 * Used in createRoute to map a routing object to a parent in a way
 * that the Router can understand it.
 * @param  {String} parents, the parent path
 * @param  {Object} routeObject, the object to add as a child
 * @return {Void}, nothing returned
 */
function traverse( parents, routeObject ) {

  let pointer = this.routes,
    createPointer = {};

  while ( parents.length ) {

    for ( let key in pointer ) {

      let matchedParent = parents.match('^' + key );

      if ( parents.length && matchedParent ) {

        parents = parents.replace(matchedParent[0], '')
                        .replace(/^\//, '')
                        .replace(/\/$/, '');

        createPointer = pointer[key];
        pointer = pointer[key].childRoutes || pointer[key];

        break;

      }

    }

  }

  if ( typeof createPointer.childRoutes === 'undefined' ) {
    createPointer.childRoutes = {};
  }

  routeObject.path = routeObject.path.substring( routeObject.path.indexOf(']') + 1 )
                      .replace(/^\//, '')
                      .replace(/\/$/, '');

  createPointer.childRoutes[ routeObject.path ] = {};
  createPointer.childRoutes[ routeObject.path ].controller = routeObject.controller;

}

export { traverse, resolve };