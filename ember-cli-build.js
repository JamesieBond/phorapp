'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
let env = process.env.EMBER_ENV;
let config = require('./config/environment')(env);

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here

    'ember-service-worker': {
      registrationStrategy: 'inline',
      versionStrategy: 'every-build'
    },

    'asset-cache': {
      // which asset files to include, glob paths are allowed!
      // defaults to `['assets/**/*']`
      include: [
        'assets/images/*',
        'fonts/fonts/.*'
      ],

      // which asset files to exclude, glob paths are allowed!
      exclude: [],
    },

    'esw-cache-fallback': {
      patterns: [
        config.businessApiUrl + '(.+)'
      ],
    },

    outputPaths: {
      app: {
        css: {
          'app': '/assets/phorapp.css'
        }
      }
    },

    'ember-bootstrap': {
      'bootstrapVersion': 4,
      'importBootstrapFont': false,
      'importBootstrapCSS': false
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
