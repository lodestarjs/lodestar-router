import { fullExtend as extend } from '../utils/object.js';


let config = {
  useHistory: false,
  debug: true,
  basePath: '',
  logTransitions: false,
  loggingLevel: 'LOW' // options are LOW or HIGH
};

function modifyConfig( changes ) {

  for(let option in changes) {

    if ( config[option] !== 'undefined' )
      config[option] = changes[option];

  }

}


export { config, modifyConfig };