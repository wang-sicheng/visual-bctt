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
          <el-button type="primary" style="alignment: center; width:30% " @click="submit">注册新账户</el-button>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
import clip from '@/utils/clipboard'
import Cookies from 'js-cookie'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          PrivateKey: '',
          PublicKey: '',
          AccountAddress: ''
        }
      }
    }
  },
  data() {
    return {
      userList: [],
      currentUserInfo: {
        PrivateKey: '',
        PublicKey: '',
        AccountAddress: ''
      },
      resultSeen: true
    }
  },
  created() {
    this.currentUserInfo.PrivateKey = Cookies.get('PrivateKey')
    this.currentUserInfo.PublicKey = Cookies.get('PublicKey')
    this.currentUserInfo.AccountAddress = Cookies.get('AccountAddress')
    this.fetchData()
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event)
    },
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
            this.currentUserInfo = res.Data
            Cookies.set('PublicKey', this.currentUserInfo.PublicKey)
            Cookies.set('PrivateKey', this.currentUserInfo.PrivateKey)
            Cookies.set('AccountAddress', this.currentUserInfo.AccountAddress)
            this.$store.dispatch('user/register', this.currentUserInfo)
          })
          this.$message({
            message: '注册成功',
            type: 'success'
          })
        })
        .then(() => {
          setTimeout(() => {
            this.fetchData()
          }, 500)
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
    },
    fetchData() {
      fetch('http://localhost:9999/getAllAccounts', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      }).then((res) => { return { data: res } })
        .then(response => {
          response.data.json().then((res) => {
            // 筛选出普通账户和智能合约账户
            var user = []
            var contract = []
            var total = res.Data
            total.forEach(function(r) {
              if (!r.iscontract) {
                user.push(r)
              } else {
                contract.push(r)
              }
            })
            this.userList = user
          })
        })
    }
  }
}
</script>
