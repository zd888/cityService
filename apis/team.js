import http from '../utils/http.js';

// 获取团队列表
export function getExtensionList(parmas) {
	return http.get({
		url:`/app/invite/getExtensionList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取团队人数
export function getExtensionData(parmas) {
	return http.get({
		url:`app/invite/getExtensionData`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取团队收益列表
export function getProfitList(parmas) {
	return http.get({
		url:`app/invite/getProfitList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取团队收益列表
export function balanceDetailed(parmas) {
	return http.get({
		url:`app/userMoney/balanceDetailed`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}


// 提现接口
export function cashMoney(parmas) {
	return http.get({
		url:`app/cash/cashMoney`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}


// 支付宝修改 微信收款码
export function updateUser(parmas) {
	return http.posts({
		url:`app/user/updateUser`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
//提现记录
export function cashlist(parmas) {
	return http.get({
		url:`app/cash/selectPayDetails`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
