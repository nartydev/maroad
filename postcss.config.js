require('dotenv-extended').load();

const { desktopFirst } = require('sort-css-media-queries');

const { CSS_VARIABLES } = require('./config');

module.exports = {
  plugins: [
    require('postcss-import-ext-glob'),
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-extend-rule'),
    require('postcss-inline-media'),
    require('postcss-simple-vars')({ variables: CSS_VARIABLES }),
    require('postcss-calc')({ preserve: false }),
    require('postcss-size'),
    require('postcss-axis'),
    require('postcss-position'),
    require('autoprefixer'),
    require('postcss-pxtorem')({ replace: false }),
    require('postcss-color-function'),
    require('postcss-easing-gradients'),
    require('css-mqpacker')({ sort: desktopFirst }),
    require('postcss-clean')({
      level: {
        1: {
          all: true,
          specialComments: 0
        },
        2: {
          all: true
        }
      }
    })
  ]
};
