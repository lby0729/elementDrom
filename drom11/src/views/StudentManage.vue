<template>
	<div>
		<div class="app-container">
			<div class="student-search">
				<ul class="student-ul">
					<li>
						<div class="search-left1">
							<label for="StuName" class="el-form-item_label" style="width: 68px;">学员名称</label>
						</div>
						<div class="search-left2">
							<el-input v-model="StuName" autocomplete="off" placeholder="请输入学员名称"></el-input>
						</div>
					</li>
					<li>
						<div class="search-left1">
							<label for="StuNo" class="el-form-item_label" style="width: 68px;">学号</label>
						</div>
						<div class="search-left2">
							<el-input v-model="StuNo" autocomplete="off" placeholder="请输入学号"></el-input>
						</div>
					</li>
					<li>
						<div class="search-left1">
							<label for="Class" class="el-form-item_label" style="width: 68px;">班级</label>
						</div>
						<div class="search-left2">
							<el-input v-model="Class" autocomplete="off" placeholder="请输入班级"></el-input>
						</div>
					</li>
					<li>
						<div class="search-left1">
							<label for="buildingNo" class="el-form-item_label" style="width: 68px;">宿舍栋号</label>
						</div>
						<div class="search-left2">
							<el-select v-model="buildingNum" placeholder="宿舍栋号" style="width: 185px;height: 36px;">
								<el-option v-for="item in buildingList" :value="item.dictValue" :label="item.dictLabel" :key="item.dictValue">
				
								</el-option>
							</el-select>
						</div>
					</li>
					<li>
						<div class="search-left1">
							<label for="storey" class="el-form-item_label" style="width: 68px;">楼层</label>
						</div>
						<div class="search-left2">
							<el-select v-model="storeyNum" placeholder="宿舍楼层" style="width: 185px;height: 36px;">
								<el-option v-for="item in storeyList" :value="item.dictValue" :label="item.dictLabel" :key="item.dictValue">
				
								</el-option>
							</el-select>
						</div>
					</li>
					<li>
						<div class="search-left1">
							<label for="storey" class="el-form-item_label" style="width: 68px;">宿舍号</label>
						</div>
						<div class="search-left2">
							<el-input v-model="inputRoomNum" placeholder="请输入宿舍号" style="display: inline-block;"></el-input>
						</div>
					</li>
					<li>
						<div class="search-left1">
							<label for="StuStatus" class="el-form-item_label" style="width: 68px;">学员状态</label>
						</div>
						<div class="search-left2">
							<el-select v-model="StuStatus" placeholder="学员状态" style="width:185px;height: 36px;">
									<el-option v-for="item in StuStatusList" :value="item.dictValue" :label="item.dictLabel" :key="item.dictValue">
											
								</el-option>
							</el-select>
						</div>
					</li>
					<li class="mt10">
						<el-button type="primary sousuo" icon="el-icon-search" @click="likeQuery()">搜索</el-button>
					</li>
					<li class="mt10">
						<el-button type="primary restart" icon="el-icon-refresh" @click="restart()">重置</el-button>
					</li>
				</ul>
			</div>
			<div style="text-align: left;margin-top: 0 !important;" class="action">
				<div>
					<el-button type="primary ys" icon="el-icon-search" @click="addStu=true">新增</el-button>
				</div>
				<div>
					<el-button type="primary ys updateClass" icon="el-icon-search" disabled="disabled">修改</el-button>
				</div>
				<div>
					<el-button type="primary ys deleteClass" icon="el-icon-delete">删除</el-button>
				</div>
			</div>
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark">
				<el-table-column align="center" type="selection">
				</el-table-column>
				<el-table-column align="center" prop="id" label="序号">
				</el-table-column>
				<el-table-column align="center" prop="studentName" label="学员姓名">
				</el-table-column>
				<el-table-column align="center" prop="studentNo" label="学号" >
				</el-table-column>
				<el-table-column align="center" prop="className" label="班级" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" prop="phone" label="手机号" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" prop="sex" label="性别" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" prop="parentName" label="家长姓名" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" prop="parentPhone" label="家长电话" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" prop="buildingNo" label="宿舍栋号" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" prop="storey" label="楼层" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" prop="dormitoryNo" label="宿舍号" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" prop="createTime" label="创建时间" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" min-width="50" prop="status" label="状态">
					<template slot-scope="scope">
						<!-- scope.$index指的是第几排第几个 -->
						<el-switch v-model="tableData[scope.$index].status" :active-value="'1'" :inactive-value="'0'" active-color="#1890ff"
						 inactive-color="#dcdfe6" @change="changeSwitch(scope.$index)">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="method" label="操作">
						<template slot-scope="scope1">
							 <el-link type="primary">修改</el-link>
							  <el-link type="danger">删除</el-link>
						</template>
				</el-table-column>
			</el-table>
			<el-dialog title="添加学员信息" :visible.sync="addStu">
			  <el-form :model="form">
			    <el-form-item label="学员姓名" :label-width="formLabelWidth">
			      <el-input v-model="form.stuName" autocomplete="off"></el-input>
			    </el-form-item>
				<el-form-item label="学号" :label-width="formLabelWidth">
				  <el-input v-model="form.stuNo" autocomplete="off"></el-input>
				</el-form-item>
			    <el-form-item label="班级" :label-width="formLabelWidth">
			      <el-select v-model="form.className" placeholder="请选择">
			      </el-select>
			    </el-form-item>
				<el-form-item label="手机号码" :label-width="formLabelWidth">
				  <el-input v-model="form.phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" :label-width="formLabelWidth">
				  <el-input v-model="form.card" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" :label-width="formLabelWidth">
				  <el-select v-model="form.sex" placeholder="请选择">
					  <el-option v-for="item in sexList"></el-option>
				  </el-select>
				</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			  </div>
			</el-dialog>
		</div>
		
	</div>
