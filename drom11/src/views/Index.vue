<template>
	<div class="index-table">
		<div class="domitory-table">
			<button class="openBtn" @click="dialogVisible = true">开闸</button>
			<form class="form-table">
				<div class="first-select">
					<div>
						<label class="search-label">宿舍栋号</label>
						<el-select v-model="value1" placeholder="请选择栋号">
							<el-option v-for="item in dongNum" :value="item.dictValue" :label="item.dictLabel" :key="item.dictValue">
								
							</el-option>
						</el-select>
					</div>
					<div>
						<label class="search-label">楼层</label>
						<el-select v-model="value2" placeholder="请选择楼层">
							<el-option v-for="item in floorNum" :value="item.dictValue" :label="item.dictLabel" :key="item.dictValue">
							</el-option>
						</el-select>
					</div>
					<div class="floor">
						<label class="search-label">宿舍号</label>
						<el-input v-model="input1" placeholder="请输入宿舍号" style="display: inline-block;"></el-input>
					</div>
				</div>
				<div class="second-select">
					<div>
						<span class="demonstration">请选择日期</span>
						<el-date-picker v-model="value3" type="date" placeholder="选择日期" >
						</el-date-picker>
						<el-button class="selectBtn" @click="likeQuery()">查询</el-button>
					</div>
				</div>
			</form>
			<el-collapse v-model="activeNames">
				<el-collapse-item title="缺勤学生详情,请点击展开" name="1">
					<div class="detail" v-for="item in room">
						<div class="box">
							<div class="box-title">
								<div class="box-left">
									{{item.roomName}}
								</div>
								<div class="box-right">
									宿舍总人数:{{item.total}}
								</div>
							</div>
							<div class="box-content">
								<el-badge :value="item.normal" class="item normal" style="margin-bottom: 18px;margin-left: 15px;margin-right: 15px;">
									<el-button size="small">正常</el-button>
								</el-badge>
								<el-badge :value="item.leaveCount" class="item" type="primary" style="margin-bottom: 18px;margin-left: 15px;margin-right: 15px;">
									<el-button size="small">请假</el-button>
								</el-badge>
								<el-badge :value="item.comebacklate" class="item lateCome" type="primary" style="margin: 0px 15px;">
									<el-button size="small">晚归</el-button>
								</el-badge>
								<el-badge :value="item.absence" class="item" style="margin: 0px 15px;">
									<el-button size="small">缺勤</el-button>
								</el-badge>
							</div>
						</div>
					</div>
				</el-collapse-item>
			</el-collapse>
			<el-dialog title="警告" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
				<i class="el-icon-warning" style="color:#ffba00;font-size: 24px !important;vertical-align: middle;float: left;"></i>
				<span style="float: left;padding-top: 2px;padding-left: 10px;">确定开闸？</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
				</span>
			</el-dialog>

		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				room: [],
				input1: '',
				value1: '',
				value2: '',
				value3: '',
				dongNum: [],
				floorNum: [],
				domitoryNum: [],
				activeNames: ['1'],
				
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}],
				},
			}
		},
		methods: {
			selectDong() {
				this.$axios({
					url: 'http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_building',
					method: "get",
					headers: {
						'Authorization':window.sessionStorage.token
					}
				}).then((result) => {
					this.dongNum=result.data.data;
					console.log(this.dongNum)
				})
			},
			selectFloor() {
				this.$axios({
					url: `http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_storey`,
					method: "get",
					headers: {
						'Authorization':window.sessionStorage.token
					}
				}).then((result) => {
					this.floorNum=result.data.data;
				})
			},
			selectIndex() {
				this.$axios({
					url: 'http://122.112.253.28:8095/prod-api/smartdor/sdAttence/listAbsenceDormitory?checkDate=&building=&storey=&bdormitory=',
					method: "get",
					headers: {
						'Authorization':window.sessionStorage.token
					}
				}).then((result) => {
					var allList = result.data.data.list;
					for (var i = 0; i < allList.length; i++) {
						this.$data.room.push(allList[i])
					}
				})
			},
			likeQuery(){
				this.$axios({
					url:'http://122.112.253.28:8095/prod-api/smartdor/sdAttence/listAbsenceDormitory?checkDate='+this.$data.value3+'&building='+this.$data.value1+'&storey='+this.$data.value2+'&bdormitory='+this.$data.input1+'',
					method:'get',
					headers: {
						'Authorization':window.sessionStorage.token
					}
				}).then((result)=>{
					this.$data.room=result.data.data.list;
				})
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			}

		},
		created() {
			this.selectDong();
			this.selectFloor();
			this.selectIndex();
		}

	};
