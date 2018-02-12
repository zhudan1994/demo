<template>
	<div>
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/checkingList' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>个人中心</el-breadcrumb-item>
		  <el-breadcrumb-item>我的已验证需求</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row>
		  <el-col :span="24">
		  	<div class="grid-content bg-purple-light">
		  		<el-form :inline="true" class="demo-form-inline">
				  <el-form-item>
				    <el-input v-model="query" placeholder="需求名称"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="onSubmit">查询</el-button>
				  </el-form-item>
				</el-form>
		  	</div>
		  </el-col>
		</el-row>
		<el-table
		    v-loading="loading"
		    :data="demands"
		    border
		    style="width: 100%;margin-top: 20px">
		    <el-table-column
		      label="序号"
		      width="50">
		      <template slot-scope="scope">
		        <span>{{ scope.$index + 1 }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="需求名称"
		      width="180">
		      <template slot-scope="scope">
		          <span><a :href="'http://redmine.guahao-inc.com/issues/' + scope.row.demandCode" target="_blank">{{ scope.row.demandName }}</a></span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="提交时间"
		      width="180">
		      <template slot-scope="scope">
		          <span>{{ scope.row.gmtCreated.split('T')[0] }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="涉及应用"
		      width="180">
		      <template slot-scope="scope">
		          <p v-for="dynamic in scope.row.dynamicField">{{ dynamic.appName }}</p>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="分支名"
		      width="180">
		      <template slot-scope="scope">
		          <p v-for="dynamic in scope.row.dynamicField">{{ dynamic.branch }}</p>
		      </template>
		    </el-table-column>
		  </el-table>
		  <el-pagination
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-size="pageSize"
		      layout="total, prev, pager, next, jumper"
		      :total="total">
	      </el-pagination>
	</div>
</template>
<script>
    import {releasedList} from '@/api/index'
    import { demandMixin } from '@/public/js/mixins'
    import Vue from 'vue'
    export default {
    	mixins: [demandMixin],
    	data () {
            return {
            	loading: false
            }
    	},
	    methods: {
	    	onSubmit() {
			      this.getReleasedList();
		    },
			handleCurrentChange(page) {
			     this.currentPage = page;
			     this.getReleasedList();
			},
		    getReleasedList () {
	            let vm = this;
		        releasedList({pageSize: vm.pageSize, pageIndex: vm.currentPage, query: vm.query}).then((res) => {
			        res = res.data;
			        if (!res.hasError && res.data.length) {
			        	vm.demands = res.data;
			        	vm.total = res.count;
			        } else {
			        	vm.demands = [];
			        	vm.total = 0;
			        }
			        setTimeout(() => {
                       vm.loading = false;
			        }, 1000)
			    })
		    }
	    },
	    mounted () {
            this.getReleasedList();
	    }
	}
</script>
<style scoped>
</style>