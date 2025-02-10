<template>
	<view class="feadtop">
		<view class="bg padding">
			<view class="flex align-center">
				<view class="u-m-r-10">
					<image :src="userInfo.avatar?userInfo.avatar:avatar"
						style="width: 100rpx;height: 100rpx;border-radius: 100rpx;" @click="goUserInfo"></image>
				</view>
				<view class="u-flex-1 u-m-l-10" v-if="!isLogin">
					<view class="u-font-18 margin-left-sm text-bold flex">
						{{userInfo.userName}}
						<image v-if="isVip!=0" src="../../static/images/my/myvip.png"
							style="width: 40rpx;height: 40rpx;border-radius: 50%;margin-left: 10rpx;" mode=""></image>
					</view>
					<view v-if="isVip==0" class=" margin-left-sm  text-sm">暂未开通会员</view>
					<view v-else class=" margin-left-sm  text-sm">会员用户</view>
				</view>
				<view v-else class="text-xl u-p-l-20 text-bold" @click="goLogin('/pages/public/login')">
					登录
				</view>
			</view>
			<view class="flex align-center margin-top-sm" v-if="XCXIsSelect!='否'">
				<view class="text-center" style="width: 25%;" @click="goNav('/my/feedback/shouCang')">
					<view>{{myScFollowCount}}</view>
					<view>收藏服务</view>
				</view>
				<view class="text-center" style="width: 25%;" @click="goNav('/my/feedback/myGuanZhu')">
					<view>{{myUserFollowCount}}</view>
					<view>店铺关注</view>
				</view>
				<view class="text-center" style="width: 25%;" @click="goNav('/my/feedback/zuji')">
					<view>{{browseCount}}</view>
					<view>历史浏览</view>
				</view>
				<view class="text-center" style="width: 25%;" @click="goNav('/my/feedback/myFance')">
					<view>{{followCount}}</view>
					<view>店铺粉丝</view>
				</view>
			</view>
			<view class="margin-top" style="position: relative;" v-if="XCXIsSelect!='否'">
				<image src="../../static/images/my/vipbg.png" style="width: 100%;height: 90rpx;" mode=""></image>
				<view v-if="isVip==0" class="btn-bg" style="color: #E3B97E;margin-top: 0rpx;"
					@click="goNav('/my/vip/index')">立即开通

				</view>
				<view v-else class="btn-bg" style="color: #E3B97E;margin-top: 0rpx;" @click="goNav('/my/vip/index')">已开通
				</view>
			</view>
		</view>

		<view class="bg margin-top-sm padding-bottom-sm" v-if="XCXIsSelect!='否'">
			<view class="text-lg text-bold padding">我的发布</view>
			<view class="flex justify-around text-center">
				<!-- 我的发布 -->
				<view style="width: 25%;" @click="goNav('/my/publish/index',1)">
					<image src="../../static/images/my/fabu.png" style="width:60upx;height: 60upx;" mode="">
					</image>
					<view class="text-df" style="line-height: 50upx;">我的发布</view>
				</view>
				<!-- 我的订单 -->
				<!-- <view style="width: 25%;" @click="goNav('/my/order/index')">
					<image src="../../static/images/my/order.png" style="width: 60upx;height: 60upx;" mode="">
					</image>
					<view class="text-df" style="line-height: 50upx;">我的订单</view>
				</view> -->
				<!-- 我的店铺 -->
				<view style="width: 25%;" @click="goNav('/my/store/index',2)">
					<image src="../../static/images/my/dianpu.png" style="width: 60upx;height: 60upx;" mode="">
					</image>
					<view class="text-df" style="line-height: 50upx;">我的店铺</view>
				</view>
				<!-- 我的钱包 -->
				<!-- <view style="width: 25%;" @click="goNav('/my/wallet/index')">
					<image src="../../static/images/my/qianbao.png" style="width: 60upx;height: 60upx;" mode="">
					</image>
					<view class="text-df" style="line-height: 50upx;">钱包记录</view>
				</view> -->
				<view style="width: 25%;" @click="goNav('/my/wallet/moneyList')">
					<image src="../../static/images/my/qianbao.png" style="width: 60upx;height: 60upx;" mode="">
					</image>
					<view class="text-df" style="line-height: 50upx;">钱包记录</view>

				</view>
			</view>
			<!-- <view class="bg margin-top-sm">
				<view class="padding-sm flex" style="background: #F7F7F5;width: 686upx;margin: 0 auto;">
					<image src="../../static/logo.png" style="width: 93upx;height: 93upx;"></image>
					<view class="flex justify-between align-center margin-left-sm" style="width: 85%;">
						<view>
							<view class="text-df text-bold">交易成功，待评价</view>
							<view class="text-sm margin-top-xs" style="color: #999999;">快给对方一个评价吧</view>
						</view>
						<view class="gobtn"  @click="goNav('/my/feedback/index')">去评价</view>
					</view>
				</view>
			</view> -->
		</view>

		<view class="bg margin-top-sm">
			<view class="text-lg text-bold padding">推荐工具</view>
			<view class="flex text-center flex-wrap padding-bottom">
				<!-- 我的认证 -->
				<view class="padding-bottom-sm" v-if="XCXIsSelect!='否'"
					@click="statusType==''?goNav('/my/renzheng/check'):(statusType==1?goNav('/my/renzheng/index'):goNav('/my/renzheng/company'))"
					style="width: 25%;">
					<image src="../../static/images/my/renzheng.png" style="width: 55upx;height: 55upx;" mode="">
					</image>
					<view class="text-df" style="line-height: 50upx;">我的认证</view>
				</view>
				<!-- 会员中心 -->
				<view class="padding-bottom-sm" @click="goNav('/my/vip/index')" style="width: 25%;"
					v-if="XCXIsSelect!='否'">
					<image src="../../static/images/my/vip.png" style="width: 55upx;height: 55upx;" mode=""></image>
					<view class="text-df" style="line-height: 50upx;">会员中心</view>
				</view>
				<!-- 邀请好友 -->
				<view class="padding-bottom-sm" @click="goNav('/pages/my/invitationUser')" style="width: 25%;"
					v-if="XCXIsSelect!='否'">
					<image src="../../static/images/my/yaoqing.png" style="width: 55upx;height: 55upx;" mode=""></image>
					<view class="text-df" style="line-height: 50upx;">邀请好友</view>
				</view>
				<!-- 联系客服 -->
				<view class="padding-bottom-sm" @click="changekefu" style="width: 25%;" v-if="XCXIsSelect!='否'">
					<image src="../../static/images/my/kefu.png" style="width: 55upx;height: 55upx;" mode=""></image>
					<view class="text-df" style="line-height: 50upx;">联系客服</view>
				</view>
				<!-- 意见反馈 -->
				<view class="padding-bottom-sm" @click="goNav('/my/feedback/index')" style="width: 25%;"
					v-if="XCXIsSelect!='否'">
					<image src="../../static/images/my/yijian.png" style="width: 55upx;height: 55upx;" mode=""></image>
					<view class="text-df" style="line-height: 50upx;">意见反馈</view>
				</view>
				<!-- 我的举报 -->

				<view class="padding-bottom-sm" @click="goNav('/my/feedback/myTousu')" style="width: 25%;"
					v-if="XCXIsSelect!='否'">
					<image src="../../static/images/my/tousu.png" style="width: 55upx;height: 55upx;" mode=""></image>
					<view class="text-df" style="line-height: 50upx;">我的举报</view>
				</view>
				<!-- 帮助中心 -->
				<view class="padding-bottom-sm" @click="goNav('/my/setting/help')" style="width: 25%;">
					<image src="../../static/images/my/help.png" style="width: 55upx;height: 55upx;" mode=""></image>
					<view class="text-df" style="line-height: 50upx;">帮助中心</view>
				</view>
				<!--  我的团队-->
				<view class="padding-bottom-sm" @click="goNav('/my/team/team')" style="width: 25%;" v-if="zhiRate>0">
					<image src="../../static/images/my/anquan.png" style="width: 55upx;height: 55upx;" mode=""></image>
					<view class="text-df" style="line-height: 50upx;">我的团队</view>
				</view>
				<!-- 设置中心 -->
				<view class="padding-bottom-sm" v-if="token" @click="goNav('/my/setting/index')" style="width: 25%;">
					<image src="../../static/images/my/login.png" style="width: 55upx;height: 55upx;" mode=""></image>
					<view class="text-df" style="line-height: 50upx;">设置中心</view>
				</view>
			</view>
		</view>
		<u-tabbar :list="tabbarList" :mid-button="true" bg-color="#FFFFFF" active-color="#FF6800"
			inactive-color="#CCCCCC">
		</u-tabbar>
	</view>