</template>

<script>
	export default {

		data() {
			return {
				StuName: '',
				StuNo: '',
				Class: '',
				buildingNum: '',
				buildingList: [],
				storeyNum: '',
				storeyList: [],
				inputRoomNum: '',
				StuStatus: '',
				StuStatusList: [],
				tableData:[],
				addStu:false,
				classList:[],
				sexList:[],
				roomList:[],
				form:{
					stuName:'',
					stuNo:'',
					className:'',
					phone:'',
					card:'',
					sex:'',
					age:'',
					parentName:'',
					parentPhone:'',
					buildingNo:'',
					storeyNo:'',
					roomNo:'',
					
					
				}
			}
		},
		methods:{
			restart(){
				this.$data.StuName=""
				this.$data.StuNo=""
				this.$data.Class=""
				this.$data.buildingNum=""
				this.$data.storeyNum=""
				this.$data.inputRoomNum=""
				this.$data.StuStatus=""
			},
			building() {
				this.$axios({
					url: 'http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_building',
					method: "get",
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result) => {
					this.buildingList = result.data.data;
					console.log(this.buildingList)
				})
			},
			storey() {
				this.$axios({
					url: `http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_storey`,
					method: "get",
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result) => {
					this.storeyList = result.data.data;
				})
			},
			selectinitStatus(){
				this.$axios({
					url:'http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_student_status',
					method:"get",
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result)=>{
					this.$data.StuStatusList=result.data.data;
				})
			},
			//查询所有
			selectAll(){
				this.$axios({
					url:"http://122.112.253.28:8095/prod-api/basedata/bstudent/list?pageNum=1&pageSize=10",
					method:"get",
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result)=>{
					this.$data.tableData=result.data.data.list;
					// console.log(result);
				})
				
			}
			
		},
		created() {
			this.building();
			this.storey();
			this.selectinitStatus();
			this.selectAll();
		}
	}
</script>

<style>
	.student-search .el-form-item_label {
		text-align: right;
		line-height: 36px;
		vertical-align: middle;
		float: left;
		font-size: 14px;
		color: #606266 !important;
		padding: 0 12px 0 0;
		box-sizing: border-box;
	}
	
	.student-ul li {
		margin-right: 10px;
		vertical-align: top;
		margin-bottom: 22px;
		display: inline-block;
	}
	
	.dormitory-ul .el-input__inner {
		height: 36px;
		line-height: 36px;
		width: 240px;
		padding: 0 15px;
	}
</style>
