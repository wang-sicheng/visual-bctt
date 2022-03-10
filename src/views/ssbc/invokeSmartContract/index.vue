<template>
  <div class="app-container">

    <el-row :gutter="0">
      <el-col :span="22" :offset="1" :xs="24">
        <el-form :label-position="left" label-width="80px">
          <el-form-item label="发起地址">
            <el-select v-model="form.from" style="width: 100%" class="filter-item">
              <el-option v-for="user in userList" :key="user" :label="user.address" :value="user.address" @click.native="chooseSender(user)" />
            </el-select>
          </el-form-item>

          <el-form-item label="私钥">
            <el-input v-model="form.private_key" :disabled="true" />
          </el-form-item>
          <el-form-item label="公钥">
            <el-input v-model="form.public_key" :disabled="true" />
          </el-form-item>
          <el-form-item label="转账金额">
            <el-input v-model.number="form.value" />
          </el-form-item>
          <el-form-item label="合约名称">
            <el-select v-model="form.contract" style="width: 100%">
              <el-option v-for="contract in contractList" :key="contract.data.contractname" :label="contract.data.contractname + ' ( ' + contract.address + ' )'" :value="contract.data.contractname" @click.native="choose(contract)" />
            </el-select>
          </el-form-item>
          <el-form-item label="方法">
            <el-input v-model="form.method" />
          </el-form-item>
          <el-form-item label="参数">
            <el-input v-model="form.args" />
          </el-form-item>
        </el-form>
        <el-button type="primary" :disabled="disable" @click="invokeContract">调用合约</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { query, postTran } from '@/api/ssbc'

export default {
  data() {
    return {
      q: {
        type: 'getAllAccounts',
        parameters: []
      },
      contractList: [],
      userList: [],
      form: {
        private_key: '',
        public_key: '',
        from: '',
        to: '',
        contract: '',
        value: 0,
        method: '',
        dest: '',
        args: '{}',
        type: 3
      },
      disable: false
    }
  },
  created() {
    this.getAllAccounts()
  },
  methods: {
    invokeContract() {
      this.disable = true
      setTimeout(() => {
        this.disable = false
      }, 1000)
      postTran(this.form).then(res => {
        if (res.error === '') {
          this.$message({
            message: '成功提交',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.error,
            type: 'warning'
          })
        }
      })
    },
    getAllAccounts() {
      query(this.q).then(res => {
        // 筛选出普通账户和智能合约账户
        const user = []
        const contract = []
        const total = res.data
        total.forEach(function(r) {
          if (!r.iscontract) {
            user.push(r)
          } else {
            contract.push(r)
          }
        })
        this.contractList = contract
        this.userList = user

        if (user.length === 0) {
          this.form.account = ''
          this.form.private_key = ''
          this.form.public_key = ''
          Cookies.set('PublicKey', '')
          Cookies.set('PrivateKey', '')
          Cookies.set('AccountAddress', '')
        } else {
          this.form.from = Cookies.get('AccountAddress')
          this.form.private_key = Cookies.get('PrivateKey')
          this.form.public_key = Cookies.get('PublicKey')
        }
      })
    },
    // 下拉框选择元素时触发
    choose(item) {
      this.form.contract = item.data.contractname
      this.form.to = item.address
    },
    chooseSender(item) {
      this.form.from = item.address
      this.form.public_key = item.publickey
      this.form.private_key = item.privatekey

      Cookies.set('AccountAddress', item.address)
      Cookies.set('PublicKey', item.publickey)
      Cookies.set('PrivateKey', item.privatekey)
    }
  }
}
</script>
