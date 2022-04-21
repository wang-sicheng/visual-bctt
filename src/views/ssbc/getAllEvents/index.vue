<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="内部事件" name="first">
        <el-table
          v-loading="listLoading"
          :data="innerEvents"
          element-loading-text="Loading"
          border
          highlight-current-row
          max-height="800"
        >
          <el-table-column label="事件ID" width="300" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.event_id }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="定义方" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.from_address }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="订阅方" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.subscriptions }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="源链" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.chain_id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="事件参数" width="1000" align="left">
            <template slot-scope="scope">
              <pre>{{ scope.row.args }}</pre>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Pull-APIs事件" name="second">
        <el-table
          v-loading="listLoading"
          :data="pullApiEvents"
          element-loading-text="Loading"
          border
          highlight-current-row
          max-height="800"
        >
          <el-table-column label="事件ID" width="300" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.event_id }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="定义方" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.from_address }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="订阅方" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.subscriptions }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="源链" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.chain_id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="事件参数" width="1000" align="left">
            <template slot-scope="scope">
              <pre>{{ scope.row.args }}</pre>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Pull-跨链事件" name="third">
        <el-table
          v-loading="listLoading"
          :data="pullCrossEvents"
          element-loading-text="Loading"
          border
          highlight-current-row
          max-height="800"
        >
          <el-table-column label="事件ID" width="300" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.event_id }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="定义方" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.from_address }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="订阅方" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.subscriptions }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="源链" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.chain_id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="事件参数" width="1000" align="left">
            <template slot-scope="scope">
              <pre>{{ scope.row.args }}</pre>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Push事件" name="forth">
        <el-table
          v-loading="listLoading"
          :data="pushEvents"
          element-loading-text="Loading"
          border
          highlight-current-row
          max-height="800"
        >
          <el-table-column label="事件ID" width="300" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.event_id }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="定义方" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.from_address }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="订阅方" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.subscriptions }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="源链" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.chain_id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="事件参数" width="1000" align="left">
            <template slot-scope="scope">
              <pre>{{ scope.row.args }}</pre>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="订阅" name="fifth">
        <el-table
          v-loading="listLoading"
          :data="subscriptions"
          element-loading-text="Loading"
          border
          highlight-current-row
          max-height="800"
        >
          <el-table-column label="事件ID" width="300" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.event_id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订阅ID" width="200" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.sub_id }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="订阅方" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.from_address }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="回调合约" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.contract_name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="回调方法" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.contract_method }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="触发次数" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.total }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { query } from '@/api/ssbc'

export default {
  data() {
    return {
      q: {
        type: 'getEvent',
        parameters: []
      },
      innerEvents: [],
      pullApiEvents: [],
      pullCrossEvents: [],
      pushEvents: [],
      subscriptions: [],
      listLoading: true,
      activeName: 'first'
    }
  },
  created() {
    this.getAllEvents()
  },
  methods: {
    getAllEvents() {
      query(this.q).then(res => {
        // 筛选出转账交易、发布合约和调用合约
        const inner = []
        const api = []
        const cross = []
        const push = []
        const sub = []

        const total = res.data
        total.forEach(function(r) {
          // 根据交易类型区分，定义在 ssbcV2/meta/block.go
          switch (r.type) {
            case '0':
              inner.push(r)
              break
            case '1':
              api.push(r)
              break
            case '2':
              cross.push(r)
              break
            case '3':
              push.push(r)
              break
            case '4':
              sub.push(r)
              break
            default:
              break
          }
        })
        this.innerEvents = inner
        this.pullApiEvents = api
        this.pullCrossEvents = cross
        this.pushEvents = push
        this.subscriptions = sub

        this.listLoading = false
      })
    },
    getTime(str) {
      return str.slice(0, 19)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
