import http from '../utils/http.js';

// 获取分类列表
export function getClassList(parmas) {
	return http.get({
		url:`app/scTableClass/getClassList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取模板列表
export function getTableByClassId(parmas) {
	return http.get({
		url:`app/scTableColumn/getTableByClassId`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 发布服务
export function insertData(parmas) {
	return http.posts({
		url:`app/ScTableData/insertData`,
		isLoading: true,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取我的发布列表
export function getMyDataList(parmas) {
	return http.get({
		url:`app/ScTableData/getMyDataList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取发布详情
export function getDataById(parmas) {
	return http.get({
		url:`app/ScTableData/getDataById`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 提交
export function submit(parmas) {
	return http.post({
		url:`app/ScTableData/submit`,
		isLoading: true,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 删除服务
export function deleteData(parmas) {
	return http.post({
		url:`app/ScTableData/deleteData`,
		isLoading: true,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 下架服务
export function cancelShow(parmas) {
	return http.post({
		url:`app/ScTableData/showAndDown`,
		isLoading: true,
		loadingTxt:'加载中',
		data:parmas
	});
}