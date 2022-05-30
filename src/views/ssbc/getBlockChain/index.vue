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
      <el-table-column width="80" align="center" label="区块高度">
        <template slot-scope="scope">
          <span> {{ scope.row.Height }}</span>
        </template>
      </el-table-column>

      <el-table-column width="400" align="center" label="前一区块hash">
        <template slot-scope="scope">
          <!-- <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">0x{{ scope.row.from }}</div>
            <router-link :to="{ path: '/address/index', query: { id: scope.row.to }}">
              <el-link type="primary"> -->
          <span>{{ scope.row.PrevHash }}</span>
          <!-- </el-link>
            </router-link>
          </el-tooltip> -->
        </template>
      </el-table-column>
<!--      <el-table-column class-name="status-col" width="200" align="center" label="签名">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.Signature }}-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column width="400" align="center" prop="created_at" label="区块hash">
        <template slot-scope="scope">
          <span>{{ scope.row.Hash }}</span>
        </template>
      </el-table-column>
      <el-table-column width="250" align="center" label="Merkle根">
        <template slot-scope="scope">
          {{ scope.row.MerkleRoot }}
        </template>
      </el-table-column>
      <el-table-column width="220" align="center" label="时间戳">
        <template slot-scope="scope">
          <!-- <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">0x{{ scope.row.from }}</div>
            <router-link :to="{ path: '/address/index', query: { id: scope.row.from }}">
              <el-link type="primary"> -->
          <span>{{ getTime(scope.row.Timestamp) }}</span>
          <!-- </el-link>
            </router-link>
          </el-tooltip> -->
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
        type: 'getBlockChain',
        parameters: []
      },
      list: null,
      listLoading: true
    }
  },
  created() {
    this.getBlockChain()
  },
  methods: {
    getBlockChain() {
      query(this.q).then(res => {
        console.log('getBlockChain:', res)
        this.list = res.data
        this.listLoading = false
      })
    },
    getTime(str) {
      return str.slice(0, 19)
    }
  }
}
</script>
