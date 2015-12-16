import { fullExtend as extend, merge } from '../utils/object.js';

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



function initConfig( _this ) {

  _this.routes = {};
  _this.config = merge( {}, defaultConfig );

}

function modifyConfig( _this, changes ) {

  if ( changes ) {

    if ( changes.DEBUG ) globals.DEBUG = changes.DEBUG; delete changes.DEBUG;

    if ( changes.loggingLevel) changes.loggingLevel = changes.loggingLevel.toUpperCase();

    _this.config = extend({}, [ _this.config, changes ], true);

  }

}

export { modifyConfig, initConfig, globals };