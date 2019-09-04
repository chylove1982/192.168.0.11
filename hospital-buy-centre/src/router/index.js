import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/base-maintain',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '我的消息',
        meta: { title: '我的消息', icon: 'user', affix: true }
      }
    ]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: '我的消息',
  //       meta: { title: '我的消息', icon: 'user', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/base-maintain',
    component: Layout,
    redirect: '/base-maintain/pro-info-inquire',
    alwaysShow: true, // will always show the root menu
    name: 'base-maintain',
    meta: {
      title: '基础维护',
      icon: 'lookDetails'
    },
    children: [
      {
        path: '/base-maintain/pro-info-inquire',
        component: () => import('@/views/base-maintain/pro-info-inquire'),
        name: 'pro-info-inquire',
        meta: {
          title: '产品信息查询'
        }
      },
      {
        path: '/base-maintain/pro-contrast',
        component: () => import('@/views/base-maintain/pro-contrast'),
        name: 'pro-contrast',
        meta: {
          title: '产品对照码'
        }
      },
      {
        path: '/base-maintain/sec-info',
        component: () => import('@/views/base-maintain/sec-info'),
        name: 'sec-info',
        meta: {
          title: '科室信息维护'
        }
      },
      {
        path: '/storage-set',
        component: () => import('@/views/base-maintain/storage-set'),
        name: 'storage-set',
        meta: {
          title: '仓库设置'
          // permission: 'blog_category_edit'// 设置权限
        }
      }
    ]
  }, {
    path: '/subscribe',
    component: Layout,
    redirect: '/subscribe/order',
    alwaysShow: true, // will always show the root menu
    name: 'subscribe',
    meta: {
      title: '申购业务',
      icon: 'shopping'
    },
    children: [
      {
        path: '/subscribe/pending',
        component: () => import('@/views/subscribe/pending'),
        name: '/subscribe/pending',
        meta: {
          title: '待处理申购单'
        }
      },
      {
        path: '/subscribe/executing',
        component: () => import('@/views/subscribe/executing'),
        name: '/subscribe/pending',
        meta: {
          title: '正在执行申购单'
        }
      },
      {
        path: '/subscribe/completed',
        component: () => import('@/views/subscribe/completed'),
        name: '/subscribe/completed',
        meta: {
          title: '已完成申购单'
        }
      }
    ]
  },
  {
    path: '/store',
    component: Layout,
    redirect: '/store/receiving',
    alwaysShow: true, // will always show the root menu
    name: '仓库业务',
    meta: {
      title: '仓库业务',
      icon: 'tree'
    },
    children: [
      {
        path: '/store/receiving',
        component: () => import('@/views/store/receiving'),
        name: '/store/receiving',
        meta: {
          title: '收货'
        }
      },
      {
        path: '/store/sanCode-in',
        name: '/store/sanCode-in',
        component: () => import('@/views/store/scanCode-in'),
        hidden: true,
        meta: {
          title: '扫码收货'
        }
      },
      {
        path: '/store/manual-in',
        name: '/store/manual-in',
        component: () => import('@/views/store/manual-in'),
        hidden: true,
        meta: {
          title: '手动收货'
        }
      },
      {
        path: '/store/examine-in',
        name: '/store/examine-in',
        component: () => import('@/views/store/examine-in'),
        meta: {
          title: '检验入库'
        }
      },
      {
        path: '/store/receiving-record',
        name: '/store/receiving-record',
        component: () => import('@/views/store/receiving-record'),
        meta: {
          title: '收货记录'
        }
      },
      {
        path: '/store/out-store',
        component: () => import('@/views/store/out-store'),
        name: '/store/out-store',
        meta: {
          title: '出库'
        }
      },
      {
        path: '/store/sanCode-out',
        name: '/store/sanCode-out',
        component: () => import('@/views/store/scanCode-out'),
        hidden: true,
        meta: {
          title: '扫码出库'
        }
      },
      {
        path: '/store/manual-out',
        name: '/store/manual-out',
        component: () => import('@/views/store/manual-out'),
        hidden: true,
        meta: {
          title: '手动出库'
        }
      },
      {
        path: '/store/out-store-record',
        name: '/store/out-store-record',
        component: () => import('@/views/store/out-store-record'),
        meta: {
          title: '出库记录'
        }
      },
      {
        path: '/store/in-store-list',
        name: '/store/in-store-list',
        component: () => import('@/views/store/in-store-list'),
        meta: {
          title: '在库明细'
        }
      }
    ]
  }, {
    path: '/buy-business',
    component: Layout,
    redirect: '/buy-business/daily-claim',
    alwaysShow: true, // will always show the root menu
    name: 'buy-business',
    meta: {
      title: '采购业务',
      icon: 'documentation'
    },
    children: [
      {
        path: '/buy-business/pending',
        component: () => import('@/views/buy-business/pending'),
        name: '/buy-business/pending',
        meta: {
          title: '待处理采购订单'
        }
      },
      {
        path: '/buy-business/check',
        component: () => import('@/views/buy-business/check'),
        name: '/buy-business/check',
        meta: {
          title: '采购单审核'
        }
      },
      {
        path: '/buy-business/executing',
        component: () => import('@/views/buy-business/executing'),
        name: '/buy-business/executing',
        meta: {
          title: '正在执行采购单'
        }
      },
      {
        path: '/buy-business/completed',
        component: () => import('@/views/buy-business/completed'),
        name: '/buy-business/completed',
        meta: {
          title: '已完成采购单'
        }
      }
    ]
  },{
    path: '/hospital-dispatching',
    component: Layout,
    redirect: '/hospital-dispatching/pending',
    alwaysShow: true, // will always show the root menu
    name: 'hospital-dispatching',
    meta: {
      title: '院内配送业务',
      icon: 'documentation'
    },
    children: [
      {
        path: '/hospital-dispatching/pending',
        component: () => import('@/views/hospital-dispatching/pending'),
        name: '/hospital-dispatching/pending',
        meta: {
          title: '待分派任务'
        }
      },
      {
        path: '/hospital-dispatching/executing',
        component: () => import('@/views/hospital-dispatching/executing'),
        name: '/hospital-dispatching/executing',
        meta: {
          title: '正在分派任务'
        }
      },
      {
        path: '/hospital-dispatching/check',
        component: () => import('@/views/hospital-dispatching/check'),
        name: '/hospital-dispatching/check',
        meta: {
          title: '配送运单复核'
        }
      },
      {
        path: '/hospital-dispatching/completed',
        component: () => import('@/views/hospital-dispatching/completed'),
        name: '/hospital-dispatching/completed',
        meta: {
          title: '已完成分派任务'
        }
      }
    ]
  },
  {
    path: '/accounting-manage',
    component: Layout,
    redirect: '/accounting-manage/receivables',
    alwaysShow: true, // will always show the root menu
    name: 'hospital-dispatching',
    meta: {
      title: '财会管理',
      icon: 'documentation'
    },
    children: [
      {
        path: '/accounting-manage/receivables',
        component: () => import('@/views/accounting-manage/receivables'),
        name: '/accounting-manage/receivables',
        meta: {
          title: '应收账款'
        }
      },
      {
        path: '/accounting-manage/pending',
        component: () => import('@/views/accounting-manage/pending'),
        name: '/accounting-manage/pending',
        meta: {
          title: '待结算对账单'
        }
      },
      {
        path: '/accounting-manage/completed',
        component: () => import('@/views/accounting-manage/completed'),
        name: '/accounting-manage/completed',
        meta: {
          title: '已结算对账单'
        }
      }
    ]
  },
  {
    path: '/base-info-inquire_ks',
    component: Layout,
    redirect: '/base-info-inquire_ks/supplier-inquire',
    alwaysShow: true, // will always show the root menu
    name: 'base-info-inquire',
    meta: {
      title: '院内科室-基础信息查询',
      icon: 'lookDetails'
    },
    children: [
      {
        path: '/base-info-inquire_ks/pro-info-inquire',
        component: () => import('@/views/base-info-inquire_ks/pro-info-inquire'),
        name: '/base-info-inquire_ks/pro-info-inquire',
        meta: {
          title: '产品信息查询'
        }
      },
      {
        path: '/base-info-inquire_ks/pro-contrast',
        component: () => import('@/views/base-info-inquire_ks/pro-contrast'),
        name: '/base-info-inquire_ks/pro-contrast',
        meta: {
          title: '产品对照码'
        }
      },
      {
        path: '/base-info-inquire_ks/supplier-inquire',
        component: () => import('@/views/base-info-inquire_ks/supplier-inquire'),
        name: '/base-info-inquire_ks/supplier-inquire',
        meta: {
          title: '供应商查询'
        }
      }
    ]
  }, {
    path: '/subscribe_ks',
    component: Layout,
    redirect: '/subscribe_ks/order',
    alwaysShow: true, // will always show the root menu
    name: 'subscribe',
    meta: {
      title: '院内科室-申购业务',
      icon: 'shopping'
    },
    children: [
      {
        path: '/subscribe_ks/order',
        component: () => import('@/views/subscribe_ks/order'),
        name: '/subscribe_ks/order',
        meta: {
          title: '申购单'
        }
      },
      {
        path: '/subscribe_ks/orderudit',
        component: () => import('@/views/subscribe_ks/orderudit'),
        name: '/subscribe_ks/orderudit',
        meta: {
          title: '申购单审核'
        }
      }
    ]
  },
  {
    path: '/store_ks',
    component: Layout,
    redirect: '/store_ks/receiving',
    alwaysShow: true, // will always show the root menu
    name: '院内科室-仓库业务',
    meta: {
      title: '仓库业务',
      icon: 'tree'
    },
    children: [
      {
        path: '/store_ks/receiving',
        component: () => import('@/views/store_ks/receiving'),
        name: '/store_ks/receiving',
        meta: {
          title: '收货'
        }
      },
      {
        path: '/store_ks/sanCode-in',
        name: '/store_ks/sanCode-in',
        component: () => import('@/views/store_ks/scanCode-in'),
        hidden: true,
        meta: {
          title: '扫码收货'
        }
      },
      {
        path: '/store_ks/manual-in',
        name: '/store_ks/manual-in',
        component: () => import('@/views/store_ks/manual-in'),
        hidden: true,
        meta: {
          title: '手动收货'
        }
      },
      {
        path: '/store_ks/examine-in',
        name: '/store_ks/examine-in',
        component: () => import('@/views/store_ks/examine-in'),
        meta: {
          title: '检验入库'
        }
      },
      {
        path: '/store_ks/receiving-record',
        name: '/store_ks/receiving-record',
        component: () => import('@/views/store_ks/receiving-record'),
        meta: {
          title: '收货记录'
        }
      },
      {
        path: '/store_ks/out-store',
        component: () => import('@/views/store_ks/out-store'),
        name: '/store_ks/out-store',
        meta: {
          title: '出库'
        }
      },
      {
        path: '/store_ks/sanCode-out',
        name: '/store_ks/sanCode-out',
        component: () => import('@/views/store_ks/scanCode-out'),
        hidden: true,
        meta: {
          title: '扫码出库'
        }
      },
      {
        path: '/store_ks/manual-out',
        name: '/store_ks/manual-out',
        component: () => import('@/views/store_ks/manual-out'),
        hidden: true,
        meta: {
          title: '手动出库'
        }
      },
      {
        path: '/store_ks/out-store-record',
        name: '/store_ks/out-store-record',
        component: () => import('@/views/store_ks/out-store-record'),
        meta: {
          title: '出库记录'
        }
      },
      {
        path: '/store_ks/in-store-list',
        name: '/store_ks/in-store-list',
        component: () => import('@/views/store_ks/in-store-list'),
        meta: {
          title: '在库明细'
        }
      }
    ]
  }, {
    path: '/claims_ks',
    component: Layout,
    redirect: '/claims_ks/daily-claim',
    alwaysShow: true, // will always show the root menu
    name: '院内科室-申领业务',
    meta: {
      title: '申领业务',
      icon: 'documentation'
    },
    children: [
      {
        path: 'daily-claim',
        component: () => import('@/views/claims_ks/daily-claim'),
        name: '日常申领单',
        meta: {
          title: '日常申领单'
        }
      },
      {
        path: 'daily-claim-check',
        component: () => import('@/views/claims_ks/daily-claim-check'),
        name: '日常申领单审核',
        meta: {
          title: '日常申领单审核'
        }
      },
      {
        path: 'claim-list',
        component: () => import('@/views/claims_ks/claim-list'),
        name: '申领明细查询',
        meta: {
          title: '申领明细查询'
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  mode: 'history', // 需要服务支持，去掉了路径上的#
  scrollBehavior(to, from, savedPosition) { // 控制请求相同页面的滚动位置，需要浏览器支持
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  fallback: true, // 如果浏览器不支持，自动转成hash路径，如果为false则不自动转换
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
