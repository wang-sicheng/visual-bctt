const data = {
  nodes: [
    {
      id: '0',
      label: '台州市委\n市政府',
      size: [80, 60],
      x: 300,
      y: 100,
      type: 'ellipse',
      description: '台州市委市政府'
      // anchorPoints: [0.5, 1]
    },
    {
      id: '1',
      label: '台州市人民政府\n金融工作办公室',
      size: [120, 60],
      type: 'ellipse',
      x: 600,
      y: 100,
      description: '台州市人民政府金融工作办公室'
    },
    {
      id: '2',
      label: '中国人民银行\n台州市中心支行',
      size: [120, 60],
      type: 'ellipse',
      x: 900,
      y: 100,
      description: '中国人民银行台州市中心支行'
    },
    {
      id: '3',
      label: '金融机构',
      type: 'ellipse',
      x: 100,
      y: 300,
      description: '金融机构'
    },
    {
      id: '4',
      label: '金融服务\n信用信息\n共享平台',
      size: [100, 60],
      type: 'ellipse',
      x: 600,
      y: 300,
      description: '金融服务信用信息共享平台',
      style: {
        fill: '#EBEEF5',
        stroke: '#5B8FF9',
        lineWidth: 1.5
      }
    },
    {
      id: '5',
      label: '小微企业基本\n信息系统',
      type: 'ellipse',
      size: [90, 45],
      x: 300,
      y: 500,
      description: '工商登记、变更、财务状况、纳税情况等基本信息'
    },
    {
      id: '6',
      label: '综合服务系统',
      type: 'ellipse',
      size: [90, 45],
      x: 500,
      y: 500,
      description: '整合关联小微企业在各部门的信息，帮助判断是否存在负面信息、是否处于不良企业名录'
    },
    {
      id: '7',
      label: '评价与培育\n系统',
      type: 'ellipse',
      size: [90, 45],
      x: 700,
      y: 500,
      description: '自动评分、同时导入第三方评级公司的信用报告'
    },
    {
      id: '8',
      label: '风险预警与\n诊断系统',
      type: 'ellipse',
      size: [90, 45],
      x: 900,
      y: 500,
      description: '信用立方、经济分析、诊断预警。提供关联关系查询。'
    },
    {
      id: '9',
      label: '金融\n法院\n公安\n地税\n社保\n国土\n环保\n建设\n食药品监督\n国税\n工商\n质检\n电力',
      size: [90, 190],
      type: 'rect',
      x: 1100,
      y: 300,
      description: '指标如：用电、用水、纳税额等体现企业经营状况的重要指标'
    },
    {
      id: '10',
      size: [0, 0],
      x: 600,
      y: 200
    },
    {
      id: '11',
      size: [0, 0],
      x: 600,
      y: 400
    }
  ],
  edges: [
    {
      source: '0',
      target: '10'
    },
    {
      source: '1',
      target: '10'
    },
    {
      source: '2',
      target: '10'
    },
    {
      source: '10', target: '4', label: '联手建立',
      style: {
        endArrow: true
      }
    },
    {
      source: '3', target: '4', label: '查询小微企业信息',
      labelCfg: {
        refY: 10
      },
      style: {
        endArrow: true
      }
    },
    {
      source: '11', target: '5',
      style: {
        endArrow: true
      }
    },
    {
      source: '11', target: '6',
      style: {
        endArrow: true
      }
    },
    {
      source: '11', target: '7',
      style: {
        endArrow: true
      }
    },
    {
      source: '11', target: '8',
      style: {
        endArrow: true
      }
    },
    {
      source: '4', target: '11', label: '子系统'
    },
    {
      source: '9', target: '4', label: '征集信用信息数据\n30多个部门，118个大类\n4000多细项信用信息',
      labelCfg: {
        refY: 30
      },
      style: {
        endArrow: true
      }
    },
    { source: '3', target: '3', shape: 'loop', label: '对信息进行\n全面的诊断、分析',
      style: {
        endArrow: true
      }
    }
  ]
}
module.exports = [
  {
    url: '/vue-admin-template/visual/taizhou',
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
