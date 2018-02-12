<template>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <aside-menu></aside-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
  </el-container>

</template>

<script>
import {getSetting,manageList} from '@/api/index'
import AsideMenu from '@/components/aside'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
     AsideMenu
  },
  created () {
    // manageList({}).then(res => {
    //   console.log(res)
    // })
      // getSetting('zhudan').then((res) => {
      //   console.log(res)
      // })
      // checkingList({}).then((res) => {
      //   console.log(res)
      // })
      // releasedList({}).then((res) => {
      //    console.log(res)
      // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-container {
    height: 100%;
  }
  .el-header{
    background-color: #20a0ff;
    color: #fff;
  }
  
  .el-aside {
    background-color: #eef1f6;
    color: #48576a;
  }
  
  .el-main {
    background-color: #fff;
    color: #48576a;
  }
</style>
