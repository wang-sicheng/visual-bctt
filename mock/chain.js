const data = {
  nodes: [
    {
      id: '1',
      x: 0,
      y: 0,
      comboId: 'a'
    },
    {
      id: '2',
      x: 5,
      y: 5,
      comboId: 'a'
    },
    {
      id: '3',
      x: 0,
      y: 5,
      comboId: 'a'
    },
    {
      id: '4',
      x: 5,
      y: 0,
      comboId: 'a'
    },
    {
      id: '5',
      x: 2,
      y: 2,
      comboId: 'a'
    },
    {
      id: '6',
      x: 200,
      y: 0,
      comboId: 'b'
    },
    {
      id: '7',
      x: 230,
      y: 5,
      comboId: 'b'
    },
    {
      id: '8',
      x: 220,
      y: 2,
      comboId: 'b'
    },
    {
      id: '9',
      x: 490,
      y: 5,
      comboId: 'b'
    },
    {
      id: '10',
      x: 485,
      y: 10,
      comboId: 'b'
    },
    {
      id: '11',
      x: 140,
      y: 280,
      comboId: 'c'
    },
    {
      id: '12',
      x: 145,
      y: 280,
      comboId: 'c'
    },
    {
      id: '13',
      x: 140,
      y: 290,
      comboId: 'c'
    },
    {
      id: '14',
      x: 145,
      y: 290,
      comboId: 'c'
    },
    {
      id: '15',
      x: 130,
      y: 285,
      comboId: 'c'
    }
  ],
  edges: [
    {
      source: 'a',
      target: 'b',
      // label: 'Combo A - Combo B',
      size: 2,
      labelCfg: {
        autoRotate: true,
        style: {
          stroke: '#fff',
          lineWidth: 2,
          fontSize: 20
        }
      },
      style: {
        stroke: 'green'
      }
    },
    {
      source: 'b',
      target: 'c',
      // label: 'Combo B - Combo C',
      size: 2,
      labelCfg: {
        autoRotate: true,
        style: {
          stroke: '#fff',
          lineWidth: 2,
          fontSize: 20
        }
      },
      style: {
        stroke: 'green'
      }
    },
    {
      source: 'c',
      target: 'a',
      // label: 'Combo A - Combo C',
      size: 2,
      labelCfg: {
        autoRotate: true,
        style: {
          stroke: '#fff',
          lineWidth: 2,
          fontSize: 20
        }
      },
      style: {
        stroke: 'green'
      }
    }
    // {
    //   source: 'a',
    //   target: '31',
    //   label: 'Combo-Node',
    //   size: 3,
    //   labelCfg: {
    //     autoRotate: true,
    //     style: {
    //       stroke: '#fff',
    //       lineWidth: 5,
    //       fontSize: 20
    //     }
    //   },
    //   style: {
    //     stroke: 'blue'
    //   }
    // },
    // {
    //   source: '1',
    //   target: '2'
    // },
    // {
    //   source: '1',
    //   target: '3'
    // },
    // {
    //   source: '1',
    //   target: '4'
    // },
    // {
    //   source: '1',
    //   target: '5'
    // },
    // {
    //   source: '6',
    //   target: '7'
    // },
    // {
    //   source: '6',
    //   target: '8'
    // },
    // {
    //   source: '6',
    //   target: '9'
    // },
    // {
    //   source: '6',
    //   target: '10'
    // },
    // {
    //   source: '11',
    //   target: '12'
    // },
    // {
    //   source: '11',
    //   target: '13'
    // },
    // {
    //   source: '11',
    //   target: '14'
    // },
    // {
    //   source: '11',
    //   target: '15'
    // }
  ],
  combos: [
    {
      id: 'a',
      label: '交易链'
      // size: '10'
    },
    {
      id: 'b',
      label: '账户链'
      // size: '10'
    },
    {
      id: 'c',
      label: '征信链'
      // size: '10'
    }
  ]
}

module.exports = [
  {
    url: '/vue-admin-template/visual/chain',
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
