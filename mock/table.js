const Mock = require('mockjs')

const data = Mock.mock({
  'items|20': [{
    order_no: '@string("1234567890abcdef", 35)',
    'status|1': ['success', 'pending', 'canceled'],
    display_time: '@datetime',
    from: '@string("1234567890abcdef", 31)',
    to: '@string("1234567890abcdef", 31)',
    price: '@float(100, 1000, 0, 2)'
  }]
})

const addressList = Mock.mock({
  'items|10': [{
    order_no: '@string("1234567890abcdef", 35)',
    display_time: '@datetime',
    from: '@string("1234567890abcdef", 31)',
    to: '@string("1234567890abcdef", 31)',
    price: '@float(100, 1000, 0, 2)'
  }]
})

const trade = Mock.mock({
  'items|1': [{
    location: '@string("1234567890", 1, 8)',
    'status|1': ['成功', '进行中', '失败'],
    display_time: '@datetime',
    from: '@string("1234567890abcdef", 31)',
    to: '@string("1234567890abcdef", 31)',
    price: '@float(100, 1000, 0, 2)'
  }]
})

const address = Mock.mock({
  'items|1': [{
    total: '@string("1234567890", 0, 6)',
    price: '@float(0, 1000, 1, 6)',
    'role|1': ['消费者', '服务提供方', '监管者']
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/table/addressList',
    type: 'get',
    response: config => {
      const items = addressList.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/table/trade',
    type: 'post',
    response: config => {
      const id = config.query.id
      trade.items.order_no = id
      const items = trade.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/table/address',
    type: 'post',
    response: config => {
      const id = config.query.id
      address.items.order_no = id

      const items = address.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
