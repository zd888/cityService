<template>
	<view class="u-skeleton" style="padding-bottom:100upx;">
		<view class="padding-lr bg-white u-skeleton-fillet">
			<swiper class="swiper" :autoplay="true" interval="2000" duration="500" :circular="true"
				style="width: 100%;height: 359rpx;border-radius: 18rpx">
				<swiper-item style="border-radius: 18rpx" @click="priveImgs(index,shopInfo.shopTitleImg)"
					v-for="(item,index) in shopInfo.shopTitleImg" :key='index'>
					<image :src="item" mode="aspectFill" style="width: 100%;height: 359rpx;border-radius: 18rpx">
					</image>
				</swiper-item>
			</swiper>
		</view>
		<view class=" padding bg-white u-skeleton-fillet">
			<view class="text-lg text-bold text-black">{{shopInfo.shopName}}</view>
			<view class="flex align-center margin-top-sm text-gray">
				<view class="flex margin-right-sm flex-wrap">
					<view class="btn" v-for="(item,index) in shopInfo.shopLabel">{{item}}</view>
				</view>
			</view>
			<view class="text-sm text-black margin-tb-sm">营业：{{shopInfo.businessData}}
				{{shopInfo.statTime}}—{{shopInfo.entTime}}
			</view>
			<u-gap height="4" bg-color="#F5F5F2"></u-gap>
			<view class="flex justify-between align-center padding-tb-sm">
				<view class="u-line-2" @click="gotoMap(shopInfo.shopLat,shopInfo.shopLng,shopInfo.shopAddress)">
					{{shopInfo.shopAddress}}
				</view>
				<view @click="callPhone(shopInfo.phone)" class="flex margin-left-sm align-center text-white phoneBtn">
					<image src="../../../static/images/index/phone.png" style="width: 26rpx;height: 34rpx;">
					</image>
					<!-- <text>{{shopInfo.phone}}</text> -->
					<text style="width: 100rpx;">联系TA</text>
				</view>
			</view>
			<view class="text-gray text-sm ">点击查看具体位置</view>
		</view>

		<view class="padding-lr padding-tb-sm bg-white margin-top-sm u-skeleton-fillet">
			<view class="text-lg text-bold text-black">详情</view>
			<view>
				{{shopInfo.introduce}}
			</view>
			<view class="flex flex-wrap">
				<image :src="item" v-for="(item,index) in shopInfo.shopImg" :key="index" style="width: 100%;"
					mode="widthFix"></image>
			</view>
		</view>
		<view class="tabber u-skeleton-fillet">
			<view class="flex align-center justify-between" style="width: 45%;">
				<view @click="myServer()" v-if="shopInfo.isFollow!=1" style="width: 80rpx;"
					class="flex flex-wrap justify-center">
					<u-icon name="heart" color="#000" size="45"></u-icon>
					<view>关注</view>
				</view>
				<view @click="myServer()" v-else style="width: 100rpx;" class="flex flex-wrap justify-center">
					<u-icon name="heart-fill" color="#fd6416" size="45"></u-icon>
					<view>已关注</view>
				</view>

				<view @click="gotiJubao()" style="width: 80rpx;" class="flex flex-wrap justify-center">
					<u-icon name="warning" color="#000" size="45"></u-icon>
					<view>举报</view>
				</view>
				<view @click="goChat()" style="width: 80rpx;" class="flex flex-wrap justify-center">
					<u-icon name="chat" color="#000" size="45"></u-icon>
					<view>聊天</view>
				</view>
			</view>
			<view @click="callPhone(shopInfo.phone)" style="width:300rpx;"
				class="flex margin-left-sm align-center text-white phoneBtns">
				<image src="../../../static/images/index/phone.png"
					style="width: 26rpx;height: 34rpx;margin-right: 20rpx;"></image>
				<text>联系TA</text>
			</view>
		</view>

		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF" style="height: 150vh;"></u-skeleton>
	</view>
</template>

