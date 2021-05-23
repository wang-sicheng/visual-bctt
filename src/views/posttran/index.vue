<template>
  <div class="app-container">

    <el-row :gutter="0">
      <el-col :span="22" :offset="1" :xs="24">
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="发起地址">
            <el-input v-model="user.account_address" />
          </el-form-item>
          <el-form-item label="接收地址">
            <el-input v-model="to" />
          </el-form-item>
          <el-form-item label="私钥">
            <el-input v-model="user.private_key" />
          </el-form-item>
          <el-form-item label="公钥">
            <el-input v-model="user.public_key" />
          </el-form-item>
          <el-form-item label="金额">
            <el-input v-model="value" />
          </el-form-item>
          <el-form-item label="合约">
            <el-input v-model="contract" />
          </el-form-item>
          <el-form-item label="方法">
            <el-input v-model="method" />
          </el-form-item>
          <el-form-item label="dest">
            <el-input v-model="dest" />
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="args" class="demo-form-inline">
          <el-form-item label="合约参数：" />
          <el-form-item label="name">
            <el-input v-model="args.name" />
          </el-form-item>
          <el-form-item label="year">
            <el-input v-model="args.year" />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="onSubmit">发起交易</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      labelPosition: 'left',
      user: {},
      to: '',
      contract: '',
      value: '',
      method: '',
      dest: '',
      args: {
        name: '',
        year: ''
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
  created() {
    this.getParams()
  },
  methods: {
    onSubmit() {
      fetch(`http://localhost:9999/postTran`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: this.user.account_address,
          private_key: this.user.private_key,
          public_key: this.user.public_key,
          to: this.to,
          contract: this.contract,
          value: this.value,
          method: this.method,
          dest: this.dest,
          args: this.args
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
            message: '发起成功',
            type: 'success'
          })
        })
    },
    getParams() {
      this.user = {
        private_key: this.private_key,
        public_key: this.public_key,
        account_address: this.account_address
      }
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
