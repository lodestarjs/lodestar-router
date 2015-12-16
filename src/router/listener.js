import { hasHistory, hasEventListener } from '../config/environment';
import { config, privateConfig, modifyPrivate } from '../config/defaults';
import { logger } from '../utils/log';
import { resolve } from '../router/search';
import { formatRoute } from '../utils/format';


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

  if ( this.config.loggingLevel = 'HIGH') logger.warn('No anchor tag found.');

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

  return formatRoute.call( this, removeOrigin( anchorLink ) );

}

function listener() {

  if ( this.config.listenerActive ) return;

  if ( this.config.loggingLevel === 'HIGH' ) logger.debug('Listener is now active.');

  let windowListener = hasEventListener ? window.addEventListener : window.attachEvent,
    docListener = hasEventListener ? document.addEventListener : document.attachEvent,
    initialLink = this.config.useHistory && hasHistory ? window.location.pathname : window.location.hash;

  this.config.listenerActive = true;

  if ( !this.config.useHistory || !hasHistory ) {

    if ( this.config.loggingLevel === 'HIGH' ) logger.debug('Listening for hash changes.');

    windowListener(hasEventListener ? 'hashchange' : 'onhashchange', function() { resolve( formatRoute.call( this, window.location.hash ) ); } );


  } else if ( this.config.useHistory && hasHistory ) {

    if ( this.config.loggingLevel === 'HIGH' ) logger.debug('Listening for clicks or popstate.');

    docListener('click', function() { this.resolve( historyClick() ); } );
    windowListener('popstate', function() { this.resolve( formatRoute.call( this, window.location.pathname )); } );

  }

  // Fire the initial page load link
  this.resolve( formatRoute.call( this, initialLink ) );

}

export { listener };