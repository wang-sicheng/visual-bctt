const Mock = require('mockjs')

const data = Mock.mock({
  'items|20': [{
    order_no: '@guid()',
    // title: '@sentence(10, 20)',
    'status|1': ['completed', 'pending', 'canceled'],
    // author: 'name',
    display_time: '@datetime',
    from: '@string("1234567890abcdef", 31)',
    to: '@string("1234567890abcdef", 31)',
    // pageviews: '@integer(300, 5000)',
    price: '@float(100, 1000, 0, 2)'
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
  }
]
