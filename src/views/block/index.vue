<template>
  <div class="app-container">
    <el-row :gutter="12">

      <el-col :span="24" :xs="24">
        <el-card>
          <el-tabs v-model="activeTab">

            <el-tab-pane label="区块信息" name="info">
              <el-form>
                <div class="val">{{ this.$route.query.id }}</div>
                <div class="value">0x{{ info.location_no }}</div>

                <el-form-item />
                <el-form-item />

                <el-form-item label="时间">
                  <div class="value">{{ info.display_time }}</div>
                </el-form-item>
                <el-form-item label="大小">
                  <div class="value">{{ info.size }} Bytes</div>
                </el-form-item>
                <el-form-item label="交易数量">
                  <div class="value">{{ info.amount }}</div>
                </el-form-item>
                <el-form-item label="确认数">
                  <div class="value">{{ info.affirm }}</div>
                </el-form-item>

                <el-form-item label="上一个区块">
                  <router-link :to="{ path: '/block/index', query: { id: id - 1 }}">
                    <el-link type="primary">
                      <el-button type="text" class="valueMatter" @click="getInfo">0x{{ info.from }}</el-button>
                    </el-link>
                  </router-link>
                </el-form-item>

                <el-form-item label="下一个区块">
                  <router-link :to="{ path: '/block/index', query: { id: id + 1 }}">
                    <el-link type="primary">
                      <el-button type="text" class="valueMatter" @click="getInfo">0x{{ info.to }}</el-button>
                    </el-link>
                  </router-link>
                </el-form-item>

                <el-form-item label="总交易额">
                  <div class="value">💰{{ info.price }}</div>
                </el-form-item>
                <el-form-item />
              </el-form>
            </el-tab-pane>

          </el-tabs>
        </el-card>
      </el-col>

    </el-row>
    <br>
    <el-row :gutter="12">

      <el-col :span="24" :xs="24">
        <el-card>
          <el-tabs v-model="activeTab">

            <el-tab-pane label="交易记录" name="info">
              <block-table :id="id" />
            </el-tab-pane>

          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getBlock } from '@/api/table'
import BlockTable from './components/BlockTable'

export default {
  components: {
    BlockTable
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

      getBlock(this.id).then(response => {
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
  /* .val {
    font-size: 28px;
    font-weight: 700;
    padding: 19px 0 20px;
  } */
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
  .valueMatter {
    color: #0566ee;
    font-weight: 700;
  }
</style>
