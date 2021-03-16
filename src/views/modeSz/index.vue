<template>
  <div class="app-container">
    <el-row :gutter="0">
      <el-col :span="22" :offset="1">
        <el-alert
          title="苏州小微企业数字征信的模式特点："
          type="info"
          description="1、依托国资征信平台，推动政府与市场平台深度合作,苏州小微数字征信服务呈现“政府 + 市场”双轮驱动发展模式，依托于“三平台一中心”（综合金融服务平台、股权融资服务平台、地方企业征信平台、企业自主创新金融支持中心），建立了“企业守信用、机构有创新、政府有推动”的小微企业综合金融服务体系。
                      2、实施企业信息收集与查询双授权，强化法律支撑，收集数据时需要获得小微企业的信息收集授权。查询数据时还需获得小微企业的数据查询授权。
                      3、对接政府部门，整合小微企业关键非银信息，非银信息来源包括人社局、国土局、住建局、商务局、环保局、经信委、公积金中心、税务局、工商局、海关以及水、电、燃气公司等 70 余家单位。
                      4、依托征信数据创新专项金融产品，完善银企对接"
          show-icon
        />
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="22" :offset="1">
        <div id="mountNode" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import G6 from '@antv/g6'
import insertCss from 'insert-css'
import { getModeSz } from '@/api/graph'

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
            const shape = group.get('children')[0]
            const startPoint = shape.getPoint(0)

            const circle = group.addShape('circle', {
              attrs: {
                x: startPoint.x,
                y: startPoint.y,
                fill: '#1890ff',
                r: 3
              },
              name: 'circle-shape'
            })

            circle.animate(
              (ratio) => {
                const tmpPoint = shape.getPoint(ratio)
                return {
                  x: tmpPoint.x,
                  y: tmpPoint.y
                }
              },
              {
                repeat: true,
                duration: 3000
              }
            )
          }
        },
        'line'
      )

      getModeSz().then((res) => res.data.items)
        .then((data) => {
          const container = document.getElementById('mountNode')
          insertCss(`
						.g6-component-tooltip {
							border: 1px solid #e2e2e2;
							border-radius: 4px;
							font-size: 12px;
							color: #000;
							background-color: rgba(255, 255, 255, 0.9);
							padding: 10px 8px;
							box-shadow: rgb(174, 174, 174) 0px 0px 10px;
						}
					`)

          const minimap = new G6.Minimap({
            size: [100, 100],
            className: 'minimap',
            type: 'delegate'
          })
          const grid = new G6.Grid()
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
            plugins: [minimap, grid]
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

