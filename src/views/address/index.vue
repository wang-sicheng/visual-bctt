<template>
  <div class="app-container">
    <el-row :gutter="12">

      <el-col :span="24" :xs="24">
        <el-card>
          <el-tabs v-model="activeTab">

            <el-tab-pane label="地址信息" name="info">
              <el-form>
                <el-form-item />

                <span class="address">
                  普通地址
                  <div class="val">0x{{ this.$route.query.id }}</div>
                </span>

                <el-form-item label="交易笔数">
                  <div class="value">{{ info.total }}</div>
                </el-form-item>
                <el-form-item label="余额">
                  <div class="value">💰{{ info.price }}</div>
                </el-form-item>
                <el-form-item label="角色">
                  <div class="value">{{ info.role }}</div>
                </el-form-item>
                <el-form-item />
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="交易记录" name="trace">
              <address-table :id="id" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>

    </el-row>
    <br>
    <el-row>
      <el-col>
        <el-card>
          <el-tabs v-model="activeTab2">
            <el-tab-pane label="地址记录追踪" name="info">
              <address-graph :id="id" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAddress } from '@/api/table'
import AddressGraph from './components/AddressGraph'
import AddressTable from './components/AddressTable'

export default {
  components: {
    AddressGraph,
    AddressTable
  },
  data() {
    return {
      id: '',
      activeTab: 'info',
      activeTab2: 'info',
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
      getAddress(this.id).then(response => {
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
  .address {
    width: 230px;
    font-size: 20px;
    font-weight: 500;
    color: #213654;
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
