<template>
	<div>
		<el-table
		    v-loading="loading"
		    :data="demands"
		    border
		    style="width: 100%;margin-top: 20px">
		    <el-table-column
		      label="序号"
		      fixed='left'
		      width="50">
		      <template slot-scope="scope">
		        <span>{{ scope.$index + 1 }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="需求名称"
		      fixed='left'
		      width="180">
		      <template slot-scope="scope">
		          <span><a :href="'http://redmine.guahao-inc.com/issues/' + scope.row.demandCode" target="_blank">{{ scope.row.demandName }}</a></span>
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
		    <el-table-column 
		       label="发布验证"
		       fixed='right'>
		      <template slot-scope="scope">
		        <el-switch
				  v-model="scope.row.switchPre.checked"
				  :width="60"
				  :active-text="scope.row.switchPre.active"
				  :inactive-text="scope.row.switchPre.inactive"
				  @change="changPre(scope.$index, scope.row)"
				  :disabled="scope.row.switchPre.disabled">
				</el-switch>
				<el-switch
				  v-model="scope.row.switchOnline.checked"
				  :width="60"
				  :active-text="scope.row.switchOnline.active"
				  :inactive-text="scope.row.switchOnline.inactive"
				  @change="changOnline(scope.$index, scope.row)"
				  :disabled="scope.row.switchOnline.disabled">
				</el-switch>
		      </template>
		    </el-table-column>
		  </el-table>
	</div>
</template>
<script>
    import Vue from 'vue'
	export default {
       props: ['demands'],
       data () {
       	    return {
       	  	    loading: false
       	    }
       },
       methods: {
       	    changPre (index, row) {
	            if (row.switchPre.checked) {
	            	Vue.set(this.demands[index], 'isChecked', 1);
	            	Vue.set(this.demands[index].switchPre, 'active', '已验');
	            	Vue.set(this.demands[index].switchPre, 'inactive', '  ');
	            	Vue.set(this.demands[index].switchOnline, 'disabled', false);
	            } else {
	                Vue.set(this.demands[index], 'isChecked', 0);
		            Vue.set(this.demands[index].switchPre, 'active', '  ');
		            Vue.set(this.demands[index].switchPre, 'inactive', '预发');
		            Vue.set(this.demands[index].switchOnline, 'disabled', true);
	            }
		    },
		    changOnline (index, row) {
	            if (row.switchOnline.checked) {
	            	Vue.set(this.demands[index], 'isChecked', 2);
	            	Vue.set(this.demands[index].switchOnline, 'active', '已验');
	            	Vue.set(this.demands[index].switchOnline, 'inactive', '  ');
	            	Vue.set(this.demands[index].switchPre, 'disabled', true);
	            } else {
	            	Vue.set(this.demands[index], 'isChecked', 1);
	            	Vue.set(this.demands[index].switchOnline, 'active', '  ');
	            	Vue.set(this.demands[index].switchOnline, 'inactive', '线上');
	            	Vue.set(this.demands[index].switchPre, 'disabled', false);
	            }
		    }
       }
	}
</script>
<style scoped>
	
</style>