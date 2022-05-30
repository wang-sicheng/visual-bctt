<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="10">
        <el-col :span="24">
          <user-card :user="user" />
        </el-col>

<!--        <el-col :span="18" :xs="24">-->
<!--          <el-card>-->
<!--            <el-tabs v-model="activeTab">-->
<!--              <el-tab-pane label="Register" name="register">-->
<!--                <register :user="user" />-->
<!--              </el-tab-pane>-->
<!--              <el-tab-pane label="Account" name="account">-->
<!--                <account :user="user" />-->
<!--              </el-tab-pane>-->
<!--            </el-tabs>-->
<!--          </el-card>-->
<!--        </el-col>-->

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
export default {
  name: 'Profile',
  components: {
    UserCard
  },
  data() {
    return {
      user: {},
      activeTab: 'register'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'address',
      'email',
      'private_key',
      'public_key',
      'account_address'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: this.email,
        avatar: this.avatar,
        address: this.address,
        private_key: this.private_key,
        public_key: this.public_key,
        account_address: this.account_address
      }
    }
  }
}
</script>
