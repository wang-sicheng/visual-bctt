<template>
  <el-form>
    <el-form-item></el-form-item>
    <el-form-item></el-form-item>
    <el-form-item></el-form-item>
    <el-form-item label="当前账户" label-width="25%">
      <el-col :span="12">
        <el-input v-model="currentUserInfo.AccountAddress" :disabled="true" />
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" icon="el-icon-document" @click="handleCopy(currentUserInfo.AccountAddress,$event)">
          复制
        </el-button>
      </el-col>
    </el-form-item>

    <el-form-item label="私钥" label-width="25%">
      <el-col :span="12">
        <el-input v-model="currentUserInfo.PrivateKey" :disabled="true" />
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" icon="el-icon-document" @click="handleCopy(currentUserInfo.PrivateKey,$event)">
          复制
        </el-button>
      </el-col>
    </el-form-item>
    <el-form-item label="公钥" label-width="25%">
      <el-col :span="12">
        <el-input v-model="currentUserInfo.PublicKey" :disabled="true" />
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" icon="el-icon-document" @click="handleCopy(currentUserInfo.PublicKey,$event)">
          复制
        </el-button>
      </el-col>
    </el-form-item>

    <el-form-item label="切换账户" label-width="25%">
      <el-col :span="12">
        <el-select v-model="currentUserInfo.AccountAddress" placeholder="address" style="width: 100%" class="filter-item">
          <el-option v-for="user in userList" :key="user" :label="user.address" :value="user.address" @click.native="choose(user)" />
        </el-select>
      </el-col>
      <el-col :span="15" />
    </el-form-item>
    <el-form-item>
      <el-row>
        <el-col :span="10" :offset="9">
          <el-button type="primary" style="alignment: center; width:30% " @click="registerAccount">注册新账户</el-button>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
import clip from '@/utils/clipboard'
import Cookies from 'js-cookie'
import { getAllAccounts, registerAccount } from '@/api/ssbc'

export default {
  data() {
    return {
      userList: [],
      currentUserInfo: {
        PrivateKey: '',
        PublicKey: '',
        AccountAddress: ''
      }
    }
  },
  created() {
    this.getAllAccounts()
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event)
    },
    registerAccount() {
      registerAccount()
        .then(res => {
          this.currentUserInfo = res.Data
          Cookies.set('PublicKey', this.currentUserInfo.PublicKey)
          Cookies.set('PrivateKey', this.currentUserInfo.PrivateKey)
          Cookies.set('AccountAddress', this.currentUserInfo.AccountAddress)
          this.$message({
            message: '注册成功',
            type: 'success'
          })
        })
        .then(() => {
          setTimeout(() => {
            this.getAllAccounts()
          }, 500)
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
        if (user.length === 0) {
          this.currentUserInfo.PrivateKey = ''
          this.currentUserInfo.PublicKey = ''
          this.currentUserInfo.AccountAddress = ''
          Cookies.set('PublicKey', '')
          Cookies.set('PrivateKey', '')
          Cookies.set('AccountAddress', '')
        } else {
          this.currentUserInfo.PrivateKey = Cookies.get('PrivateKey')
          this.currentUserInfo.PublicKey = Cookies.get('PublicKey')
          this.currentUserInfo.AccountAddress = Cookies.get('AccountAddress')
        }
      })
    },
    // 下拉框选择元素时触发
    choose(item) {
      this.currentUserInfo.AccountAddress = item.address
      this.currentUserInfo.PublicKey = item.publickey
      this.currentUserInfo.PrivateKey = item.privatekey

      Cookies.set('AccountAddress', item.address)
      Cookies.set('PublicKey', item.publickey)
      Cookies.set('PrivateKey', item.privatekey)
    }
  }
}
</script>
