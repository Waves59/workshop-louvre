const pkg = require('./package')
import path from 'path'

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'fr',
    },
    title: 'Starter',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: "Starter build with nuxt.js"
      },
      {
        name: 'theme-color',
        content: '#000000'
      },
      {
        name: 'msapplication-TileColor',
        content: '#000000'
      },
      {
        name: 'mobile-web-app-capable',
        content: 'yes'
      },
      {
        hid: `og:title`,
        property: 'og:title',
        content: 'Starter'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: "Starter build with nuxt.js"
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Starter'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: ''
      },
      {
        hid: 'og:image:width',
        property: 'og:image:width',
        content: '1200'
      },
      {
        hid: 'og:image:height',
        property: 'og:image:height',
        content: '630'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: ''
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: 'Starter'
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: "Starter build with nuxt.js"
      },
      {
        hid: 'twitter:site',
        property: 'twitter:site',
        content: ''
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: ''
      },
      {
        hid: 'twitter:url',
        property: 'twitter:url',
        content: ''
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicons/favicon.ico'
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/x-icon',
        sizes: '180x180',
        href: '/favicons/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicons/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicons/favicon-16x16.png'
      },
      {
        rel: 'mask-icon',
        color: '#000000',
        href: '/favicons/safari-pinned-tab.svg'
      },
      {
        rel: 'manifest',
        href: '/favicons/manifest.webmanifest',
        crossorigin: "use-credentials"
      }
    ]
  },

  /*
   ** Nuxt.js modules
   */
  modules: [],

  env: {
    API_URL: process.env.API_URL || '',
    BASE_URL: process.env.BASE_URL || '',
    NAME_ENV: process.env.NAME_ENV || 'PROD lasentedessouvenirs'
  },

  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#ffffff'
  },
  css: [{
    src: '~/assets/stylus/main.styl',
    lang: 'stylus'
  }],
  router: {},
  plugins: [{
    src: '~/plugins/three',
    ssr: false
  }],
  generate: {
    routes: []
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev
    }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })

      }

      config.module.rules.push({
        test: /\.(glsl|vs|fs)$/,
        loader: 'shader-loader',
        exclude: /(node_modules)/
      })

      const stylusRules = config.module.rules.find(rule => rule.test.toString().indexOf("styl") > -1)
      if (stylusRules && Array.isArray(stylusRules.oneOf)) {
        stylusRules.oneOf.forEach(one => {
          if (Array.isArray(one.use)) {
            one.use.forEach(u => {
              if (u.loader == "stylus-loader") {
                const stylusOptions = u.options;
                stylusOptions.paths = [
                  path.resolve('./assets/stylus')
                ]

                stylusOptions.import = [
                  '~rupture/rupture/index.styl',
                  'base/index.styl'
                ]
              }
            });
          }
        });
      }

      vendor: ['three.js']

    }

  }
}