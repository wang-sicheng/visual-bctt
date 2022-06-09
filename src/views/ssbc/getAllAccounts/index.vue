<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="user"
      element-loading-text="Loading"
      border
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" min-width="50%" label="外部账户地址">
        <template v-if="!scope.row.iscontract" slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="账户余额" min-width="50%" align="center">
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
      style="width: 100%"
    >
      <el-table-column align="center" min-width="50%" label="合约账户地址">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="账户余额" min-width="25%" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.balance }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" min-width="25%" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.data.contractname }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { query } from '@/api/ssbc'

export default {
  data() {
    return {
      q: {
        type: 'getAllAccounts',
        parameters: []
      },
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
      query(this.q).then(res => {
        // 筛选出普通账户和智能合约账户
        const user = []
        const contract = []
        const total = res.data
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
