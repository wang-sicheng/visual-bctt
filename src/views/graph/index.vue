<template>
  <div class="app-container">
    <div id="mountNode" />
  </div>
</template>

<script>
import G6 from '@antv/g6'
import { getParams } from '@/api/params'

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
          const grid = new G6.Grid()
          const graph = new G6.TreeGraph({
            container: 'mountNode',
            width: 800, // 图的宽度
            height: 600,
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
                'drag-canvas',
                'zoom-canvas'
              ]
            },
            defaultNode: {
              size: 26
            },
            layout: {
              type: 'dendrogram',
              direction: 'LR',
              nodeSep: 20,
              rankSep: 100,
              radial: true
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

<style scoped>
.line{
  text-align: center;
}
</style>

