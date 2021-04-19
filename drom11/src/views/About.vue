<template>
	<div>
		<el-container>
			<el-aside width="200px" style="text-align: left;">
				<div style="height: 50px;background: #2b2f3a;width: 199px;">
					<img src="../assets/tou.png" class="tou" />
					<span class="nav-zi">智慧宿管云平台</span>
				</div>
				<router-link to="about">
					<div class="index">
						<span>首页</span>
					</div>
				</router-link>
				<el-col :span="12" style="width:200px;">
					<el-menu :unique-opened="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
					 background-color="#393D49" text-color="#fff" active-text-color="#ffd04b" v-for="(lm,index) in asideMenu">
						<el-submenu :key="index" :index="''+index+''">
							<template slot="title" @click='gz(index)'>
								<span>{{lm.title}}</span>
							</template>
							<el-menu-item-group v-for="(item,cindex) in lm.items">
								<el-menu-item :index="lm.ids+'-'+cindex" :key="cindex" @click="appgo(index,cindex)">
									{{item}}</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
				</el-col>
				<el-col :span="12" style="width: 199px;height: 620px;background-color: rgb(57, 61, 73);"></el-col>
			</el-aside>
			<el-main>
				<div class="mainTitle">
					<div class="titleLeft">
						<i class="el-icon-s-fold" style="font-size:21px"></i>
						<span>首页</span>
					</div>
					<div class="titleRight">
						<ul>
							<li class="searchBox">
								<img src="../assets/sousuo.svg" @click="showToggle()" width="20px" />
								<span class="search" v-show="isshow">
									<input type="text" class="sea_input" name="keyword">
								</span>
							</li>
							<li style="line-height: 46px;">
								<img src="../assets/fangda.svg" @click='clickFullscreen' width="20px" />
							</li>
							<li class="promise">
								<el-tooltip class="item" effect="dark" content="布局大小" placement="bottom">
									<el-button>
										<img src="../assets/font-size.svg" width="20px" />
									</el-button>
								</el-tooltip>
							</li>
							<li class="user">
								<el-dropdown>
									<span class="el-dropdown-link">
										<img src="../assets/user.jpg" style="width: 40px;height: 40px;" />
										<i class="el-icon-caret-bottom"></i> -->
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item>个人中心</el-dropdown-item>
										<el-dropdown-item>布局设置</el-dropdown-item>
										<el-dropdown-item @click="open()">退出登录</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</li>
						</ul>
					</div>
				</div>
				<div class="link-view">
					<!-- <bread></bread> -->
				</div>
				<router-view />


			</el-main>
		</el-container>
	</div>
</template>
<script>
	// import bread from './Breadcrumb.vue'
	import screenfull from 'screenfull'
	export default {
		name: 'screenfull',
		data() {
			return {
				asideMenu: [],
				isFullscreen: false,
				isshow: false
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			selectAside() {
				this.$axios({
					url: "http://122.112.253.28:8095/prod-api/sys/menu/getRouters",
					method: "get",
					headers: {
						//把token放到请求头才能请求，这里的'Bearer '表示是后台希望更加的安全，依据后台给的信息看到底是加还是不加
						'Authorization': window.sessionStorage.token
					}
				}).then((result) => {
					var arraylist = []
					for (var i = 0; i < result.data.data.length; i++) {
						var leftNo = {
							title: result.data.data[i].meta.title,
							ids: '' + (i + 1) + '',
							items: []
						}
						for (let j = 0; j < result.data.data[i].children.length; j++) {
							leftNo.items.push(result.data.data[i].children[j].meta.title);
						}
						arraylist.push(leftNo)
					}
					this.asideMenu = arraylist;
				})
			},
			clickFullscreen() {
				if (!screenfull.isEnabled) {
					this.$message({
						message: 'you browser can not work',
						type: 'warning'
					})
					return false
				}
				screenfull.toggle()
			},
			showToggle() {
				this.isshow = !this.isshow
			},
			appgo(index1, index2) {
				console.log(index1 + "-" + index2);
				if (index1 == 0 && index2 == 0) {
					this.$router.push({
						path: 'classcontrol'
					});
				} else if (index1 == 0 && index2 == 1) {
					this.$router.push({
						path: 'dormitorymanage'
					});
				} else {
					path: 'index'
				}
				// if (index1 == 1 && index2 == 0) {
				// 	this.$router.push({
				// 		path: 'index'
				// 	});
				// } else if (index1 == 1 && index2 == 2) {
				// 	this.$router.push({
				// 		path: 'moban'
				// 	});
				// } else if (index1 == 2 && index2 == 1) {
				// 	this.$router.push({
				// 		path: 'moban2'
				// 	});
				// } else if (index1 == 3 && index2 == 0) {
				// 	this.$router.push({
				// 		path: 'moban3'
				// 	});
				// } else if (index1 == 1 && index2 == 1) {
				// 	this.$router.push({
				// 		path: 'release'
				// 	});
				// } else {
				// 	this.$router.push({
				// 		path: 'gongzuo'
				// 	});
				// }
			},
			open() {
				alert(111);
				this.$confirm('确定注销并退出系统吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '退出成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消退出'
					});
				});
			}

		},
		created() {
			this.token = sessionStorage.getItem('token');
		},
		mounted() {
			this.selectAside();
		}
	}
