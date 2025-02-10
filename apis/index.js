import http from '../utils/http.js';

// 获取分类列表
export function getClassList(parmas) {
	return http.get({
		url:`/app/banner/selectBannerList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取分类列表
export function getClassLists(parmas) {
	return http.get({
		url:`/app/scTableClass/getClassList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取已通过服务列表
export function getDataList(parmas) {
	return http.get({
		url:`app/ScTableData/getDataList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取首页分类列表
export function getBannerList(parmas) {
	return http.get({
		url:`app/banner/selectBannerList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取首页公告列表
export function getNoticeList(parmas) {
	return http.get({
		url:`app/notice/getNoticeList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 根据经纬度获取城市
export function getSelectCity(parmas) {
	return http.get({
		url:`app/Login/selectCity`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}

//收藏/取消收藏
export function updateFollow(parmas) {
	return http.post({
		url:`app/scFollow/updateFollow`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}