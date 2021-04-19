<template>
	<div class="app-container">
		<div class="aside">
			<el-input placeholder="请输入部门名称" prefix-icon="el-icon-search" v-model="inputSearch">
			</el-input>
			<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
		</div>
		<div class="main">
			<ul class="user-search">
				<li>
					<div class="search-left1">
						<label for="username" class="el-form-item_label" style="width: 68px;">用户名称</label>
					</div>
					<div class="search-left2">
						<el-input v-model="inputUsername" placeholder="请输入用户名称" style="display: inline-block;"></el-input>
					</div>
				</li>
				<li>
					<div class="search-left1">
						<label for="telNum" class="el-form-item_label" style="width: 68px;">手机号码</label>
					</div>
					<div class="search-left2">
						<el-input v-model="inputTelnum" placeholder="请输入手机号码" style="display: inline-block;"></el-input>
					</div>
				</li>
				<li>
					<div class="search-left1">
						<label for="userStatus" class="el-form-item_label" style="width: 68px;">状态</label>
					</div>
					<div class="search-left2">
						<el-select v-model="userStatus" placeholder="用户状态" style="width: 240px;height: 36px;">
							<el-option v-for="item in statusList" :value="item.dictValue" :label="item.dictLabel" :key="item.dictValue">

							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<div class="search-left1">
						<label for="date" class="el-form-item_label" style="width: 68px;">创建时间</label>
					</div>
					<div class="search-left2">
						<el-date-picker v-model="DataSelect" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="-"
						 start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</li>
				<li class="mt10">
					<el-button type="primary sousuo" icon="el-icon-search">搜索</el-button>
				</li>
				<li class="mt10">
					<el-button type="primary restart" icon="el-icon-refresh" @click="restart()">重置</el-button>
				</li>
			</ul>
			<div style="text-align: left;" class="action">
				<div>
					<el-button type="primary ys" icon="el-icon-search" @click="addUser=true">新增</el-button>
				</div>
				<div>
					<el-button type="primary ys updateClass" icon="el-icon-search">修改</el-button>
				</div>
				<div>
					<el-button type="primary ys deleteClass" icon="el-icon-delete">删除</el-button>
				</div>
				<div>
					<el-button type="primary ys importClass" icon="el-icon-upload2" @click="importUser=true">导入</el-button>
				</div>
				<div>
					<el-button type="primary ys exportClass" icon="el-icon-download" @click="exportUser()">导出</el-button>
				</div>
			</div>
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark">
				<el-table-column align="center" type="selection" width="55">
				</el-table-column>
				<el-table-column align="center" prop="id" label="用户编号" width="120">
				</el-table-column>
				<el-table-column align="center" prop="username" label="用户名称" width="120">
				</el-table-column>
				<el-table-column align="center" prop="deptName" label="部门" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" prop="phone" label="手机号码" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" min-width="50" prop="status" label="状态">
					<template slot-scope="scope">
						<!-- scope.$index指的是第几排第几个 -->
						<el-switch v-model="tableData[scope.$index].status" :active-value="'1'" :inactive-value="'0'" active-color="#1890ff"
						 inactive-color="#dcdfe6" @change="changeSwitch(scope.$index)">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="createTime" label="创建时间" show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" prop="method" label="操作" show-overflow-tooltip>
					<template slot-scope="scope1">
						<el-button type="primary" icon="el-icon-edit" circle @click="updateUser=true"></el-button>
						<el-button type="danger" icon="el-icon-delete" circle></el-button>
						<el-button icon="el-icon-key" circle @click="rePwd()"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-dialog title="添加用户" :visible.sync="addUser" class="add">
				<el-form :model="form">
					<el-form-item label="用户名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="归属部门" :label-width="formLabelWidth">
						<el-select v-model="form.department" placeholder="请选择归属部门">
							<el-option label="校办" value="校办"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="手机号码" :label-width="formLabelWidth">
						<el-input v-model="form.phone" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" :label-width="formLabelWidth">
						<el-input v-model="form.email" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="用户密码" :label-width="formLabelWidth">
						<el-input v-model="form.password" autocomplete="off" type="password"></el-input>
					</el-form-item>
					<el-form-item label="用户性别" :label-width="formLabelWidth">
						<el-select v-model="form.sex" placeholder="请选择">
							<el-option :label="item.dictLabel" :value="item.dictValue" :key="item.dictValue" v-for="item in sexList"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="状态" :label-width="formLabelWidth">
						<el-radio v-model="form.radio" label="1">正常</el-radio>
						<el-radio v-model="form.radio" label="2">停用</el-radio>
					</el-form-item>
					<el-form-item label="角色" :label-width="formLabelWidth">
						<el-select v-model="form.js" placeholder="请选择">
							<el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in jsList"></el-option>
						</el-select>
						</el-select>
					</el-form-item>
					<el-form-item label="备注" :label-width="formLabelWidth">
						<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
						</el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="addPerson()">确 定</el-button>
					<el-button @click="addUser = false">取 消</el-button>
				</div>
			</el-dialog>
			<el-dialog title="修改用户" :visible.sync="updateUser" class="update">
				<el-form :model="form">
					<el-form-item label="用户名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="归属部门" :label-width="formLabelWidth">
						<el-select v-model="form.department" placeholder="请选择归属部门">
							<el-option label="校办" value="校办"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="手机号码" :label-width="formLabelWidth">
						<el-input v-model="form.phone" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" :label-width="formLabelWidth">
						<el-input v-model="form.email" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="用户密码" :label-width="formLabelWidth">
						<el-input v-model="form.password" autocomplete="off" type="password"></el-input>
					</el-form-item>
					<el-form-item label="用户性别" :label-width="formLabelWidth">
						<el-select v-model="form.sex" placeholder="请选择">
							<el-option :label="item.dictLabel" :value="item.dictValue" :key="item.dictValue" v-for="item in sexList"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="状态" :label-width="formLabelWidth">
						<el-radio v-model="form.radio" label="1">正常</el-radio>
						<el-radio v-model="form.radio" label="2">停用</el-radio>
					</el-form-item>
					<el-form-item label="角色" :label-width="formLabelWidth">
						<el-select v-model="form.js" placeholder="请选择">
							<el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in jsList"></el-option>
						</el-select>
						</el-select>
					</el-form-item>
					<el-form-item label="备注" :label-width="formLabelWidth">
						<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
						</el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary">确 定</el-button>
					<el-button @click="updateUser = false">取 消</el-button>
				</div>
			</el-dialog>
			<el-dialog title="用户导入" :visible.sync="importUser" class="import" width="30%">
				<el-form :model="form">
					<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="importUser = false">确 定</el-button>
					<el-button @click="importUser = false">取 消</el-button>
				</div>
			</el-dialog>





		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: [{
					label: '校办',
					children: [{
							label: '教质部'

						}, {
							label: '就业部'

						},
						{
							label: '后勤部'
						},
					]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				inputSearch: '',
				DataSelect: '',
				inputUsername: '',
				inputTelnum: '',
				userStatus: '',
				statusList: '',
				tableData: [],
				addUser: false,
				updateUser: false,
				importUser: false,
				sexList: [],
				jsList: [],
				form: {
					name: '',
					department: '',
					phone: '',
					email: '',
					password: '',
					sex: '',
					radio: '',
					js: '',
					textarea: '',
				},
				formLabelWidth: '120px',
				textarea: ''
			};
		},
		methods: {
			restart() {
				this.$data.inputUsername = "",
					this.$data.DataSelect = "",
					this.$data.inputTelnum = "",
					this.$data.userStatus = ""
			},
			handleNodeClick(data) {
				console.log(data);
			},
			selectinitStatus() {
				this.$axios({
					url: "http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_normal_disable",
					method: "get",
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result) => {
					this.$data.statusList = result.data.data;

				})
			},
			selectSex() {
				this.$axios({
					url: 'http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_user_sex',
					method: "get",
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result) => {
					this.$data.sexList = result.data.data;
				})
			},
			selectJs() {
				this.$axios({
					url: "http://122.112.253.28:8095/prod-api/sys/role/listAll",
					method: "get",
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result) => {
					this.$data.jsList = result.data.data;
				})
			},
			selectAll() {
				this.$axios({
					url: "http://122.112.253.28:8095/prod-api/sys/user/list?pageNum=1&pageSize=10&beginTime=&endTime=",
					method: "get",
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result) => {
					this.$data.tableData = [];
					this.$data.tableData = result.data.data.list;
				})
			},
			addPerson() {

			},
			exportUser() {
				this.$confirm('是否确认导出所有用户数据项?', '警告', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '导出成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消导出'
					});
				});
			},
			rePwd() {
				this.$prompt('请输入密码', '重置密码提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(({
					value
				}) => {
					this.$message({
						type: 'success',
						message: '你的密码是: ' + value
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
			}

		},
		created() {
			this.selectinitStatus();
			this.selectSex();
			this.selectJs();
			this.selectAll();
		}
	};
