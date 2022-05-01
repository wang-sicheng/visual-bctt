<template>
  <div class="app-container">

    <el-row :gutter="0">
      <el-col :span="22" :offset="1" :xs="24">
        <el-form label-width="80px">
          <el-form-item label="发起地址">
            <el-select v-model="form.from" style="width: 100%" class="filter-item">
              <el-option v-for="user in userList" :key="user.address" :label="user.address" :value="user.address" @click.native="chooseSender(user)" />
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
              <el-option v-for="contract in contractList" :key="contract.data.contractname" :label="contract.data.contractname + ' ( ' + contract.address + ' )'" :value="contract.data.contractname" @click.native="chooseContract(contract)" />
            </el-select>
          </el-form-item>
          <el-form-item label="方法">
            <el-select v-model="form.method" style="width: 100%">
              <el-option v-for="method in methodList" :key="method" :label="method" :value="method" @click.native="chooseMethod(method)" />
            </el-select>
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
      methodList: [],
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
      this.initWebSocket() // 调用合约时建立Websocket连接
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
    chooseContract(item) {
      this.form.contract = item.data.contractname
      this.form.to = item.address
      this.methodList = []
      var allMethods = item.data.methods
      for (let i = 0; i < allMethods.length; i++) {
        if (allMethods[i][0] <= 'Z' && allMethods[i][0] >= 'A') {
          this.methodList.push(allMethods[i])
        }
      }
      if (this.methodList.length > 0) {
        this.form.method = this.methodList[0]
      }
    },
    // 下拉框选择元素时触发
    chooseMethod(item) {
      this.form.method = item
    },
    chooseSender(item) {
      this.form.from = item.address
      this.form.public_key = item.publickey
      this.form.private_key = item.privatekey

      Cookies.set('AccountAddress', item.address)
      Cookies.set('PublicKey', item.publickey)
      Cookies.set('PrivateKey', item.privatekey)
    },

    // 初始化websocket
    initWebSocket() {
      if (typeof (WebSocket) === 'undefined') {
        this.$notify({
          title: '提示',
          message: '当前浏览器无法接收实时报警信息，请使用谷歌浏览器！',
          type: 'warning',
          duration: 0
        })
      } else {
        var sourceChain = Cookies.get('SourceChain')
        var wsurl
        if (sourceChain === 'ssbc1') {
          wsurl = 'ws://localhost:8009/getLog'
        } else if (sourceChain === 'ssbc2') {
          wsurl = 'ws://localhost:8011/getLog'
        }
        // 实例化 WebSocket
        this.websock = new WebSocket(wsurl)
        // 监听 WebSocket 连接
        this.websock.onopen = this.onopen
        // 监听 WebSocket 错误信息
        this.websock.onerror = this.onerror
        // 监听 WebSocket 消息
        this.websock.onmessage = this.onmessage

        this.websock.onclose = this.onclose
      }
    },
    // 连接建立之后执行send方法发送数据
    onopen() {
      console.log('socket连接成功')
    },
    // 连接建立失败重连
    onerror() {
      console.log('连接错误')
      this.initWebSocket()
    },
    // 数据接收
    onmessage(e) {
      // const resdata = JSON.parse(e.data)
      console.log(e.data)
      this.$notify({
        title: 'Info',
        message: e.data
      })
    },
    // 关闭
    onclose(e) {
      console.log('WebSocket 断开连接', e)
    }
  }
}
</script>
