<template>
  <div class="app-container">

    <el-row :gutter="0">
      <el-col :span="22" :offset="1" :xs="24">
        <el-form :label-position="left" label-width="80px">
          <el-form-item label="发起地址">
            <el-input v-model="form.from" :disabled="true" />
          </el-form-item>
          <el-form-item label="私钥">
            <el-input v-model="form.private_key" :disabled="true" />
          </el-form-item>
          <el-form-item label="公钥">
            <el-input v-model="form.public_key" :disabled="true" />
          </el-form-item>
          <el-form-item label="接收地址">
            <el-select v-model="form.to" placeholder="address" style="width: 100%">
              <el-option v-for="user in userList" :key="user" :label="user.address" :value="user.address" @click.native="choose(user)" />
            </el-select>
          </el-form-item>
          <el-form-item label="金额">
            <el-input v-model.number="form.value" />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="postTran">发起交易</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { getAllAccounts, postTran } from '@/api/ssbc'

export default {
  data() {
    return {
      userList: [],
      form: {
        private_key: 'MIICXQIBAAKBgQDimHHmdmFHmfqYIMV+xsvG6nFKd8PqU6ljlaV10eAdc8mTSsW9\n' +
          'keZ+uQFLYUlh45APPAiyRcInHhn2FzFtEO7XIxK+/0CqKEUzexGiXzeISVwuFLTo\n' +
          'CNlfzZwnRHnfr/jRY3MDZ1EZrQgRZGlqyTyxKPghqinzZEmGPNVX/uzn0QIDAQAB\n' +
          'AoGBAIyLc3I3kMUBe44qHXUxxqj9NwGyYUERXSoYYoU+hNyfubJzGU0olqeZBnWD\n' +
          'xSlDJVJdsSMp42+x2vZpkk2MyCZbWjnWcBVx6p1q4s4yM6umofwrJHfD4e+Y2Nl5\n' +
          '2DKr5NFv2u4rSbTQxUtB1hCAFL4UK56AQ7iMETE+MFSmKQPxAkEA5o+hIHiPBiBP\n' +
          'ccHCsKRj30d+G9bqbonCtSKeE9ewpVuy02jZ1mQ6MtMFWHO/eOSIr4OyBmoTq1lD\n' +
          'pnS21tTpJQJBAPuYzh+C2YD57MmFHwzvkegFQ+nS7qfls0JNUrwTWJMynwcQ7q+6\n' +
          'i+PFQreeA5iCcM4wBMds3RKG0FR60rrd0j0CQGji8lQJRFdvH3UKxn0BbAXJSk9z\n' +
          '59Y9iXxJsUwplUzEeIfAbUkg83DnmsjwbyyaGqxt5vEQFL6gryvscLkuxpkCQQCe\n' +
          'O3b/KGski4pZHyjtGMqZsp4Is4k2/Oalfz3WXRBq2v5bElIbIOaT5F7WXkGCrB7H\n' +
          '/jkzNws+eJ0TVH+t2I49AkBYk7gmoegdWqukH3NIOOWt1m4zwncrYxLNisWrONoh\n' +
          'NI1qD0cJGwp3DP7AYQTekQChv9RAyabCqxC0ri/Ukg6v',
        public_key: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDimHHmdmFHmfqYIMV+xsvG6nFK\n' +
          'd8PqU6ljlaV10eAdc8mTSsW9keZ+uQFLYUlh45APPAiyRcInHhn2FzFtEO7XIxK+\n' +
          '/0CqKEUzexGiXzeISVwuFLToCNlfzZwnRHnfr/jRY3MDZ1EZrQgRZGlqyTyxKPgh\n' +
          'qinzZEmGPNVX/uzn0QIDAQAB',
        from: '',
        to: '',
        contract: '',
        value: 100,
        method: '',
        dest: '',
        args: '{}',
        type: 0
      }
    }
  },
  created() {
    this.form.from = Cookies.get('AccountAddress')
    this.form.private_key = Cookies.get('PrivateKey')
    this.form.public_key = Cookies.get('PublicKey')
    this.getAllAccounts()
  },
  methods: {
    postTran() {
      console.log('haha')
      console.log(this.form)
      postTran(this.form).then(res => {
        if (res.Data === 'PostTranSuccess') {
          this.$message({
            message: '成功提交',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.Data,
            type: 'warning'
          })
        }
      })
    },
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
        this.userList = user
      })
    },
    // 下拉框选择元素时触发
    choose(item) {
      this.form.to = item.address
    }
  }
}
</script>
