<template>
	<view>
		<view class="padding flex justify-between align-center bg-white headsr">
			<view class="margin-right-sm text-df text-bold text-black" @tap="goNav('/my/citys/citys')">{{city}}</view>
			<image src="../../static/images/index/xiala.png" style="width: 20rpx;height: 12rpx;"
				class="margin-right-sm"></image>
			<u-search @click="goNav('/pages/haodian/search/index')" class="flex-sub" placeholder="请输入店铺名称"
				shape="square" disabled :show-action="false" :animation="true" bg-color="#FFFFFF"
				border-color="#FF6800"></u-search>
			<view class="text-center margin-left-xs" @click="installDianPu()">
				<image src="../../static/images/haodian/shop.png" style="width: 33rpx;height: 37rpx;" mode=""></image>
				<view class="text-xs">商家入驻</view>
			</view>
		</view>
		<view class="headapp" style="color: #BFBFCB;background: #FFFFFF;" v-if="gridData.length>0">
			<view class="category">
				<view class="box">
					<swiper class="swiper" duration="300" :style="{ height: categoryHeight }">
						<swiper-item v-for="(nav, index5) in gridData" :key="index5">
							<view class="category-list">
								<view class="icon" v-for="(item,ind) in nav" :key="ind" @tap="goNav(item.url)">
									<image mode="widthFix" :src="item.imageUrl" style="height: 90upx;width: 90upx">
									</image>
									<view>{{ item.name }}</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<view class="dots">
						<view v-for="(page, pageindex) in gridData" :key="pageindex"
							:class="{ active: pageindex == currentPageindex }"></view>
					</view>
				</view>
			</view>
			<!-- <u-grid :col="5" :border="false">
				<u-grid-item v-for="(item,index) in gridData" :key='index'
					@tap="goNav(item.url)">
					<image :src="item.imageUrl" style="width: 64rpx;height: 64rpx;"></image>
					<view class="grid-text text-black margin-top-sm">{{item.name}}</view>
				</u-grid-item>
			</u-grid> -->
		</view>
		<!-- banner -->
		<view class="padding-lr bg-white">
			<swiper class="swiper" :autoplay="true" interval="2000" duration="500" :circular="true"
				style="width: 100%;height: 150rpx;">
				<swiper-item v-for="(item,index) in BannerList" :key='index'>
					<image :src="item.imageUrl" mode="scaleToFill" style="width: 100%;height: 150rpx;"></image>
				</swiper-item>
			</swiper>
		</view>

		<view>
			<u-tabs :list="list" :isScroll="false" :current="current" active-color="#FF6800" @change="change"></u-tabs>
		</view>
		<view class="margin-bottom-xl">
			<view class="flex justify-between margin-bottom-sm bg-white padding" v-for="(item,index) in shopList"
				:key="index" @click="goNav('/pages/haodian/classify/detail?shopId='+item.shopId)">
				<image :src="item.shopTitleImg" style="width: 250upx;height: 220upx;border-radius: 18rpx;"
					mode="aspectFill">
				</image>
				<view class="flex-sub margin-left-xs padding-tb-xs">
					<view class="text-df text-bold text-black">{{item.shopName}}</view>
					<view class="flex justify-between margin-top-xs">
						<text class="text-gray" style="width: 65%;">{{item.shopAddress}}</text>
						<text class="text-black">{{item.distance}}</text>
					</view>
					<view class="flex flex-wrap margin-top-xs" v-if="item.shopLabel">
						<view class="btn" v-for="(ite,ind) in item.shopLabel.split(',')" :key="ind">{{ite}}</view>
					</view>
					<view class="text-gray margin-top-xs">{{item.businessData}} {{item.statTime}}—{{item.entTime}}
					</view>
				</view>
			</view>
			<u-loadmore :status="status" v-if="shopList.length>0" />
		</view>
		<u-tabbar :list="tabbarList" :mid-button="true" bg-color="#FFFFFF" active-color="#FF6800"
			inactive-color="#CCCCCC">
		</u-tabbar>
		<empty height="0" v-if="shopList.length==0" style="margin-top: 100rpx;" />

	</view>
</template>

