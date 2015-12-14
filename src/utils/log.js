import { hasConsole, hasCollapsedConsole } from '../config/environment';
import { config } from '../config/defaults';

const logger =  {};

logger.debug = function () { if( hasConsole && config.debug ) console.debug.apply(console, arguments); };

logger.log   = function () { if( hasConsole && config.debug ) console.log.apply(console, arguments); };

logger.warn  = function () { if( hasConsole && config.debug ) console.warn.apply(console, arguments); };


let routerIntro = [`LodestarJs-Router <@version@> in debug mode.`];
let routerMessage = `

Hello, you are running the LodestarJs Router <@version@> in debug mode.
This will help you to identify any problems in your application.

To disable debug mode, you can either call the method from
Router.prototype.config() or when declaring a new instance simply
disable it there. For example, new Router({debug: false});

For documentation head to the wiki:
  https://github.com/lodestarjs/lodestar-router/wiki

If you have found any bugs, create an issue for us:
  https://github.com/lodestarjs/lodestar-router/issues

`;

function welcome() {

  if (hasConsole && config.debug ) {

    console[ hasCollapsedConsole ? 'groupCollapsed' : 'log' ].apply( console, routerIntro );

    console.log( routerMessage );

    if ( hasCollapsedConsole ) {
      console.groupEnd( routerIntro );
    }

  }

}

export { logger, welcome }