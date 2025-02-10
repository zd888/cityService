import http from '../utils/http.js';

// 验证码登录
export function quickLogin(parmas) {
	return http.post({
		url:`app/Login/quickLogin`,
		isLoading: true,
		loadingTxt:'登录中',
		data:parmas
	});
}
// 获取验证码
export function sendMsg(parmas) {
	return http.get({
		url:`app/Login/sendMsg/${parmas.phone}/1`,
		isLoading: true,
		loadingTxt:'加载中',
		// data:parmas
	});
}
// 获取验证码
export function sendbindMsg(parmas) {
	return http.get({
		url:`app/Login/sendMsg/${parmas.phone}/bind`,
		isLoading: true,
		loadingTxt:'加载中',
		// data:parmas
	});
}
// 绑定登录
export function bindlogin(parmas) {
	return http.post({
		url:`app/Login/registerCode`,
		isLoading: true,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取用户信息
export function userInfo(parmas) {
	return http.get({
		url:`/app/user/selectUserById`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 帐号密码登录
export function loginApp(parmas) {
	return http.post({
		url:`/app/Login/loginApp`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}

// 验证码修改密码
export function forgetPwd(parmas) {
	return http.post({
		url:`/app/Login/forgetPwd`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}

// 注册
export function registApp(parmas) {
	return http.post({
		url:`app/Login/registApp`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 微信登录
export function wxLogin(parmas) {
	return http.get({
		url:`/app/Login/wxLogin`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 绑定个人信息
export function insertWxUser(parmas) {
	return http.posts({
		url:`/app/Login/insertWxUser`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
//获取手机号
export function selectPhone(parmas) {
	return http.posts({
		url:`/app/Login/selectPhone`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}

//获取手机号
export function getOpenId(parmas) {
	return http.get({
		url:`/app/Login/getOpenId`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}

//获取手机号
export function openidLogin(parmas) {
	return http.get({
		url:`/app/Login/openid/login`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}








