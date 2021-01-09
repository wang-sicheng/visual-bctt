const data = {
  'id': '现代服务业',
  'type': 'ellipse',
  'size': [80, 30],
  'children': [
    {
      'id': '卫生、社保和福利业',
      'type': 'rect',
      'size': [120, 25],
      'children': [
        {
          'id': '医药企业信用评估',
          'children': [
            { 'id': '行业环境' },
            { 'id': '企业自身' },
            { 'id': '国家政策' },
            { 'id': '公众' }
          ]
        },
        {
          'id': '政府债务信用评估',
          'children': [
            { 'id': '经济发展(20%)' },
            { 'id': '财政收支(45%)' },
            { 'id': '债务负担(25%)' },
            { 'id': '体制环境(10%)' }
          ]
        }
      ]
    },
    {
      'id': '软件和信息技术业',
      'type': 'rect',
      'size': [110, 25],
      'children': [
        {
          'id': '企业财务因素',
          'children': [
            { 'id': '偿债能力' },
            { 'id': '资本结构' },
            { 'id': '运营能力' },
            { 'id': '营收能力' },
            { 'id': '发展能力' },
            { 'id': '每股指标' }
          ]
        }
      ]
    },
    {
      'id': '金融业',
      'type': 'rect',
      'size': [50, 25],
      'children': [
        {
          'id': '金融机构信用评级',
          'children': [
            { 'id': '资本充足率' },
            { 'id': '资产质量' },
            { 'id': '管理水平' },
            { 'id': '盈利水平' },
            { 'id': '流动性' },
            { 'id': '市场敏感度' }
          ]
        }
      ]
    },
    {
      'id': '租赁和商业服务业',
      'type': 'rect',
      'size': [110, 25],
      'children': [
        {
          'id': '电商信用评估',
          'children': [
            { 'id': '商家资质(15%)' },
            { 'id': '经营能力(20%)' },
            { 'id': '消费者评价(35%)' },
            { 'id': '经营稳定性(5%)' },
            { 'id': '合规经营(25%)' }
          ]
        },
        {
          'id': '物流企业信用评估',
          'children': [
            { 'id': '第三方公司风险' },
            { 'id': '客户风险' },
            { 'id': '质押物风险' },
            { 'id': '宏观环境风险' }
          ]
        }
      ]
    },
    {
      'id': '科研和技术服务业',
      'type': 'rect',
      'size': [110, 25],
      'children': [
        {
          'id': '会计事务所信用评估',
          'children': [
            { 'id': '专业胜任能力' },
            { 'id': '自身获利能力' },
            { 'id': '行业竞争能力' },
            { 'id': '执业质量水平' }
          ]
        }
      ]
    },
    {
      'id': '房地产业',
      'type': 'rect',
      'size': [60, 25],
      'children': [
        {
          'id': '融资企业状况',
          'children': [
            { 'id': '企业基本素质' },
            { 'id': '盈利能力' },
            { 'id': '成长能力' },
            { 'id': '长期偿债能力' },
            { 'id': '营运能力' },
            { 'id': '信用状况' }
          ]
        },
        {
          'id': '供应链运行状况',
          'children': [
            { 'id': '行业状况' },
            { 'id': '合作密切程度' }
          ]
        },
        {
          'id': '融资项目状况',
          'children': [
            { 'id': '应收账款特征' }
          ]
        }
      ]
    },
    {
      'id': '文化、体育和娱乐业',
      'type': 'rect',
      'size': [120, 25],
      'children': [
        {
          'id': '旅游企业信用评估',
          'children': [
            { 'id': '政府监管信息' },
            { 'id': '企业交易信息' },
            { 'id': '企业行为信用信息' }
          ]
        }
      ]
    },
    {
      'id': '教育行业',
      'type': 'rect',
      'size': [60, 25],
      'children': [
        {
          'id': '暂无',
          'children': [
            { 'id': '   ' },
            { 'id': '     ' }
          ]
        }
      ]
    }
  ]
}

module.exports = [
  {
    url: '/vue-admin-template/visual/params',
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
