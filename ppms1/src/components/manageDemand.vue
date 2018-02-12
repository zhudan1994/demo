<template>
	<div>
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/checkingList' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>发布计划管理</el-breadcrumb-item>
		  <el-breadcrumb-item>{{ $route.query.planName }}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-tabs type="card" style="margin-top:20px">
		  <el-tab-pane>
		    <span slot="label"><i class="el-icon-menu"></i> 需求列表</span>
		    <manage-detail></manage-detail>
		  </el-tab-pane>
		  <el-tab-pane>
		  	 <span slot="label"><i class="el-icon-date"></i> 发布计划</span>
		  	 发布计划
		  </el-tab-pane>
		  <el-tab-pane>
		    <span slot="label"><i class="el-icon-refresh"></i> 回滚计划</span>
		    回滚计划
		  </el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
    import manageDetail from '@/components/manageDetail'
    import {getPlanDetail} from '@/api/index'
	export default {
		data () {
			return {
				
			}
		},
		components: {
           manageDetail
		}
	}
</script>
<style scoped>
	
</style>