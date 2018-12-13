import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '../assets/stylus/main.styl'

import _6f6c098b from '../layouts/default.vue'

const layouts = { "_default": _6f6c098b }

export default {
  head: {"htmlAttrs":{"lang":"fr"},"title":"Starter","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Starter build with nuxt.js"},{"name":"theme-color","content":"#000000"},{"name":"msapplication-TileColor","content":"#000000"},{"name":"mobile-web-app-capable","content":"yes"},{"hid":"og:title","property":"og:title","content":"Starter"},{"hid":"og:type","property":"og:type","content":"website"},{"hid":"og:description","property":"og:description","content":"Starter build with nuxt.js"},{"hid":"og:site_name","property":"og:site_name","content":"Starter"},{"hid":"og:url","property":"og:url","content":""},{"hid":"og:image:width","property":"og:image:width","content":"1200"},{"hid":"og:image:height","property":"og:image:height","content":"630"},{"hid":"og:image","property":"og:image","content":""},{"hid":"twitter:card","property":"twitter:card","content":"summary_large_image"},{"hid":"twitter:title","property":"twitter:title","content":"Starter"},{"hid":"twitter:description","property":"twitter:description","content":"Starter build with nuxt.js"},{"hid":"twitter:site","property":"twitter:site","content":""},{"hid":"twitter:image","property":"twitter:image","content":""},{"hid":"twitter:url","property":"twitter:url","content":""}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicons\u002Ffavicon.ico"},{"rel":"apple-touch-icon","type":"image\u002Fx-icon","sizes":"180x180","href":"\u002Ffavicons\u002Fapple-touch-icon.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"32x32","href":"\u002Ffavicons\u002Ffavicon-32x32.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"16x16","href":"\u002Ffavicons\u002Ffavicon-16x16.png"},{"rel":"mask-icon","color":"#000000","href":"\u002Ffavicons\u002Fsafari-pinned-tab.svg"},{"rel":"manifest","href":"\u002Ffavicons\u002Fmanifest.webmanifest","crossorigin":"use-credentials"}],"style":[],"script":[]},

  render(h, props) {
    const loadingEl = h('nuxt-loading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted() {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  methods: {
    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },

    setLayout(layout) {
      if(layout && typeof layout !== 'string') throw new Error('[nuxt] Avoid using non-string value as layout property.')

      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
    NuxtLoading
  }
}