</script>

<style>
	.box {
		float: left;
		margin:5px;
	}

	.floor .el-input {
		font-size: 14px !important;
		width: 0;
		position: none;
		display: inline-block !important;
	}

	button,
	input,
	optgroup,
	select,
	textarea {
		font-family: sans-serif;
		font-size: 100%;
		line-height: 1.15;
		margin: 0;
	}

	button,
	input {
		overflow: visible;
	}

	button,
	select {
		text-transform: none;
	}

	.el-dialog__header {
		padding: 15px 20px 10px;

	}

	.dialog-footer {
		padding: 24px 20px 12px;
	}

	.dialog-footer .el-button {
		padding: 9px 15px;
		font-size: 12px;
		border-radius: 3px;
		display: inline-block;
		line-height: 1;
		white-space: nowrap;
		cursor: pointer;
		background: #fff;
		border: 1px solid #dcdfe6;
		border-color: #dcdfe6;
		color: #606266;
		text-align: center;
		box-sizing: border-box;
		outline: none;
		margin: 0;
		transition: .1s;
		font-weight: 400;
	}

	.dialog-footer .el-button--primary {
		color: #FFF;
		background-color: #409EFF;
		border-color: #409EFF;
	}

	.el-dialog__body {
		padding: 4px 20px !important;
	}

	.box {
		width: 226px;
		float: left;
		height: 181px;
		font-weight: 700;
		font-size: 16px;
		box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
		border-radius: 4px;
		border: 1px solid #e6ebf5;
		background-color: #fff;
		overflow: hidden;
		transition: .3s;
		margin-bottom: 10px;
	}

	.box-title {
		padding: 8px 15px 7px;
		min-height: 40px;
		border-bottom: 1px solid #e6ebf5;
		box-sizing: border-box;
	}

	.box-left {
		float: left;

	}

	.box-right {
		float: right;
	}

	.box-content {
		padding: 15px 20px 20px 20px;

	}

	.lateCome .el-badge__content--primary {
		background-color: #ffba00;
	}

	.normal .el-badge__content {
		background-color: #13ce66;
	}

	.index-table {
		padding: 32px;
		background-color: #fff;
		position: relative;
	}

	.openBtn {
		background-color: red;
		color: white;
		border: none;
		outline: none;
		padding: 8px 19px;
		font-size: 14px;
		border-radius: 4px;
		text-align: center;

	}

	.domitory-table {
		padding: 0;
		margin: 0;
		text-align: left;
	}

	.link-view {
		height: 30px;
		border: 1px solid red;
	}

	.form-table {
		text-align: center;
	}

	.first-select {
		height: 59px;
		text-align: left;
		margin-left: 117px;
		margin-right: -5px;
		margin-bottom: 8px;
	}

	.first-select div {
		height: 36px;
		display: inline-block;
	}

	.first-select div input {
		height: 36px;
		line-height: 36px;
		font-size: 14px;
		padding-right: 30px;
		background-color: #fff;
		background-image: none;
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		box-sizing: border-box;
		color: #606266;
		display: inline-block;
		outline: none;
		padding: 0 15px;
		transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
		width: 180px;
		vertical-align: top;
	}

	.second-select {
		height: 59px;
		text-align: center;
		margin-left: -5px;
		margin-right: -5px;
		margin-bottom: 8px;
	}

	.search-label {
		width: 85px;
		float: left;
		text-align: right;
		font-size: 14px;
		color: #606266;
		display: inline-block;
		padding: 9px 10px 0 0;
		box-sizing: border-box;
	}

	.demonstration {
		font-size: 14px;
		color: #606266;
		font-weight: 700 !important;
		padding: 0 10px 0 0;
	}

	.el-date-picker {
		width: 180px;
		height: 36px;
	}

	label {
		font-weight: 700;
	}
	.el-button{
	}

	.selectBtn {
		height: 36px;
		padding: 0 20px !important;
		font-size: 14px;
		margin-left: 14px !important;
		border-radius: 4px;
		margin-left: 10px;
		line-height: 36px;
		color: #fff !important;
		background-color: #1890ff !important;
		text-align: center;
		border: none;
		display: inline-block;
		cursor: pointer;
		font-weight: 400;
	}

	.el-badge__content {
		border-radius: 10px;
		color: #FFF;
		display: inline-block;
		font-size: 12px;
		height: 18px;
		line-height: 18px;
		padding: 0 6px;
		text-align: center;
		white-space: nowrap;
		border: 1px solid #FFF;
	}
</style>
