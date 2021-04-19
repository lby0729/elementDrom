<template>
	<div class="indexDiv">
		<div class="idxbody">
			<div class="search-title">
				<ul class="search-ul">
					<li>
						<div class="search-left1">
							<label class="search-label">班级名称</label>
						</div>
						<div class="search-left2">
							<el-input v-model="inputClass" placeholder="请输入班级名称"></el-input>
						</div>
					</li>
					<li>
						<div class="search-left1">
							<label class="search-label">班主任</label>
						</div>
						<div class="search-left2">
							<el-input v-model="inputTeacher" placeholder="请输入班主任名称"></el-input>
						</div>
					</li>
					<li>
						<div class="search-left1">
							<label class="search-label">状态</label>
						</div>
						<div class="search-left2">
							<el-select v-model="situation" placeholder="班级状态">
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
			<div class="action">
				<div>
					<el-button type="primary ys" icon="el-icon-search" @click="dialogClass = true">新增</el-button>
				</div>
				<div>
					<el-button type="primary ys updateClass" icon="el-icon-search" disabled="disabled">修改</el-button>
				</div>
				<div>
					<el-button type="primary ys deleteClass" icon="el-icon-delete" @click="dele">删除</el-button>
				</div>
			</div>
			<div class="idxelMBottom">
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection">
					</el-table-column>
					<el-table-column prop="id" label="序号" width="120">
					</el-table-column>
					<el-table-column prop="className" label="班级名称">
					</el-table-column>
					<el-table-column prop="classTeacherName" label="班主任">
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间">
					</el-table-column>
					<el-table-column prop="modifyTime" label="修改时间">
					</el-table-column>
					<el-table-column prop="status" label="状态" width="100">
						<template slot-scope="scope">
							<el-switch v-model="tableData[scope.$index].status" :inactive-value='"0"' :active-value='"1"' inactive-color="#dcdfe6"
							 active-color="#1890ff" @change="changeSwitch(scope.$index)" />
						</template>
						</el-switch>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope1">
							<el-button type="primary" icon="el-icon-edit" circle @click.native="changeThis(scope1.$index)"></el-button>
							<el-button type="danger" icon="el-icon-delete" circle @click.native="deleteByidd(scope1.$index)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="idxelMDown">
			<template>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
					 :page-sizes="[10,20,50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalpge">
					</el-pagination>
				</div>
			</template>
		</div>
		<el-dialog title="添加班级信息" :visible.sync="dialogClass">
			<el-form :model="form">
				<el-form-item label="班级名称" :label-width="formLabelWidth">
					<el-input v-model="form.className" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="班主任" :label-width="formLabelWidth">
					<el-select v-model="form.teacher" placeholder="请选择">
						<el-option v-for="item in teacheres" :key="item.id" :value="item.id" :label="item.username">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addClass()">确 定</el-button>
				<el-button @click="dialogClass = false">取 消</el-button>
			</div>
		</el-dialog>
		<el-dialog title="修改班级信息" :visible.sync="dialogTeacher">
			<el-form :model="getClass">
				<el-form-item label="班级名称" :label-width="formLabelWidth">
					<el-input v-model="getClass.className" autocomplete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="班主任" :label-width="formLabelWidth">
					<el-select v-model="whoteach" placeholder="请选择班主任">
						<el-option v-for="teacher in teacheres" :label="teacher.username" :value="teacher.username" :key='teacher.username'></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTeacher = false">取 消</el-button>
				<el-button type="primary" @click="changeClass()">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				whoteach: '周姗姗',
				formLabelWidth: '90px',
				dialogTeacher: false,
				dialogClass: false,
				totalpge: 1,
				currentPage: 1,
				noPage: 1,
				myjt: 10,
				tableData: [{
					id: 94,
					className: 'wb21',
					classTeacherName: '周珊珊',
					createTime: '2021-04-16 08:27:32',
					modifyTime: '2021-04-16 08:27:32',
					status: true,
				}],
				multipleSelection: [],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				fake: true,
				urlss: `http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=1&pageSize=10000`,
				getClass: {

				},
				teacheres: [],
				inputClass: '',
				inputTeacher: '',
				situation: '',
				statusList: '',
				form: {
					className: '',
					teacher: ''
				}
			}
		},
		methods: {
			deleteByidd(iddd) {
				let uurlss = `http://122.112.253.28:8095/prod-api/basedata/bclass/deleteByIds/` + this.$data.tableData[
					iddd].id + ``;
				console.log(uurlss)
				this.$axios({
						method: 'DELETE',
						url: uurlss,
					})
					.then((result) => {
						if (result.data.code == 200) {
							this.$data.dialogTeacher = false;
							this.$message({
								message: '操作成功!',
								type: 'success'
							});
						}
						this.listAll(`http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=` + this.$data
							.noPage + `&pageSize=` + this.$data.myjt + ``)
					})
			},
			selectStatus() {
				this.$axios({
					url: 'http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_normal_disable',
					method: "get",
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result) => {
					this.$data.statusList = result.data.data;
				})
			},
			restart() {
				this.$data.inputClass = "",
					this.$data.inputTeacher = "",
					this.$data.situation = ""
			},
			likeQuery() {
				let urlw = `http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=` + this.$data.noPage +
					`&pageSize=` + this.$data.myjt + '&className=' +
					this.$data.inputClass +
					'&status=' + this.$data.situation + '&classTeacherName=' + this.$data.inputTeacher + '';
				this.$axios({
					url: urlw,
					method: "get",
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result) => {
					console.log(result);
					this.$data.tableData=result.data.data.list
					this.$data.totalpge = result.data.data.list.length;
				})
			},
			/* addBan() {
				for (let i = 1000; i < 2000; i++) {
					var nm = i;
					let data= {
							"className": 'nm'+nm+'',
							"classTeacherId": 1,
							"status": "1"
						}
						this.$axios.post(`http://122.112.253.28:8095/prod-api/basedata/bclass/create`,
							data
						).then((result) => {
							console.log(result.data.code)
						})
				}
			}, 
			<button @click="addBan()">qwgqwg</button>
			*/

			inRequest() {
				this.$axios.interceptors.request.use(config => {
					//为请求头对象，添加token验证的Authorization字段
					config.headers.Authorization = window.sessionStorage.getItem("token")
					return config
				})
			},
			sendClass() {

			},
			/* 修改班主任方法 */
			changeClass() {
				var tchID = 0;
				for (let i = 0; i < this.$data.teacheres.length; i++) {
					if (this.$data.whoteach == this.$data.teacheres[i].username) {
						tchID = this.$data.teacheres[i].id;
					}
				}
				let uurlss = `http://122.112.253.28:8095/prod-api/basedata/bclass/update/` + this.$data.getClass.id + ``;
				this.inRequest();
				this.$axios({
						method: 'PUT',
						url: uurlss,
						data: {
							className: this.$data.getClass.className,
							classTeacherId: tchID,
							id: this.$data.getClass.id,
						},
					})
					.then((result) => {
						console.log(result);
						let urlw = `http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=` + this.$data
							.noPage + `&pageSize=` + this.$data.myjt + ``;
						if (result.data.code == 200) {
							this.$data.dialogTeacher = false;
							this.$message({
								message: '操作成功!',
								type: 'success'
							});
						}
						this.listAll(urlw)
					})

				/* 
				http://122.112.253.28:8095/prod-api/basedata/bclass/update/1157
				http://122.112.253.28:8095/prod-api/basedata/bclass/1157
				{className: "1019"
				classTeacherId: 12
				classTeacherName: null
				createTime: "2021-04-16 16:31:30"
				id: 1157
				modifyTime: "2021-04-16 23:52:13"
				status: "1"
				userId: 0 
				}
				 */
			},
			/* 获取点击对应的对象--修改方法 */
			changeThis(tableDataes) {
				this.$data.dialogTeacher = true;
				this.$data.getClass = this.$data.tableData[tableDataes];
				this.getAllTeachear();
			},
			/* 获取所有老师 */
			getAllTeachear() {
				this.inRequest();
				this.$axios({
					type: 'get',
					url: ` http://122.112.253.28:8095/prod-api/sys/user/getClassTeacherList`,
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result) => {
					/* 清空数组*/
					this.$data.teacheres = [];
					for (let i = 0; i < result.data.data.length; i++) {
						var teh = {
							id: result.data.data[i].id,
							username: result.data.data[i].username
						}
						this.$data.teacheres.push(teh)
					}
				})
			},
			handleSizeChange(val) {
				this.$data.myjt = val
				let urlw = `http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=` + this.$data.noPage +
					`&pageSize=` + this.$data.myjt + ``;
				this.listAll(urlw)
			},
			handleCurrentChange(val) {
				this.$data.noPage = val
				let urlw = `http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=` + this.$data.noPage +
					`&pageSize=` + this.$data.myjt + ``;
				this.listAll(urlw)
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			/* 左右切换 */
			changeSwitch(val) {
				console.log(this.$data.tableData[val].status)
				let urlw = `http://122.112.253.28:8095/prod-api/basedata/bclass/update/status/` + this.$data.tableData[val]
					.id + `?status=` + this.$data.tableData[val].status + ``;
				this.$axios({
						method: 'PUT',
						url: urlw,
						status: "" + this.$data.tableData[val].status + "",
						id: this.$data.tableData[val].id,
						headers: {
							'Authorization': window.sessionStorage.token
						}
					})
					.then((result) => {
						if (result.data.code == 200) {
							this.$message({
								message: '操作成功!',
								type: 'success'
							});
						}
						// console.log(result);
						// this.listAll(`http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=1&pageSize=10`)
					})
			},
			/* 查询所有的数据总共有多少 */
			selAll() {
				this.$axios({
					type: 'get',
					url: `http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=1&pageSize=10000`,
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result) => {
					this.$data.totalpge = result.data.data.list.length;
					this.listAll(`http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=1&pageSize=10`);
				})
			},
			/* 查询方法 */
			listAll(urlend) {
				var url = urlend;
				this.inRequest();
				this.$axios({
					type: 'get',
					url: url,
					headers: {
						'Authorization': window.sessionStorage.token
					}
				}).then((result) => {
					this.$data.tableData = result.data.data.list;
					console.log(this.$data.tableData)
				})
			},
			addClass() {
				this.$data.dialogClass = false
				console.log(this.$data.form.teacher)
				this.$axios({
					url: "http://122.112.253.28:8095/prod-api/basedata/bclass/create",
					method: "post",
					headers: {
						'Authorization': window.sessionStorage.token
					},
					data: {
						className: this.$data.form.className,
						classTeacherId: this.$data.form.teacher
					}
				}).then((result) => {})
			}
		},
		created() {
			this.selAll();
			this.selectStatus();
			this.getAllTeachear();
		}
	}
