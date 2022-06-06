<template>
  <div class="app-container">
    <el-row :gutter="1">
      <el-col :span="22" :offset="1">
        <el-alert
          title="智能合约编辑与上传"
          type="info"
          description="请使用Go语言编写（推荐使用Go语言1.16.3以下版本编写）"
          show-icon
        />
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="0">
      <el-col :span="22" :offset="1" :xs="24">
        <el-form label-width="80px">

          <el-form-item label="发起地址">
            <el-select v-model="form.account" style="width: 100%" class="filter-item" filterable>
              <el-option
                v-for="user in userList"
                :key="user.address"
                :label="user.address"
                :value="user.address"
                @click.native="chooseSender(user)"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="私钥">
            <el-input v-model="form.private_key" :disabled="true" />
          </el-form-item>
          <el-form-item label="公钥">
            <el-input v-model="form.public_key" :disabled="true" />
          </el-form-item>
          <el-form-item label="合约名称">
            <el-input v-model="form.name" oninput="this.value=this.value.replace(/[^[a-z0-9A-Z]/g,'')" @input="lengthRestriction" />
          </el-form-item>
          <el-form-item label="合约生成">
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">非必选项，上传模型，生成智能合约框架代码</template>
                <el-form-item label="本体模型">
                  <!--todo 上传地址应拼接-->
                  <el-upload
                    class="upload"
                    name="ontology"
                    action="http://localhost:8011/modelUpload"
                    accept=".owl"
                    :limit="1"
                    :on-exeed="handleExceed"
                    :file-list="fileList"
                  >
                    <el-button type="primary" size="small">点击上传</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item label="bpmn模型">
                  <!--todo 上传地址应拼接-->
                  <el-upload
                    name="bpmn"
                    action="http://127.0.0.1:8011/modelUpload"
                    accept=".xml"
                    :limit="1"
                    :on-exeed="handleExceed"
                    :file-list="fileList"
                  >
                    <el-button type="primary" size="small">点击上传</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item label=" ">
                  <el-button type="primary" size="small" @click="codeGen">生成代码</el-button>
                </el-form-item>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <codemirror v-model="form.code" :options="cmOption" />
          <el-form-item />
          <el-button type="primary" :disabled="disable" @click="postContract">发布合约</el-button>
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
        <el-button type="primary" @click.native="dialogVisible = false">确 定</el-button>
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
import { query, postContract, genCode } from '@/api/ssbc'

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
        code: dedent('package main\n' +
          '\n' +
          'var A int\n' +
          'var B string\n' +
          'var invisible string\n' +
          '\n' +
          'func init() {\n' +
          '\tA = 0\n' +
          '\tB = "init"\n' +
          '\tinvisible = "init"\n' +
          '}\n' +
          '\n' +
          'func Add(args map[string]interface{}) (interface{}, error) {\n' +
          '\tA += 1\n' +
          '\tB = "Add"\n' +
          '\tinvisible = "Add"\n' +
          '\treturn nil, nil\n' +
          '}\n' +
          '\n' +
          'func Subtract(args map[string]interface{}) (interface{}, error) {\n' +
          '\tA -= 1\n' +
          '\tB = "Subtract"\n' +
          '\tinvisible = "Subtract"\n' +
          '\treturn nil, nil\n' +
          '}')
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
    lengthRestriction() {
      // 限制长度
      if (this.form.name.length > 64) {
        this.form.name = this.form.name.slice(0, 64)
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    codeGen() {
      genCode().then(res => {
        console.log(res)
        this.form.code = dedent(res.data)
      })
      console.log('执行codeGen')
    }
  }
}
</script>
