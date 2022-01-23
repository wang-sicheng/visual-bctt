<template>
  <div class="app-container">

    <el-row :gutter="0">
      <el-col :span="22" :offset="1" :xs="24">
        <el-form :label-position="left" label-width="80px">

          <el-form-item label="源链">
            <el-input v-model="form.source_chain" :disabled="true" />
          </el-form-item>

          <el-form-item label="发起地址">
            <el-select v-model="form.from" style="width: 100%" class="filter-item">
              <el-option v-for="user in userList1" :key="user" :label="user.address" :value="user.address" @click.native="chooseSender(user)" />
            </el-select>
          </el-form-item>

          <el-form-item label="私钥">
            <el-input v-model="form.private_key" :disabled="true" />
          </el-form-item>
          <el-form-item label="公钥">
            <el-input v-model="form.public_key" :disabled="true" />
          </el-form-item>

          <el-form-item label="目标链">
            <el-input v-model="form.dest_chain" :disabled="true" />
          </el-form-item>

          <el-form-item label="接收地址">
            <el-select v-model="form.to" style="width: 100%">
              <el-option v-for="user in userList2" :key="user" :label="user.address" :value="user.address" @click.native="chooseReceiver(user)" />
            </el-select>
          </el-form-item>
          <el-form-item label="金额">
            <el-input v-model.number="form.value" />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="postCrossTran">发起交易</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { query, postCrossTran } from '@/api/ssbc'

export default {
  data() {
    return {
      q: {
        type: 'getAllAccounts',
        parameters: []
      },
      userList1: [],
      userList2: [],
      form: {
        source_chain: '',
        dest_chain: '',
        private_key: '',
        public_key: '',
        from: '',
        to: '',
        contract: '',
        value: 100,
        method: '',
        args: '{}',
        type: 4 // 跨链转账
      }
    }
  },
  created() {
    this.form.source_chain = Cookies.get('SourceChain')
    if (this.form.source_chain === 'ssbc1') {
      this.form.dest_chain = 'ssbc2'
    } else if (this.form.source_chain === 'ssbc2') {
      this.form.dest_chain = 'ssbc1'
    }
    this.init()
  },
  methods: {
    async init() {
      await this.getSourceAccounts()
      Cookies.set('SourceChain', this.form.dest_chain)
      await this.getDestAccounts()
      Cookies.set('SourceChain', this.form.source_chain)
    },
    postCrossTran() {
      console.log('haha')
      console.log(this.form)
      postCrossTran(this.form).then(res => {
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
    getSourceAccounts() {
      query(this.q).then(res => {
        const user = []
        const total = res.data
        total.forEach(function(r) {
          if (!r.iscontract) {
            user.push(r)
          }
        })
        this.userList1 = user
        if (user.length === 0) {
          this.form.from = ''
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
    getDestAccounts() {
      query(this.q).then(res => {
        const user = []
        const total = res.data
        total.forEach(function(r) {
          if (!r.iscontract) {
            user.push(r)
          }
        })
        this.userList2 = user
      })
    },
    chooseSender(item) {
      this.form.from = item.address
      this.form.public_key = item.publickey
      this.form.private_key = item.privatekey

      Cookies.set('AccountAddress', item.address)
      Cookies.set('PublicKey', item.publickey)
      Cookies.set('PrivateKey', item.privatekey)
    },
    chooseReceiver(item) {
      this.form.to = item.address
    }
  }
}
</script>
