<template>
	<div>
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/checkingList' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>发布计划管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row>
		  <el-col :span="24">
		  	<div class="grid-content bg-purple-light">
		  		<el-form :inline="true">
				  <el-form-item>
				    <el-input v-model="query" placeholder="发布计划管理"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="onSubmit">查询</el-button>
				    <el-button type="success" @click="dialogShow">新增</el-button>
				  </el-form-item>
				  <el-form-item label="时间" class="el-form-item-right">
				  	 <el-radio-group v-model="time" @change="selectTime">
					      <el-radio-button :label="week">最近一周</el-radio-button>
					      <el-radio-button :label="month">最近一月</el-radio-button>
					      <el-radio-button :label="year">最近一年</el-radio-button>
					 </el-radio-group>
				  </el-form-item>
				</el-form>
		  	</div>
		  </el-col>
		</el-row>
	    <el-table
		       v-loading="loading"
		       :data="manages"
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
			      label="发布计划名称"
			      width="180">
			      <template slot-scope="scope">
			          <span><router-link :to="{path: '/manageDemand/' + scope.row._id, query: {planName: scope.row.planName}}">{{ scope.row.planName }}</router-link></span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="发布类型"
			      width="180">
			      <template slot-scope="scope">
			      	  <el-tag type="success" v-if="scope.row.planType == 1">日常</el-tag>
			      	  <el-tag type="danger" v-else>紧急</el-tag>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="创建人"
			      width="180">
			      <template slot-scope="scope">
			          <p>{{ scope.row.userName }}</p>
			      </template>
			    </el-table-column>
			    <el-table-column 
				    label="最后更新时间"
				    width="180">
	                <template slot-scope="scope">
			          <p>{{ scope.row.gmtModified | time }}</p>
			        </template>
			    </el-table-column>
			    <el-table-column
			      label="需求数">
			      <template slot-scope="scope">
			          <p>{{ scope.row.demandNum }}</p>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      width='200'>
			      <template slot-scope="scope">
			            <el-button type="primary" icon="el-icon-edit" :disabled='scope.row.isDeleted != 0' @click="editManage(scope.row)">编辑</el-button>
			            <el-dropdown @command="dropdown" trigger="click">
						  <el-button type="primary">
						    更多操作<i class="el-icon-arrow-down el-icon--right"></i>
						  </el-button>
						  <el-dropdown-menu slot="dropdown">
						    <el-dropdown-item :command="'email|' + scope.row._id">发送邮件</el-dropdown-item>
						    <el-dropdown-item :command="'output|' + scope.row._id">导出计划</el-dropdown-item>
						    <el-dropdown-item :command="'sign|' + scope.row._id">签名数据</el-dropdown-item>
						    <el-dropdown-item :command="'delete|' + scope.row._id">删除计划</el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
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
	    <el-dialog :title="dialog.title" :visible.sync="dialog.isShow">
			  <el-form :model="dialog" :rules="rules" ref="manageDialog">
			    <el-form-item label="计划名称" label-width="100px" prop="planName">
			      <el-input v-model="dialog.planName" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="紧急发布" label-width="100px" prop="isEmergency" style="margin-top: 20px;">
                   <el-switch v-model="dialog.planType" :active-value="2" :inactive-value="1"></el-switch>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogHide">取 消</el-button>
			    <el-button type="primary" @click="addManage(dialog.type)">确 定</el-button>
			  </div>
		</el-dialog>
	</div>
</template>