</script>

<style>
	.indexDiv {
		padding: 20px;

	}

	.el-dialog .el-form-item {
		display: inline-block;
	}

	.el-dialog .el-form-item__content {
		width: 200px;
	}

	.changeBanDiv .el-input {
		width: 30%;
	}

	.changeBanDiv {

		width: 650px;
		height: 246px;
		background-color: white;
		top: 0;
		left: 0;
		z-index: 9;
		margin: 0 auto;
		margin-top: 30vh;
	}

	.changeBan {
		display: none;
		z-index: 9;
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background-color: rgba(100, 100, 100, 0.5);
	}

	.idxelMDown {
		text-align: right;
		margin-right: 104px;
		margin-top: 10px;
		background-color: white;
		padding: 10px 0;
	}

	.niceIpt {
		text-align: center;
		width: 50px;
		line-height: 30px !important;
		height: 30px !important;
	}

	.mt10 {
		margin-top: 4px;
	}

	.sousuo {
		height: 28px;
		margin-left: 10px !important;
		padding: 7px 15px !important;
		font-size: 12px !important;
	}

	.restart {
		height: 28px;
		margin-left: 10px !important;
		padding: 7px 15px !important;
		font-size: 12px !important;
		border: 1px solid #dcdfe6 !important;
		border-color: #dcdfe6 !important;
		color: #606266 !important;
		background: #fff !important;


	}

	.search-left1 {
		float: left;
		text-align: left;
	}

	.search-left2 {
		float: left;
		height: 36px;
		line-height: 36px;
	}

	.search-left2 .el-input input {
		height: 32px !important;
		line-height: 32px !important;
	}

	.search-ul {
		margin-left: -15px;
		height: 40px;
	}

	.search-ul li {
		float: left;
		list-style: none;
	}

	.search-title {
		display: block;
		margin-top: 0em;
	}

	.search-box {
		margin-bottom: 22px;
		margin-right: 10px;
		vertical-align: top;
	}

	.search-box .el-form-item_content,
	.search-box .el-form-item_label {
		line-height: 36px;
	}

	.search-box .el-form-item_content {
		display: inline-block;
		vertical-align: top;
		position: relative;
		font-size: 14px;
	}

	.ys {
		padding: 7px 15px !important;
		font-size: 12px !important;
		border-radius: 3px;
		color: #fff !important;
	}


	.updateClass {
		background-color: #89e7b3 !important;
		border-color: #89e7b3 !important;
	}

	.deleteClass {
		background-color: #ffa4a4 !important;
		border-color: #ffa4a4 !important;
	}

	.el-main {
		text-align: left !important;
	}

	.action {
		margin-top: 17px;
	}

	.action>div {
		display: inline-block;
		margin: 0 5px;
	}
</style>
