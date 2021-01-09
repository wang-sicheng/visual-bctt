<template>
  <div style="padding:30px;">
    <el-alert v-if="checkPermission(['admin'])" label="Admin" :closable="false" title="menu 2" />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  methods: {
    checkPermission
  }
}
</script>
