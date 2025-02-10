import store from '../store/store.js';
import config from '../config.js';
const host = config.BASE_URL;


let isAgainLogin = false;

function request(url, method, data, header, isLoading, loadingTxt) {
	if (isLoading) {
		uni.showLoading({
			title: loadingTxt, // 数据请求前loading
		});
	}
	let token = ''
	try {
		token = uni.getStorageSync('token')
	} catch (err) {
		console.log('err', err);
	}
	// 默认header
	let headers = {
		'Accept': 'application/json',
		'content-type': 'application/json',
		'token': token || '',
		// 'Cookie': 'JSESSIONID=85e56736-e985-4628-9910-4d969a342666; Path=/; httponly; secure; SameSite=NonesmartHome; HttpOnly',
		// 'set-Cookie': 'JSESSIONID=85e56736-e985-4628-9910-4d969a342666; Path=/; httponly; secure; SameSite=NonesmartHome; HttpOnly'
	};
	// 如果存在自定义header则与默认header合并
	if (header) {
		Object.assign(headers, header);
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: host + url, // 接口地址
			method: method,
			data: data,
			header: headers,
			success: function(res) {
				// console.log(res.data.code,'88888888888888888')
				resolve(res.data);
				if (isLoading) uni.hideLoading();
				// if(res.data.code==401){
				// 	uni.clearStorageSync();
				// }
				// if (res.data && res.data.code === 0) {
				// 	resolve(res.data);
				// 	if (isLoading) uni.hideLoading();
				// } else {
				// 	if (isLoading) uni.hideLoading();
				// 	reject(res.data);
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: `${res.data.msg}`,
				// 		duration: 3000
				// 	});
				// }
			},
			fail: function(err) {
				reject(err);
				let errMsg = err.data && err.data.msg ? err.data.msg : '请求失败,请检查网络'
				uni.showToast({
					icon: 'none',
					title: `请检查网络`,
					// title: errMsg,
					duration: 3000
				});
				if (isLoading) uni.hideLoading()
			}
		});
	});
}

function get(obj) {
	obj.header = {
		"content-type": 'application/x-www-form-urlencoded'
	}
	return request(obj.url, 'GET', obj.data, obj.header, obj.isLoading, obj.loadingTxt);
}
function gets(obj) {
	obj.header = {
		"content-type": 'application/json'
	}
	return request(obj.url, 'GET', obj.data, obj.header, obj.isLoading, obj.loadingTxt);
}

function post(obj) {
	obj.header = {
		"content-type": 'application/x-www-form-urlencoded'
	}
	return request(obj.url, 'POST', obj.data, obj.header, obj.isLoading, obj.loadingTxt);
}

function posts(obj) {
	obj.header = {
		"content-type": 'application/json'
	}
	return request(obj.url, 'POST', obj.data, obj.header, obj.isLoading, obj.loadingTxt);
}

function postUpload(obj) {
	obj.header = {
		// "content-type": 'multipart/form-data'
		"content-type": 'multipart/form-data'
	}
	return request(obj.url, 'POST', obj.data, obj.header, obj.isLoading, obj.loadingTxt);
}


function put(obj) {
	obj.header = {
		"content-type": 'application/json'
	}
	return request(obj.url, 'PUT', obj.data, obj.header, obj.isLoading, obj.loadingTxt);
}

function del(obj) {
	obj.header = {}
	return request(obj.url, 'DELETE', obj.data, obj.header, obj.isLoading, obj.loadingTxt);
}

export default {
	request,
	get,
	gets,
	post,
	put,
	del,
	host,
	posts,
	postUpload
};
