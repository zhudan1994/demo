<template>
	<div>
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/checkingList' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>个人中心</el-breadcrumb-item>
		  <el-breadcrumb-item>我的未验证需求</el-breadcrumb-item>
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
		 <demand-list :demands="demands" ref="demandList"></demand-list>
		  <el-pagination
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-size="pageSize"
		      layout="total,prev, pager, next, jumper"
		      :total="total">
	      </el-pagination>
	</div>
</template>
<script>
    import {checkingList,releasedList} from '@/api/index'
    import { demandMixin } from '@/public/js/mixins'
    import demandList from '@/common/demandList'
    import Vue from 'vue'
    export default {
	    mixins: [demandMixin],
	    components: {
           demandList
	    },
	    methods: {
			  onSubmit() {
			      this.getCheckingList();
			  },
			  handleCurrentChange(page) {
			      this.currentPage = page;
			      this.getCheckingList();
			  },
		      getCheckingList () {
	            let vm = this;
	            let demandList = vm.$refs.demandList;
	            demandList.loading = true;
		        checkingList({pageSize: vm.pageSize, pageIndex: vm.currentPage, query: vm.query}).then((res) => {
			        res = res.data;
			        if (!res.hasError && res.data.length) {
			        	res.data.forEach(item => {
			        		item.switchPre = item.isChecked == 1? {checked: true, active: '已验', inactive: '  ', disabled: true}:{checked:false, active: '', inactive:'预发', disabled: false}
			        		item.switchOnline = item.isChecked == 0? {checked: false, active: '', inactive: '线上', disabled: true}:{checked: true, active: '已验', inactive: '  ', disabled: false}	
			        	});
			        	vm.demands = res.data;
			        	vm.total = res.count;
			        } else {
			        	vm.demands = [];
			        	vm.total = 0;
			        }
			        setTimeout(() => {
                       demandList.loading = false;
			        }, 1000)
			    })
		      }
	    },
	    mounted () {
            this.getCheckingList();
	    }
	}
</script>
<style scoped>
</style>