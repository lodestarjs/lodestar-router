import { fullExtend as extend } from '../utils/object.js';


let config = {
  useHistory: false,
  debug: true,
  logTransitions: false,
  loggingLevel: 'LOW' // options are LOW or HIGH
}

function modifyConfig( changes ) {

  for(var option in changes) {

    if ( config[option] !== 'undefined' )
      config[option] = changes[option];

  }

}


export { config, modifyConfig };