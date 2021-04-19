<template>
	<div class="bg">
		<div class="form">
			<p class="loginTitle">
				智慧宿管云平台
			</p>
			<form class="loginForm">
				<div class="mb20">
					<el-input placeholder="请输入名字" prefix-icon="el-icon-user-solid" v-model="username">
					</el-input>
				</div>
				<div class="mb20">
					<el-input placeholder="请输入密码" prefix-icon="el-icon-s-cooperation" v-model="password" type="password">
					</el-input>
				</div>
				<div class="codeInput mb20">
					<div class="codeLeft">
						<el-input placeholder="验证码" prefix-icon="el-icon-finished" v-model="code" type="password">
						</el-input>
					</div>
					<div class="codeRight">
						<img :src="imgUrl" width="120px" height="36px" @click="changeCode()"/>
					</div>
				</div>
				<div class="mb20">
					<el-checkbox v-model="checked">记住密码</el-checkbox>
				</div>
				<div class="mb20 login">
					<el-button type="primary" @click="login()">登录</el-button>
				</div>
			</form>
		</div>
	</div>


</template>
<script>
	export default {
		data(){
			return {
				checked: true,
				username: '',
				password: '',
				imgUrl: '',
				code: '',
				uuid: ''
			}
		},
		methods: {
			login() {
				this.$axios({
					method: "post",
					url: "http://122.112.253.28:8095/prod-api/admin/login",
					data:{
						username: this.$data.username,
						password: this.$data.password,
						code: this.$data.code,
						uuid: this.$data.uuid
					}
				}).then((result) => {
					console.log(result)
					if (result.data.code == 200) {
						this.$message(result.data.message);
						window.sessionStorage.setItem('token',result.data.data.tokenHead+' '+result.data.data.token);
						this.$router.push("/about");
					} else {
						this.$message.error(result.data.message);
						this.username="";
						this.password="";
						this.code="";
					}
				})
			},
			Loading(){
				this.$axios({
					url: 'http://122.112.253.28:8095/prod-api/captchaImage',
					method: "get"
				}).then((result) => {
					this.imgUrl = "data:image/gif;base64," + result.data.data.img;
					this.uuid = result.data.data.uuid;
				})
			},
			changeCode(){
				this.Loading();
			}
		},
		created() {
			this.Loading();
		}
	}
</script>


<style>
	.bg {
		height: 624px;
		background-image: url(../assets/bg.png);
		background-size: 100% 100%;
		position: relative;
	}

	.form {
		text-align: left;
		border-radius: 6px;
		background: #fff;
		padding: 25px 25px 5px 25px;
		position: absolute;
		top: 99px;
		left: 475px;
	}

	.loginTitle {
		font-size: 1.17rem;
		font-weight: bold;
		margin: 0 auto 30px auto;
		text-align: center;
		color: #707070;
	}

	.loginForm input {
		height: 36px;
		line-height: 36px;
		width: 364px;

	}

	.codeInput::after {
		display: block;
		clear: both;
		content: "";
	}

	.codeInput input {
		width: 220px;

	}

	.el-input--prefix {
		width: 220x;
	}

	.codeLeft {
		float: left;
	}

	.codeRight {
		float: right;
	}

	.mb20 {
		margin-bottom: 20px;

	}

	.login .el-button--primary {
		width: 100%;
		font-size: 14px;
		border-radius: 4px;
		color: #fff;
		padding: 10px 20px;
		height: 36px;
		background-color: #1890ff;
		border-color: #1890ff;
	}
</style>
