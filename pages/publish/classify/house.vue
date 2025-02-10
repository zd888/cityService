<template>
	<view>
		<view class="margin-lr ">
			<!-- <form> -->
			<view class="cu-form-group margin-top padding-tb-sm" style="display: block;">
				<view class="title text-bold">标题</view>
				<!-- 文本框 -->
				<u-input placeholder="请填写标题" v-model="fromJson.dataTitle" />
			</view>
			<view class="cu-form-group margin-top padding-tb-sm" style="display: block;">
				<view class="title text-bold">联系方式</view>
				<!-- 文本框 -->
				<u-input placeholder="请填写联系方式" v-model="fromJson.phone" type="number" maxlength="11" />
			</view>
			<view class="cu-form-group margin-top padding-tb-sm" style="display: block;">
				<view class="title text-bold">价格</view>
				<!-- 文本框 -->
				<u-input placeholder="请填写价格(请携带单位)" v-model="fromJson.priceInfo" type="text" />
			</view>
			<view class="cu-form-group margin-top padding-tb-sm" style="display: block;">
				<view class="title text-bold">标签</view>
				<!-- 文本框 -->
				<!-- <u-input placeholder="请填写" :disabled="true" v-model="fromJson.label" type="text" @click="openLabel" /> -->
				<view class="flex align-center flex-wrap">
					<view class="labes margin-right-sm margin-bottom-xs" v-for="(item,index) in label" :key="index">
						{{item}}
						<text class="margin-left-xs" @click="deteLabel(item,index)">x</text>
					</view>
					<view class="labes1 margin-bottom-xs" @click="openLabel">+添加</view>
				</view>
			</view>
			<view class="cu-form-group margin-top padding-tb-sm" style="display: block;padding-bottom: 30rpx;">
				<view class="title text-bold">省市区</view>
				<!-- 文本框 show3 = true-->
				<view @click="openMap">
					<view v-if="citys">{{citys}}</view>
					<view v-else style="color: #999999;">请选择省市区</view>
				</view>
				<!-- <u-input placeholder="请选择省市区" :disabled="true" @click="openMap" v-model="fromJson.citys" type="text" /> -->
			</view>

			<view class="bg-white" style="border-radius: 24rpx;">
				<view class="cu-bar  margin-top-sm">
					<view class="action text-bold">
						添加封面图
					</view>
					<view class="action">
						{{titleImg.length}}/1
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in titleImg" :key="index" @tap="ViewTitleImage"
							:data-url="titleImg[index]">
							<image :src="titleImg[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelTitleImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="titleImage" v-if="titleImg.length<1">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</view>
			<view class="bg-white" style="border-radius: 24rpx;">
				<view class="cu-bar  margin-top-sm">
					<view class="action text-bold">
						添加轮播图
					</view>
					<view class="action">
						{{ img.length}}/9
					</view>
				</view>
				<!-- <shmily-drag-image :list.sync="img" :number.sync="numbers"></shmily-drag-image> -->
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in  img" :key="index" @tap="ViewImage"
							:data-url=" img[index]">
							<image :src=" img[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if=" img.length<9">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</view>
			<!-- 循环自定义字段 -->
			<view class="cu-form-group margin-top padding-tb-sm" v-for="(item,index) in typeList" :key="index"
				style="display: block;">
				<view class="title text-bold">{{item.columnComment}}</view>
				<!-- 文本框 -->
				<u-input v-if="item.htmlType==1" :placeholder="'请填写'+item.columnComment"
					v-model="from[index].columnValue" />
				<!-- 文本域 -->
				<u-input v-if="item.htmlType==2" style="margin-top: 10rpx;" type="textarea"
					:placeholder="'请填写'+item.columnComment" v-model="from[index].columnValue" />
				<!-- 下拉框 -->
				<u-input v-if="item.htmlType==3" :disabled="true" @click="select(item.optionJson,index)"
					:placeholder="'请选择'+item.columnComment" v-model="from[index].columnValue" />
				<!-- 复选框 -->
				<u-checkbox-group @change="se=>checkboxGroupChange(se,index)" v-if="item.htmlType==4">
					<u-checkbox v-model="ite.checked" v-for="(ite, ind) in item.optionJson" :key="ind"
						:name="ite.value">{{ite.value}}</u-checkbox>
				</u-checkbox-group>
				<!-- 单选框 -->
				<u-radio-group @change="e=>radioGroupChange(e,index)" v-if="item.htmlType==5">
					<u-radio v-for="(ite, ind) in item.optionJson" :key="ind" :name="ite.value">
						{{ite.value}}
					</u-radio>
				</u-radio-group>
				<!-- 日期控件 -->
				<!-- 下拉框 -->
				<u-input v-if="item.htmlType==6" :disabled="true" @click="select2(index)"
					:placeholder="'请选择'+item.columnComment" v-model="from[index].columnValue" />
			</view>
			<view class="cu-form-group margin-top padding-tb-sm" style="display: block;">
				<view class="title text-bold">描述信息</view>
				<!-- 文本框 -->
				<u-input :maxlength="-1" style="margin-top: 10rpx;" type="textarea" placeholder="请填写描述信息"
					v-model="fromJson.details" />
			</view>
		</view>
		<view style="height: 80px;"></view>
		<view class="flex flex-direction justify-around bg-white padding-tb-sm"
			style="bottom: 0;position: fixed;width: 100%;z-index: 999;">
			<button @click.stop="submit" class="cu-btn bg-orange lg" style="width: 92%;margin: 0 4%;">发布</button>
		</view>


		<!-- 选择框 -->
		<u-select v-model="show" :list="optionJson" @confirm="confirm"></u-select>
		<!-- 日期选择器 -->
		<u-picker mode="time" v-model="show2" @confirm="confirm2"></u-picker>
		<!-- 省市区 -->
		<u-picker mode="region" v-model="show3" @confirm="confirm3"></u-picker>

		<u-popup v-model="labelshow" mode="center" border-radius="14" width="500rpx" :closeable="true">
			<view class="padding">
				<view class="text-center text-lg text-bold">标签</view>
				<view class="margin-top padding-left-xs" style="background: #F2F2F2;">
					<u-input v-model="labels" type="text" />
				</view>
				<view class="cu-btns" @click="bindLabe()">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	// import shmilyDragImage from '@/components/shmily-drag-image/shmily-drag-image.vue'
	import config from '@/config.js';
	const host = config.BASE_URL;
	import {
		getTableByClassId,
		insertData
	} from '@/apis/fabu.js'
	import {
		getSelectCity
	} from '@/apis/index.js'
	export default {
		components: {
			// shmilyDragImage
		},
		data() {
			return {
				show3: false,
				show: false,
				show2: false,
				textarea: '',
				from: [],
				fromJson: {},
				classId: 0, //分类
				className: '', //分类名称
				titleImg: [], //封面图
				img: [], //详情图
				userId: '', //用户id
				typeList: [],
				optionJson: [],
				index: '',
				selectlists: [],
				labelshow: false,
				labels: '',
				label: [],
				citys:''
			}
		},
		onLoad(option) {
			this.classId = option.classId
			if (option.classId) {
				this.getMubanlist()
			}
			this.className = option.className
			if (option.className) {
				uni.setNavigationBarTitle({
					title: option.className
				})
			}
			this.userId = uni.getStorageSync('userId')

		},
		methods: {
			openMap() {
				let that = this
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						that.selectCity(res.longitude, res.latitude)
					}
				});
			},
			//根据经纬度获取城市地址
			selectCity(longitude, latitude) {
				let that = this
				let data = {
					lat: latitude,
					lng: longitude
				}
				getSelectCity(data).then(res => {
					if (res.code == 0 && res.data) {
						that.fromJson.province = res.data.province
						that.fromJson.city = res.data.city
						that.fromJson.county = res.data.district
						that.fromJson.citys = res.data.province + ' ' + res.data.city + ' ' + res.data.district
						that.citys = res.data.province + ' ' + res.data.city + ' ' + res.data.district
						// console.log(that.fromJson.citys, '----------')
					}
				})
			},
			deteLabel(item, index) {
				this.label.splice(index, 1)
				// this.fromJson.label.splice(index, 1)
				// console.log(this.label, '------')
			},
			openLabel() {
				this.labelshow = true
			},
			bindLabe() {
				if (!this.labels) {
					uni.showToast({
						title: '请输入标签内容',
						icon: 'none'
					})
					return
				}
				this.labelshow = false
				this.label.push(this.labels)
				this.labels = ''

			},
			//选择省市区
			confirm3(e) {
				console.log(e)
				this.fromJson.province = e.province.label
				this.fromJson.city = e.city.label
				this.fromJson.county = e.area.label
				this.fromJson.citys = e.province.label + ' ' + e.city.label + ' ' + e.area.label
			},
			select2(index) {
				this.index = index;
				this.show2 = true
			},
			//日期控件
			confirm2(e) {
				console.log(e)
				console.log(this.index)
				this.from[this.index].columnValue = e.year + '-' + e.month + '-' + e.day

			},
			//单选
			radioGroupChange(e, index) {
				this.from[index].columnValue = e
			},
			//复选
			checkboxGroupChange(e, index) {
				this.from[index].columnValue = e.join(',')
			},
			confirm(e) {
				console.log(e[0].value)
				this.from[this.index].columnValue = e[0].value
			},
			select(item, index) {
				let arr = []
				item.map(res => {
					let obj = {
						value: res,
						label: res
					}
					arr.push(obj)
				})
				this.index = index
				this.optionJson = arr
				this.show = true
			},
			//获取并处理数据
			getMubanlist() {
				let data = {
					classId: this.classId
				}
				getTableByClassId(data).then(res => {
					if (res.code === 0) {
						this.typeList = res.data
						this.typeList.map(item => {
							let obj = {
								columnName: item.columnName,
								columnComment: item.columnComment,
								isRequired: item.isRequired,
								htmlType: item.htmlType,
								columnValue: '',
							}
							this.from.push(obj)
							if (item.htmlType == 4) {
								let arr = []
								item.optionJson.map(ite => {
									let bj = {
										value: ite,
										checked: false
									}
									arr.push(bj)
								})
								item.optionJson = arr
							}
							if (item.htmlType == 5) {
								let arr = []
								item.optionJson.map(ite => {
									let bj = {
										value: ite,
										disabled: false
									}
									arr.push(bj)
								})
								item.optionJson = arr
							}
						})

					}
				})
			},
			//主图上传
			titleImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						this.$queue.showLoading("上传中...");
						uni.uploadFile({ // 上传接口
							url: host + 'alioss/upload', //真实的接口地址
							filePath: res.tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								console.log(uploadFileRes)
								this.titleImg.push(JSON.parse(uploadFileRes.data).data)
								this.fromJson.titleImg = this.titleImg.join(',')
								uni.hideLoading();
							}
						});
					}
				});
			},
			//主图删除
			DelTitleImg(e) {
				uni.showModal({
					// title: '召唤师',
					content: '确定要删除吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.titleImg.splice(e.currentTarget.dataset.index, 1)
							this.fromJson.titleImg = this.titleImg.join(',')
						}
					}
				})
			},
			//预览主图
			ViewTitleImage(e) {
				uni.previewImage({
					urls: this.titleImg,
					current: e.currentTarget.dataset.url
				});
			},
			//详情图上传
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						console.log('`````````````', res)
						this.$queue.showLoading("上传中...");
						uni.uploadFile({ // 上传接口
							url: host + 'alioss/upload', //真实的接口地址
							filePath: res.tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								this.img.push(JSON.parse(uploadFileRes.data).data)
								this.fromJson.rotationImg = this.img.join(',')
								console.log(this.img)
								uni.hideLoading();
							}
						});

					}
				});
			},
			//详情图删除
			DelImg(e) {
				uni.showModal({
					// title: '召唤师',
					content: '确定要删除吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.img.splice(e.currentTarget.dataset.index, 1)
							this.fromJson.rotationImg = this.img.join(',')
						}
					}
				})
			},
			//预览详情图
			ViewImage(e) {
				uni.previewImage({
					urls: this.img,
					current: e.currentTarget.dataset.url
				});
			},
			submit() {
				this.fromJson.classId = this.classId
				this.fromJson.dataJson = this.from
				delete this.fromJson.citys
				this.fromJson.label = this.label
				this.fromJson.label = this.fromJson.label.toString()
				let phoneFag = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
				if (!this.fromJson.dataTitle) {
					uni.showToast({
						title: '请输入标题',
						icon: 'none'
					})
					return
				}
				if (!this.fromJson.phone) {
					uni.showToast({
						title: '请输入联系方式',
						icon: 'none'
					})
					return
				}
				if (!phoneFag.test(this.fromJson.phone)) {
					uni.showToast({
						title: '请输入正确的联系方式',
						icon: 'none'
					})
					return
				}
				if (!this.fromJson.priceInfo) {
					uni.showToast({
						title: '请输入价格信息',
						icon: 'none'
					})
					return
				}
				if (!this.fromJson.label) {
					uni.showToast({
						title: '请输入标签',
						icon: 'none'
					})
					return
				}
				if (!this.fromJson.province || !this.fromJson.city || !this.fromJson.county) {
					uni.showToast({
						title: '请选择省市区',
						icon: 'none'
					})
					return
				}
				if (!this.fromJson.titleImg) {
					uni.showToast({
						title: '请添加封面图',
						icon: 'none'
					})
					return
				}
				if (!this.fromJson.rotationImg) {
					uni.showToast({
						title: '请添加轮播图',
						icon: 'none'
					})
					return
				}
				if (!this.fromJson.details) {
					uni.showToast({
						title: '请输入描述信息',
						icon: 'none'
					})
					return
				}
				let flag = true
				this.fromJson.dataJson.some(item => {
					if (item.isRequired == 1) {
						if (!item.columnValue) {
							uni.showToast({
								title: item.htmlType == 1 || item.htmlType == 2 ? '请输入' + item
									.columnComment : '请选择' + item.columnComment,
								icon: 'none'
							})
							flag = false
							return true
						}

					}
				})
				if (flag) {
					let data = JSON.parse(JSON.stringify(this.fromJson))
					data.lng = uni.getStorageSync('lng')
					data.lat = uni.getStorageSync('lat')
					insertData(data).then(res => {
						if (res && res.code == 0) {
							uni.showToast({
								title: '发布成功'
							})
							setTimeout(() => {
								uni.redirectTo({
									url: '/my/publish/index'
								})
							}, 1500)
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'error'
							})
						}
					})
				}
			},
		}
	}
</script>

<style>
	/* /deep/.u-input__textarea{
		padding: 0;
	} */
	.cu-btns {
		background: #fd6f4b;
		color: #FFFFFF;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 18rpx 0;
		border-radius: 12rpx;
	}

	.cu-form-group {
		border-radius: 24rpx;
	}

	.labes {
		border: 1rpx solid #999999;
		border-radius: 40rpx;
		padding: 10rpx 20rpx 10rpx 30rpx;
	}

	.labes1 {
		border: 1rpx solid #999999;
		border-radius: 40rpx;
		padding: 10rpx 30rpx;
	}
</style>