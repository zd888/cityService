import http from '../utils/http.js';

// 系统配置
export function typeList(type) {
	return http.get({
		url:`/app/common/type/`+type,
		isLoading: false,
		loadingTxt:'加载中',
	});
}
// 帮助中心
export function selectHelpList(parmas) {
	return http.get({
		url:`/app/help/selectHelpList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 根据名称查询帮助详情
export function selectHelpWordDetails(parmas) {
	return http.get({
		url:`/app/help/selectHelpWordDetails`,
		isLoading: true,
		loadingTxt:'加载中',
		data:parmas
	});
}