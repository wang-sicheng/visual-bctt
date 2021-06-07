<template>
  <div class="app-container">
    <el-row :gutter="0">
      <el-col :span="22" :offset="1">
        <el-alert
          title="台州小微企业数字征信的模式特点："
          type="info"
          description="1、数据融合。多部门数据融合，为金融机构提供了大数据查询接口，节省了金融机构的信息搜寻成本，有效降低了金融机构与小微企业之间的信息不对称问题。
                      2、数据真实性。该数据平台将多部门的信用信息数据进行了自动融合，确保了数据的真实性、可靠性，以及完整性，规避了传统手段获取数据的质量不佳现象。
                      3、数据的功能性。建立小微企业信用信息立方体，构建小微企业信用信息库，包含各个小微企业的正负面信息、不良小微企业信息库、小微企业风险评价报告，以及政府针对某些行业小微企业的培育支持情况等信息。"
          show-icon
        />
        <br>
        <el-alert
          title="流程："
          type="info"
          description="金融服务信用信息共享平台，征集信用信息数据。整合信息、自动评分、导入信用报告、建立信用立方，为金融机构提供查询接口"
          show-icon
        />
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="22" :offset="1">
        <br>
        <div id="mountNode" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import G6 from '@antv/g6'
import { getModeTz } from '@/api/graph'

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

      getModeTz().then((res) => res.data.items)
        .then((data) => {
          const container = document.getElementById('mountNode')
          const minimap = new G6.Minimap({
            size: [100, 100],
            className: 'minimap',
            type: 'delegate'
          })
          // const grid = new G6.Grid()
          const graph = new G6.Graph({
            container: 'mountNode',
            width: container.scrollWidth, // 图的宽度
            height: container.scrollHeight || 600,
            fitView: true,
            fitCenter: true,
            modes: {
              default: [
                {
                  type: 'tooltip', // 提示框
                  formatText(model) {
                    // 提示框文本内容
                    const text = model.description
                    return text
                  }
                },
                'drag-canvas', 'drag-node', 'zoom-canvas']
            },
            defaultNode: {
              // size: [90, 60],
              style: {
                lineWidth: 1,
                stroke: '#5B8FF9',
                fill: '#EBEEF5',
                radius: 5
              }
            },
            defaultEdge: {
            //   type: 'cubic',
              type: 'circle-running',
              size: 2,
              color: '#F6BD16'
            },
            plugins: [minimap]
          })
          graph.data(data)
          graph.render()
          graph.fitView()

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

