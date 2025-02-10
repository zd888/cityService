<template>
	<view class="">
		<view class="padding flex justify-between align-center bg-white headsr">
			<view class="margin-right-sm text-df text-bold text-black" @tap="goNav('/my/citys/citys')">{{city}}</view>
			<image src="../../static/images/index/xiala.png" style="width: 20rpx;height: 12rpx;"
				class="margin-right-sm"></image>

			<u-search @click="goNav('/pages/index/search/index')" class="flex-sub" placeholder="请输入服务名称" shape="square"
				disabled :show-action="false" :animation="true" bg-color="#FFFFFF" border-color="#FF6800"></u-search>
		</view>
		<!-- banner -->
		<view class="padding-lr bg-white headapp">
			<swiper class="swiper" :autoplay="true" interval="2000" duration="500" :circular="true"
				style="width: 100%;height: 150rpx;">
				<swiper-item v-for="(item,index) in BannerList" :key='index'>
					<image :src="item.imageUrl" mode="scaleToFill" style="width: 100%;height: 150rpx;"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="" style="color: #BFBFCB;background: #FFFFFF;">
			<view class="category" v-if="gridData.length>0">
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
					<u-grid-item v-for="(item,index) in gridData" :key='index' @tap="goNav(item.url)">
						<image :src="item.imageUrl" style="width: 64rpx;height: 64rpx;"></image>
						<view class="grid-text text-black margin-top-sm">{{item.name}}</view>
					</u-grid-item>
				</u-grid> -->


			<view class="announcement">
				<view class="announcementbox">
					<view class="anount">最新公告</view>
					<view class="anounts" v-if="gongao.length>0">
						<u-notice-bar color="#333" bg-color="#fff0e5" padding="16rpx 24rpx" :volume-icon="false"
							style="height: 100%;" mode="vertical" :list="gongao"></u-notice-bar>
					</view>
					<view class="anounts flex align-center" style="padding-left: 30rpx;" v-else>
						暂无公告
					</view>
				</view>
			</view>
		</view>

		<view class=" padding-lr bg-white">
			<view class="flex justify-between align-center padding-tb" @click="goSwitchTab('/pages/haodian/index')">
				<view class="text-lg text-bold text-black">本地好商家</view>
				<image src="../../static/images/index/right.png" mode="" style="width: 13rpx;height: 22rpx;"></image>
			</view>
			<view class="flex padding-tb-sm align-center" v-for="(item,index) in shopList" :key="index"
				@click="goNav('/pages/haodian/classify/detail?shopId='+item.shopId)">
				<image :src="item.shopTitleImg?item.shopTitleImg:'../../static/images/index/1.png'" class="radius"
					style="width: 120rpx;height: 120rpx;" mode="aspectFill">
				</image>
				<view class="margin-left flex-sub">
					<view class="flex justify-between">
						<view class="text-df text-black text-bold">{{item.shopName}}</view>
						<view class="text-gray">{{item.browseCount}}浏览</view>
					</view>
					<view class="flex align-center margin-top-sm text-gray">
						<view class="flex margin-right-sm flex-wrap">
							<view class="btn margin-bottom-xs" v-for="(it,ind) in item.shopLabel.split(',')">{{it}}
							</view>

						</view>

					</view>

				</view>
			</view>
		</view>
		<u-sticky :enable="enable">
			<u-tabs :list="list" bg-color="#FAF8F7" :is-scroll="true" :current="current" active-color="#FF6800"
				@change="change"></u-tabs>
		</u-sticky>
		<view class="flowListStyle" v-if="orderlist.length!=0">
			<view class="flowListStyle-box">
				<view class="flex flex-wrap justify-between">
					<view class="demo-warter" v-for="(item, index) in orderlist" :key="index"
						@click="goNav('/pages/index/classify/detail?dataId='+item.dataId)">
						<image class="demo-warter-img" :src="item.titleImg?item.titleImg:'../../static/logo.png'"
							mode="aspectFill">
						</image>
						<view class="demo-title">
							<view class="demo-title-box">
								{{item.dataTitle}}
							</view>
						</view>

						<view class="demo-distances" v-if="item.city">
							{{item.city + '·'+item.county}}
						</view>
						<view class="demo-lable" v-if="item.label">
							<view class="demo-lable-item" v-for="(ite,ind) in item.label.split(',')" :key="ind">
								{{ite}}
							</view>
						</view>
						<view class="demo-distance">
							<span>{{item.priceInfo}}</span>
						</view>
						<!-- <view class="demo-phone" v-if="item.phone">
									<u-icon name="phone-fill" color="#ffffff" size="28"></u-icon>联系商家
								</view> -->
					</view>
				</view>
				<u-loadmore v-if="orderlist.length>0" :status="status" />
			</view>

		</view>
		<empty height="0" style="padding-top: 500rpx;" v-if="orderlist.length==0" />
		<!-- <view class="flex flex-wrap">
			<view v-for="(item,index) in orderlist" :key="index" class="orderbox"  @click="navTo">
				<image src="../../static/logo.png" style="width:100%;height:256upx;border-radius:10upx;"></image>
				<view class="padding-xs">
					<view class="text-df text-bold">{{item.title}}</view>
					<view style="color:#666666;" class="margin-top-sm">{{item.distances}}</view>
					<view class="btn" v-if="item.box" style="width: max-content;">{{item.box}}</view>
					<view class="flex justify-between">
						<view style="color:#666666;">{{item.distance}}</view>
						<view style="color:#FF6800;">{{item.price}}万</view>
					</view>
					<view class="phoneBtn">联系商家</view>
				</view>
			</view>
		</view> -->
		<u-tabbar :list="tabbarList" :mid-button="true" bg-color="#FFFFFF" active-color="#FF6800"
			inactive-color="#CCCCCC">
		</u-tabbar>
	</view>
