<!-- 菜单悬浮的原理: 通过给菜单添加position:sticky实现, 用法超简单, 仅APP端的低端机不兼容 https://caniuse.com/#feat=css-sticky -->
<template>
	<view>
		<u-tabs :list="typeList" :isScroll="true" :current="tabIndex" active-color="#FF6800" @change="change"></u-tabs>
		<view class="padding bg margin-top-sm margin-lr-sm radius" v-for="(item,index) in myDataList" :key="index">
			<view class="flex">
				<view style="width: 180upx;height: 140upx;">
					<image :src="item.titleImg?item.titleImg:'../../static/logo.png'" style="width:100%;height:100%">
					</image>
				</view>
				<view class="margin-left-sm">
					<view class=" text-bold text-lg text-cut flex justify-between align-center" style="width: 460rpx;">
						<span>{{item.dataTitle}}</span>
						<span style="font-size:28rpx;font-weight: 100;color: green;"
							:style="item.status==0 || item.status==3?'color:red;':''">
							<text v-if="item.status==0">待提交</text>
							<text v-if="item.status==1">待审核</text>
							<text v-if="item.status==2">审核通过</text>
							<text v-if="item.status==3">审核未通过</text>
							<text v-if="item.status==4">已封禁</text>
							<!-- {{item.status==0?'待提交':(item.status==1?'待审核':(item.status==2?'审核通过'?(item.status==3?'审核未通过':'已封禁')))}}-->
						</span>
					</view>
					<view style="color:#FD6416;"><text class="text-bold text-df">{{item.priceInfo}}</text></view>
					<view style="color:#999999;" class="margin-top-sm">
						<span v-for="(ite,ind) in item.label.split(',')">{{ite}}<span
								v-if="ind+1 != item.label.split(',').length"
								style="margin-right: 10rpx;margin-left: 10rpx;">/</span></span>
					</view>
				</view>
			</view>
			<view class="flex justify-end margin-top-sm">
				<view class="btn" v-if="item.status==0" @click="submitSh(item.dataId)">提交</view>
				<view class="btn" v-if="item.isEnable==1&&item.status==2" @click="downFu(item.dataId,item.isEnable)">下架
				</view>
				<view class="btn" v-if="item.isEnable==0&&item.status==2" @click="downFu(item.dataId,item.isEnable)">上架
				</view>

				<view class="btn" v-if="item.status!=2" @click="deleteFw(item.dataId)">删除</view>
				<view class="btn" v-if="item.status==0 || item.status==3"
					@click="updateHouse(item.className,item.classId,item.dataId)">编辑</view>
			</view>
			<view v-if="item.refuseReason&&item.status==3">拒绝理由：{{item.refuseReason}}</view>
			<view v-if="item.state==2">会员已到期，当前服务已下架</view>
		</view>
		<empty v-if="myDataList.length==0" />
		<view class="fabuBtn" @click="gotoFabu()">
			<image src="../static/task/fabu1.png" style="width: 148upx;height: 149upx;"></image>
		</view>
	</view>
</template>

<script>
	import {
		getMyDataList,
		getClassList,
		submit,
		deleteData,
		cancelShow
	} from '@/apis/fabu.js'
	import empty from '@/components/empty.vue'
	export default {
		components: {
			empty
		},
		data() {
			return {
				tabIndex: 0, // tab下标
				page: 1,
				limit: 10,
				classId: '',
				typeList: [],
				myDataList: [],
				count: '',
			}
		},
		onLoad() {},
		onShow() {
			//分类列表
			uni.showLoading({
				title: '加载中'
			})
			this.getTypeList();
		},
		onPullDownRefresh() {
			this.page = 1
			this.getFabuList();
		},
		onReachBottom() {
			if (this.count == this.page) {
				uni.showToast({
					title: '没有更多了',
					icon: 'none'
				})
			} else {
				this.page += 1
				this.getFabuList();
			}
		},
		methods: {
			//下架服务index
			downFu(dataId, index) {
				let _this = this
				let content = ''
				if (index == 1) {
					content = '确定要下架此服务吗？'
				} else {
					content = '确定要上架此服务吗？'
				}
				uni.showModal({
					title: '提示',
					content: content,
					complete(ret) {
						if (ret.confirm) {
							let data = {
								dataId: dataId
							}
							cancelShow(data).then(res => {
								if (res && res.code == 0) {
									if (index == 1) {
										uni.showToast({
											title: '已下架'
										})
									} else {
										uni.showToast({
											title: '已上架'
										})
									}
									_this.page = 1
									_this.getFabuList();
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'error'
									})
								}
							})
						} else {
							// uni.showToast({
							// 	title:'已取消',
							// 	icon:'none'
							// })
						}
					}
				})
			},
			//删除服务
			deleteFw(dataId) {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确定要删除此服务吗？',
					complete(ret) {
						if (ret.confirm) {
							let data = {
								dataId: dataId
							}
							deleteData(data).then(res => {
								if (res && res.code == 0) {
									uni.showToast({
										title: '已删除'
									})
									_this.page = 1
									_this.getFabuList();
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'error'
									})
								}
							})
						} else {
							// uni.showToast({
							// 	title:'已取消',
							// 	icon:'none'
							// })
						}
					}
				})
			},
			//提交
			submitSh(dataId) {
				let data = {
					dataId: dataId
				}
				submit(data).then(res => {
					if (res && res.code == 0) {
						uni.showToast({
							title: '提交成功'
						})
						this.page = 1
						this.getFabuList();
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'error'
						})
					}
				})
			},
			updateHouse(className, classId, dataId) {
				console.log(className)
				console.log(classId)
				uni.navigateTo({
					url: '/pages/publish/classify/updateHouse?className=' + className + '&classId=' + classId +
						'&dataId=' + dataId
				})
			},
			gotoFabu() {
				uni.switchTab({
					url: '/pages/publish/index'
				})
			},
			//分类列表
			getTypeList() {
				getClassList().then(res => {
					if (res && res.code == 0) {
						this.typeList = res.data.records
						this.typeList = JSON.parse(JSON.stringify(this.typeList).replace(/className/g, 'name'))
						this.classId = this.typeList[0].classId
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
				}
				getMyDataList(data).then(res => {
					uni.hideLoading();
					uni.stopPullDownRefresh();
					if (res && res.code == 0) {
						this.count = res.data.pages
						if (this.page == 1) {
							this.myDataList = res.data.records
						} else {
							this.myDataList = [...this.myDataList, ...res.data.records]
						}
					}
				})
			},
			change(index) {
				this.page = 1
				this.tabIndex = index;
				this.typeList.map((item, index) => {
					if (index === this.tabIndex) {
						this.classId = item.classId
					}
				})
				uni.showLoading({
					title: '加载中'
				})
				this.getFabuList();
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.bg {
		background-color: #FFFFFF;
	}

	.btn {
		// width: 150upx;
		height: 60upx;
		border: 2upx solid #CCCCCC;
		border-radius: 32upx;
		text-align: center;
		color: #333333;
		line-height: 60upx;
		padding: 0rpx 27rpx;
		margin-left: 20upx;
	}

	.fabuBtn {
		position: fixed;
		bottom: 70rpx;
		right: 25rpx;
	}
</style>