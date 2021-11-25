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

    <el-row :gutter="0">
      <el-col :span="22" :offset="1" :xs="24">
        <el-form label-width="80px">
          <el-form-item label="账户地址">
            <el-input v-model="account_address" :disabled="true"/>
          </el-form-item>
          <el-form-item label="合约名称">
            <el-input v-model="name" />
          </el-form-item>
          <el-form-item label="编辑合约" />
          <codemirror v-model="code" :options="cmOption" />
          <el-form-item />
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
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

import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'

export default {
  components: {
    codemirror
  },
  data() {
    return {
      user: {},
      account_address: '',
      private_key: '',
      public_key: '',
      name: '',
      code: dedent`
        func sieve() {
          ch := make(chan int)
          go generate(ch)
          for {
            prime := <-ch
            fmt.Print(prime, "")
            ch1 := make(chan int)
            go filter(ch, ch1, prime)
            ch = ch1
          }
        }

        func main() {
          sieve()
        }
        `,
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
  computed: {
    ...mapGetters([
      'private_key',
      'public_key',
      'account_address'
    ])
  },
  mounted() {
    console.log('the current CodeMirror instance object:', this.codemirror)
  },
  created() {
    this.account_address = Cookies.get('AccountAddress')
    this.private_key = Cookies.get('PrivateKey')
    this.public_key = Cookies.get('PublicKey')
  },
  methods: {
    onSubmit() {
      fetch(`http://localhost:9999/postContract`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          account: this.account_address,
          private_key: this.private_key,
          public_key: this.user.public_key,
          name: this.name,
          code: this.code
        })
      })
        .then((res) => {
          return { data: res }
        })
        .then(response => {
          response.data.json().then((res) => {
            console.log('postContract:', res)
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

<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .editor-container{
    padding: 5px;
    position: static;
    height: 400px;
  }
  .CodeMirror-focused .cm-matchhighlight {
    background-position: bottom;
    background-repeat: repeat-x;
  }
  .cm-matchhighlight {
    background-color: lightgreen;
  }
  .CodeMirror-selection-highlight-scrollbar {
    background-color: green;
  }
</style>
