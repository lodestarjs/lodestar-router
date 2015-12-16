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

function welcome() {

  if (hasConsole && globals.DEBUG ) {

    console[ hasCollapsedConsole ? 'groupCollapsed' : 'log' ].apply( console, routerIntro );

    console.log( routerMessage );

    if ( hasCollapsedConsole ) {
      console.groupEnd( routerIntro );
    }

  }

}

export { logger, welcome }