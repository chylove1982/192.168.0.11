import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss' // 引入修改element样式文件

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icons
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
import './assets/styles/iconfont.css'
import '@/styles/global.css' // 引入公共样式

import '@/utils/tool.js' // 引入工具js

import vComponent from '@/components'

// 全局注册组件
Vue.use(vComponent)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// 获取后台数据
const createDb = require('@/api/SPDTONYAPI/CommonRequest.js')
Vue.use(async(ctx, next) => {
  Vue.prototype.$Api = createDb()
  await next()
})
// 引入需要的字段数据文件
import filed from './api/filed'
Vue.prototype.filed = filed
import SPDAPIURL from '@/utils/SPDGlobal/SPDAPIURL'
Vue.prototype.SPDAPIURL = SPDAPIURL
import buttons from '@/utils/SPDGlobal/ComGloabl'
Vue.prototype.buttons = buttons
import spdapi from '@/api/SPDTONYAPI/CommonRequest'
Vue.prototype.spdapi = spdapi
import plugs from '@/api/SPDTONYAPI/tonyvueplugs.js'
Vue.use(plugs)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.bus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
