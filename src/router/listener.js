import { hasHistory, hasEventListener } from '../config/environment';
import { config } from '../config/defaults';
import { privateConfig } from './globals';
import { logger } from '../utils/log';
import { resolve } from '../router/search';
import { formatRoute as format } from '../utils/format';


function removeOrigin ( link ) {

  if (!window.location.origin) {
    return link.replace(window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: ''), '');
  } else {
    return link.replace(window.location.origin, '');
  }

}

function checkParents( target ) {

  while (target) {

    if (target instanceof HTMLAnchorElement) {
      return target;
    }

    target = target.parentNode;
  }

  if ( config.loggingLevel = 'HIGH') logger.warn('No anchor tag found.');

  return false;

}


function historyClick( e ) {

  e = window.e || e;

  let target = e.target,
    anchorLink = '';

  if (target.tagName !== 'A') target = checkParents( target );

  if ( !target ) return;

  anchorLink = target.getAttribute('href');

  if (anchorLink === '_blank' || (anchorLink.indexOf(':') > -1 && !anchorLink.match(/(?:https?|s?ftp):/))) return;

  return format( removeOrigin( anchorLink ) );

}

function listener() {

  if ( privateConfig.listenerActive ) return;

  if ( config.loggingLevel === 'HIGH' ) logger.debug('Listener is now active.');

  let windowListener = hasEventListener ? window.addEventListener : window.attachEvent,
    docListener = hasEventListener ? document.addEventListener : document.attachEvent,
    initialLink = config.useHistory && hasHistory ? window.location.pathname : window.location.hash;

  privateConfig.listenerActive = true;

  if ( !config.useHistory || !hasHistory ) {

    if ( config.loggingLevel === 'HIGH' ) logger.debug('Listening for hash changes.');

    windowListener(hasEventListener ? 'hashchange' : 'onhashchange', function() { resolve( format( window.location.hash ) ); } );


  } else if ( config.useHistory && hasHistory ) {

    if ( config.loggingLevel === 'HIGH' ) logger.debug('Listening for clicks or popstate.');

    docListener('click', function() { resolve( historyClick() ); } );
    windowListener('popstate', function() { resolve( format( window.location.pathname )); } );

  }

  // Fire the initial page load link
  resolve( format( initialLink ) );

}

export { listener };