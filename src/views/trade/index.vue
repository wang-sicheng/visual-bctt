<template>
  <div class="app-container">
    <el-row :gutter="12">

      <el-col :span="24" :xs="24">
        <el-card>
          <el-tabs v-model="activeTab">

            <el-tab-pane label="交易信息" name="info">
              <el-form>
                <div class="val">0x{{ this.$route.query.id }}</div>
                <el-form-item label="交易状态">
                  <el-tag :type="info.status | statusFilter">{{ info.status }}</el-tag>
                </el-form-item>
                <el-form-item label="所在块">
                  <div class="value">{{ info.location }}</div>
                </el-form-item>
                <el-form-item label="时间">
                  <div class="value">{{ info.display_time }}</div>
                </el-form-item>

                <el-form-item label="从">
                  <router-link :to="{ path: '/address/index', query: { id: info.from }}">
                    <el-link type="primary">
                      <div class="value">0x{{ info.from }}</div>
                    </el-link>
                  </router-link>
                </el-form-item>

                <el-form-item label="到">
                  <router-link :to="{ path: '/address/index', query: { id: info.to }}">
                    <el-link type="primary">
                      <div class="value">0x{{ info.to }}</div>
                    </el-link>
                  </router-link>
                </el-form-item>

                <el-form-item label="交易额">
                  <div class="value">💰{{ info.price }}</div>
                </el-form-item>
                <el-form-item />
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="交易追踪" name="trace">
              <trade-graph :id="id" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import { getTrade } from '@/api/table'
import TradeGraph from './components/TradeGraph'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        成功: 'success',
        进行中: 'gray',
        失败: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    TradeGraph
  },
  data() {
    return {
      id: null,
      activeTab: 'info',
      info: null,
      listLoading: true
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.listLoading = true
      getTrade(this.id).then(response => {
        this.info = response.data.items
        this.listLoading = false
        console.log(this.info)
      })
    }
  }
}
</script>

<style>
  .val {
    font-size: 28px;
    font-weight: 700;
    padding: 19px 0 20px;
  }
  .item {
    margin: 4px;
  }

  .left .el-tooltip__popper,
  .right .el-tooltip__popper {
    padding: 8px 10px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-form-item__label {
    width: 180px;
    text-align: left;
    color: #8e9ab5;
  }
  .value {
    color: #213654;
    font-weight: 700;
}
</style>
