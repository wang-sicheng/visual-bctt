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
        <br>
        <el-alert
          title="发展方向："
          type="info"
          description="1、拓宽数据采集面，满足小微企业的融资需求，推动与小微企业融资相关的重要信息采集。
                      2、提高数据的运用效率和数据挖掘技术的应用水平，优化模型，从更多层面刻画小微企业的信用资质情况，提高企业画像的精准度。
                      3、深化与大数据技术公司的合作，发掘、量化更多层面的非政府部门公开信息，丰富平台数据库维度。"
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
        'quadratic'
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
                'drag-canvas', 'drag-node', 'zoom-canvas', 'drag-combo']
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
            defaultCombo: {
              type: 'rect',
              /* style for the keyShape */
              style: {
                lineWidth: 1
              },
              labelCfg: {
                /* label's offset to the keyShape */
                // refY: 10,
                /* label's position, options: center, top, bottom, left, right */
                position: 'top'
                /* label's style */
                // style: {
                //   fontSize: 18,
                // },
              }
            },
            plugins: [minimap]
          })
          graph.data(data)
          graph.render()
          graph.fitView()

          graph.on('combo:mouseenter', (evt) => {
            const { item } = evt
            graph.setItemState(item, 'active', true)
          })

          graph.on('combo:mouseleave', (evt) => {
            const { item } = evt
            graph.setItemState(item, 'active', false)
          })
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

