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
          <router-link :to="{ path: '/trade/index', query: { id: scope.row.order_no }}">
            <el-link type="primary">
              0x{{ scope.row.order_no }}
            </el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="从" width="295" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">0x{{ scope.row.from }}</div>

            <router-link v-if="scope.row.from !== id" :to="{ path: '/address/index', query: { id: scope.row.from }}">
              <el-link type="primary">
                <span>0x{{ scope.row.from }}</span>
              </el-link>
            </router-link>
            <span v-else>0x{{ scope.row.from }}</span>

          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="到" width="295" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">0x{{ scope.row.to }}</div>

            <router-link v-if="scope.row.to !== id" :to="{ path: '/address/index', query: { id: scope.row.to }}">
              <el-link type="primary">
                <span>0x{{ scope.row.to }}</span>
              </el-link>
            </router-link>
            <span v-else>0x{{ scope.row.to }}</span>

          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="交易额" width="90" align="center">
        <template slot-scope="scope">
          💰{{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="交易时间" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAddrList } from '@/api/table'

export default {
  props: {
    id: {
      type: String,
      default: ''
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
    this.address.uid = this.id
  },
  created() {
    this.fetchData()
    console.log(123, this.id)
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAddrList(this.id).then(response => {
        this.list = response.data.items
        console.log(this.list)
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