<script>
	import {
		getShopInfoById,
		insertChatConversation
	} from '../../../apis/shop.js'
	import {
		updateFollow
	} from '../../../apis/index.js'
	export default {
		data() {
			return {
				loading: true, // 是否显示骨架屏组件
				BannerList: [{
						img: 'https://tcxx.xianmaxiong.com/file/uploadPath/2023/07/11/3ed2b0bd4c2bc86a1a4693aae8c883f1.png'
					},
					{
						img: 'https://tcxx.xianmaxiong.com/file/uploadPath/2023/07/11/3ed2b0bd4c2bc86a1a4693aae8c883f1.png'
					},
					{
						img: 'https://tcxx.xianmaxiong.com/file/uploadPath/2023/07/11/3ed2b0bd4c2bc86a1a4693aae8c883f1.png'
					}
				],
				shopId: '',
				lng: '',
				lat: '',
				shopInfo: {}, //店铺详情
				backgroundImage: '', //推广图片
				tuiguang: '', //推广文字
				invitationCode: '',
			}
		},
		onShareAppMessage(res) {
			return {
				path: '/pages/haodian/classify/detail?invitation=' + this
					.invitationCode + '&shopId=' + this.shopId, //这是为了传参   onload(data){let id=data.id;} 
				title: this.tuiguang,
				imageUrl: this.backgroundImage
			}
		},
		onShareTimeline(res) {
			return {
				path: '/pages/haodian/classify/detail?invitation=' + this
					.invitationCode + '&shopId=' + this.shopId, //这是为了传参   onload(data){let id=data.id;} 
				title: this.tuiguang,
				imageUrl: this.backgroundImage
			}
		},
		onLoad(e) {
			// 分享
			// 获取邀请码保存到本地
			if (e.invitation) {
				this.$queue.setData('inviterCode', e.invitation);
			}
			// #ifdef MP-WEIXIN
			if (e.scene) {
				const scene = decodeURIComponent(e.scene);
				this.$queue.setData('inviterCode', scene.split(',')[0]);
			}
			// #endif
			this.shopId = e.shopId
			this.lng = uni.getStorageSync('lng')
			this.lat = uni.getStorageSync('lat')
			this.getShopInfo(e.shopId)
		},
		onShow() {
			this.invitationCode = uni.getStorageSync('invitationCode') ? uni.getStorageSync('invitationCode') : '';
			if (this.shopId) {
				this.getShopInfo(this.shopId)
			}

		},
		methods: {
			noLogin() {
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
			},
			//预览图片
			priveImgs(index, url) {
				uni.previewImage({
					current: index,
					urls: url
				})
			},
			//去聊天
			goChat() {
				if (uni.getStorageSync('token')) {
					let data = {
						userId: uni.getStorageSync('userId'),
						focusedUserId: this.shopInfo.userId
					}
					insertChatConversation(data).then(res => {
						if (res.code == 0) {
							uni.navigateTo({
								url: '/my/setting/chat?chatConversationId=' + res.data.chatConversationId +
									'&focusedUserId=' + res.data.focusedUserId
							});
						}
					})
				} else {
					this.noLogin()
				}

			},
			//去举报
			gotiJubao() {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '/my/jubao/jubao?state=5&shopId=' + this.shopId + '&byUserId=' + this.shopInfo.userId
					})
				} else {
					this.noLogin()
				}

			},
			//关注/取消关注店铺
			myServer() {
				if (uni.getStorageSync('token')) {
					let data = {
						shopId: this.shopId,
						type: 2

					}
					updateFollow(data).then(res => {
						if (res.code == 0) {
							uni.showToast({
								title: res.msg
							})
							this.getShopInfo()
						}
					})
				} else {
					this.noLogin()
				}

			},
			//拨打电话
			callPhone(phone) {
				if (uni.getStorageSync('token')) {
					uni.makePhoneCall({
						phoneNumber: phone
					})
				} else {
					this.noLogin()
				}

			},
			//导航
			gotoMap(latitude, longitude, address) {
				let that = this
				console.log(latitude, longitude, address, '------')
				// #ifdef APP
				uni.openLocation({
					latitude: latitude - 0, //要去的纬度-地址       
					longitude: longitude - 0, //要去的经度-地址
					name: address, //地址名称
					address: address, //详细地址名称
					success: function() {
						console.log('导航成功');
					},
					fail: function(error) {
						console.log(error)
					}
				});
				// #endif
				// #ifndef APP
				uni.openLocation({
					latitude: Number(that.lat),
					longitude: Number(that.lng),
					address: that.shopInfo.shopAddress,
					name: that.shopInfo.shopAddress,
					success: function() {
						console.log('success');
					}
				})
				// #endif

			},
			getShopInfo() {
				let data = {
					shopId: this.shopId,
					lat: this.lat,
					lng: this.lng,
					userId: uni.getStorageSync('userId')
				}
				getShopInfoById(data).then(res => {
					if (res.code == 0 && res.data) {
						this.shopInfo = res.data
						//店铺轮播图
						if (this.shopInfo.shopTitleImg) {
							this.shopInfo.shopTitleImg = this.shopInfo.shopTitleImg.split(',')
						} else {
							this.shopInfo.shopTitleImg = []
						}
						this.backgroundImage = this.shopInfo.shopTitleImg[0]
						this.tuiguang = this.shopInfo.shopName
						//店铺标签
						if (this.shopInfo.shopLabel) {
							this.shopInfo.shopLabel = this.shopInfo.shopLabel.split(',')
						} else {
							this.shopInfo.shopLabel = []
						}
						//店铺详情图
						if (this.shopInfo.shopImg) {
							this.shopInfo.shopImg = this.shopInfo.shopImg.split(',')
							this.shopInfo.shopImg = [...this.shopInfo.shopImg, ...this.shopInfo.shopImg]
						} else {
							this.shopInfo.shopImg = []
						}
						this.loading = false

					}
				})
			},
		}
	}
</script>

<style>
	.btn {
		padding: 4rpx 16rpx;
		color: #FD6416;
		background: #FFEEE5;
		border-radius: 4px;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}

	.phoneBtn {
		display: flex;
		text-align: center;
		align-items: center;
		background: #fd6416;
		border-radius: 4px;
		padding: 18rpx 20rpx;
	}

	.phoneBtns {
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		background: #fd6416;
		border-radius: 4px;
		width: 320rpx;
		height: 80rpx;
	}

	.tabber {
		width: 750upx;
		/* height: 98upx; */
		background: #ffffff;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		justify-content: space-around;
		padding: 20rpx 0 30rpx 0;
	}
</style>