const response = await fetch(
    'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'
  )
  const remoteData = await response.json()
  const nodes = remoteData.nodes
  const edges = remoteData.edges
  nodes.forEach((node) => {
    if (!node.style) {
      node.style = {}
    }
    node.style.lineWidth = 1
    node.style.stroke = '#666'
    node.style.fill = 'steelblue'
    switch (node.class) {
      case 'c0': {
        node.type = 'circle' // class = 'c0' 时节点图形为 circle
        break
      }
      case 'c1': {
        node.type = 'rect' // class = 'c1' 时节点图形为 rect
        node.size = [35, 20] // class = 'c1' 时节点大小
        break
      }
      case 'c2': {
        node.type = 'ellipse' // class = 'c2' 时节点图形为 ellipse
        node.size = [35, 20] // class = 'c2' 时节点大小
        break
      }
    }
  })
  edges.forEach((edge) => {
    if (!edge.style) {
      edge.style = {}
    }
    edge.style.lineWidth = edge.weight // 边的粗细映射边数据中的 weight 属性数值
    // 移到此处
    edge.style.opacity = 0.6
    edge.style.stroke = 'grey'
  })
  const minimap = new G6.Minimap({
    size: [100, 100],
    className: 'minimap',
    type: 'delegate'
  })
  const grid = new G6.Grid()

  const graph = new G6.Graph({
    container: 'mountNode', // 指定挂载容器
    width: 1000, // 图的宽度
    height: 700, // 图的高度
    fitView: true,
    fitViewPadding: [20, 40, 50, 20],
    defaultNode: {
      size: 30, // 节点大小
      // 节点样式配置
      style: {
        fill: 'steelblue', // 节点填充色
        stroke: '#666', // 节点描边色
        lineWidth: 1 // 节点描边粗细
      },
      // 节点上的标签文本配置
      labelCfg: {
      // 节点上的标签文本样式配置
        style: {
          fill: '#fff' // 节点标签文字颜色
        }
      }
    },
    // 边在默认状态下的样式配置（style）和其他配置
    defaultEdge: {
      labelCfg: {
        autoRotate: true // 边上的标签文本根据边的方向旋转
      }
    },
    layout: {
      type: 'force',
      preventOverlap: true,
      linkDistance: 100 // 指定边距离为100
    },
    modes: {
      default: ['drag-canvas', 'zoom-canvas', 'drag-node'
        // {
        //   type: 'tooltip', // 提示框
        //   formatText(model) {
        //   // 提示框文本内容
        //     const text = 'label: ' + model.label + '<br/> class: ' + model.class
        //     return text
        //   }
        // }
        // {
        //   type: 'edge-tooltip', // 边提示框
        //   formatText(model) {
        //   // 边提示框文本内容
        //     const text =
        //     'source: ' +
        //     model.source +
        //     '<br/> target: ' +
        //     model.target +
        //     '<br/> weight: ' +
        //     model.weight
        //     return text
        //   }
        // }
      ],
      // 允许拖拽画布、放缩画布、拖拽节点
      edit: []
    },
    nodeStateStyles: {
    // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
      hover: {
        fill: 'lightsteelblue'
      },
      // 鼠标点击节点，即 click 状态为 true 时的样式
      click: {
        stroke: '#000',
        lineWidth: 3
      }
    },
    // 边不同状态下的样式集合
    edgeStateStyles: {
    // 鼠标点击边，即 click 状态为 true 时的样式
      click: {
        stroke: 'steelblue'
      }
    },
    plugins: [minimap, grid]
  })

  graph.data(remoteData) // 加载远程数据
  graph.render() // 渲染
  // 鼠标进入节点
  graph.on('node:mouseenter', (e) => {
    const nodeItem = e.item // 获取鼠标进入的节点元素对象
    graph.setItemState(nodeItem, 'hover', true) // 设置当前节点的 hover 状态为 true
  })
  // 鼠标离开节点
  graph.on('node:mouseleave', (e) => {
    const nodeItem = e.item // 获取鼠标离开的节点元素对象
    graph.setItemState(nodeItem, 'hover', false) // 设置当前节点的 hover 状态为 false
  })
  // 点击节点
  graph.on('node:click', (e) => {
    // 先将所有当前是 click 状态的节点置为非 click 状态
    const clickNodes = graph.findAllByState('node', 'click')
    clickNodes.forEach((cn) => {
      graph.setItemState(cn, 'click', false)
    })
    const nodeItem = e.item // 获取被点击的节点元素对象
    graph.setItemState(nodeItem, 'click', true) // 设置当前节点的 click 状态为 true
  })

  // 点击边
  graph.on('edge:click', (e) => {
    // 先将所有当前是 click 状态的边置为非 click 状态
    const clickEdges = graph.findAllByState('edge', 'click')
    clickEdges.forEach((ce) => {
      graph.setItemState(ce, 'click', false)
    })
    const edgeItem = e.item // 获取被点击的边元素对象
    graph.setItemState(edgeItem, 'click', true) // 设置当前边的 click 状态为 true
  })