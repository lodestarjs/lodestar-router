var gobble = require( 'gobble' ),
  info = require('./package.json'),
  src = gobble( 'src' ),
  lib;

lib = gobble([
  src
    .observe( 'eslint' )
    .transform( 'rollup-babel', {
      format: 'umd',
      transform: function ( src, path ) {
        return src.replace( /<@version@>/g, info.version );
      },
      entry: 'main.js',
      moduleName: 'Router',
      dest: 'router.js',
      banner: `/* LodestarJS Router - ${info.version}. \nAuthor: Dan J Ford \nContributors: ${info.contributors} \nPublished: ${new Date()} */\n`
    })
]);

module.exports = gobble([
  lib,
  lib.transform( 'uglifyjs', { ext: '.min.js' })
]);
