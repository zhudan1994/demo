<template>
  <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#eef1f6"
        text-color="#48576a"
        active-text-color="#20a0ff">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>个人中心</span>
          </template>
          <el-menu-item  index="1-1" @click="handleSelect('/checkingList')">我的待验证需求</el-menu-item>
          <el-menu-item  index="1-2" @click="handleSelect('/releasedList')">我的已验证需求</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" @click="handleSelect('/manageList')">
          <i class="el-icon-menu"></i>
          <span slot="title">发布计划管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    methods: {
      handleSelect(path, query) {
        this.$router.push({path: path})
      }
    }
  }
</script>
<style scoped>
.el-submenu .el-menu-item {
  background-color: #eee !important;
}
</style>