<script>
    import {formatLastTime, paddZero} from '@/public/js/util'
    import {manageList, addManage, editManage, deleteManage} from '@/api/index'
	export default {
        data () {
        	return {
                time: '',
                query:'',
                week: '',
                month: '',
                year: '',
                manages: [],
                currentPage: 1,
                pageSize: 10,
                team: '1',
                total: 0,
                loading: false,
                currentId: '',
                dialog: {
                	title: '新增发布',
                    isShow: false,
                    planName: '',
                    planType: 1,
                    id: '',
                    type: 1, // 1表示新增，2表示编辑
                },
                rules: {
                    planName: [
		                { required: true, message: '请输入发布计划名称', trigger: 'blur' }
		            ]
                }
        	}
        },
        methods: {
        	tip (res) {
                this.$message({
                	showClose: true,
                	message: res.message,
                	type: res.hasError?'error':'success'
                })
        	},
        	dialogShow () {
              this.dialog.isShow = true;
        	},
        	dialogHide () {
               this.dialog.isShow = false;
        	},
        	onSubmit () {
               this.getData();
        	},
        	selectTime (val) {
               this.time = val;
               this.getData();
        	},
        	handleCurrentChange (page) {
               this.currentPage = page;
               this.getData();
        	},
        	initTime () {
        		let vm = this;
        		let {week, month, year} = formatLastTime({y: 1, m: 1, d: 7});
        		vm.time = week;
        		vm.week = week;
        		vm.month = month;
        		vm.year = year;
        	},
        	dropdown (command) {
               let data = command.split('|');
               let type = data[0];
               let id = data[1];
               let vm = this;
               if (type == 'delete') {
               	  deleteManage(id).then(res => {
               	  	 res = res.data;
                     vm.tip(res);
               	  })
               }
        	},
        	addManage (type) {
        		let vm = this;
        		let form = vm.$refs.manageDialog;
        		// 表单验证
                form.validate(valid => {
               	    if (valid) {
               	  	    console.log('submit!');
               	    } else {
               	  	    console.log('submit error');
               	  	    return false;
               	    }
                });
                if (type == 1) {
                    addManage({planName: vm.dialog.planName, planType: vm.dialog.planType}).then(res => {
	                	res = res.data;
	                	if (!res.hasError) {
	                        // 表单重置
	                        form.resetFields();
	                        vm.dialogHide();
	                        vm.getData();
	                	} 
	                	vm.tip(res);
	                })
                } else {
                    editManage({id: vm.dialog.id, planName: vm.dialog.planName, planType: vm.dialog.planType}).then(res => {
                    	res = res.data
                    	if (!res.hasError) {
	                        // 表单重置
	                        form.resetFields();
	                        vm.dialogHide();
	                        vm.getData();
                    	}
                    	vm.tip(res);
                    })
                }
        	},
        	editManage (item) {
               let vm = this
               vm.dialog.title = '编辑发布'
               vm.dialog.isShow = true
               vm.dialog.planName = item.planName
               vm.dialog.planType = item.planType
               vm.dialog.type = 2
               vm.dialog.id = item._id
        	},
        	getData() {
        		let vm = this;
        		let data = {
		            maxDate: vm.time.split('-')[1],
		            minDate: vm.time.split('-')[0],
		            pageIndex: vm.currentPage,
		            pageSize: vm.pageSize,
		            query: vm.query,
		            team: vm.team
		        }
		        vm.loading = true;
                manageList(data).then(res => {
			       res = res.data;
			       if (!res.hasError && res.data.length) {
			       	  vm.manages = res.data;
			       	  vm.total = res.count;
			       } else {
			       	  vm.manages = [];
			       	  vm.total = 0;
			       }
			       setTimeout(() => {
			       	  vm.loading = false;
			       }, 1000)
			    })
        	}
        },
        mounted () {
        	this.initTime();
        	this.getData()
        },
        filters: {
        	time (val) {
        		let time = new Date(val)
        		return time.getFullYear() + '-' + paddZero(time.getMonth() + 1, 2) + '-' + paddZero(time.getDate(), 2) + ' ' + paddZero(time.getHours(), 2) + ':' + paddZero(time.getMinutes(), 2) + ':' + paddZero(time.getSeconds(), 2);
        	}
        }
	}
</script>
<style scoped>
	.el-form-item-right {
		float: right;
	}
</style>