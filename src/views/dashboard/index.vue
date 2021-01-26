<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import regulatorDashboard from './regulator'
import normalDashboard from './normal'
export default {
  name: 'Dashboard',
  components: { regulatorDashboard, normalDashboard },
  data() {
    return {
      currentRole: 'regulatorDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('regulator')) {
      this.currentRole = 'normalDashboard'
    }
  }
}
</script>
