import { hasConsole, hasCollapsedConsole } from '../config/environment';
import { globals } from '../config/defaults'

const logger =  {};

logger.debug = function () { if( hasConsole && globals.DEBUG ) console.debug.apply(console, arguments); };

logger.log   = function () { if( hasConsole && globals.DEBUG ) console.log.apply(console, arguments); };

logger.warn  = function () { if( hasConsole && globals.DEBUG ) console.warn.apply(console, arguments); };


let routerIntro = [`LodestarJs-Router <@version@> in debug mode.`];
let routerMessage = `

Hello, you are running the LodestarJs Router <@version@> in debug mode.
This will help you to identify any problems in your application.

DEBUG mode is a global option, to disable debug mode will disable it for each
instance. You can either call the method when declaring a new instance simply
disable it there. For example, new Router({DEBUG: false});

For documentation head to the wiki:
  https://github.com/lodestarjs/lodestar-router/wiki

If you have found any bugs, create an issue for us:
  https://github.com/lodestarjs/lodestar-router/issues

`;

/**
 * The welcome function gives a message to the user letting the know
 * some key things about the Router.
 * @return {Void}, nothing returned
 */
function welcome () {

  if (hasConsole && globals.DEBUG ) {

    console[ hasCollapsedConsole ? 'groupCollapsed' : 'log' ].apply( console, routerIntro );

    console.log( routerMessage );

    if ( hasCollapsedConsole ) {
      console.groupEnd( routerIntro );
    }

  }

}

/**
 * Logs the route that has not been found.
 * @param  {String} path, the child of the parent route to watch.
 * @param  {String} originalPath, the original path
 * @return {Void}, nothing returned
 */
function notFoundLog ( path, originalPath ) {
  logger.warn(`Route ${path} of ${originalPath} not found.`);
}

export { logger, welcome, notFoundLog }