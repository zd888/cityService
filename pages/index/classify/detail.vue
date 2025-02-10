<template>
	<view class="u-skeleton" style="padding-bottom:100upx;">
		<view class="padding-lr bg-white u-skeleton-fillet">
			<swiper class="swiper" :autoplay="true" interval="2000" duration="500" :circular="true"
				style="width: 100%;height: 359rpx;border-radius: 18rpx">
				<swiper-item style="border-radius: 18rpx"
					@click="priveImgs(index,info.rotationImg?info.rotationImg.split(','):[])"
					v-for="(item,index) in info.rotationImg?info.rotationImg.split(','):[]" :key='index'>
					<image :src="item" mode="aspectFill" style="width: 100%;height: 359rpx;border-radius: 18rpx">
					</image>
				</swiper-item>
			</swiper>
		</view>
		<view class="padding bg-white u-skeleton-fillet">
			<view class="text-lg text-bold text-black">{{info.dataTitle}}</view>
			<view class=" align-center margin-top-sm text-gray">
				<view class="flex margin-right-sm flex-wrap">
					<view class="btn" v-for="(item,index) in info.label?info.label.split(','):[]">{{item}}</view>
				</view>
			</view>
			<view class="" style="border: 2rpx solid #F5F5F2;width: 100%;margin-top: 20rpx;">

			</view>
			<view class="flex justify-between align-center padding-tb-sm">
				<view>
					<view class="u-line-2">{{info.province +' '+info.city+' '+info.county}}</view>
					<view class="margin-top-sm" style="color: #fd6416;font-size: 32rpx;">{{info.priceInfo}}</view>
				</view>
				<view @click="callPhone(info.phone)" class="flex margin-left-sm align-center text-white phoneBtn">
					<image src="../../../static/images/index/phone.png" style="width: 26rpx;height: 34rpx;"></image>
					<text style="width: 100rpx;">联系TA</text>
				</view>
			</view>
		</view>
		<view class="padding-lr padding-tb-sm bg-white margin-top-sm u-skeleton-fillet">
			<view class="info">
				详细信息
			</view>
			<view class="info-item flex justify-between align-center" v-for="(item,index) in info.dataJson"
				:key="index">
				<view class="info-item-left">
					{{item.columnComment}}
				</view>
				<view class="info-item-right flex justify-end align-center">
					{{item.columnValue}}
				</view>
			</view>
		</view>
		<view class="padding-lr padding-tb-sm bg-white margin-top-sm u-skeleton-fillet">
			<view class="flex">
				<view class="text-lg text-bold text-black margin-right-xl" v-for="(item,index) in tablist" :key="index"
					:class="count==index?'tabColor':''" @click="bindqie(index)">{{item.title}}<text
						v-if="item.counts">({{item.counts}})</text></view>
			</view>

			<view v-if="count == 0">
				<view class="margin-tb-sm">
					{{info.details}}
				</view>
				<!-- <view class="margin-tb-sm">【简介】</view> -->
				<!-- <view>
					本司拥有专业的保洁人员、专业的保洁设备。用专业的技术、热情周到的服务态度、价格合理、透明、
					诚信经营每一位客户的信任和选择。公司秉承：客户至上、服务热情周到、诚实、守信、守时的服务理念。
					坚持高标准、高要求、高效率的服务准则，让客户放心、省心、安心。
				</view> -->
				<!-- 	<view class="margin-tb-sm">【服务介绍】</view>
				<view>
					专业上门清洗地热，维修，更换过分水器，阀门，过滤网，清空打压，才用较先进的脉冲清洗法！
				</view> -->
			</view>

			<!-- <view class="margin-top" v-if="count == 1">
				<view class="margin-bottom-sm">
					<view class="flex justify-between align-center">
						<image src="../../../static/logo.png" class="round" style="width: 64rpx;height: 64rpx;" mode="">
						</image>
						<view class="flex-sub margin-left-sm">155*****5616</view>
						<view class="text-gray">2021-05-24</view>
					</view>
					<view class="margin-top-sm">
						准时上门，服务态度好，服务规范
					</view>
				</view>
				<view class="margin-bottom-sm">
					<view class="flex justify-between align-center">
						<image src="../../../static/logo.png" class="round" style="width: 64rpx;height: 64rpx;" mode="">
						</image>
						<view class="flex-sub margin-left-sm">155*****5616</view>
						<view class="text-gray">2021-05-24</view>
					</view>
					<view class="margin-top-sm">
						准时上门，服务态度好，服务规范
					</view>
				</view>

			</view> -->
		</view>

		<view class="tabber u-skeleton-fillet">
			<view class="flex align-center justify-between" style="width: 45%;">
				<view @click="myServer()" v-if="info.isFollow!=1" style="width: 90rpx;"
					class="flex flex-wrap justify-center">
					<u-icon name="heart" color="#000" size="45"></u-icon>
					<view>收藏</view>
				</view>
				<view @click="myServer()" v-else style="width: 90rpx;" class="flex flex-wrap justify-center">
					<u-icon name="heart-fill" color="#fd6416" size="45"></u-icon>
					<view>已收藏</view>
				</view>

				<view @click="gotiJubao()" style="width: 90rpx;" class="flex flex-wrap justify-center">
					<u-icon name="warning" color="#000" size="45"></u-icon>
					<view>举报</view>
				</view>
				<view @click="goChat()" style="width: 90rpx;" class="flex flex-wrap justify-center">
					<u-icon name="chat" color="#000" size="45"></u-icon>
					<view>聊天</view>
				</view>
			</view>
			<view @click="callPhone(info.phone)" class="flex margin-left-sm align-center text-white phoneBtns">
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
		getDataById
	} from '@/apis/fabu.js'
	import {
		updateFollow
	} from '../../../apis/index.js'
	import {
		insertChatConversation
	} from '../../../apis/shop.js'
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
				tablist: [{
					title: '详情'
				}],
				count: 0,
				dataId: '',
				info: {},
				backgroundImage: '', //推广图片
				tuiguang: '', //推广文字
				invitationCode: '',
			}
		},
		onShareAppMessage(res) {
			return {
				path: '/pages/index/classify/detail?invitation=' + this
					.invitationCode + '&dataId=' + this.dataId, //这是为了传参   onload(data){let id=data.id;} 
				title: this.tuiguang,
				imageUrl: this.backgroundImage
			}
		},
		onShareTimeline(res) {
			return {
				path: '/pages/index/classify/detail?invitation=' + this
					.invitationCode + '&dataId=' + this.dataId, //这是为了传参   onload(data){let id=data.id;} 
				title: this.tuiguang,
				imageUrl: this.backgroundImage
			}
		},
		onLoad(option) {
			// 分享
			// 获取邀请码保存到本地
			if (option.invitation) {
				this.$queue.setData('inviterCode', option.invitation);
			}
			// #ifdef MP-WEIXIN
			if (option.scene) {
				const scene = decodeURIComponent(option.scene);
				this.$queue.setData('inviterCode', scene.split(',')[0]);
			}
			// #endif
			this.dataId = option.dataId
			if (this.dataId) {
				uni.showLoading({
					title: '加载中'
				})
				this.getInfo();
			}
		},
		onShow() {
			this.invitationCode = uni.getStorageSync('invitationCode') ? uni.getStorageSync('invitationCode') : '';
			if (this.dataId) {
				this.getInfo();
			}

		},
		methods: {
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
						focusedUserId: this.info.userId
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
						url: '/my/jubao/jubao?state=4&dataId=' + this.dataId + '&byUserId=' + this.info.userId
					})
				} else {
					this.noLogin()
				}

			},
			//收藏/取消收藏
			myServer() {
				if (uni.getStorageSync('token')) {
					let data = {
						dataId: this.dataId,
						type: 1

					}
					updateFollow(data).then(res => {
						if (res.code == 0) {
							uni.showToast({
								title: res.msg
							})
							this.getInfo()
						}
					})
				} else {
					this.noLogin()
				}

			},
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
			//获取服务详情
			getInfo() {
				let data = {
					dataId: this.dataId,
					userId: uni.getStorageSync('userId')
				}
				getDataById(data).then(res => {
					uni.hideLoading()
					if (res && res.code == 0) {
						this.info = res.data
						this.backgroundImage = (this.info.rotationImg.split(','))[0]
						this.tuiguang = this.info.dataTitle
						this.loading = false
					}
				})
			},
			bindqie(index) {
				this.count = index
			}
		}
	}
</script>

<style>
	.info {
		font-size: 32rpx;
		font-weight: bold;
		color: #000000;
		margin-bottom: 10rpx;
	}

	.info-item {
		margin-bottom: 10rpx;
	}

	.info-item-left {
		width: 50%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}

	.info-item-right {
		width: 50%;
		color: #000000;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}

	.btn {
		padding: 4rpx 16rpx;
		color: #333333;
		background: #F2F2F2;
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
		background: #fd6416;
		border-radius: 4px;
		width: 320rpx;
		height: 80rpx;
		justify-content: center;
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

	.tabColor {
		color: #FF6800;
	}
</style>