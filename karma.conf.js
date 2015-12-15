// Karma configuration
// Generated on Wed Dec 09 2015 16:06:35 GMT+0100 (CET)

module.exports = function (config)
{
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
        'test/main.js'
    ],

    preprocessors: {
        'test/main.js': ['rollup', 'coverage']
    },

    rollupPreprocessor: {
        rollup: {
            plugins: [
                require('rollup-plugin-babel')({
                    presets: [
                        require('babel-preset-es2015-rollup')
                    ]
                })
            ]
        },
        bundle: {
          sourceMap: 'inline'
        }
    },

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-coverage',
      require('./lib')
    ],

    exclude: [],

    reporters: ['progress', 'coverage'],

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    captureTimeout: 60000,

    singleRun: true,

    coverageReporter: {
      reporters: [{
        type : 'html',
        dir : 'coverage/',
        subdir: 'html'
      }, {
        type: 'lcov',
        dir: 'coverage/',
        subdir: 'lcov'
      }]
    }

  });
};
