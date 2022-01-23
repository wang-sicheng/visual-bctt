<template>
  <el-form>
    <el-form-item label="Private Key">
      <el-input v-model.trim="registerInfo.private_key" :disabled="true" />
    </el-form-item>
    <el-form-item label="Public Key">
      <el-input v-model.trim="registerInfo.public_key" :disabled="true" />
    </el-form-item>
    <el-form-item label="Account Address">
      <el-input v-model.trim="registerInfo.account_address" :disabled="true" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Register</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          private_key: '',
          public_key: '',
          account_address: ''
        }
      }
    }
  },
  data() {
    return {
      registerInfo: {
        private_key: '',
        public_key: '',
        account_address: ''
      }
    }
  },
  created() {
    this.registerInfo = this.user
  },
  methods: {
    submit() {
      fetch(`http://localhost:9999/registerAccount`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          return { data: res }
        })
        .then(response => {
          response.data.json().then((res) => {
            this.registerInfo = res.data
            // console.log('registerAccount2:', this.registerInfo)
            this.$store.dispatch('user/register', this.registerInfo)
          })
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        })
    }
  }
}
</script>
