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
          <el-form-item label="账户地址">
            <el-input v-model="form.account" :disabled="true"/>
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
          <el-form-item label="编辑合约" />
          <codemirror v-model="form.code" :options="cmOption" />
          <el-form-item />
          <el-button type="primary" @click="postContract">创建合约</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dedent from 'dedent'
import { codemirror } from 'vue-codemirror'
// language
// import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/go/go.js'
// theme css
import 'codemirror/theme/monokai.css'

import Cookies from 'js-cookie'
import { postContract } from '@/api/ssbc'

export default {
  components: {
    codemirror
  },
  data() {
    return {
      form: {
        account: '',
        private_key: '',
        public_key: '',
        name: '',
        type: 2,
        code: dedent`
package main

import (
	"math/rand"
	"time"
)

func random(args map[string]string) (interface{}, error) {
	rand.Seed(time.Now().Unix())
	return rand.Intn(100), nil
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
      }
    }
  },
  created() {
    this.form.account = Cookies.get('AccountAddress')
    this.form.private_key = Cookies.get('PrivateKey')
    this.form.public_key = Cookies.get('PublicKey')
  },
  methods: {
    postContract() {
      postContract(this.form).then(res => {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      })
    }
  }
}
</script>
