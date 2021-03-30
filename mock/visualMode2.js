const data = {
  nodes: [
    {
      id: '0',
      label: '金融机构',
      // size: [80, 60],
      x: 200,
      y: 100,
      type: 'ellipse',
      description: '金融机构'
      // anchorPoints: [0.5, 1]
    },
    {
      id: '1',
      label: '小微企业',
      // size: [120, 60],
      type: 'ellipse',
      x: 0,
      y: 300,
      description: '小微企业'
    },
    {
      id: '2',
      label: '企业征信平台',
      size: [90, 50],
      type: 'ellipse',
      x: 400,
      y: 300,
      description: '企业征信平台'
    },
    {
      id: '3',
      label: '政府部门',
      type: 'ellipse',
      x: 600,
      y: 300,
      description: '政府部门'
    },
    {
      id: '4',
      label: '金融监管部门',
      // size: [100, 60],
      type: 'ellipse',
      x: 200,
      y: 500,
      description: '金融监管部门'
      // style: {
      //   // fill: '#EBEEF5',
      //   // stroke: '#5B8FF9',
      //   lineWidth: 1.5
      // }
    },
    // {
    //   id: '5',
    //   label: '人社局\n国土局\n住建局\n商务局\n环保局\n公积金中心\n税务局\n工商局\n海关\n水电燃气公司',
    //   size: [90, 160],
    //   type: 'rect',
    //   x: 800,
    //   y: 300,
    //   description: '指标如：\n工商局的营业收入数据、税务局的利润数据、海关的进出口数据以及人社局的社保公积金数据等。\n可以较为清晰地刻画出小微企业的生产经营情况，为金融机构开展小微业务提供参考'
    // },
    {
      id: 'node1',
      label: '人社局',
      size: [50, 25],
      type: 'ellipse',
      description: '指标如：人社局的社保公积金数据',
      x: 800,
      y: 150,
      comboId: 'combo'
    },
    {
      id: 'node2',
      label: '国土局',
      size: [50, 25],
      type: 'ellipse',
      description: '指标如：国土局的土地财政数据',
      x: 800,
      y: 180,
      comboId: 'combo'
    },
    {
      id: 'node3',
      label: '住建局',
      size: [50, 25],
      type: 'ellipse',
      description: '指标如：住建局的房屋建造财务数据',
      x: 800,
      y: 210,
      comboId: 'combo'
    },
    {
      id: 'node4',
      label: '商务局',
      size: [50, 25],
      type: 'ellipse',
      description: '指标如：商务局的开支数据',
      x: 800,
      y: 240,
      comboId: 'combo'
    },
    {
      id: 'node5',
      label: '环保局',
      size: [50, 25],
      type: 'ellipse',
      description: '指标如：环保局的开支数据',
      x: 800,
      y: 270,
      comboId: 'combo'
    },
    {
      id: 'node6',
      label: '公积金中心',
      size: [70, 25],
      type: 'ellipse',
      description: '指标如：公积金中心的开支数据',
      x: 800,
      y: 300,
      comboId: 'combo'
    },
    {
      id: 'node7',
      label: '税务局',
      size: [50, 25],
      type: 'ellipse',
      description: '指标如：税务局的利润数据',
      x: 800,
      y: 330,
      comboId: 'combo'
    },
    {
      id: 'node8',
      label: '工商局',
      size: [50, 25],
      type: 'ellipse',
      description: '指标如：工商局的营业收入数据',
      x: 800,
      y: 360,
      comboId: 'combo'
    },
    {
      id: 'node9',
      label: '海关',
      size: [50, 25],
      type: 'ellipse',
      description: '指标如：海关的进出口数据',
      x: 800,
      y: 390,
      comboId: 'combo'
    },
    {
      id: 'node10',
      label: '水电燃气公司',
      size: [80, 25],
      type: 'ellipse',
      description: '指标如：水电燃气公司缴费数据',
      x: 800,
      y: 420,
      comboId: 'combo'
    },
    {
      id: '10',
      size: [0, 0],
      label: '基本数据',
      x: 500,
      y: 310,
      description: '基本数据',
      labelCfg: {
        position: 'bottom'
      }
    },
    {
      id: '11',
      size: [0, 0],
      label: '反馈信息分析',
      description: '反馈信息分析',
      x: 500,
      y: 290,
      labelCfg: {
        position: 'top'
      }
    },
    {
      id: '12',
      size: [0, 0],
      label: '联手建立',
      description: '联手建立',
      x: 290,
      y: 390,
      labelCfg: {
        position: 'left'
      }
    },
    {
      id: '13',
      size: [0, 0],
      label: '代管金融服务平台',
      description: '代管金融服务平台',
      x: 320,
      y: 420,
      labelCfg: {
        position: 'right'
      }
    },
    {
      id: '14',
      size: [0, 0],
      label: '提供融资服务',
      description: '提供融资服务',
      x: 110,
      y: 210
      // labelCfg: {
      //   position: 'right'
      // }
    },
    {
      id: '15',
      size: [0, 0],
      label: '提供信息查询授权',
      description: '提供信息查询授权',
      x: 80,
      y: 180
      // labelCfg: {
      //   position: 'left'
      // }
    },
    {
      id: '16',
      size: [0, 0],
      label: '查询企业征信信息',
      description: '查询企业征信信息',
      x: 280,
      y: 210
      // labelCfg: {
      //   position: 'right'
      // }
    },
    {
      id: '17',
      size: [0, 0],
      label: '创新融资产品',
      description: '创新融资产品',
      x: 320,
      y: 180
    }
  ],
  edges: [
    {
      source: '0', target: '1',
      style: {
        endArrow: true
      }
    },
    {
      source: '1', target: '0',
      style: {
        endArrow: true
      }
    },
    {
      source: '0', target: '2',
      style: {
        endArrow: true
      }
    },
    {
      source: '2', target: '0',
      style: {
        endArrow: true
      }
    },
    {
      source: '1', target: '2', label: '提供信息采集授权', // type: 'line',
      style: {
        endArrow: true
      },
      labelCfg: {
        refY: 10
      }
    },
    {
      source: '4', target: '2',
      style: {
        endArrow: true
      }
    },
    {
      source: '2', target: '4',
      style: {
        endArrow: true
      }
    },
    {
      source: '3', target: '2',
      style: {
        endArrow: true
      }
    },
    {
      source: '2', target: '3',
      style: {
        endArrow: true
      }
    },
    {
      source: 'combo', target: '3', label: '70余家单位', // type: 'line',
      labelCfg: {
        refY: 10
      },
      style: {
        endArrow: true
      }
    }
  ],
  combos: [
    {
      id: 'combo'
    }
  ]
}
module.exports = [
  {
    url: '/vue-admin-template/visual/suzhou',
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