<script>
	import empty from '@/components/empty.vue'
	import {
		getSelectCity,
		getBannerList,
		getClassList
	} from '../../apis/index.js'
	import {
		getShopList
	} from '../../apis/shop.js'
	import {
		queryInsert
	} from '@/apis/my.js'
	import {
		typeList
	} from '@/apis/pages.js'
	export default {
		components: {
			empty
		},
		data() {
			return {
				currentPageindex: 0,
				categoryHeight: '300rpx',
				tabbarList: this.$store.state.list,
				status: 'loadmore',
				city: '',
				BannerList: [],
				gridData: [],
				list: [{
						name: '为你推荐'
					},
					{
						name: '最新加入'
					},
					{
						name: '附近店铺'
					},
				],
				current: 0,
				page: 1,
				pages: 1,
				limit: 10,
				lng: '',
				lat: '',
				shopList: [],
				tuiguang: '',
				backgroundImage: '',
				invitationCode: '',
			}
		},
		onShareAppMessage(res) {
			return {
				path: '/pages/haodian/index?invitation=' + this
					.invitationCode, //这是为了传参   onload(data){let id=data.id;} 
				title: this.tuiguang,
				imageUrl: this.backgroundImage
			}
		},
		onShareTimeline(res) {
			return {
				path: '/pages/haodian/index?invitation=' + this
					.invitationCode, //这是为了传参   onload(data){let id=data.id;} 
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
			uni.showLoading({
				title: '加载中...'
			})
		},
		onShow() {
			this.invitationCode = uni.getStorageSync('invitationCode') ? uni.getStorageSync('invitationCode') : '';
			//推广文案
			typeList('276').then(res => {
				if (res.code == 0) {
					if (res.data && res.data.value) {
						this.tuiguang = res.data.value;
					}
				}
			})
			//推广图片
			typeList('289').then(res => {
				if (res.code == 0) {
					if (res.data && res.data.value) {
						this.backgroundImage = res.data.value;
					}
				}
			})
			if (uni.getStorageSync('token')) {
				this.getUserInforz()
			}
			//分类
			this.getClassLists()
			//banner图
			this.getBannerImage()
			//获取城市
			let that = this
			if (uni.getStorageSync('city') && uni.getStorageSync('lat')) {
				that.lat = uni.getStorageSync('lat')
				that.lng = uni.getStorageSync('lng')
				that.city = uni.getStorageSync('city')
				that.getShopLists()

			} else {
				uni.getLocation({
					type: 'gcj02', //wgs84  gcj02
					success: function(res) {
						//根据定位的经纬度获取城市名称
						that.lat = res.latitude
						that.lng = res.longitude
						that.selectCity(res.longitude, res.latitude);
					},
					fail: function() {
						console.log('获取地址失败')
					}
				})
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.page = 1
			this.getShopLists()
		},
		//上拉加载更多
		onReachBottom() {
			if (this.page < this.pages) {
				this.status = 'loading'
				this.page += 1
				this.getShopLists()
			} else {
				this.status = 'nomore'
			}
		},
		methods: {
			getUserInforz() { //获取认证信息
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
			//获取分类列表
			getClassLists() {
				let data = {
					classify: 2,
					type: 2
				}
				getClassList(data).then(res => {
					if (res && res.code == 0) {
						if (res.data.length > 0) {
							var datanew = this.chunk(res.data, 10)
							this.gridData = datanew;
							if (res.data.length > 5) {
								this.categoryHeight = "300rpx"
							} else {
								this.categoryHeight = "150rpx"
							}
						} else {
							var datanew = this.chunk(this.gridData, 10)
							this.gridData = datanew;
						}
					}
				})
			},
			// 传进数组和指定个数，进行拆分
			chunk: function(array, size) {
				//获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
				const length = array.length
				//判断不是数组，或者size没有设置，size小于1，就返回空数组
				if (!length || !size || size < 1) {
					return []
				}
				//核心部分
				let index = 0 //用来表示切割元素的范围start
				let resIndex = 0 //用来递增表示输出数组的下标

				//根据length和size算出输出数组的长度，并且创建它。
				let result = new Array(Math.ceil(length / size))
				//进行循环
				while (index < length) {
					//循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
					result[resIndex++] = array.slice(index, (index += size))
				}
				//输出新数组
				return result
			},
			goNav(url) {
				if (uni.getStorageSync('token')) {
					if (url.indexOf('/pages/') !== -1 || url.indexOf('/my/') !== -1) {
						uni.navigateTo({
							url
						})
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
			//获取banner图
			getBannerImage() {
				let data = {
					classify: 7
				}
				getBannerList(data).then(res => {
					if (res && res.code == 0) {
						this.BannerList = res.data
					}
				})
			},
			//获取店铺列表
			getShopLists() {
				let data = {
					page: this.page,
					limit: this.limit,
					lng: this.lng,
					lat: this.lat,
					screen: this.current + 1,
					city: this.city,

				}
				getShopList(data).then(res => {
					uni.hideLoading()
					uni.stopPullDownRefresh()
					if (res.code == 0) {
						this.pages = res.data.pages
						res.data.records.map(item => {
							if (item.distance) {

								item.distance = parseFloat(item.distance).toFixed(2)
								if (item.distance > 1000) {
									item.distance = (item.distance / 1000).toFixed(2) + 'km'
								} else {
									item.distance = item.distance + 'm'
								}
								// if((Math.floor(item.distance * 100) / 100)>1000){
								// 	item.distance = ((Math.floor(item.distance * 100) / 100) / 1000)+'km'
								// }else{
								// 	item.distance = (Math.floor(item.distance * 100) / 100)+'m'
								// }
							}

						})
						if (this.page == this.pages) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore'
						}
						if (this.page == 1) {
							this.shopList = res.data.records
						} else {
							this.shopList = [...this.shopList, ...res.data.records]
						}
					}
				})
			},
			//根据经纬度获取城市地址
			selectCity(longitude, latitude) {
				let that = this
				let data = {
					lat: latitude,
					lng: longitude
				}
				getSelectCity(data).then(res => {
					if (res.code == 0) {
						//修改当前城市
						uni.setStorageSync('lat', latitude)
						uni.setStorageSync('lng', longitude)
						uni.setStorageSync('city', res.data.city)
						that.city = res.data.city
						that.getShopLists()
					}
				})
			},
			//商家入住
			installDianPu() {
				if (uni.getStorageSync('token')) {
					if (uni.getStorageSync('statusType') == 2) {
						if (uni.getStorageSync('statusStauts') == 1) {
							uni.navigateTo({
								url: '/my/renzheng/shop'
							})
						} else if (uni.getStorageSync('statusStauts') == 0) {
							uni.showToast({
								title: '认证信息审核中',
								icon: 'none'
							})
						} else {
							uni.showModal({
								title: '提示',
								content: '认证信息未通过，请重新认证',
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
						uni.showToast({
							title: '企业认证用户可入驻',
							icon: 'none'
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
			change(index) {
				this.current = index;
				this.getShopLists()
			},
		},
	}
</script>

<style scoped lang="scss">
	.headsr {
		background: #FFFFFF;
		position: fixed;
		top: 0rpx;
		left: 0;
		right: 0;
		z-index: 999;
		/* #ifdef APP */
		padding-top: 120rpx;
		/* #endif */
		/* #ifdef H5 */
		padding-top: 30rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 0rpx;
		/* #endif */
	}

	.headapp {
		background: #FFFFFF;
		/* #ifdef APP */
		padding-top: 200rpx;
		/* #endif */
		/* #ifdef H5 */
		padding-top: 100rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 80rpx;
		/* #endif */
	}

	.btn {
		padding: 4rpx 16rpx;
		background: #fff1e9;
		border-radius: 4px;
		margin-right: 10rpx;
		color: #FF6800;
		margin-bottom: 10rpx;
	}

	.category {
		width: 100%;

		.box {
			width: 100%;
			border-radius: 20upx;
			background-color: #ffffff;

			.dots {
				display: flex;
				justify-content: center;
				height: 15upx;
				width: 100%;

				view {
					width: 30upx;
					height: 5upx;
					background-color: rgba(0, 0, 0, 0.2);

					&.active {
						background-color: #ff570a;
					}
				}
			}

			.swiper {
				width: 100%;
				padding: 10upx 0;

				.uni-swiper-dot {
					width: 20upx;
				}

				.category-list {
					width: 100%;
					height: auto;
					display: flex;
					justify-content: flex-start;
					padding: 10upx 0;
					flex-flow: wrap;

					.icon {
						width: 20%;
						display: flex;
						flex-flow: wrap;
						justify-content: center;
						font-size: 22upx;
						color: #666;
						margin-bottom: 20upx;
						position: relative;

						image {
							width: 70%;
							height: 13.3vw;
						}

						view {
							width: 100%;
							display: flex;
							justify-content: center;
						}

						.remen,
						.lijian {
							width: 60upx;
							height: 30upx;
							position: absolute;
							top: 0;
							right: 0;
						}
					}
				}
			}
		}
	}
</style>