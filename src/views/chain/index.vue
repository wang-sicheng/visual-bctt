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
      G6.registerEdge(
        'circle-running',
        {
          afterDraw(cfg, group) {
            // get the first shape in the group, it is the edge's path here=
            const shape = group.get('children')[0]
            // the start position of the edge's path
            const startPoint = shape.getPoint(0)

            // add red circle shape
            const circle = group.addShape('circle', {
              attrs: {
                x: startPoint.x,
                y: startPoint.y,
                fill: '#1890ff',
                r: 3
              },
              name: 'circle-shape'
            })

            // animation for the red circle
            circle.animate(
              (ratio) => {
                // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
                // get the position on the edge according to the ratio
                const tmpPoint = shape.getPoint(ratio)
                // returns the modified configurations here, x and y here
                return {
                  x: tmpPoint.x,
                  y: tmpPoint.y
                }
              },
              {
                repeat: true, // Whether executes the animation repeatly
                duration: 3000 // the duration for executing once
              }
            )
          }
        },
        'line' // extend the built-in edge 'cubic'
      )

      getChain().then((res) => res.data.items)
        .then((data) => {
          const container = document.getElementById('mountNode')
          const minimap = new G6.Minimap({
            size: [100, 100],
            className: 'minimap',
            type: 'delegate'
          })
          const grid = new G6.Grid()
          const graph = new G6.Graph({
            container: 'mountNode',
            width: container.scrollWidth, // 图的宽度
            height: container.scrollHeight || 650,
            // groupByTypes: false,
            // linkCenter: true,
            // fitView: true,
            fitViewPadding: 20,
            minZoom: 0.2,
            layout: {
              type: 'comboForce',
              nodeSpacing: (d) => 10
            },
            defaultNode: {
              size: 10,
              color: '#5B8FF9',
              style: {
                lineWidth: 2,
                fill: '#C6E5FF'
              }
            },
            defaultEdge: {
              type: 'circle-running',
              size: 2,
              color: '#e2e2e2'
            },
            modes: {
              default: ['drag-combo', 'drag-node', 'drag-canvas', 'zoom-canvas']
            },
            plugins: [minimap, grid]
          })

          graph.data(data)
          graph.render()
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

