<template>
  <div class="app-container">
    <div id="mountNode" />
  </div>
</template>

<script>
import G6 from '@antv/g6'
import { getParams } from '@/api/graph'

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
      getParams().then((res) => res.data.items)
        .then((data) => {
          const container = document.getElementById('mountNode')
          const minimap = new G6.Minimap({
            size: [100, 100],
            className: 'minimap',
            type: 'delegate'
          })
          // const grid = new G6.Grid()
          const graph = new G6.TreeGraph({
            container: 'mountNode',
            width: container.scrollWidth, // 图的宽度
            height: container.scrollHeight || 800,
            linkCenter: true,
            modes: {
              default: [
                {
                  type: 'collapse-expand',
                  onChange: function onChange(item, collapsed) {
                    const data = item.get('model').data
                    data.collapsed = collapsed
                    return true
                  }
                },
                {
                  type: 'tooltip', // 提示框
                  formatText(model) {
                    // 提示框文本内容
                    const text = model.label
                    return text
                  }
                },
                'drag-canvas',
                'zoom-canvas'
              ]
            },
            defaultNode: {
              size: 50,
              style: {
                'fill': 'rgba(0,0,0,0)',
                'stroke': 'rgba(0,0,0,0)'
              }
            },
            layout: {
              type: 'dendrogram',
              direction: 'LR',
              nodeSep: 50,
              rankSep: 160,
              radial: true
            },
            plugins: [minimap]
          })

          graph.node(function(node) {
            return {
              label: node.id
            }
          })

          graph.data(data)
          graph.render()
          graph.fitView()

          if (typeof window !== 'undefined') {
            window.onresize = () => {
              if (!graph || graph.get('destroyed')) return
              if (!container || !container.scrollWidth || !container.scrollHeight) return
              graph.changeSize(container.scrollWidth, container.scrollHeight)
            }
          }
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

