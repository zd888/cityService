import http from '../utils/http.js';

// 获取店铺列表
export function getShopList(parmas) {
	return http.get({
		url:`app/scShop/getShopList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取店铺详情
export function getShopInfoById(parmas) {
	return http.get({
		url:`app/scShop/getShopInfoById`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 删除店铺
export function deleteShop(parmas) {
	return http.get({
		url:`/app/scShop/deleteShop`,
		isLoading: true,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 创建聊天室
export function insertChatConversation(parmas) {
	return http.posts({
		url:`/app/chat/insertChatConversation`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取聊天记录
export function selectChatContent(parmas) {
	return http.get({
		url:`/app/chat/selectChatContent`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}