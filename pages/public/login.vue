<template>
	<view class="container">
		<!-- #ifndef MP-WEIXIN -->
		<view class="register">
			<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
			<view :style="isopen?'':'padding-top: 100rpx;'" style="margin-left: 36upx;">
				<view style="color: #333333;font-size: 44upx;">手机快捷登录</view>
				<view style="color: #999999;font-size: 24upx;margin-top: 20upx;">未注册的手机号将自动创建账号</view>
			</view>
			<view style="margin-left: 26upx;margin-top: 104upx;margin-right: 26upx;">
				<wInput v-model="phoneData" type="number" maxlength="11" placeholder="请输入手机号"></wInput>
				<!-- <wInput v-model="passData" type="number" maxlength="6" placeholder="请输入密码"></wInput> -->
				<wInput v-model="verCode" type="number" maxlength="6" placeholder="请输入验证码" isShowCode ref="runCode"
					@setCode="sendMsg()"></wInput>
				<wInput v-show="show" v-model="invitation" isShowGet ref="setNumberCode" @setNumberCode="isShowGet()"
					placeholder="请填写邀请码"></wInput>
			</view>

			<view class="footer" style=" margin-right: 72px;">
				<image v-if="showAgree" @tap="isShowAgree"
					src="https://api.shengqianxiong.com.cn/img/20201112/669aa8946cfb4ebdb459d57193c0ebca.png"
					style="width: 36upx;height: 36upx;"></image>
				<image v-else @tap="isShowAgree"
					src="https://api.shengqianxiong.com.cn/img/20201112/1e9102fc891f4d86a13c7b2ba6921cba.png"
					style="width: 36upx;height: 36upx;"></image>
				<text style="margin-left: 10upx;margin-right: 0;">同意</text>
				<navigator url="/my/setting/mimi" open-type="navigate">《隐私政策》</navigator>和
				<navigator url="/my/setting/xieyi" open-type="navigate">《用户服务协议》</navigator>
			</view>
			<wButton text="登 录" :rotate="isRotate" @click.native="startReg()"></wButton>

			<wButton text="微信快捷登录" :rotate="isRotate" @click.native="bingwx()" v-if="isopen"
				style="margin-top: -50rpx;"></wButton>
		</view>
		<view class="flex align-center justify-center" style="margin-top: 120rpx;">
			<view @click="loginPhone()" class="icons">
				<image src="../../static/images/my/loginPhone.png" mode=""></image>
				<view>账号密码登录</view>
			</view>

			<!-- 	<view @click="bingwx()" class="icons" v-if="isopen">
				<image src="../../static/images/my/loginwx.png" mode=""></image>
				<view>微信登录</view>
			</view> -->

		</view>
		<!-- #endif -->
		<!-- 小程序状态下登录 -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="mp_wxBox">
			<view>
				<view class="headers">
					<image src="../../static/logo.png" style="border-radius: 50%;"></image>
				</view>
				<view class="content">
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>
				<button v-show="weixinPhone" style="background: #fd6416;color: #FFFFFF;" class="bottom"
					open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
					授权手机号
				</button>
				<button v-show="!weixinPhone" style="background: #fd6416;color: #FFFFFF;" class='bottom'
					bindtap="getUserProfile" @tap="wxGetUserInfo">
					授权登录
				</button>
			</view>
		</view>
		<view>
			<view class="footer">
				<image v-if="showAgree" @tap="isShowAgree"
					src="https://api.shengqianxiong.com.cn/img/20201112/669aa8946cfb4ebdb459d57193c0ebca.png"
					style="width: 36upx;height: 36upx;"></image>
				<image v-else @tap="isShowAgree"
					src="https://api.shengqianxiong.com.cn/img/20201112/1e9102fc891f4d86a13c7b2ba6921cba.png"
					style="width: 36upx;height: 36upx;"></image>
				<text style="margin-left: 10upx;margin-right: 0;">同意</text>
				<navigator url="/my/setting/mimi" open-type="navigate">《隐私政策》</navigator>和
				<navigator url="/my/setting/xieyi" open-type="navigate">《用户协议》</navigator>
			</view>
		</view>
		<!-- #endif -->

	</view>
