<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="contracts"
      element-loading-text="Loading"
      border
      highlight-current-row
      max-height="800"
      :key="itemKey"
    >
      <el-table-column align="center" width="300" label="智能合约地址">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="账户余额" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.balance }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.data.contractname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据" width="800" align="left">
        <template slot-scope="scope">
          <pre>{{ scope.row.data.contractData }}</pre>
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
      q_account: {
        type: 'getAllAccounts',
        parameters: []
      },
      q_contract: {
        type: 'contractData',
        parameters: []
      },
      contracts: null,
      listLoading: true,
      itemKey: 0
    }
  },
  created() {
    this.getAllAccounts()
  },
  methods: {
    getAllAccounts() {
      query(this.q_account).then(res => {
        // 筛选出普通账户和智能合约账户
        const contracts = []
        const total = res.data
        total.forEach(function(r) {
          if (r.iscontract) {
            contracts.push(r)
          }
        })
        this.contracts = contracts
        this.getContractData()
      })
    },
    getContractData() {
      for (let i = 0; i < this.contracts.length; i++) {
        var parameters = []
        parameters.push(this.contracts[i].data.contractname)
        for (let j = 0; j < this.contracts[i].data.variables.length; j++) {
          parameters.push(this.contracts[i].data.variables[j])
        }
        this.q_contract.parameters = parameters
        var q_contract = { 'type': '', 'parameters': [] }
        q_contract['type'] = 'contractData'
        q_contract['parameters'] = parameters
        query(q_contract).then(res => {
          var str = JSON.stringify(res.data)
          var jsonPretty = JSON.stringify(JSON.parse(str), null, 2)
          this.contracts[i]['data']['contractData'] = jsonPretty
          console.log(jsonPretty)
          this.itemKey = Math.random()
        })
      }
      console.log(this.contracts)
      this.listLoading = false
    }
  }
}
</script>
