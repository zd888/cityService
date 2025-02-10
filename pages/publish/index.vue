<template>
	<view class="headtop">
		<u-grid :col="4" :border="false">
			<u-grid-item v-for="(item,index) in gridData" :key='index' @tap="goClassify(item.className,item.classId)">
				<image :src="item.classImg" style="width: 64rpx;height: 64rpx;"></image>
				<view class="grid-text text-black margin-top-sm">{{item.className}}</view>
			</u-grid-item>
		</u-grid>
		<u-tabbar :list="tabbarList" :mid-button="true" bg-color="#FFFFFF" active-color="#FF6800"
			inactive-color="#CCCCCC">
		</u-tabbar>
	</view>
</template>

<script>
	import {
		getClassList
	} from '@/apis/fabu.js'
	import {queryInsert} from '@/apis/my.js'
	export default {
		data() {
			return {
				tabbarList:this.$store.state.list,
				gridData: []
			}
		},
		onLoad() {

		},
		onShow() {
			if(uni.getStorageSync('token')){
				this.getUserInforz()
			}
			this.getClassLists();
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
			getClassLists() {
				getClassList().then(res => {
					if (res.code === 0) {
						this.gridData = res.data.records
					}
				})
			},
			goClassify(className, classId) {
				if (uni.getStorageSync('token')) {

					if (uni.getStorageSync('statusType') == 1 || uni.getStorageSync('statusType') == 2) {
						if (uni.getStorageSync('statusStauts') == 0) {
							uni.showToast({
								title: '认证信息审核中',
								icon: 'none'
							})
						} else if (uni.getStorageSync('statusStauts') == 1) {
							uni.navigateTo({
								url: '/pages/publish/classify/house?className=' + className + '&classId=' + classId
							})
						} else {
							uni.showModal({
								title: '提示',
								content: '认证信息未通过，请重新认证',
								complete(ret) {
									if (ret.confirm) {
										if (uni.getStorageSync('statusType') == 1) { //个人认证
											uni.navigateTo({
												url: '/my/renzheng/index'
											})

										} else { //企业认证
											uni.navigateTo({
												url: '/my/renzheng/company'
											})
										}

									}
								}
							})
						}
					} else {
						uni.showModal({
							title: '提示',
							content: '请进行认证后操作！',
							complete(ret) {
								if (ret.confirm) {
									uni.navigateTo({
										url: '/my/renzheng/check'
									})
								}
							}
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

			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
	.headtop{
		/* #ifdef APP */
		padding-top: 120rpx;
		/* #endif */
	}
</style>