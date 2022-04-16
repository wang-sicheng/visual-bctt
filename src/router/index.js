import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/profile/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile',
    hidden: true,
    children: [
      {
        path: 'index',
        name: '个人中心',
        component: () => import('@/views/profile/index'),
        meta: { title: '个人主页' }
      }
    ]
  },
  // {
  //   path: '/postContract',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Contract',
  //       component: () => import('@/views/postContract/index'),
  //       meta: { title: '智能合约', icon: 'tab' }
  //     }
  //   ]
  // },
  // {
  //   path: '/postTran',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'postTran',
  //       component: () => import('@/views/postTx/index'),
  //       meta: { title: '发起交易', icon: 'guide' }
  //     }
  //   ]
  // },
  {
    path: '/trade',
    component: Layout,
    redirect: '/trade/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/trade/index'),
        name: 'trade',
        meta: { title: '交易信息', noCache: true }
      }
    ]
  },
  {
    path: '/address',
    component: Layout,
    redirect: '/address/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/address/index'),
        name: 'address',
        meta: { title: '地址信息', noCache: true }
      }
    ]
  },
  {
    path: '/block',
    component: Layout,
    redirect: '/block/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/block/index'),
        name: 'block',
        meta: { title: '区块信息', noCache: true }
      }
    ]
  },
  {
    path: '/docs',
    component: Layout,
    redirect: '/docs/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'docs',
        component: () => import('@/views/docs/index'),
        meta: { title: '文档', noCache: true }
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
    path: '/getfromchain',
    component: Layout,
    redirect: '/getfromchain',
    name: 'getfromchain',
    meta: { title: '集成后端信息', icon: 'doc' },
    children: [
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/ssbc/register/index'),
        meta: { title: '用户管理' }
      },
      {
        path: 'postTran',
        name: 'postTran',
        component: () => import('@/views/ssbc/postTx/index'),
        meta: { title: '发起转账' }
      },
      {
        path: 'Contract',
        name: 'Contract',
        component: () => import('@/views/ssbc/postContract/index'),
        meta: { title: '发布合约' }
      },
      // {
      //   path: 'updateContract',
      //   name: 'updateContract',
      //   component: () => import('@/views/ssbc/updateContract/index'),
      //   meta: { title: '升级合约' }
      // },
      {
        path: 'invokeSmartContract',
        name: 'invokeSmartContract',
        component: () => import('@/views/ssbc/invokeSmartContract/index'),
        meta: { title: '调用合约' }
      },
      {
        path: 'contractInfo',
        name: 'contractInfo',
        component: () => import('@/views/ssbc/contractInfo/index'),
        meta: { title: '合约数据' }
      },
      {
        path: 'getBlockChain',
        name: 'getBlockChain',
        component: () => import('@/views/ssbc/getBlockChain/index'),
        meta: { title: '区块列表' }
      },
      {
        path: 'getAllTrans',
        name: 'getAllTrans',
        component: () => import('@/views/ssbc/getAllTxs/index'),
        meta: { title: '交易列表' }
      },
      {
        path: 'getAllAccounts',
        name: 'getAllAccounts',
        component: () => import('@/views/ssbc/getAllAccounts/index'),
        meta: { title: '账户列表' }
      }
      // {
      //   path: 'crossTransfer',
      //   name: 'crossTransfer',
      //   component: () => import('@/views/ssbc/crossTransfer/index'),
      //   meta: { title: '跨链转账' }
      // }
    ]
  },
  {
    path: '/mode',
    component: Layout,
    redirect: '/mode',
    name: 'Mode',
    meta: { title: '征信模型', icon: 'el-icon-s-help', roles: ['regulator', 'banker'] },
    children: [
      {
        path: 'modeTz',
        name: 'ModeTz',
        component: () => import('@/views/modeTz/index'),
        meta: { title: '征信模型——台州' }
      },
      {
        path: 'modeSz',
        name: 'ModeSz',
        component: () => import('@/views/modeSz/index'),
        meta: { title: '征信模型——苏州' }
      }
    ]
  },
  {
    path: '/chain',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Chain',
        component: () => import('@/views/chain/index'),
        meta: { title: '链上信息可视化', icon: 'international' }
      }
    ]
  },
  {
    path: '/visual',
    component: Layout,
    redirect: '/visual/graph',
    name: 'Visual',
    meta: { title: '可视化大盘', icon: 'chart', roles: ['regulator'] },
    children: [
      {
        path: 'graph',
        name: 'Graph',
        component: () => import('@/views/graph/index'),
        meta: { title: '指标图谱', icon: 'tree-table' }
      },
      {
        path: 'node',
        name: 'Node',
        component: () => import('@/views/node/index'),
        meta: { title: '节点可视化', icon: 'tree' }
      }
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  },
  {
    path: '/browse',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Browse',
        component: () => import('@/views/browse/index'),
        meta: { title: '浏览商品', icon: 'component', roles: ['consumer', 'provider'] }
      }
    ]
  },
  {
    path: '/cart',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Cart',
        component: () => import('@/views/cart/index'),
        meta: { title: '购物车', icon: 'shopping', roles: ['consumer'] }
      }
    ]
  },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: '层级目录',
  //     icon: 'nested',
  //     roles: ['regulator']
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'Menu2' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
