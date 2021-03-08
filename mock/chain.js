const data = {
  nodes: [
    {
      id: '1',
      comboId: 'a'
    },
    {
      id: '2',
      comboId: 'a'
    },
    {
      id: '3',
      comboId: 'a'
    },
    {
      id: '4',
      comboId: 'a'
    },
    {
      id: '5',
      comboId: 'a'
    },
    {
      id: '6',
      comboId: 'b'
    },
    {
      id: '7',
      comboId: 'b'
    },
    {
      id: '8',
      comboId: 'b'
    },
    {
      id: '9',
      comboId: 'b'
    },
    {
      id: '10',
      comboId: 'b'
    },
    {
      id: '11',
      comboId: 'c'
    },
    {
      id: '12',
      comboId: 'c'
    },
    {
      id: '13',
      comboId: 'c'
    },
    {
      id: '14',
      comboId: 'c'
    },
    {
      id: '15',
      comboId: 'c'
    }
  ],
  edges: [
    {
      source: 'a',
      target: 'b',
      // label: 'Combo A - Combo B',
      size: 4,
      labelCfg: {
        autoRotate: true,
        style: {
          stroke: '#fff',
          lineWidth: 2,
          fontSize: 20
        }
      },
      style: {
        stroke: 'red'
      }
    },
    {
      source: 'b',
      target: 'c',
      // label: 'Combo B - Combo C',
      size: 4,
      labelCfg: {
        autoRotate: true,
        style: {
          stroke: '#fff',
          lineWidth: 2,
          fontSize: 20
        }
      },
      style: {
        stroke: 'red'
      }
    },
    {
      source: 'c',
      target: 'a',
      // label: 'Combo A - Combo C',
      size: 4,
      labelCfg: {
        autoRotate: true,
        style: {
          stroke: '#fff',
          lineWidth: 2,
          fontSize: 20
        }
      },
      style: {
        stroke: 'red'
      }
    },
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
    {
      source: '1',
      target: '2'
    },
    {
      source: '1',
      target: '3'
    },
    {
      source: '1',
      target: '4'
    },
    {
      source: '1',
      target: '5'
    },
    {
      source: '6',
      target: '7'
    },
    {
      source: '6',
      target: '8'
    },
    {
      source: '6',
      target: '9'
    },
    {
      source: '6',
      target: '10'
    },
    {
      source: '11',
      target: '12'
    },
    {
      source: '11',
      target: '13'
    },
    {
      source: '11',
      target: '14'
    },
    {
      source: '11',
      target: '15'
    }
  ],
  combos: [
    {
      id: 'a',
      label: '交易链',
      size: '30'
    },
    {
      id: 'b',
      label: '账户链',
      size: '30'
    },
    {
      id: 'c',
      label: '征信链',
      size: '30'
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
