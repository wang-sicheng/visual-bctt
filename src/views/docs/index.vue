<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="关键词" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
export default {

  data() {
    return {
      filterText: '',
      data: [
        {
          id: 1,
          label: '系统功能',
          children: [
            {
              id: 4,
              label: '1：交易表单',
              children: [{
                id: 9,
                label: '· 所有交易记录：全部交易哈希，交易双方地址，交易额，交易状态，交易时间'
              }, {
                id: 10,
                label: '· 单条交易信息：交易哈希，状态，所在块编号，交易对象地址，交易额，可视化交易追踪'
              }, {
                id: 11,
                label: '· 地址信息：地址交易笔数，地址余额，地址角色，地址全部交易可视化追踪，地址交易记录表'
              }, {
                id: 12,
                label: '· 区块信息：区块编号，创建时间，大小，交易数量，确认数，相邻区块，总交易额，区块包含全部交易记录'
              }]
            },
            {
              id: 8,
              label: '2：所有交易记录，区块信息，地址信息可视化。'
            },
            {
              id: 8,
              label: '3：各行业正信指标可视化展示。'
            }
          ]
        },
        {
          id: 1,
          label: '监管者———可信交易平台监管方',
          children: [
            {
              id: 4,
              label: '1：单条交易信息状态可视化。'
              // children: [{
              //   id: 9,
              //   label: '1，单条交易信息状态可视化'
              // }, {
              //   id: 10,
              //   label: '2，所有交易记录，区块信息，地址信息可视化'
              // }, {
              //   id: 11,
              //   label: '3，各行业正信指标可视化展示'
              // }]
            },
            {
              id: 8,
              label: '2：所有交易记录，区块信息，地址信息可视化。'
            },
            {
              id: 8,
              label: '3：各行业正信指标可视化展示。'
            }
          ]
        },
        {
          id: 2,
          label: '消费者',
          children: [{
            id: 5,
            label: '1：浏览商品，购物，查看交易信息'
          }, {
            id: 6,
            label: '2：消费者视角的交易信息可视化'
          }]
        },
        {
          id: 3,
          label: '商家———可信交易平台服务提供方',
          children: [{
            id: 7,
            label: '1：管理商品、库存、订单状态'
          }, {
            id: 8,
            label: '2：商家视角的商品信息、交易信息可视化'
          }]
        }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