</template>

<script>
	import {
		getClassList,
		getClassLists,
		getDataList,
		getBannerList,
		getNoticeList,
		getSelectCity
	} from '@/apis/index.js'
	import {
		getShopList
	} from '../../apis/shop.js'
	import {
		typeList
	} from '@/apis/pages.js'
	import empty from '@/components/empty.vue'
	export default {
		components: {
			empty
		},
		data() {
			return {
				currentPageindex: 0,
				categoryHeight: '300rpx',
				tabbarList: this.$store.state.list,
				enable: true,
				gongao: [],
				city: '',
				BannerList: [],
				gridData: [],
				list: [],
				current: 0,
				classId: '',
				orderlist: [],
				leftList: [],
				rightList: [],
				page: 1,
				limit: 10,
				count: 1,
				shopList: [], //本地商家
				lng: '',
				lat: '',
				status: 'loadmore',
				showModal: true,
				arr: [],
				myId: '',
				tuiguang: '', //推广文案
				backgroundImage: '', //推广背景图
				invitationCode: '',
			}
		},
		onShareAppMessage(res) {
			return {
				path: '/pages/index/index?invitation=' + this
					.invitationCode, //这是为了传参   onload(data){let id=data.id;} 
				title: this.tuiguang,
				imageUrl: this.backgroundImage
			}
		},
		onShareTimeline(res) {
			return {
				path: '/pages/index/index?invitation=' + this
					.invitationCode, //这是为了传参   onload(data){let id=data.id;} 
				title: this.tuiguang,
				imageUrl: this.backgroundImage
			}
		},
		onHide() {
			this.enable = false
		},
		onPullDownRefresh() {
			this.page = 1
			this.getFabuList()
		},
		onReachBottom() {
			if (this.page < this.count) {
				this.page += 1
				this.status = 'loading'
				this.getFabuList()
			} else {
				this.status = 'nomore'
			}
		},
		onLoad(e) {
			this.enable = true

			//获取分类列表
			this.current = 0
			this.getClassLists();
			this.getClassListof();

			//banner图
			this.getBannerImage()
			//公告列表
			this.getGonggaoList()
			this.myId = uni.getStorageSync('userId')
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
			//获取城市
			let that = this
			if (uni.getStorageSync('city') && uni.getStorageSync('lat')) {
				that.lat = uni.getStorageSync('lat')
				that.lng = uni.getStorageSync('lng')
				that.city = uni.getStorageSync('city')
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
			if (that.classId) {
				that.getFabuList();
			}

			//获取本地商家列表
			that.getShopArr();
			// #ifdef MP-WEIXIN
			//订阅
			if (that.myId) {
				typeList('294').then(res => {
					if (res.code == 0) {
						if (res.data && res.data.value) {
							that.arr.push(res.data.value)
						}
					}
				})
				typeList('292').then(res => {
					if (res.code == 0) {
						if (res.data && res.data.value) {
							that.arr.push(res.data.value)
						}
					}
				})
				if (that.showModal) {
					that.openMsg()
				}
			}
			// #endif

		},
		methods: {
			goSwitchTab(url) {
				uni.switchTab({
					url: url
				})
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
			//搜索页面
			gotoSearch() {
				uni.navigateTo({
					url: 'pages/index/search/index'
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
						// that.city = res.data
						that.city = res.data.city
						// that.getShopLists()
					}
				})
			},
			//获取公告
			getGonggaoList() {
				getNoticeList().then(res => {
					if (res.code == 0) {
						let arr = []
						res.data.records.map(item => {
							arr.push(item.content)
						})
						this.gongao = arr
					}
				})
			},
			//获取banner图
			getBannerImage() {
				let data = {
					classify: 1

				}
				getBannerList(data).then(res => {
					if (res && res.code == 0) {
						this.BannerList = res.data
					}
				})
			},
			//获取上架列表
			getShopArr() {
				let data = {
					page: 1,
					limit: 3,
					screen: 3,
					lng: this.lng,
					lat: this.lat,
					city: this.city
				}
				getShopList(data).then(res => {
					if (res.code == 0) {
						this.shopList = res.data.records
						this.$forceUpdate()
					}
				})
			},
			//获取分类列表
			getClassLists() {
				let data = {
					classify: 2,
					type: 1
				}
				getClassList(data).then(res => {
					if (res && res.code == 0) {
						// this.gridData = res.data
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
						// this.list = res.data
						// this.list = JSON.parse(JSON.stringify(this.list).replace(/className/g, 'name'))
						// this.classId = this.list[0].id
						// this.getFabuList();

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
			//获取分类列表
			getClassListof() {
				getClassLists().then(res => {
					if (res && res.code == 0) {
						// this.gridData = res.data
						this.list = res.data.records
						this.list = JSON.parse(JSON.stringify(this.list).replace(/className/g, 'name'))
						this.classId = this.list[0].classId
						this.getFabuList();

					}
				})
			},

			//获取发布列表
			getFabuList() {
				let data = {
					page: this.page,
					limit: this.limit,
					classId: this.classId,
					city: this.city
				}
				getDataList(data).then(res => {
					uni.hideLoading();
					uni.stopPullDownRefresh();
					if (res && res.code == 0) {
						this.count = res.data.pages
						if (this.page == this.count) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore'
						}
						if (this.page == 1) {
							this.orderlist = res.data.records
						} else {
							this.orderlist = [...this.orderlist, ...res.data.records]
						}
					}
				})
			},
			// tab切换
			change(index) {
				// #ifdef MP-WEIXIN
				if (uni.getStorageSync('sendMsg')) {
					console.log('授权+1')
					wx.requestSubscribeMessage({
						tmplIds: this.arr,
						success(re) {
							console.log(JSON.stringify(re), 111111111111)
							var datas = JSON.stringify(re);
							if (datas.indexOf("accept") != -1) {
								console.log(re)
							}
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}
				// #endif
				this.current = index;
				this.list.map((item, index) => {
					if (index === this.current) {
						this.classId = item.classId
					}
				})
				uni.showLoading({
					title: '加载中'
				})
				this.orderlist = [];
				this.page = 1
				this.getFabuList();
			},
			navTo(dataId) {
				// #ifdef MP-WEIXIN
				if (uni.getStorageSync('sendMsg')) {
					console.log('授权+1')
					wx.requestSubscribeMessage({
						tmplIds: this.arr,
						success(re) {
							console.log(JSON.stringify(re), 111111111111)
							var datas = JSON.stringify(re);
							if (datas.indexOf("accept") != -1) {
								console.log(re)
							}
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}
				// #endif
				uni.navigateTo({
					url: '/pages/index/classify/detail?dataId=' + dataId
				})
			},
			// 开启订阅消息
			openMsg() {
				console.log('订阅消息')
				var that = this
				uni.getSetting({
					withSubscriptions: true, //是否获取用户订阅消息的订阅状态，默认false不返回
					success(ret) {
						console.log(ret.subscriptionsSetting, '------------------')
						// if (ret.subscriptionsSetting.itemSettings && Object.keys(ret.subscriptionsSetting.itemSettings).length == 2) {
						if (ret.subscriptionsSetting.itemSettings) {
							uni.setStorageSync('sendMsg', true)
							uni.openSetting({ // 打开设置页 
								success(rea) {
									console.log(rea.authSetting)
								}
							});
						} else { // 用户没有点击“总是保持以上，不再询问”则每次都会调起订阅消息
							console.log(99999)
							uni.setStorageSync('sendMsg', false)
							uni.showModal({
								title: '提示',
								content: '为了更好的体验,请绑定消息推送',
								confirmText: '确定',
								cancelText: '取消',
								success: function(res) {
									if (res.confirm) {
										wx.requestSubscribeMessage({
											tmplIds: that.arr,
											success(re) {
												console.log(JSON.stringify(re),
													'++++++++++++++')
												var datas = JSON.stringify(re);
												if (datas.indexOf("accept") != -1) {
													console.log(re)
													// uni.setStorageSync('sendMsg', true)
												}
											},
											fail: (res) => {
												console.log(res)
											}
										})
										// uni.setStorageSync('sendMsg', true)
										console.log('确认')
										that.showModal = false
									} else if (res.cancel) {
										console.log('取消')
										// uni.setStorageSync('sendMsg', false)
										that.showModal = true
									}
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		padding-top: 230rpx;
		/* #endif */
		/* #ifdef H5 */
		padding-top: 130rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 110rpx;
		/* #endif */
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-warter-img {
		width: 100%;
		height: 256rpx;
		border-radius: 18rpx;
	}

	.demo-title {
		width: 100%;
		font-size: 30rpx;
		margin-top: 15rpx;
		color: #333333;
		font-weight: 700;
		padding-left: 16rpx;
		padding-right: 16rpx;
		display: flex;
		justify-content: center;

		.demo-title-box {
			width: 290rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2; //可设置显示的行数
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}

	.demo-distance {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 18rpx 0 18rpx 0;

		span {
			margin-right: 16rpx;
			color: #FF6800;
			font-size: 32rpx;
			font-weight: 700;
		}
	}

	.demo-distances {
		color: #666666;
		font-size: 24rpx;
		font-weight: 400;
		padding: 10rpx 0 16rpx 16rpx;
	}

	.demo-lable {
		width: 100%;
		padding: 0rpx 16rpx 0rpx 16rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		.demo-lable-item {
			// width: 104rpx;
			padding: 10rpx;
			height: 32rpx;
			background: #f2f2f2;
			border-radius: 4rpx;
			color: #666666;
			font-size: 22rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 8rpx;
			margin-bottom: 8rpx;
		}
	}

	.demo-phone {
		width: 157rpx;
		height: 44rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FF6800;
		color: #FFFFFF;
		font-size: 24rpx;
		font-weight: bold;
		margin-top: 10rpx;
		margin-bottom: 30rpx;
		margin-left: 16rpx;
	}

	page {
		background: #FAF8F7;
	}

	.flowListStyle {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
		margin-top: 20rpx;

		.flowListStyle-box {
			width: 686rpx;
			height: 100%;


			.demo-warter {
				// margin: 0 10rpx 20rpx 10rpx;
				width: 333rpx;
				height: auto;
				border-radius: 18rpx;
				background-color: #ffffff;
				position: relative;
				margin-bottom: 20rpx;
				// float: right;
			}
		}
	}

	.btn {
		padding: 5rpx 10rpx;
		color: #666666;
		background: #f2f2f2;
		border-radius: 4px;
		margin-right: 8rpx;
	}

	.announcement {
		background: #ffffff;
		padding: 0px 0px 0px 10px;
	}

	.announcementbox {
		width: 712upx;
		height: 64upx;
		background: #fff0e5;
		border-radius: 32upx;
		display: flex;
		align-items: center;
		padding: 0px 24upx;
	}

	.anount {
		color: #FF6800;
		font-weight: bold;
	}

	.anounts {
		width: 80%;
		height: 60rpx;
		color: #333333;
		font-size: 24upx;
	}

	.orderbox {
		width: 333upx;
		height: 100%;
		background: #ffffff;
		border-radius: 8upx;
		margin-left: 30upx;
		margin-top: 20upx;
	}

	.phoneBtn {
		width: 157upx;
		height: 44upx;
		background: #ff6800;
		border-radius: 4upx;
		color: #fff;
		line-height: 44upx;
		text-align: center;
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