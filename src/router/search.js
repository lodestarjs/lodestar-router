import { routes } from './globals';
import { formatRoute } from '../utils/format';
import { logger } from '../utils/log';


function clearCache ( key, pointer ) {

  var props = Object.getOwnPropertyNames(pointer);

  for (var i = 0, ii = props.length; i < ii; i++) {

    if (props[i] !== key) {

      pointer[props[i]].active = false;

      if ( pointer[props[i]].childRoutes ) {

        clearCache(false, pointer[props[i]].childRoutes);

      }

    }

  }

}

function notFound ( path, originalPath ) {
  logger.warn(`Route ${path} of ${originalPath} not found.`);
}

function resolve ( path ) {

  let pointer = routes,
    originalPath = path,
    isFinal = false,
    keyCache = '',
    matchedParent = false;

  while( path.length ) {

    let routeData = {};

    for ( let key in pointer ) {

      let dynamicKey = false;

      keyCache = key;

      if ( key.indexOf(':') > - 1) {

        routeData[key.replace(':', '')] = path.match(/[^\/]*/)[0];
        dynamicKey = /[^\/]*/;

      }

      if ( key.indexOf('*') > -1 ) {

        routeData[key.replace('*', '')] = path.match(/.*/)[0].split('/');
        dynamicKey = /.*/;

      }

      matchedParent = path.match( dynamicKey || key );

      isFinal = matchedParent &&
                  path.replace( matchedParent[0], '' )
                  .replace(/^\//, '')
                  .replace(/\/$/, '').length === 0 ? true : false;

      if( path.length && matchedParent ) {


        if ( !pointer[ key ].active && !isFinal ) {

          pointer[ key ].routeData = routeData;
          pointer[ key ].controller();
          pointer[ key ].active = true;

        }

        path = path.replace( matchedParent[0], '' )
                  .replace(/^\//, '')
                  .replace(/\/$/, '');

        if ( pointer[key] ) clearCache( key, pointer );


        if ( pointer[key].childRoutes && !isFinal ) {

          pointer = pointer[ key ].childRoutes;

        } else if ( !isFinal ) {

          notFound( path, originalPath );
          path = '';

        }

        break;

      }

    }

    if ( isFinal ) {

      pointer[ keyCache ].routeData = routeData;
      pointer[ keyCache ].controller();
      pointer[ keyCache ].active = true;

    } else if ( !matchedParent ) {

      notFound( path, originalPath );
      path = '';
      break;

    }

  }

}

function traverse( parents, routeObject ) {

  let pointer = routes,
    createPointer = {};

  while ( parents.length ) {

    for ( let key in pointer ) {

      let matchedParent = parents.match( key );

      if ( parents.length && matchedParent ) {

        parents = parents.replace(matchedParent[0], '');
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

export { traverse, resolve }