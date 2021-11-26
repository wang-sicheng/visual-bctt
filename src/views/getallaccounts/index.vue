<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="user"
      element-loading-text="Loading"
      border
      highlight-current-row
      max-height="800"
    >
      <el-table-column align="center" width="400"  label="账户地址">
        <template v-if="!scope.row.iscontract" slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="账户余额" width="295" align="center">
        <template v-if="!scope.row.iscontract" slot-scope="scope">
          <span>{{ scope.row.balance }}</span>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <br>
    <br>

    <el-table
      v-loading="listLoading"
      :data="contract"
      element-loading-text="Loading"
      border
      highlight-current-row
      max-height="800"
    >
      <el-table-column align="center" width="400"  label="智能合约地址">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="名称" width="295" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.data.contractname }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { getAllAccounts } from '@/api/ssbc'

export default {
  data() {
    return {
      user: null,
      contract: null,
      listLoading: true
    }
  },
  created() {
    this.getAllAccounts()
  },
  methods: {
    getAllAccounts() {
      getAllAccounts().then(res => {
        // 筛选出普通账户和智能合约账户
        const user = []
        const contract = []
        const total = res.Data
        total.forEach(function(r) {
          if (!r.iscontract) {
            user.push(r)
          } else {
            contract.push(r)
          }
        })
        this.user = user
        this.contract = contract
        this.listLoading = false
      })
    }
  }
}
</script>
