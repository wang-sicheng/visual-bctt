<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>个人中心</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello</div>
          {{ user.role }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">{{ user.role }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
<!--        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>token_address</span></div>-->
        <div class="user-bio-section-body">
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">{{ user.address }}</div>
<!--            <div class="text-addr">-->
<!--              {{ user.address }}-->
<!--            </div>-->
          </el-tooltip>
        </div>
      </div>

      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>简介</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            现代服务可信交易平台
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>进度</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>项目构建与标准化</span>
            <el-progress :percentage="100" status="success" />
            <br>
          </div>
          <div class="progress-item">
            <span>登录、角色控制</span>
            <el-progress :percentage="100" status="success" />
            <br>
          </div>
          <div class="progress-item">
            <span>行业信用指标可视化</span>
            <el-progress :percentage="90" />
            <br>
          </div>
          <div class="progress-item">
            <span>交易记录表展示</span>
            <el-progress :percentage="90" />
            <br>
          </div>
          <div class="progress-item">
            <span>交易、区块、地址信息展示</span>
            <el-progress :percentage="90" />
            <br>
          </div>
          <div class="progress-item">
            <span>智能合约编辑</span>
            <el-progress :percentage="100" status="success" />
            <br>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          role: '',
          address: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-item {
  margin-left: 10%;
  margin-right:10%;
}
.box-center {
  margin: 0 auto;
  display: table;
}
.text-muted {
  color: #777;
}
.text-center {
  text-align: center;
}
.text-addr {
  font-size: 12px;
}
.user-profile {
  .user-name {
    font-weight: bold;
  }
  .box-center {
    padding-top: 10px;
  }
  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }
  .box-social {
    padding-top: 30px;
    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }
  .user-follow {
    padding-top: 20px;
  }
}
.user-bio {
  margin-top: 20px;
  color: #606266;
  span {
    padding-left: 4px;
  }
  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;
    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
