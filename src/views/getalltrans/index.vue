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
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="交易时间" width="470">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ getTime(scope.row.timestamp) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'gray',
        failed: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    getTime(str) {
      return str.slice(0, 19)
    },
    async fetchData() {
      this.listLoading = true
      fetch('http://localhost:9999/getAllTrans', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          return { data: res }
        })
        .then(response => {
          response.data.json().then((res) => {
            console.log('getAllTrans:', res)
            this.list = res.Data
            this.listLoading = false
          })
        })
    }
  }
}
</script>

<style>
.item {
      margin: 4px;
    }

    .left .el-tooltip__popper,
    .right .el-tooltip__popper {
      padding: 8px 10px;
    }
</style>
