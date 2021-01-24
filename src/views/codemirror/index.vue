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
          <el-form-item label="上传地址">
            <el-input v-model="address" placeholder="请输入上传地址" />
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
import 'codemirror/mode/javascript/javascript.js'
// theme css
import 'codemirror/theme/monokai.css'

export default {
  components: {
    codemirror
  },
  data() {
    return {
      address: '',
      code: dedent`
          contract SimpleDemo {
            uint data;
            function set(uint n) public {
              data = n*3;
            }
            function get() public returns (uint) {
              return data;
            }
          }
        `,
      cmOption: {
        tabSize: 2,
        lineNumbers: true,
        line: true,
        mode: 'text/javascript',
        matchBrackets: true,
        theme: 'monokai'
      }
    }
  },
  mounted() {
    console.log('the current CodeMirror instance object:', this.codemirror)
  },
  methods: {
    onSubmit() {
      this.$message({
        message: '上传成功',
        type: 'success'
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
