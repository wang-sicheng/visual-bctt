const data = {
  nodes: [
    {
      id: '0x0be3c0882a99c2cc0efde505abc25ad',
      x: 160,
      y: 100,
      label: '0x0be3c0882a99c2cc0efde505abc25ad'
    },
    {
      id: '0x3c4d994d8feac47a77d920b366d5f6d4949',
      x: 320,
      y: 200,
      label: '0x3c4d994d8feac47a77d920b366d5f6d4949'
    },
    {
      id: '0xb126a06dc09107bb525e96e66f965e8bbfb',
      x: 0,
      y: 200,
      label: '0xb126a06dc09107bb525e96e66f965e8bbfb'
    },
    {
      id: '0x38d55372c2d248c6a3997b94b0a69250caa',
      x: 320,
      y: 0,
      label: '0x38d55372c2d248c6a3997b94b0a69250caa'
    },
    {
      id: '0xa7765662519a35d3f5ab872e1b079451894',
      x: 0,
      y: 0,
      label: '0xa7765662519a35d3f5ab872e1b079451894'
    }
  ],
  edges: [
    {
      source: '0x0be3c0882a99c2cc0efde505abc25ad',
      target: '0x3c4d994d8feac47a77d920b366d5f6d4949',
      label: ' '
    },
    {
      source: '0x0be3c0882a99c2cc0efde505abc25ad',
      target: '0xb126a06dc09107bb525e96e66f965e8bbfb',
      label: '  '
    },
    {
      source: '0x0be3c0882a99c2cc0efde505abc25ad',
      target: '0x38d55372c2d248c6a3997b94b0a69250caa',
      label: '  '
    },
    {
      source: '0x0be3c0882a99c2cc0efde505abc25ad',
      target: '0xa7765662519a35d3f5ab872e1b079451894',
      label: '  '
    }
  ]
}

module.exports = [
  {
    url: '/vue-admin-template/visual/trade',
    type: 'get',
    response: config => {
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
