<template>
  <div class="app-container">

    <el-row :gutter="0">
      <el-col :span="22" :offset="1" :xs="24">
        <el-form label-width="80px">
          <el-form-item label="发起地址">
            <el-input v-model="from" />
          </el-form-item>
          <el-form-item label="接收地址">
            <el-input v-model="to" />
          </el-form-item>
          <el-form-item label="金额">
            <el-input v-model="value" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="data" />
          </el-form-item>
          <el-button type="primary" @click="onSubmit">发起交易</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      from: '',
      to: '',
      data: '',
      value: ''
    }
  },
  mounted() {
  },
  methods: {
    onSubmit() {
      fetch(`http://localhost:3000/postTran`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: this.from,
          to: this.to,
          value: this.value,
          data: this.data
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
