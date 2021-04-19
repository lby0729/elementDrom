<template>
	<div>
		<div class="app-container">
			<div class="dormitory-search">
				<ul class="dormitory-ul">
					<li>
						<div class="search-left1">
							<label for="buildingNo" class="el-form-item_label" style="width: 68px;">宿舍栋号</label>
						</div>
						<div class="search-left2">
							<el-select v-model="buildingNum" placeholder="宿舍栋号" style="width: 240px;height: 36px;">
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
							<el-select v-model="storeyNum" placeholder="宿舍楼层" style="width: 240px;height: 36px;">
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
							<label for="storey" class="el-form-item_label" style="width: 68px;">状态</label>
						</div>
						<div class="search-left2">
							<el-select v-model="dormitoryStatus" placeholder="宿舍状态" style="width: 240px;height: 36px;">
								<el-option v-for="item in statusList" :value="item.dictValue" :label="item.dictLabel" :key="item.dictValue">

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
			<div style="text-align: left;" class="action">
				<div>
					<el-button type="primary ys" icon="el-icon-search" @click="dialogFormVisible=true">新增</el-button>
				</div>
				<div>
					<el-button type="primary ys updateClass" icon="el-icon-search" disabled="disabled">修改</el-button>
				</div>
				<div>
					<el-button type="primary ys deleteClass" icon="el-icon-delete" :disabled="disabledid" @click="deleteByids()">删除</el-button>
				</div>
			</div>
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange">
				<el-table-column align="center" type="selection" width="55">
				</el-table-column>
				<el-table-column align="center" prop="id" label="序号" width="120">
				</el-table-column>
				<el-table-column align="center" prop="buildingNo" label="宿舍栋号" width="120">
				</el-table-column>
				<el-table-column align="center" prop="storey" label="楼层" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" prop="dormitoryNo" label="宿舍号" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" prop="dormitoryTeacherName" label="宿管老师" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" prop="createTime" label="创建时间" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" prop="modifyTime" label="修改时间" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" min-width="50" prop="status" label="状态">
					<template slot-scope="scope">
						<!-- scope.$index指的是第几排第几个 -->
						<el-switch v-model="tableData[scope.$index].status" :active-value="'1'" :inactive-value="'0'" active-color="#1890ff"
						 inactive-color="#dcdfe6" @change="changeSwitch(scope.$index)">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="method" label="操作" show-overflow-tooltip>
						<template slot-scope="scope1">
							<el-button type="primary" icon="el-icon-edit" circle @click="updateDor=true"
								@click.native="changeDormitory(scope1.$index)"></el-button>
							<el-button type="danger" icon="el-icon-delete" circle
							@click.native="delDormitory(scope1.$index)"></el-button>
						</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="currentPage" :page-sizes="[10,20,50]" :page-size="10"
				layout="total, sizes, prev, pager, next, jumper" :total="totalpge">
			</el-pagination>
		</div>
		<el-dialog title="添加宿舍信息" :visible.sync="dialogFormVisible" width="54%">
			<el-form :model="form">
				<el-form-item label="宿舍栋号" :label-width="formLabelWidth">
					<el-select v-model="form.building" placeholder="宿舍栋号" style="width: 240px;height: 36px;">
						<el-option v-for="item in buildingList" :value="item.dictValue" :label="item.dictLabel" :key="item.dictValue">
					
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="楼层" :label-width="formLabelWidth">
					<el-select v-model="form.storey" placeholder="宿舍楼层" style="width: 240px;height: 36px;">
						<el-option v-for="item in storeyList" :value="item.dictValue" :label="item.dictLabel" :key="item.dictValue">
					
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="宿舍号" :label-width="formLabelWidth">
				<el-input v-model="form.dormitoryNo" placeholder="请输入宿舍号" style="display: inline-block;"></el-input>
				</el-form-item>
				<el-form-item label="宿管老师" :label-width="formLabelWidth">
				<el-select v-model="form.dormitoryTeacher" placeholder="请选择" style="width: 240px;height: 36px;">
					<el-option v-for="item in teacherList" :value="item.id" :label="item.username" :key="item.id">
				
					</el-option>
				</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addDormitory()">确 定</el-button>
				<el-button @click="dialogFormVisible = false">取 消</el-button>
			</div>
		</el-dialog>
		<el-dialog title="修改宿舍信息" :visible.sync="updateDor">
			<el-form :model="form">
				<el-form-item label="宿舍栋号" :label-width="formLabelWidth">
					<el-select disabled v-model="form.buildingNo" placeholder="宿舍栋号" style="width: 240px;height: 36px;">
						<el-option v-for="item in buildingList" :value="item.dictValue" :label="item.dictLabel" :key="item.dictValue">
					
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="楼层" :label-width="formLabelWidth">
					<el-select disabled v-model="form.storey" placeholder="宿舍楼层" style="width: 240px;height: 36px;">
						<el-option v-for="item in storeyList" :value="item.dictValue" :label="item.dictLabel" :key="item.dictValue">
					
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="宿舍号" :label-width="formLabelWidth">
				<el-input disabled v-model="form.dormitoryNo" placeholder="请输入宿舍号" style="display: inline-block;width: 240px;"></el-input>
				</el-form-item>
				<el-form-item label="宿管老师" :label-width="formLabelWidth">
				<el-select v-model="form.dormitoryTeacherId" placeholder="请选择" style="width: 240px;height: 36px;">
					<el-option v-for="item in teacherList" :value="item.id" :label="item.username" :key="item.id">
					</el-option>
				</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="changeee()">确 定</el-button>
				<el-button @click="updateDor = false">取 消</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				buildingNum: '',
				buildingList: [],
				storeyNum: '',
				storeyList: [],
				inputRoomNum: '',
				dormitoryStatus: '',
				statusList: [],
				tableData: [],
				currentPage1: 5,
				currentPage2: 5,
				currentPage3: 5,
				currentPage4: 4,
				dialogTableVisible: false,
				dialogFormVisible: false,
				totalpge: 1,
				currentPage: 1,
				noPage: 1,
				myjt: 10,
				form: {
					building: '',
					storey: '',
					dormitoryNo: '',
					dormitoryTeacher:''
				},
				formLabelWidth: '120px',
				dormitoryTeacher:'',
				teacherList:[],
				updateDor:false,
				delIDs:[],
				disabledid:true
			}

		},
		methods: {
			/* 循环添加 */
			addAllShit(){
				for(var i=1000;i<2000;i++){
					this.$axios({
						url:"http://122.112.253.28:8095/prod-api/basedata/bdormitory/create",
						method:"post",
						headers: {
							'Authorization': window.sessionStorage.token
						},
						data:{
							
							buildingNo:this.$data.form.building,
							dormitoryNo:i+'asd',
							dormitoryTeacherId:this.$data.dormitoryTeacher,
							status: "1",
							storey: this.$data.form.storey
						}
					}).then((rel)=>{
						console.log(rel)
					})
				}
		
			},
			
			changeee(){
				let uurlss = `http://122.112.253.28:8095/prod-api/basedata/bdormitory/update/` + this.$data.form.id;
				this.$axios({
						method: 'PUT',
						url: uurlss,
						headers: {
							'Authorization': window.sessionStorage.token
						},
						data: {
							buildingNo: this.$data.form.buildingNo,
							createTime: this.$data.form.createTime,
							dormitoryNo: this.$data.form.dormitoryNo,
							dormitoryTeacherId: this.$data.form.dormitoryTeacherId,
							dormitoryTeacherName: null,
							id:this.$data.form.id,
							modifyTime: this.$data.form.modifyTime,
							status: this.$data.form.status,
							storey: this.$data.form.storey
						},
					})
					.then((result) => {
						console.log(result);
						this.$data.updateDor = false;
					})
			},
			changeDormitory(val){
				this.$data.form=this.$data.tableData[val];
				console.log(this.$data.form)
			},
			/* 删除btn */
			delDormitory(val){
				let uurl=`http://122.112.253.28:8095/prod-api/basedata/bdormitory/deleteByIds/`;
				this.$axios({
					url:uurl+this.$data.tableData[val].id,
					method:'delete',
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((rel)=>{
					console.log(rel);
					this.selectAll("http://122.112.253.28:8095/prod-api/basedata/bdormitory/list?pageNum=1&pageSize=10");
				})
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
			status() {
				this.$axios({
					url: "http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_normal_disable",
					method: "get",
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result) => {
					this.statusList = result.data.data;
				})
			},
			restart() {
				this.$data.buildingNum = ""
				this.$data.storeyNum = ""
				this.dormitoryStatus = ""
			},
			handleSizeChange(val) {
				this.$data.myjt = val
				var urlw = `http://122.112.253.28:8095/prod-api/basedata/bdormitory/list?pageNum=` + this.$data.noPage +
					`&pageSize=` + this.$data.myjt + ``;
				this.listAll(urlw)
			},
			handleCurrentChange(val) {
				this.$data.noPage = val
				var urlw = `http://122.112.253.28:8095/prod-api/basedata/bdormitory/list?pageNum=` + this.$data.noPage +
					`&pageSize=` + this.$data.myjt + ``;
				this.listAll(urlw)
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				this.$data.delIDs=[];
				for(let i=0;i<val.length;i++){
					this.$data.delIDs.push(val[i].id)
				}
				if(val.length!=0){
					this.$data.disabledid=false;
				}
			},
			/* 批量刪除 */
			deleteByids(){
				let uurl=`http://122.112.253.28:8095/prod-api/basedata/bdormitory/deleteByIds/`
				for(let i=0;i<this.$data.delIDs.length;i++){
					if(i==this.$data.delIDs.length-1){
							uurl+=this.$data.delIDs[i]
					}else{
							uurl+=this.$data.delIDs[i]+','
					}
				}
				this.$axios({
					url:uurl,
					method:'DELETE',
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((rel)=>{
					console.log(rel)
					this.$message({
					         message: '删除成功!',
					         type: 'success'
					});
					this.selectAll('http://122.112.253.28:8095/prod-api/basedata/bdormitory/list?pageNum=1&pageSize=10000')
				
				})
			},
			/* 修改status */
			changeSwitch(val) {
				let urlw = `http://122.112.253.28:8095/prod-api/basedata/bdormitory/update/status/`+this.$data.tableData[val].id+`?status=`+this.$data.tableData[val].status+``;
				this.$axios({
						method: 'PUT',
						url: urlw,
						headers: {
							'Authorization': window.sessionStorage.token
						},
						status:""+this.$data.tableData[val].status+"",
					})
					.then((result) => {
						if(result.data.code==200){
							this.$message({
							         message: '操作成功!',
							         type: 'success'
							});
						}
					}) 
			},
			/* 查询所有的数据总共有多少 */
			selAll() {
				this.$axios({
					method: 'get',
					url: 'http://122.112.253.28:8095/prod-api/basedata/bdormitory/list?pageNum=1&pageSize=10000',
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result) => {
					console.log(result)
					this.$data.totalpge = result.data.data.list.length;
				})
			},
			selectAll(url) {
				this.selAll();
				this.$axios({
					url: url,
					method: "get",
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result) => {
					this.$data.tableData = [];
						this.$data.tableData=result.data.data.list;
				})
			},
			selectTeacher(){
				this.$axios({
					url:"http://122.112.253.28:8095/prod-api/sys/user/getDorTeacherList",
					method:"get",
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result)=>{
					this.$data.teacherList=result.data.data;
				})
			},
			likeQuery() {
				this.$axios({
					url: 'http://122.112.253.28:8095/prod-api/basedata/bdormitory/list?pageNum=1&pageSize=10&buildingNo=' + this.$data
						.buildingNum + '&storey=' + this.$data.storeyNum + '&dormitoryNo=' + this.$data.inputRoomNum + '&status=' +
						this.$data.dormitoryStatus + '',
					method: "",
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result) => {
					this.$data.tableData = result.data.data.list;
				})
			},
			/* 添加 */
			addDormitory(){
							this.$data.dialogFormVisible=false;
							console.log(this.$data.form)
							this.$axios({
								url:"http://122.112.253.28:8095/prod-api/basedata/bdormitory/create",
								method:"post",
								headers: {
									'Authorization': window.sessionStorage.token
								},
								data:{
									buildingNo:this.$data.form.building,
									dormitoryNo:this.$data.form.dormitoryNo,
									dormitoryTeacherId:this.$data.form.dormitoryTeacher,
									status: "1",
									storey: this.$data.form.storey,
								}
							}).then((result)=>{
								this.$data.form={building: '',
									storey: '',
									dormitoryNo: '',
									dormitoryTeacher:''};
								this.selectAll("http://122.112.253.28:8095/prod-api/basedata/bdormitory/list?pageNum=1&pageSize=10");
								})
						},
		},
		created() {
			this.building();
			this.storey();
			this.status();
			this.selectTeacher();
			this.selectAll("http://122.112.253.28:8095/prod-api/basedata/bdormitory/list?pageNum=1&pageSize=10");
			}
	}
</script>

<style>
	.block {
		text-align: right;
		margin-right: 20px;
	}

	.app-container {
		padding: 20px;
	}

	.dormitory-search {
		width: 1103px;
	}

	.dormitory-search .el-form-item_label {
		text-align: right;
		line-height: 36px;
		vertical-align: middle;
		float: left;
		font-size: 14px;
		color: #606266 !important;
		padding: 0 12px 0 0;
		box-sizing: border-box;
	}

	.dormitory-ul li {
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
