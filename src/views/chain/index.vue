<template>
  <div class="app-container">
    <div id="mountNode" />
  </div>
</template>

<script>
import G6 from '@antv/g6'
import { getChain } from '@/api/graph'

export default {
  data() {
    return {
    }
  },
  mounted() {
    this.initG6()
  },
  methods: {
    async initG6() {
      getChain().then((res) => res.data.items)
        .then((data) => {
          // const container = document.getElementById('mountNode')
          const minimap = new G6.Minimap({
            size: [100, 100],
            className: 'minimap',
            type: 'delegate'
          })
          // const grid = new G6.Grid()
          const graph = new G6.Graph({
            container: 'mountNode',
            width: 1320, // 图的宽度
            height: 680,
            groupByTypes: false,
            linkCenter: true,
            fitView: true,
            fitViewPadding: 50,
            minZoom: 0.2,
            layout: {
              type: 'comboForce',
              nodeSpacing: (d) => 10
            },
            defaultNode: {
              size: 20,
              color: '#5B8FF9',
              style: {
                lineWidth: 2,
                fill: '#C6E5FF'
              }
            },
            defaultEdge: {
              size: 2,
              color: '#e2e2e2'
            },
            modes: {
              default: ['drag-combo', 'drag-node', 'drag-canvas', 'zoom-canvas']
            },
            plugins: [minimap]
          })

          graph.data(data)
          graph.render()

          // if (typeof window !== 'undefined') {
          //   window.onresize = () => {
          //     if (!graph || graph.get('destroyed')) return
          //     if (!container || !container.scrollWidth || !container.scrollHeight) return
          //     graph.changeSize(container.scrollWidth, container.scrollHeight)
          //   }
          // }
        })
    }
  }
}
</script>

<style>
.line{
  text-align: center;
}
/* 提示框的样式 */
.g6-tooltip {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 8px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}
</style>

