const data = {
  nodes: [
    {
      id: '0x8f2b779ad02ac7d099ece9a9563a3bec723',
      x: 175,
      y: 50,
      label: '0x8f2b779ad02ac7d099ece9a9563a3bec723'
    },
    {
      id: '0xd26f0ebe9d2086ea722a5453065b59a',
      x: 320,
      y: 200,
      label: '0xd26f0ebe9d2086ea722a5453065b59a'
    },
    {
      id: '0xb3ab4f3953a6c624866a73294bb7c59',
      x: 30,
      y: 200,
      label: '0xb3ab4f3953a6c624866a73294bb7c59'
    }
  ],
  edges: [
    {
      source: '0x8f2b779ad02ac7d099ece9a9563a3bec723',
      target: '0xd26f0ebe9d2086ea722a5453065b59a',
      label: ' '
    },
    {
      source: '0xd26f0ebe9d2086ea722a5453065b59a',
      target: '0xb3ab4f3953a6c624866a73294bb7c59',
      label: '到',
      type: 'cubic',
      style: {
        endArrow: true
      }
    },
    {
      source: '0xb3ab4f3953a6c624866a73294bb7c59',
      target: '0x8f2b779ad02ac7d099ece9a9563a3bec723',
      label: '  '
    }
  ]
}

module.exports = [
  {
    url: '/vue-admin-template/visual/trade',
    type: 'post',
    response: config => {
      const id = config.query.data
      const uid = '0x' + id
      data.nodes[0].id = uid
      data.nodes[0].label = uid
      data.edges[0].source = uid
      data.edges[2].target = uid
      const items = data
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
