import http from '../utils/http.js';

// 获取搜索记录
export function selectUserSearchList(parmas) {
	return http.get({
		url:`app/Search/selectUserSearchList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 删除搜索记录
export function deleteAppSearch(parmas) {
	return http.get({
		url:`app/Search/deleteAppSearch`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}