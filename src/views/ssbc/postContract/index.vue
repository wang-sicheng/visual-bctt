<template>
  <div class="app-container">
    <el-row :gutter="1">
      <el-col :span="22" :offset="1">
        <el-alert
          title="智能合约编辑与上传"
          type="info"
          description="请使用Go语言编写"
          show-icon
        />
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="0">
      <el-col :span="22" :offset="1" :xs="24">
        <el-form label-width="80px">

          <el-form-item label="发起地址">
            <el-select v-model="form.account" style="width: 100%" class="filter-item">
              <el-option v-for="user in userList" :key="user.address" :label="user.address" :value="user.address" @click.native="chooseSender(user)" />
            </el-select>
          </el-form-item>
          <el-form-item label="私钥">
            <el-input v-model="form.private_key" :disabled="true" />
          </el-form-item>
          <el-form-item label="公钥">
            <el-input v-model="form.public_key" :disabled="true" />
          </el-form-item>
          <el-form-item label="合约名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="本体模型">
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">非必选项，上传本体模型，生成智能合约框架代码</template>
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary" >点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">*上传文件应为OWL和XML格式文件</div>
                </el-upload>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item label="编辑合约" />
          <codemirror v-model="form.code" :options="cmOption" />
          <el-form-item />
          <el-button type="primary" :disabled="disable" @click="postContract">创建合约</el-button>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog
      title="错误信息"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <span style="white-space: pre-wrap;" v-html="this.errMsg">{{ errMsg }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import dedent from 'dedent'
import { codemirror } from 'vue-codemirror'
// language
// import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/go/go.js'
import AnsiUp from 'ansi_up'
// theme css
import 'codemirror/theme/monokai.css'

import Cookies from 'js-cookie'
import { query, postContract } from '@/api/ssbc'

export default {
  components: {
    codemirror
  },
  data() {
    return {
      errMsg: '',
      dialogVisible: false,
      q: {
        type: 'getAllAccounts',
        parameters: []
      },
      userList: [],
      form: {
        account: '',
        private_key: '',
        public_key: '',
        name: '',
        type: 2,
        code: dedent`
package main

var A int
var B string
var invisible string

func init() {
	A = 0
	B = "init"
	invisible = "init"
}

func Add(args map[string]interface{}) (interface{}, error) {
	A += 1
	B = "Add"
	invisible = "Add"
	return nil, nil
}

func Subtract(args map[string]interface{}) (interface{}, error) {
	A -= 1
	B = "Subtract"
	invisible = "Subtract"
	return nil, nil
}
        `
      },
      user: {},
      cmOption: {
        tabSize: 4,
        lineNumbers: true,
        line: true,
        mode: 'text/x-go',
        matchBrackets: true,
        theme: 'monokai'
      },
      disable: false,
      fileList: []
    }
  },
  created() {
    this.getAllAccounts()
  },
  methods: {
    postContract() {
      this.disable = true
      setTimeout(() => {
        this.disable = false
      }, 4000)
      postContract(this.form).then(res => {
        if (res.error === '') {
          this.$message({
            message: '成功提交',
            type: 'success'
          })
        } else {
          var msg = res.error.replace(/\n/g, '\r\n')
          var ansi_up = new AnsiUp()
          this.errMsg = ansi_up.ansi_to_html(msg)
          console.log(this.errMsg)
          this.dialogVisible = true
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
        this.userList = user
        if (user.length === 0) {
          this.form.account = ''
          this.form.private_key = ''
          this.form.public_key = ''
          Cookies.set('PublicKey', '')
          Cookies.set('PrivateKey', '')
          Cookies.set('AccountAddress', '')
        } else {
          this.form.account = Cookies.get('AccountAddress')
          this.form.private_key = Cookies.get('PrivateKey')
          this.form.public_key = Cookies.get('PublicKey')
        }
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
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}?`)
    }
  }
}
</script>
