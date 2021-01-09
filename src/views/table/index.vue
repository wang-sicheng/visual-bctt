<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      highlight-current-row
      indent
      max-height="800"
    >
      <el-table-column align="center" label="交易哈希">
        <template slot-scope="scope">
          {{ scope.row.order_no }}
        </template>
      </el-table-column>
      <el-table-column label="从" width="295" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">0x{{ scope.row.from }}</div>
            <span>0x{{ scope.row.from }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="到" width="295" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">0x{{ scope.row.from }}</div>
            <span>0x{{ scope.row.to }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="交易额" width="90" align="center">
        <template slot-scope="scope">
          💰{{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="交易时间" width="170">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        completed: 'success',
        pending: 'gray',
        canceled: 'danger'
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
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
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
