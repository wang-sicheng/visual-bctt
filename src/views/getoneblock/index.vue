<template>
  <div class="app-container">
    <el-row
      v-if="info"
      :gutter="12"
    >

      <el-col :span="24" :xs="24">
        <el-card>
          <el-tabs
            v-model="activeTab"
          >

            <el-tab-pane label="区块信息" name="info">
              <el-form>
                <div class="val">{{ this.$route.query.height }}</div>
                <div class="value">{{ info.Hash }}</div>

                <el-form-item />
                <el-form-item />

                <el-form-item label="时间">
                  <div class="value">{{ info.Timestamp }}</div>
                </el-form-item>
                <el-form-item label="前一区块哈希">
                  <div class="value">{{ info.PrevHash !== null ? info.PrevHash : '---' }}</div>
                </el-form-item>
                <el-form-item label="签名">
                  <div class="value">{{ info.Signature !== null ? info.Signature : '---' }}</div>
                </el-form-item>
                <el-form-item label="Merkle根">
                  <div class="value">{{ info.MerkleRoot !== null ? info.MerkleRoot : '---' }}</div>
                </el-form-item>

                <!-- <el-form-item label="下一个区块">
                  <router-link :to="{ path: '/block/index', query: { height: height + 1 }}">
                    <el-link type="primary">
                      <el-button type="text" class="valueMatter" @click="getInfo">0x{{ info.to }}</el-button>
                    </el-link>
                  </router-link>
                </el-form-item> -->
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
              <block-trans :height="Number(height)" />
            </el-tab-pane>

          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import BlockTrans from './components/BlockTrans'

export default {
  components: {
    BlockTrans
  },
  data() {
    return {
      height: null,
      activeTab: 'info',
      info: null,
      listLoading: true
    }
  },
  created() {
    this.height = this.$route.query.height
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      fetch(`http://localhost:9999/getBlock?height=${this.height}`, {
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
            console.log('getBlock:', res)
            this.info = res.Data
            this.listLoading = false
          })
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