</template>

<script>
	import {
		userInfo
	} from '@/apis/login.js'
	import {
		selectAmount,
		queryInsert
	} from '@/apis/my.js'
	export default {
		data() {
			return {
				tabbarList: this.$store.state.list,
				avatar: '../../static/logo.png',
				isLogin: true,
				userName: '匿名',
				token: '',
				invitationCode: '', //邀请码
				renzheng: 0,
				userId: '',
				userInfo: {},
				browseCount: 0,
				followCount: 0,
				myScFollowCount: 0,
				myUserFollowCount: 0,
				statusType: '',
				isVip: 0, //未开通
				XCXIsSelect: '否',
				zhiRate: 0
			}
		},
		onLoad() {

		},
		onShow() {
			this.XCXIsSelect = this.$queue.getData('XCXIsSelect')
			this.token = uni.getStorageSync('token')
			this.userId = uni.getStorageSync('userId')
			console.log(this.userId)
			if (this.userId) {
				this.getUserInforz()
				this.isLogin = false
				this.getUserInfo()
				this.getAmount()
				//获取认证信息
				// this.getQueryInsert()
				if (uni.getStorageSync('statusType')) {
					this.statusType = uni.getStorageSync('statusType')
				}

			} else {
				this.userInfo = {}
				this.isLogin = true
				this.userName = '匿名'
				this.browseCount = 0
				this.followCount = 0
				this.myScFollowCount = 0
				this.myUserFollowCount = 0
				this.avatar = '../../static/logo.png'
			}

		},
		methods: {
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
			//联系客服
			changekefu() {
				let kefu = this.$queue.getData('kefu'); // 用户端联系方式 1 手机号 2企业微信
				let kefuPhone = this.$queue.getData('kefuPhone');
				if (kefu == 1) {
					uni.makePhoneCall({
						phoneNumber: kefuPhone //仅为示例
					});
				} else if (kefu == 2) {
					// #ifdef MP-WEIXIN
					let that = this
					try {
						wx.openCustomerServiceChat({
							extInfo: {
								url: that.$queue.getData('kefuUrl')
							},
							corpId: that.$queue.getData('kefuAppId'),
							success(res) {},
							fail(res) {
								console.error(res)
							}
						})
					} catch (error) {
						console.error("catchcatch" + error)
						uni.showToast({
							title: '请更新至微信最新版本'
						});
					}
					// #endif
					// #ifndef MP-WEIXIN
					let url = this.$queue.getData('kefuUrl');
					if (url.indexOf('/pages/') !== -1 || url.indexOf('/my/') !== -1) {
						uni.navigateTo({
							url
						});
					} else {
						//#ifndef H5
						uni.navigateTo({
							url: '/pages/index/webView?url=' + url
						});
						//#endif
						//#ifdef H5
						window.location.href = url;
						//#endif
					}
					// #endif
				} else if (kefu == 3) {
					uni.navigateTo({
						url: '/my/kefu/kefu'
					});
				}
			},
			goUserInfo() {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '/my/userInfo/userInfo'
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '您还未登录,请先登录',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: '/pages/public/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
			},
			//获取用户认证信息查询
			getQueryInsert() {
				queryInsert().then(res => {
					if (res.code == 0 && res.data) {
						this.statusType = res.data.userType
						// uni.setStorageSync('userType',res.data.userType)
					} else {
						this.statusType = ''
					}
				})
			},
			getAmount() {
				selectAmount().then(res => {
					if (res.code == 0) {
						this.browseCount = res.data.browseCount
						this.followCount = res.data.followCount
						this.myScFollowCount = res.data.myScFollowCount
						this.myUserFollowCount = res.data.myUserFollowCount
					}
				})
			},
			goNav(e, type) {
				console.log(e)
				let that = this
				if (this.userId) {
					if (type == 1) { //需要认证（不论企业还是个人）
						if (uni.getStorageSync('statusType')) {
							if (uni.getStorageSync('statusStauts') == 1) {
								uni.navigateTo({
									url: e
								})
							} else if (uni.getStorageSync('statusStauts') == 2) {
								uni.showModal({
									title: '提示',
									content: '认证未通过，请重新认证',
									complete(ret) {
										if (ret.confirm) {
											uni.navigateTo({
												url: that.statusType == 1 ? '/my/renzheng/index' :
													'/my/renzheng/company'
											})
										}
									}
								})
							} else {
								uni.showToast({
									title: '认证审核中',
									icon: 'none'
								})
							}

						} else {
							uni.showModal({
								title: '提示',
								content: '请先进行认证',
								complete(ret) {
									if (ret.confirm) {
										uni.navigateTo({
											url: '/my/renzheng/check'
										})
									}
								}
							})
						}
					} else if (type == 2) { //需要企业认证
						if (uni.getStorageSync('statusType') == 2) {
							if (uni.getStorageSync('statusStauts') == 1) {
								uni.navigateTo({
									url: e
								})
							} else if (uni.getStorageSync('statusStauts') == 0) {
								uni.showToast({
									title: '认证审核中',
									icon: 'none'
								})
							} else {
								uni.showModal({
									title: '提示',
									content: '认证未通过，请重新认证',
									complete(ret) {
										if (ret.confirm) {
											uni.navigateTo({
												url: '/my/renzheng/company'
											})
										}
									}
								})
							}

						} else {
							uni.showToast({
								title: '企业认证用户可操作',
								icon: 'none'
							})
							// uni.showModal({
							// 	title:'提示',
							// 	content:'请先进行企业认证',
							// 	complete(ret) {
							// 		if(ret.confirm){
							// 			uni.navigateTo({
							// 				url:'/my/renzheng/check'
							// 			})
							// 		}
							// 	}
							// })
						}
					} else {
						uni.navigateTo({
							url: e
						})
					}

				} else {
					uni.showModal({
						title: '提示',
						content: '您还未登录,请先登录',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: '/pages/public/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
			},
			goLogin(e) {
				uni.navigateTo({
					url: e
				})
			},
			//获取用户信息
			getUserInfo() {
				let data = {
					userId: this.userId
				}
				userInfo(data).then(res => {
					if (res.code == 0) {
						this.userInfo = res.data
						this.zhiRate = res.data.zhiRate ? res.data.zhiRate : '0'
						this.isVip = res.data.isVip
						this.invitationCode = res.data.invitationCode
						uni.setStorageSync('invitationCode', res.data.invitationCode)
						uni.setStorageSync('userName', res.data.userName)
						uni.setStorageSync('avatar', res.data.avatar)
						uni.setStorageSync('userInfo', res.data)
						// uni.setStorageSync('userType',res.data.userType)
					} else if (res.code == 401) {
						uni.clearStorageSync();
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.bg {
		background: #FFFFFF;
	}

	.feadtop {
		/* #ifdef APP */
		padding-top: 100rpx;
		/* #endif */
	}

	.btn-bg {
		width: 64px;
		height: 28px;
		// background: linear-gradient(90deg, #CDA26E 0%, #DCB78A 100%);
		border-radius: 28px;
		text-align: center;
		line-height: 28px;
		margin-top: 4px;
		position: absolute;
		top: 13upx;
		right: 50upx;
	}

	.gobtn {
		width: 120upx;
		height: 48upx;
		background: #ffffff;
		border-radius: 24upx;
		font-size: 23upx;
		color: #333333;
		text-align: center;
		line-height: 48upx;
	}
</style>