</script>

<style>
	.el-button.is-circle {
		border-radius: 50%;
		padding: 5px !important;
	}

	.el-date-editor--daterange.el-input__inner {
		width: 240px !important;
	}

	.aside {
		float: left;
		width: 170px;
	}

	.main {
		width: 873px;
		float: left;
		margin-left: 20px;
	}

	.aside .el-input__inner {
		height: 32px;
	}

	.aside .el-tree {
		margin-top: 18px;
	}

	.user-search li {
		margin-right: 10px;
		vertical-align: top;
		margin-bottom: 22px;
		display: inline-block;
	}

	.user-search .el-form-item_label {
		text-align: right;
		line-height: 36px;
		vertical-align: middle;
		float: left;
		font-size: 14px;
		color: #606266 !important;
		padding: 0 12px 0 0;
		box-sizing: border-box;
	}

	.user-search .el-input__inner {
		height: 36px;
		line-height: 36px;
		width: 240px;
		padding: 0 15px;
	}

	.importClass {
		background: #a6a9ad !important;
		border-color: #a6a9ad !important;
	}

	.exportClass {
		background: #ffc833 !important;
		border-color: #ffc833 !important;
	}

	.add .el-dialog .el-form-item,
	.update .el-dialog .el-form-item {
		display: inline-block;
		width: 285px !important;
	}
</style>