</template>
<script>
	import {
		typeList
	} from '@/apis/pages.js'
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button
	import {
		quickLogin,
		sendMsg,
		wxLogin,
		insertWxUser,
		selectPhone,
		getOpenId,
		openidLogin
	} from '@/apis/login.js'
	import {queryInsert} from '@/apis/my.js'
	export default {
		components: {
			wInput,
			wButton,
		},
		data() {
			return {
				mobile: '',
				code: '',
				weixinLogin: false,
				sending: false,
				sendTime: '获取验证码',
				count: 60,
				weixinPhone: false,
				sendDataList: {},
				sessionkey: '',
				phoneNum: false,

				phoneData: '',
				verCode: '',
				invitation: '',
				show: '',
				showAgree: false, //协议是否选择
				isRotate: false, //是否加载旋转
				platform: "h5",

				isopen: false,
			};
		},
		onLoad(e) {
			if (e.inviterCode) {
				this.$queue.setData('inviterCode', e.inviterCode);
			}
			// #ifdef H5
			let ua = navigator.userAgent.toLowerCase();
			if (ua.indexOf('micromessenger') !== -1) {
				//公众号是否自动登录  297
				typeList('108').then(res => {
					if (res.code == 0) {
						if (res.data && res.data.value && res.data.value == '是') {
							this.isopen = true;
						} else {
							this.isopen = false;
						}
					}
				})
			} else {
				this.isopen = false;
			}
			// #endif
			// #ifdef H5
			this.selbindwx()
			// #endif
		},
		methods: {
			selbindwx() {
				let ua = navigator.userAgent.toLowerCase();
				if (ua.indexOf('micromessenger') !== -1) {
					let openid = uni.getStorageSync('openid');
					let userId = uni.getStorageSync('userId');
					// let that = this;
					if (window.location.href.indexOf('?code=') !== -1 || window.location.href.indexOf('&code=') !==
						-1) {
						let code;
						if (window.location.href.indexOf('?code=') !== -1) {
							code = window.location.href.split('?code=')[1].split('&')[0];
						} else {
							code = window.location.href.split('&code=')[1].split('&')[0];
						}
						let data = {
							code: code
						}
						getOpenId(data).then(ret => {
							if (ret.code == 0) {
								uni.setStorageSync('openid', ret.data)
								openidLogin({
									openId: ret.data
								}).then(res => {
									if (res.code == 0) {
										this.$queue.setData("phone", res.user.phone);
										this.$queue.setData("userId", res.user.userId);
										this.$queue.setData("token", res.token);
										uni.setStorageSync('sex', res.user.sex)
										uni.setStorageSync('openId', res.user.openId)
										this.$queue.setData("userName", res.user.userName);
										this.$queue.setData("avatar", res.user.avatar);
										this.$queue.setData("invitationCode", res.user.invitationCode);
										this.$queue.setData("inviterCode", res.user.inviterCode);
										uni.switchTab({
											url: '/pages/index/index'
										})
									} else {
										uni.navigateTo({
											url: '/pages/public/bind'
										});
									}
								})
							}
						})
					}
				}
			},
			// 微信公众号登录
			bingwx() {
				if (this.showAgree == false) {
					uni.showToast({
						title: '请先同意《隐私政策》和《用户服务协议》',
						icon: 'none'
					})
					return
				}
				let ua = navigator.userAgent.toLowerCase();
				if (ua.indexOf('micromessenger') !== -1) {
					let openid = uni.getStorageSync('openid');
					let userId = uni.getStorageSync('userId');

					if (!openid) {
						if (window.location.href.indexOf('?code=') !== -1 || window.location.href.indexOf('&code=') !==
							-1) {
							let code;
							if (window.location.href.indexOf('?code=') !== -1) {
								code = window.location.href.split('?code=')[1].split('&')[0];
							} else {
								code = window.location.href.split('&code=')[1].split('&')[0];
							}
							let data = {
								code: code
							}
							getOpenId(data).then(ret => {
								if (ret.code == 0) {
									uni.setStorageSync('openid', ret.data)
									let datas = {
										openId: ret.data
									}
									openidLogin(datas).then(res => {
										if (res.code == 0) {
											this.$queue.setData("phone", res.user.phone);
											this.$queue.setData("userId", res.user.userId);
											this.$queue.setData("token", res.token);
											uni.setStorageSync('sex', res.user.sex)
											uni.setStorageSync('openId', res.user.openId)
											this.$queue.setData("userName", res.user.userName);
											this.$queue.setData("avatar", res.user.avatar);
											this.$queue.setData("invitationCode", res.user.invitationCode);
											this.$queue.setData("inviterCode", res.user.inviterCode);
											uni.switchTab({
												url: '/pages/index/index'
											})
										} else {
											uni.navigateTo({
												url: '/pages/public/bind'
											});
										}
									})
								}
							})

						} else {
							let that = this;
							window.location.href =
								'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
								that.$queue.getWxAppid() +
								'&redirect_uri=' +
								window.location.href.split('#')[0] +
								'&response_type=code&scope=snsapi_userinfo#wechat_redirect';
						}
					} else {
						openidLogin({
							openId: openid
						}).then(res => {
							if (res.code == 0) {
								this.$queue.setData("phone", res.user.phone);
								this.$queue.setData("userId", res.user.userId);
								this.$queue.setData("token", res.token);
								this.$queue.setData("userName", res.user.userName);
								this.$queue.setData("avatar", res.user.avatar);
								this.$queue.setData("invitationCode", res.user.invitationCode);
								this.$queue.setData("inviterCode", res.user.inviterCode);
								uni.switchTab({
									url: '/pages/index/index'
								})
							} else {
								uni.navigateTo({
									url: '/pages/public/bind'
								});
							}
						})

					}
				}
			},
			//小程序微信登录后获取手机号
			getPhoneNumber: function(e) {
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
					console.log('用户拒绝提供手机号');
				} else {
					console.log('用户同意提供手机号');
					console.log(e)
					this.setPhoneByInsert(e.detail.encryptedData, e.detail.iv);
				}
			},
			//小程序微信登录后获取手机号
			setPhoneByInsert(decryptData, iv) {
				let data = {
					decryptData: decryptData,
					key: this.sessionkey,
					iv: iv
				};
				selectPhone(data).then(res => {
					if (res.code == 0) {
						this.phone = res.data.phoneNumber;
						this.getWeixinInfo(this.sendDataList);
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			//微信授权登录
			wxGetUserInfo(e) {
				if (this.showAgree == false) {
					uni.showToast({
						title: '请先同意《隐私政策》和《用户服务协议》',
						icon: 'none'
					})
					return
				}
				wx.getUserProfile({
					desc: '业务需要',
					success: infoRes => {
						console.log("infoRes.encryptedData__________:" + JSON.stringify(infoRes.userInfo))
						let nickName = infoRes.userInfo.nickName; //昵称
						let avatarUrl = infoRes.userInfo.avatarUrl; //头像
						let sex = infoRes.userInfo.gender; //头像
						try {
							this.$queue.showLoading('正在登录中...');
							this.login(nickName, avatarUrl, sex);
						} catch (e) {}
					}
				})
			},
			//登录
			login(nickName, avatarUrl, sex) {
				let that = this;
				// 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes, '************')
						let data = {
							code: loginRes.code,
						}
						wxLogin(data).then(res => {
							uni.hideLoading()
							if (res.code == 0) {
								uni.setStorageSync('openId', res.data.open_id)
								uni.setStorageSync('unionId', res.data.unionId)
								that.sessionkey = res.data.session_key;
								let inviterCode = '';
								if (uni.getStorageSync('inviterCode')) {
									inviterCode = uni.getStorageSync('inviterCode')
								}
								let sendData = {
									openId: uni.getStorageSync('openId'),
									unionId: uni.getStorageSync('unionId'),
									userName: nickName,
									avatar: avatarUrl,
									sex: sex, //性别
									inviterCode: inviterCode //别人登录进来携带你的邀请码
								};
								that.sendDataList = sendData;
								that.flag = res.data.isPhone;
								// 第一次登录获取手机号
								if (that.flag == '2' || that.flag == 2) {
									//登录是否获取手机号 188
									// typeList('188').then(res => {
									// 	if (res.code == 0) {
									// 		if (res.data && res.data.value && res.data.value == '是') {
									// 			that.weixinPhone = true;
									// 		} else {
									// 			that.getWeixinInfo(sendData);
									// 		}
									// 	}
									// })
									that.weixinPhone = true;
								} else {
									that.getWeixinInfo(sendData);
								}

							} else {
								uni.showToast({
									icon: 'none',
									title: res.msg,
									duration: 2000
								});
							}
						})
					}
				});
			},
			//获取个人信息
			getWeixinInfo(sendData) {
				let that = this;
				uni.showLoading({
					title: '登录中...'
				});
				let postData = {
					openId: sendData.openId, //小程序openId
					unionId: sendData.unionId, //unionId
					userName: sendData.userName, //微信名称
					avatar: sendData.avatar, //头像
					sex: sendData.sex, //性别
					phone: that.phone,
					inviterCode: sendData.inviterCode
				};
				insertWxUser(postData).then(res => {
					uni.hideLoading();
					if (res.code == 0) {
						uni.setStorageSync('token', res.token)
						uni.setStorageSync('userInfo', res.user)
						uni.setStorageSync('userId', res.user.userId)
						uni.setStorageSync('invitationCode', res.user.invitationCode)
						uni.setStorageSync('userId', res.user.userId)
						uni.setStorageSync('openId', res.user.openId)
						that.getUserInforz()
						uni.navigateBack();
					} else {
						uni.showModal({
							showCancel: false,
							title: '登录失败',
							content: res.msg,
						});
					}
				})
			},
			loginPhone() {
				uni.navigateTo({
					url: '/pages/public/loginphone'
				})
			},
			isShowAgree() {
				this.showAgree = !this.showAgree
			},
			//快捷登录
			startReg() {
				if (this.showAgree != true) {
					uni.showToast({
						title: '请同意《隐私政策》和《用户服务协议》',
						icon: 'none'
					})
					return
				}
				if (this.phoneData == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				if (this.verCode == '') {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return
				}
				let _this = this
				let inviterCode = ''
				if (uni.getStorageSync('inviterCode')) {
					inviterCode = uni.getStorageSync('inviterCode')
				}
				uni.getSystemInfo({
					success(ret) {
						let data = {
							phone: _this.phoneData,
							verificationCode: _this.verCode,
							platform: 'H5',
							sysPhone: ret.platform == 'ios' ? 2 : 1,
							inviterCode: inviterCode
						}
						quickLogin(data).then(res => {
							if (res.code == 0) {
								uni.setStorageSync('token', res.token)
								uni.setStorageSync('userInfo', res.user)
								uni.setStorageSync('userId', res.user.userId)
								_this.getUserInforz()
								uni.navigateBack();
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}
						})
					}
				})
			},
			getUserInforz(){//获取认证信息
				queryInsert().then(res => {
					if (res.code == 0 && res.data) {
						//认证类型 1:个人 2:企业
						uni.setStorageSync('statusType', res.data.userType)
						//认证状态 0:审核中 1:通过 2:拒绝
						uni.setStorageSync('statusStauts', res.data.status)
					} else {
						uni.removeStorageSync('statusType')
						uni.removeStorageSync('statusStauts')
					}
				})
			},
			sendMsg() {
				const {
					phoneData
				} = this;
				if (!phoneData) {
					this.$queue.showToast("请输入手机号");
				} else if (phoneData.length !== 11) {
					this.$queue.showToast("请输入正确的手机号");
				} else {
					this.$queue.showLoading("正在发送验证码...");
					let data = {
						phone: phoneData
					}
					sendMsg(data).then(res => {
						console.log(res)
						if (res.code === 0) {
							if (res.data === 'register') {
								this.show = true;
							}
							this.sending = true;
							this.$queue.showToast('验证码发送成功请注意查收');
							this.$refs.runCode.$emit('runCode');
							uni.hideLoading();
						} else {
							uni.hideLoading();
							uni.showModal({
								showCancel: false,
								title: '短信发送失败',
								content: res.msg ? res.msg : '请一分钟后再获取验证码',
							});
						}
					})
				}
			},
			navBack() {
				uni.navigateBack();
			},
		}
	};
</script>

<style lang="scss">
	page {
		height: 100%;
		background: #FFF;
	}

	.icons {
		width: 100%;
		height: auto;
		// margin-top: 200rpx;
		text-align: center;

		image {
			width: 60rpx;
			height: 60rpx;
		}
	}

	.iconsTxt {
		width: 100%;
		text-align: center;
		margin-top: 20rpx;
		font-size: 18rpx;
		color: #999999;
	}

	.footer {

		margin-top: 32upx;
		font-size: 24upx;
		color: #666666;
		// text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.confirm-btn-weixin {
		width: 200px;
		height: 42px;
		line-height: 42px;
		border-radius: 30px;
		margin-top: 40upx;
		background: -moz-linear-gradient(left, #f15b6c, #e10a07 100%);
		background: -webkit-gradient(linear, left top, left right, color-stop(0, #f15b6c), color-stop(100%, #e10a07));
		background: -webkit-linear-gradient(left, #f15b6c 0, #e10a07 100%);
		background: -o-linear-gradient(left, #f15b6c 0, #e10a07 100%);
		background: -ms-linear-gradient(left, #f15b6c 0, #e10a07 100%);
		background: linear-gradient(to left, #f15b6c 0, #e10a07 100%);
		color: #fff;
		font-size: 32upx;

		&:after {
			border-radius: 60px;
		}
	}

	.confirm-btn {
		width: 200px;
		height: 42px;
		line-height: 42px;
		border-radius: 30px;
		margin-top: 300upx;
		background: -moz-linear-gradient(left, #f15b6c, #e10a07 100%);
		background: -webkit-gradient(linear, left top, left right, color-stop(0, #f15b6c), color-stop(100%, #e10a07));
		background: -webkit-linear-gradient(left, #f15b6c 0, #e10a07 100%);
		background: -o-linear-gradient(left, #f15b6c 0, #e10a07 100%);
		background: -ms-linear-gradient(left, #f15b6c 0, #e10a07 100%);
		background: linear-gradient(to left, #f15b6c 0, #e10a07 100%);
		color: #fff;
		font-size: 32upx;

		&:after {
			border-radius: 60px;
		}
	}

	.headers {
		text-align: center;
	}

	.headers>image {
		width: 400upx;
		height: 400upx;
	}

	// .footer {
	// 	padding-left: 100upx;
	// 	margin-top: 32upx;
	// 	font-size: 24upx;
	// 	color: #666666;
	// 	text-align: center;
	// 	display: flex;
	// }

	page {
		background: #fff;
	}

	.send-msg {
		border-radius: 30px;
		color: black;
		background: white;
		height: 30px;
		font-size: 14px;
		line-height: 30px;
	}

	.container {
		top: 0;
		padding-top: 32upx;
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		// background: #111224;
		// color: #FFF;

		.mp_wxBox {
			.headers {
				margin: 35% auto 50rpx;
				text-align: center;
				border-radius: 60rpx;
				width: 650rpx;
				height: 300rpx;
				line-height: 450rpx;

				image {
					width: 300rpx;
					height: 300rpx;
				}
			}

			.content {
				text-align: center;
			}

			text {
				display: block;
				color: #9d9d9d;
				margin-top: 40rpx;
			}

			.bottom {
				line-height: 80upx;
				border-radius: 80upx;
				margin: 70rpx 50rpx;
				height: 80upx;
				font-size: 35rpx;
			}
		}
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 20px;
	}

	.input-content {
		padding: 0 20px;
	}

	.confirm-btn {
		width: 300px;
		height: 42px;
		line-height: 42px;
		border-radius: 30px;
		margin-top: 40px;
		background: linear-gradient(to left, #3f5ecb 0, #5074FF 100%);
		color: #fff;
		// font-size: $font-lg;

		&:after {
			border-radius: 60px;
		}
	}
</style>