<template>
  <el-form>
    <el-form-item></el-form-item>
    <el-form-item></el-form-item>
    <el-form-item></el-form-item>
    <el-form-item>
      <el-row>
        <el-col :span="10" :offset="9">
          <el-button type="primary" style="alignment: center; width:30% " @click="submit">Register</el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item v-if="resultSeen" label="Private Key" label-width="25%">
      <el-col :span="14">
        <el-input v-model="registerInfo.PrivateKey" :disabled="true" />
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-document" @click="handleCopy(registerInfo.PrivateKey,$event)">
          copy
        </el-button>
      </el-col>
    </el-form-item>
    <el-form-item v-if="resultSeen" label="Public Key" label-width="25%">
      <el-col :span="14">
        <el-input v-model="registerInfo.PublicKey" :disabled="true" />
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-document" @click="handleCopy(registerInfo.PublicKey,$event)">
          copy
        </el-button>
      </el-col>
    </el-form-item>
    <el-form-item v-if="resultSeen" label="Account Address" label-width="25%">
      <el-col :span="14">
        <el-input v-model="registerInfo.AccountAddress" :disabled="true" />
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-document" @click="handleCopy(registerInfo.AccountAddress,$event)">
          copy
        </el-button>
      </el-col>
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
      registerInfo: {
        PrivateKey: '',
        PublicKey: '',
        AccountAddress: ''
      },
      resultSeen: true
    }
  },
  created() {
    this.registerInfo.PrivateKey = Cookies.get('PrivateKey')
    this.registerInfo.PublicKey = Cookies.get('PublicKey')
    this.registerInfo.AccountAddress = Cookies.get('AccountAddress')
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
            this.registerInfo = res.Data
            Cookies.set('PublicKey', this.registerInfo.PublicKey)
            Cookies.set('PrivateKey', this.registerInfo.PrivateKey)
            Cookies.set('AccountAddress', this.registerInfo.AccountAddress)
            this.$store.dispatch('user/register', this.registerInfo)
          })
          this.$message({
            message: '注册成功',
            type: 'success'
          })
        })
    }
  }
}
</script>
