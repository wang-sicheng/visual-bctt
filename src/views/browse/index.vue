<template>
  <div class="app-container">

    <el-row :gutter="10">
      <el-col v-for="(o) in 3" :key="o" :span="5" :offset="0.5">
        <el-card :body-style="{ padding: '0px' }">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;">
            <span>汉堡</span>
            <div class="bottom clearfix">
              <time class="time">生产日期：{{ currentDate }}</time>
              <el-button type="text" class="button">购买</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString()
    }
  }
}
</script>

<style>
  .time {
    font-size: 14px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
    padding: 3px;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
