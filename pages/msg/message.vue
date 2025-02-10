<template>
	<view class="pages">
		<view v-if="chatList.length" class="content ">
			<view class=" padding-lr-sm bg" style="margin-top: 4rpx;"
				v-for="(item,index) in chatList" :key='index'>
				<view class="flex padding-tb ">
					<view class="flex-sub margin-left-sm">
						<view class="flex justify-between">
							<view class="">{{item.title?item.title:'通知'}}</view>
							<view class="text-grey">{{item.createAt}}</view>
						</view>
						<view class="flex justify-between" style="margin-top: 20rpx;">
							{{item.content}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<empty v-if="chatList.length==0" content='暂无消息'></empty>
	</view>
</template>

<script>
	import {getUserMessageInfoList} from '../../apis/my.js'
	import empty from '@/components/empty.vue'
	export default {
		components: {
			empty
		},
		data() {
			return {
				page: 1,
				pages:1,
				limit: 100,
				chatList: [],
				
			};
		},
		onLoad() {
			uni.showLoading({
				title:'加载中...'
			})
			this.getMsgList()
		},
		onReachBottom() {
			if(this.page < this.pages){
				this.page += 1
				this.getMsgList()
			}
		},
		onPullDownRefresh() {
			this.page = 1
			this.getMsgList()
		},
		methods: {
			getMsgList(){
				let data = {
					page:this.page,
					limit:this.limit
				}
				getUserMessageInfoList(data).then(res=>{
					uni.hideLoading()
					uni.stopPullDownRefresh()
					if(res.code == 0){
						this.pages = res.data.pages
						if(this.page == 1){
							this.chatList = res.data.records
						}else{
							this.chatList = [...this.chatList,res.data.records]
						}
					}
				})
			},
		},
	}
</script>

<style scoped>
	.bg{
		background-color: #ffffff;
	}
</style>
