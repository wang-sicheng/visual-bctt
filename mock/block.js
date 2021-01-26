const Mock = require('mockjs')

const blockData = Mock.mock({
  'items|1': [{
    location_no: '@string("1234567890abcdef", 64)',
    size: '44,256',
    display_time: '@datetime',
    amount: '@string("123456789", 1, 2)',
    affirm: '@string("123456789", 2, 4)',
    from: '@string("123456789abcdef", 64)',
    to: '@string("123456789abcdef", 64)',
    price: '@float(1000, 10000, 2, 5)'
  }]
})

const blockList = Mock.mock({
  'items|20': [{
    order_no: '@string("123456789abcdef", 35)',
    display_time: '@datetime',
    from: '@string("123456789abcdef", 31)',
    to: '@string("123456789abcdef", 31)',
    price: '@float(100, 1000, 0, 2)'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/block/block',
    type: 'post',
    response: config => {
      const id = config.query.data
      const items = blockData.items
      items.id = id
      console.log(123)
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
    url: '/vue-admin-template/block/list',
    type: 'post',
    response: config => {
      const items = blockList.items
      console.log(12345)
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
