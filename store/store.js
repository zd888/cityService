import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        list:[{
			// pagePath(需以"/"开头)属性即可
			pagePath: "/pages/index/index",
			iconPath: "home",
			selectedIconPath: "home-fill",
			text: '首页',
		}, {
			// pagePath(需以"/"开头)属性即可
			pagePath: "/pages/haodian/index",
			iconPath: "bag",
			selectedIconPath: "bag-fill",
			text: '好店',
		},
		{
			pagePath: "/pages/publish/index",
			// iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
			iconPath: "plus-circle-fill",
			selectedIconPath: "plus-circle-fill",
			text: '发布',
			// 在此配置midButton: true   在<u-tabbar 标签内配置  :mid-button="true"  表示此项为凸起按钮项
			midButton: true,
		},
		{
			pagePath: "/pages/msg/index",
			iconPath: "bell",
			selectedIconPath: "bell-fill",
			count:0,
			text: '消息',
		},
		{
			pagePath: "/pages/my/index",
			iconPath: "account",
			selectedIconPath: "account-fill",
			text: '我的',
			// isDot 为 true 时 “首页”角标将会以红点的形式显示 2
			// count: 2,
			// isDot: true,
		},
	]
	},
    mutations: {
		setTagNum(val,num){
			val.list[3].count = num
		},
    }
})

export default store
