import { hasHistory, hasEventListener } from '../config/environment';
import { config, privateConfig, modifyPrivate } from '../config/defaults';
import { logger } from '../utils/log';
import { resolve } from '../router/search';
import { formatRoute } from '../utils/format';

/**
 * Removes the origin from the link, for those who are using absolute links..
 * @param  {String} link, the link to have the origin removed from it.
 * @return {String}, the link with the origin removed.
 */
function removeOrigin ( link ) {

  if (!window.location.origin) {
    return link.replace(window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: ''), '');
  } else {
    return link.replace(window.location.origin, '');
  }

}

/**
 * Traverses through the parent nodes to look for an Anchor tag.
 * Used in historyMode.
 * @param  {HTMLElement} target, the element to begin traversing from.
 * @return {Boolean|HTMLElement} returns false or the found element.
 */
function checkParents( target ) {

  while (target) {

    if (target instanceof HTMLAnchorElement) {
      return target;
    }

    target = target.parentNode;
  }

  return false;

}

/**
 * On click, finds the anchor tag formats the link and returns it.
 * @param  {Event} e, the event passed through from the click event.
 * @return {String} returns the formatted href for this link
 */
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

/**
 * This sets up the events for 'Hashchange' and 'History' mode depending on what has been selected and what is available.
 * @return {Void}, nothing returned
 */
function listener() {

  if ( this.config.listenerActive ) return;

  if ( this.config.loggingLevel === 'HIGH' ) logger.debug('Listener is now active.');

  let windowListener = hasEventListener ? window.addEventListener : window.attachEvent,
    docListener = hasEventListener ? document.addEventListener : document.attachEvent,
    initialLink = this.config.useHistory && hasHistory ? window.location.pathname : window.location.hash;

  this.config.listenerActive = true;

  if ( !this.config.useHistory || !hasHistory ) {

    if ( this.config.loggingLevel === 'HIGH' ) logger.debug('Listening for hash changes.');

    windowListener(hasEventListener ? 'hashchange' : 'onhashchange', () => { this.resolve( formatRoute.call( this, window.location.hash ) ); } );

  } else if ( this.config.useHistory && hasHistory ) {

    if ( this.config.loggingLevel === 'HIGH' ) logger.debug('Listening for clicks or popstate.');

    docListener('click',(e) => { this.resolve( historyClick.call( this, e ) ); } );
    windowListener('popstate',() => { this.resolve( formatRoute.call( this, window.location.pathname )); } );

  }

  // Fire the initial page load link
  this.resolve( formatRoute.call( this, initialLink ) );

}

export { listener };