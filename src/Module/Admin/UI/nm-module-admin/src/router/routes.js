﻿import module from '../module'
import { page2Router, pages2Routes } from 'td-lib-utils/src/utils/router-loader'

// 扫描页面配置
const requireComponent = require.context('../views', true, /\page.js$/)
let pages = requireComponent
  .keys()
  .map(fileName => page2Router(requireComponent(fileName).route))

/** 路由数组 */
const routes = pages2Routes(module, pages)

export default routes
