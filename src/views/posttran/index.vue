<template>
  <div class="app-container">

    <el-row :gutter="0">
      <el-col :span="22" :offset="1" :xs="24">
        <el-form :label-position="left" label-width="80px">
          <el-form-item label="发起地址">
            <el-input v-model="form.from" :disabled="true" />
          </el-form-item>
          <el-form-item label="接收地址">
            <el-input v-model="form.to" />
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
import { postTran } from '@/api/ssbc'

export default {
  data() {
    return {
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
        args: '{}'
      }
    }
  },
  created() {
    this.form.from = Cookies.get('AccountAddress')
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
    }
  }
}
</script>
