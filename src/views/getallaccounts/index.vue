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
      <el-table-column align="center" width="400"  label="账户地址">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="账户余额" width="295" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.balance }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
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
    async fetchData() {
      this.listLoading = true
      fetch('http://localhost:9999/getAllAccounts', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      }).then((res) => { return { data: res } })
        .then(response => {
          response.data.json().then((res) => {
            this.list = res.Data
            this.listLoading = false
          })
        })
    }
  }
}
</script>
