<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="创建账户" name="first">
        <el-table
          v-loading="listLoading"
          :data="registerTrans"
          element-loading-text="Loading"
          border
          highlight-current-row
          max-height="800"
        >
          <el-table-column label="账户地址" width="350" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.to }}</span>
            </template>
          </el-table-column>
          <el-table-column label="初始余额" width="90" align="center">
            <template v-if="scope.row.contract === ''" slot-scope="scope">
              <span>{{ scope.row.value }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="创建时间" width="200">
            <template slot-scope="scope">
              <span>{{ getTime(scope.row.timestamp) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="转账交易" name="second">
        <el-table
          v-loading="listLoading"
          :data="transferTrans"
          element-loading-text="Loading"
          border
          highlight-current-row
          max-height="800"
        >
          <el-table-column label="从" width="350" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.from }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到" width="350" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.to }}</span>
            </template>
          </el-table-column>
          <el-table-column label="交易额" width="90" align="center">
            <template v-if="scope.row.contract === ''" slot-scope="scope">
              <span>{{ scope.row.value }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="交易时间" width="200">
            <template slot-scope="scope">
              <span>{{ getTime(scope.row.timestamp) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="发布合约" name="third">
        <el-table
          v-loading="listLoading"
          :data="publishTrans"
          element-loading-text="Loading"
          border
          highlight-current-row
          max-height="800"
        >
          <el-table-column label="从" width="350" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.from }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到" width="350" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.to }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="智能合约" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.contract }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="交易时间" width="200">
            <template slot-scope="scope">
              <span>{{ getTime(scope.row.timestamp) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="调用合约" name="forth">
        <el-table
          v-loading="listLoading"
          :data="invokeTrans"
          element-loading-text="Loading"
          border
          highlight-current-row
          max-height="800"
        >
          <el-table-column label="发起地址" width="350" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.from }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到" width="350" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.to }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="智能合约" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.contract }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="方法" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.method }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="参数" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.args }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="交易时间" width="200">
            <template slot-scope="scope">
              <span>{{ getTime(scope.row.timestamp) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getAllTrans } from '@/api/ssbc'

export default {
  data() {
    return {
      transferTrans: [],
      registerTrans: [],
      publishTrans: [],
      invokeTrans: [],
      listLoading: true,
      activeName: 'first'
    }
  },
  created() {
    this.getAllTrans()
  },
  methods: {
    getAllTrans() {
      getAllTrans().then(res => {
        // 筛选出转账交易、发布合约和调用合约
        const transfer = []
        const register = []
        const publish = []
        const invoke = []

        const total = res.Data
        total.forEach(function(r) {
          // 根据交易类型区分，定义在 ssbcV2/meta/block.go
          switch (r.type) {
            case 0:
              transfer.push(r)
              break
            case 1:
              register.push(r)
              break
            case 2:
              publish.push(r)
              break
            case 3:
              invoke.push(r)
              break
            default:
              break
          }
        })
        this.transferTrans = transfer
        this.registerTrans = register
        this.publishTrans = publish
        this.invokeTrans = invoke

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
