<template>
	<div>
		    <el-row>
			  <el-col :span="24">
			  	<div class="grid-content bg-purple-light">
			  		<el-form :inline="true" class="demo-form-inline">
					  <el-form-item>
					    <el-input v-model="query" placeholder="需求名称／开发人员／测试人员"></el-input>
					  </el-form-item>
					  <el-form-item>
					  	 <el-tag type="info">or</el-tag>
					  </el-form-item>
					  <el-form-item>
					    <el-select v-model="gitName" placeholder="请选择">
						    <el-option
						      v-for="item in programs"
						      :key="item.id"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="onSelect">查询</el-button>
					    <el-button type="success" @click="">新增</el-button>
					  </el-form-item>
					</el-form>
			  	</div>
			  </el-col>
			</el-row>
		    <demand-list :props="demands" ref="demandList"></demand-list>
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
    import demandList from '@/common/demandList'
	export default {
		data () {
			return {
				demands: [],
				currentPage: 1,
			    pageSize: 10,
			    query: '',
			    gitName: '', // 选中的项目名称
			    programs: [{ // git 项目
			    	id: 1,
			    	label: 'portal-h5',
			    	value: 'portal-h5'
			    }],
			    total: 0
			}
		},
        components: {
       	   demandList
        },
        methods: {
        	handleCurrentChange (page) {
               this.currentPage = page
        	},
			onSelect () {

			},
            getData () {
            	let vm = this;
                getPlanDetail($route.query.planName, {pageIndex: vm.currentPage, pageSize}).then(res => {
                	console.log(res)
                })
            }
		},
        mounted () {
        	console.log(this.$route)
        }
	}
</script>