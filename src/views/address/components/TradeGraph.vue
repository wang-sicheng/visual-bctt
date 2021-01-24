<template>
  <div class="app-container">
    <div id="mountNode" />
  </div>
</template>

<script>
import G6 from '@antv/g6'
import { getTrade } from '@/api/params'

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
      getTrade().then((res) => res.data.items)
        .then((data) => {
          const minimap = new G6.Minimap({
            size: [100, 100],
            className: 'minimap',
            type: 'delegate'
          })
          const grid = new G6.Grid()
          const graph = new G6.Graph({
            container: 'mountNode',
            width: 1000, // 图的宽度
            height: 500,
            linkCenter: true,
            modes: {
              default: [
                {
                  type: 'tooltip', // 提示框
                  formatText(model) {
                    // 提示框文本内容
                    const text = model.label
                    return text
                  }
                },
                'drag-canvas',
                'zoom-canvas',
                'drag-node'
              ]
            },
            defaultNode: {
              type: 'circle',
              labelCfg: {
                style: {
                  // 'fill': 'rgba(0,0,0,0)',
                  // 'stroke': 'rgba(0,0,0,0)',
                  fontSize: 14,
                  background: {
                    fill: '#ffffff',
                    stroke: '#9EC9FF',
                    padding: [2, 2, 2, 2],
                    radius: 2
                  }
                },
                position: 'bottom'
              }
            },
            nodeStateStyles: {
              // style configurations for hover state
              hover: {
                fillOpacity: 0.8
              },
              // style configurations for selected state
              selected: {
                lineWidth: 5
              }
            },
            plugins: [minimap, grid]
          })

          graph.node(function(node) {
            return {
              label: node.id
            }
          })

          graph.data(data)
          graph.render()
          graph.fitView()
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

