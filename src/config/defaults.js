import { fullExtend as extend, merge, copy } from '../utils/object.js';

let globals = {
    DEBUG: true
  },
  defaultConfig = {
    useHistory: false,
    basePath: '',
    loggingLevel: 'LOW', // options are LOW or HIGH
    usingMap: '',
    listenerActive: false
  };


/**
 * This initialises the config for each instance with a fresh config
 * @param  {Object} _this, this passed in from the constructore
 * @return {Void}, nothing returned
 */
function initConfig( _this ) {

  _this.routes = {};
  _this.config = merge( {}, defaultConfig );

}

/**
 * Modifies the config for an instance
 * @param  {Object} _this, this passed in from the constructore
 * @param  {Object} changes, the changes the user wants to make to the config.
 * @return {Void}, nothing returned
 */
function modifyConfig( _this, changes ) {

  if ( changes ) {

    if ( typeof changes.DEBUG !== 'undefined' ) globals = copy({} , { DEBUG: changes.DEBUG }); delete changes.DEBUG;

    if ( changes.loggingLevel) changes.loggingLevel = changes.loggingLevel.toUpperCase();

    _this.config = extend({}, [ _this.config, changes ], true);

  }

  return _this.config;

}

export { modifyConfig, initConfig, globals };