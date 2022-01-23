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
      <el-table-column align="center" label="交易哈希">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="从" width="295" align="center">
        <template slot-scope="scope">
          <span>0x{{ scope.row.from }}</span>
        </template>
      </el-table-column>

      <el-table-column label="到" width="295" align="center">
        <template slot-scope="scope">
          <span>0x{{ scope.row.to }}</span>
        </template>
      </el-table-column>

      <el-table-column label="交易额" width="90" align="center">
        <template slot-scope="scope">
          💰{{ scope.row.value }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="交易时间" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="295" align="center">
        <template slot-scope="scope">
          {{ scope.row.data }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  props: {
    height: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      address: {
        uid: ''
      },
      list: null,
      listLoading: true
    }
  },
  mounted() {
    this.address.uid = this.height
  },
  created() {
    this.fetchData()
    console.log('block', this.height)
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      fetch(`http://localhost:9999/getOneBlockTrans?height=${this.height}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
        // body: JSON.stringify({
        //   height: this.height
        // })
      })
        .then((res) => {
          return { data: res }
        })
        .then(response => {
          response.data.json().then((res) => {
            console.log('getOneBlockTrans:', res)
            this.list = res.data
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
