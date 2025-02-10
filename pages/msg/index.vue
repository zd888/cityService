<template>
	<view class="pages">
		<view class=" ">
			<view class="flex padding-tb  padding-lr-sm bg" @click="goMsg">
				<view>
					<image style="width: 80rpx;height: 80rpx;border-radius: 80rpx;"
						src="../../static/images/msg/msg.png"></image>
				</view>
				<view class="flex-sub margin-left-sm">
					<view class="flex justify-between">
						<view class="">{{msgList.title?msgList.title:'系统消息'}}</view>
						<view v-if="messageCount>0"
							style="height: 32rpx;width: 32rpx;border-radius: 100rpx;background-color: red;color: #FFF;text-align: center;">
							{{messageCount}}</view>
					</view>
					<view>
						<view class="text-grey">{{msgList.content}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="chatList.length" class="content ">
			<view class=" padding-lr-sm bg" style="margin-top: 4rpx;" @click="goIM(item)"
				v-for="(item,index) in chatList" :key='index'>
				<view class="flex padding-tb " v-if="userId == item.userId">
					<view>
						<u-image shape="circle" width='80rpx' height="80rpx" :src="item.byAvatar"></u-image>
					</view>
					<view class="flex-sub margin-left-sm">
						<view class="flex justify-between">
							<view class="">{{item.byUserName}}</view>
							<view class="text-grey">{{item.messageTime}}</view>
						</view>
						<view class="flex justify-between">
							<view class="text-grey">{{ item.messageType == 1? item.content : '[图片]'}}</view>
							<view v-if="item.contentCount"
								style="height: 32rpx;width: 32rpx;border-radius: 100rpx;background-color: red;color: #FFF;text-align: center;">
								{{item.contentCount}}</view>
						</view>
					</view>
				</view>
				<view class="flex padding-tb" v-else>
					<view>
						<u-image shape="circle" width='80rpx' height="80rpx" :src="item.avatar"></u-image>
					</view>
					<view class="flex-sub margin-left-sm">
						<view class="flex justify-between">
							<view class="">{{item.userName}}</view>
							<view class="text-grey">{{item.messageTime}}</view>
						</view>
						<view class="flex justify-between">
							<view class="text-grey">{{ item.messageType == 1? item.content : '[图片]'}}</view>
							<view v-if="item.contentCount"
								style="height: 32rpx;width: 32rpx;border-radius: 100rpx;background-color: red;color: #FFF;text-align: center;">
								{{item.contentCount}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<empty v-if="chatList.length==0" content='暂无消息'></empty>
		
		<u-tabbar :list="tabbarList"  :mid-button="true" bg-color="#FFFFFF" active-color="#FF6800"
			inactive-color="#CCCCCC">
		</u-tabbar>
	</view>
</template>

<script>
	import {selectChatConversationPage,getUserMessageInfoListLimit1} from '../../apis/my.js'
	import empty from '@/components/empty.vue'
	export default {
		components: {
			empty
		},
		data() {
			return {
				tabbarList:this.$store.state.list,
				page: 1,
				limit: 100,
				chatList: [],
				userId: '',
				msgList: {},
				time: '',
				messageCount: 0,
				pages:1,
				status:'loadmore'
			};
		},
		onLoad() {
		},
		onShow() {
			let that = this
			that.userId = uni.getStorageSync('userId')
			if (that.userId) {
				that.getChatList()
				that.getMsgList()
			// 	that.time = setInterval(function() {
			// 		that.getChatList()
			// 		// that.getMsgList()
					that.$nextTick(function() {
						that.messageCount = uni.getStorageSync('messageCount')
					})
			
			// 	}, 1000)
			
			} else {
				that.chatList = []
				that.msgList = {}
			}
		},
		onHide() {
			clearInterval(this.time)
		},
		methods: {
			getChatList() {
				let data = {
					page: this.page,
					limit: this.limit
				}
				selectChatConversationPage(data).then(res=>{
					uni.stopPullDownRefresh()
					uni.hideLoading()
					if(res.code == 0){
						this.pages = res.data.pages
						if(this.page==this.pages){
							this.status = 'nomore'
						}else{
							this.status = 'loadmore'
						}
						// this.chatList = res.data.records
						if(this.page == 1){
							this.chatList = res.data.records
						}else{
							this.chatList = [...this.chatList,...res.data.records]
						}
					}
				})
			},
			getMsgList() {
				getUserMessageInfoListLimit1().then(res=>{
					if(res.code == 0){
						this.msgList = res.data
					}
				})
				// this.$Request.get("/app/message/selectMessageByUserIdLimit1").then(res => {
				// 	if (res.code == 0) {
				// 		this.msgList = res.data.list
				// 	}
				// });
			},
			goIM(e) {
				let userId = this.$queue.getData('userId');
				if (e.userId == userId) {
					userId = e.byUserId
				} else {
					userId = e.userId
				}
				uni.navigateTo({
					url: '/my/setting/chat?chatConversationId='+e.chatConversationId+'&focusedUserId='+userId
				});
				// uni.navigateTo({
				// 	url: '/pages/msg/im?chatConversationId=' + e.chatConversationId + '&byUserId=' + userId
				// })
			},
			goMsg() {
				let userId = this.$queue.getData('userId');
				if(userId){
					uni.navigateTo({
						url: '/pages/msg/message'
					})
				}else{
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
		},
		onPullDownRefresh() {
			this.page = 1
			this.getChatList()
		},
		onReachBottom() {
			if(this.page < this.pages){
				this.page = this.page + 1;
				this.status = 'loading'
				this.getChatList()
			}else{
				this.status = 'nomore'
			}
		},
	}
</script>

<style scoped>
	.pages{
	/* #ifdef APP */
	padding-top: 100rpx;
	/* #endif */	
	}
	.bg{
		background-color: #ffffff;
	}
</style>
