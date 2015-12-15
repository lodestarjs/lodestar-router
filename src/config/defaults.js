import { fullExtend as extend, merge } from '../utils/object.js';

let routes = {},
  config = defaultConfig = {
    useHistory: false,
    debug: true,
    basePath: '',
    logTransitions: false,
    loggingLevel: 'LOW' // options are LOW or HIGH
  },
  privateConfig = defaultPrivate = {
    usingMap: '',
    listenerActive: false
  };



function initConfig() {

  config = merge({}, defaultConfig);
  privateConfig = merge({}, defaultPrivate);

}


function modifyPrivate( changes ) {

  if ( changes )
    privateConfig = extend({}, [ privateConfig, changes ], true);

}

function modifyConfig( changes ) {

  if ( changes )
    config = extend({}, [ config, changes ], true);

}

export { config, modifyConfig, routes, privateConfig, modifyPrivate, initConfig };