</script>
<style>
	.el-submenu .el-menu-item {
	    height: 50px;
	    line-height: 50px;
	    padding: 0 45px;
	    min-width: 199px !important;
	}
	a {
		text-decoration: none;
	}

	.router-link-active {
		text-decoration: none;
	}

	.searchBox {
		line-height: 46px;
	}

	.searchBox .search input {
		width: 30px;
	}

	.el-collapse-item__header {
		padding-left: 427px;
		font-size: 16px;
		height: 28px;
		line-height: 26px;
		color: #1890ff;
		border-radius: 4px;
	}

	.promise .el-button {
		display: inline-block;
		line-height: 46px;
		white-space: nowrap;
		cursor: pointer;
		background: #FFF;
		color: #606266;
		border: none;
		text-align: center;
		outline: 0;
		margin: 0;
		padding: 0 !important;
		transition: .1s;
		font-weight: 500;
		font-size: 14px;
	}

	ul li {
		list-style: none;
	}

	.index {
		text-align: left;
		width: 179px;
		padding-left: 20px;
		height: 56px;
		font-size: 14px;
		line-height: 56px;
		color: rgb(255, 255, 255);
		background-color: rgb(57, 61, 73);
	}

	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 50px;
	}

	.el-aside {
		color: #333;
		text-align: center;
		line-height: 200px;
	}

	.el-main {
		padding: 0;
		margin: 0;
		width: 100%;
		background-color: #fff;
		color: #333;
		text-align: center;
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}

	.tou {
		margin-top: 9px;
		text-align: center;
		width: 32px;
		height: 32px;
		float: left;
		margin-left: 21px;
	}

	.nav-zi {
		color: #fff;
		font-size: 14px;
		font-weight: bold;
		line-height: 50px;
		float: left;
		margin-left: 10px;
	}

	.mainTitle {
		height: 50px;
		overflow: hidden;
		position: relative;
		background: #fff;
		box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
	}

	.titleLeft {
		padding: 0 15px;
		float: left;
	}

	.titleRight {
		float: right;
	}

	.titleRight ul li {
		float: left;
		width: 20px;
		padding: 0 8px;
	}

	.titleRight ul li:last-child {
		width: 60px;
	}

	.titleRight ul li:first-child {
		width: auto;

	}


	.el-icon-s-fold {
		padding-right: 23px;
		line-height: 46px !important;
		float: left;
		font-weight: 400 !important;
		cursor: pointer;

		transition: background .3s;
		-webkit-tap-highlight-color: transparent;
	}

	.titleLeft span {
		color: #97a8be;
		font-size: 14px;
		line-height: 47px;
		display: inline-block;
		font-weight: 400 !important;
	}

	.titleRight .el-icon-search,
	.titleRight .el-icon-edit {
		line-height: 46px;
		font-size: 16px;
		font-weight: bold;

	}

	.big {
		line-height: 46px;
		font-size: 16px;
		font-weight: bold;
	}

	.titleRight img {
		vertical-align: middle;
		line-height: 46px;
		margin: 3px 0;
	}

	.titleRight .el-icon-caret-bottom {
		vertical-align: middle;
		font-size: 12px;
		margin-top: 25px;
	}
</style>
