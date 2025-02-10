<template>
	<view>
		<city-select
			@cityClick="cityClick"
			:formatName="formatName"
			:activeCity="activeCity"
			:obtainCitys="obtainCitys"
			:isSearch="true"
			ref="citys"
		></city-select>
	</view>
</template>

<script>
import citys from './citys.js'
// console.log(citys.length)
import citySelect from '@/components/city-select/city-select.vue'
import {getSelectCity} from '../../apis/index.js'
export default {
	data() {
		return {
			//需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
			formatName: 'title',
			//当前城市
			activeCity: {},
			//热门城市
			hotCity: [],
			//显示的城市数据
			obtainCitys: []
		}
	},
	components: {
		citySelect
	},
	onLoad() {
		let that = this
		//动态更新数据
		setTimeout(() => {
			//修改数据格式
			this.formatName = 'cityName'
			uni.getLocation({
				type: 'gcj02', //wgs84  gcj02
				success: function(res) {
					//根据定位的经纬度获取城市名称
					that.selectCity(res.longitude, res.latitude);
				},
				fail: function() {
					console.log('获取地址失败')
				}
			})
			
			//修改热门城市
			// this.hotCity = [
			// 	{
			// 		cityName: '南京',
			// 		cityCode: 110100
			// 	},
			// 	{
			// 		cityName: '北京',
			// 		cityCode: 110102
			// 	}
			// ]
			//修改构建索引数据
			this.obtainCitys = citys
			
		}, 100)
	},
	methods: {
		//根据经纬度获取城市地址
		selectCity(longitude, latitude) {
			let data = {
				lat:latitude,
				lng:longitude
			}
			getSelectCity(data).then(res=>{
				if(res.code == 0){
					//修改当前城市
					uni.setStorageSync('lat',latitude)
					uni.setStorageSync('lng',longitude)
					uni.setStorageSync('city',res.data.city)
					this.activeCity = {
						cityName: res.data.city,
						// cityCode: 110100
					}
				}
			})
		},
		//修改城市
		cityClick(item) {
			uni.setStorageSync('city',item.cityName)
			uni.showToast({
				icon: 'none',
				title: '修改成功' ,
				mask: true
			})
			setTimeout(function() {
				//返回上一页
				uni.navigateBack();
			},1000)
			
		}
	}
}
</script>

<style></style>
