<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      highlight-current-row
      max-height="800"
    >
<!--      <el-table-column align="center" width="400" label="交易哈希">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.id }}-->
<!--        </template>-->
<!--      </el-table-column>-->
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
      <el-table-column align="center" label="智能合约" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.contract }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="方法" width="150">
        <template v-if="scope.row.contract !== ''" slot-scope="scope">
          <span>{{ scope.row.method }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="参数" width="200">
        <template v-if="scope.row.contract !== ''" slot-scope="scope">
          <span>{{ scope.row.args }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="交易时间" width="200">
        <template slot-scope="scope">
          <span>{{ getTime(scope.row.timestamp) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllTrans } from '@/api/ssbc'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.getAllTrans()
  },
  methods: {
    getAllTrans() {
      getAllTrans().then(res => {
        console.log('getAllTrans:', res)
        this.list = res.Data
        this.listLoading = false
      })
    },
    getTime(str) {
      return str.slice(0, 19)
    }
  }
}
</script>
