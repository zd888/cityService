import http from '../utils/http.js';

// 获取：会员分类
export function selectBannerList(parmas) {
	return http.get({
		url:`app/banner/selectBannerList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}

// 获取：服务收藏 店铺关注 店铺粉丝 历史浏览数量
export function selectAmount(parmas) {
	return http.get({
		url:`app/dataCenter/selectAmount`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取浏览记录
export function getMyBrowse(parmas) {
	return http.get({
		url:`app/scBrowse/getMyBrowse`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
//删除浏览记录
export function deleteBrowse(parmas) {
	return http.get({
		url:`app/scBrowse/deleteBrowse`,
		isLoading: true,
		loadingTxt:'删除中',
		data:parmas
	});
}
// 获取收藏记录
export function getMyFollowList(parmas) {
	return http.get({
		url:`app/scFollow/getMyFollowList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取粉丝列表
export function getMyFansList(parmas) {
	return http.get({
		url:`app/scFollow/getMyFansList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取会员分类列表
export function getVipDetailsList(parmas) {
	return http.get({
		url:`app/vipDetails/getVipDetailsList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取实名认证信息
export function queryInsert(parmas) {
	return http.get({
		url:`app/userCertification/queryInsert`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 提交实名信息
export function insertSm(parmas) {
	return http.post({
		url:`app/userCertification/insert`,
		isLoading: true,
		loadingTxt:'提交中...',
		data:parmas
	});
}
// 添加店铺
export function insertGoods(parmas) {
	return http.posts({
		url:`app/scShop/insertGoods`,
		isLoading: true,
		loadingTxt:'提交中...',
		data:parmas
	});
}
// 修改店铺
export function updateGoods(parmas) {
	return http.posts({
		url:`app/scShop/updateGoods`,
		isLoading: true,
		loadingTxt:'修改中...',
		data:parmas
	});
}
// 获取店铺列表
export function getShopList(parmas) {
	return http.get({
		url:`app/scShop/getMyShopList`,
		isLoading: false,
		loadingTxt:'加载中...',
		data:parmas
	});
}
// 获取店铺详情
export function getShopInfoById(parmas) {
	return http.get({
		url:`app/scShop/getShopInfoById`,
		isLoading: false,
		loadingTxt:'加载中...',
		data:parmas
	});
}
// 上下架店铺
export function updateShopEnable(parmas) {
	return http.get({
		url:`app/scShop/updateShopEnable`,
		isLoading: false,
		loadingTxt:'加载中...',
		data:parmas
	});
}
// 修改个人信息
export function updateUser(parmas) {
	return http.posts({
		url:`app/user/updateUser`,
		isLoading: false,
		loadingTxt:'加载中...',
		data:parmas
	});
}
// 举报
export function insertMessage(parmas) {
	return http.posts({
		url:`app/message/insertMessage`,
		isLoading: true,
		loadingTxt:'提交中...',
		data:parmas
	});
}
// 钱包记录
export function balanceDetailed(parmas) {
	return http.get({
		url:`app/userMoney/balanceDetailed`,
		isLoading: false,
		loadingTxt:'提交中...',
		data:parmas
	});
}
// 购买会员
export function userBuyVip(parmas) {
	return http.post({
		url:`app/vipDetails/userBuyVip`,
		isLoading: false,
		loadingTxt:'加载中...',
		data:parmas
	});
}
// 聊天列表
export function selectChatConversationPage(parmas) {
	return http.get({
		url:`app/chat/selectChatConversationPage`,
		isLoading: false,
		loadingTxt:'加载中...',
		data:parmas
	});
}
// 聊天消息
export function getUserMessageInfoList(parmas) {
	return http.get({
		url:`/app/message/getUserMessageInfoList`,
		isLoading: false,
		loadingTxt:'加载中...',
		data:parmas
	});
}
// 消息角标
export function getMessageSign(parmas) {
	return http.get({
		url:`/app/message/getMessageSign`,
		isLoading: false,
		loadingTxt:'加载中...',
		data:parmas
	});
}
// 最新一条消息
export function getUserMessageInfoListLimit1(parmas) {
	return http.get({
		url:`/app/message/getUserMessageInfoListLimit1`,
		isLoading: false,
		loadingTxt:'加载中...',
		data:parmas
	});
}
// 根据id查询用户信息
export function selectUserInfoByUserId(parmas) {
	return http.get({
		url:`/app/user/selectUserInfoByUserId`,
		isLoading: false,
		loadingTxt:'加载中...',
		data:parmas
	});
}

// app登录绑定ClientId
export function updateClientId(parmas) {
	return http.get({
		url:`/app/user/updateClientId`,
		isLoading: false,
		loadingTxt:'加载中...',
		data:parmas
	});
}
// app升级版本对比
export function selectNewApp(parmas) {
	return http.get({
		url:`/app/user/selectNewApp`,
		isLoading: false,
		loadingTxt:'加载中...',
		data:parmas
	});
}


