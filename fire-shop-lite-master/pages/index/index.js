const WXAPI = require('apifm-wxapi')
const CONFIG = require('../../config.js')
const TOOLS = require('../../utils/tools.js')

//获取应用实例
var app = getApp()
Page({
	data: {
		inputVal: "", // 搜索框内容
		goodsRecommend: [], // 推荐商品
		kanjiaList: [], //砍价商品列表
		pingtuanList: [], //拼团商品列表
		loadingHidden: false, // loading
		selectCurrent: 0,//选择当前
		categories: [],//类别
		activeCategoryId: 0,//活动类别名称
		goods: [],//货物
		scrollTop: 0,//滚动顶部
		loadingMoreHidden: true,//更多隐藏
		coupons: [],//代金券
		curPage: 1,//曲线页
		pageSize: 10,//页面大小
		cateScrollTop: 0,//覆盖率
		dotStyle: "round-dot", //swiper指示点样式可选square-dot显示产品 round-dot不显示产品
		navigation: [],//导航
		banners: [],//标语
		disableSearchJump: true,//禁用搜索跳转
		aliveRooms: []//宿舍
	},
	

	tapNav(e) {
		const url = e.currentTarget.dataset.url
		wx.navigateTo({//导航到
			url: url
		})
	},
	tabClick: function(e) {//标签点击
		wx.navigateTo({//导航到
			url: '/pages/goods/list?categoryId=' + e.currentTarget.id,//当前目标
		})
	},
	toDetailsTap: function(e) {//详细说明,功能
		wx.navigateTo({
			url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
		})
	},
	tapBanner: function(e) {//敲击横幅
		console.log(e)//操作台
		wx.navigateTo({
			url: e.currentTarget.dataset.url
		})
		// if (e.currentTarget.dataset.id != 0) {
		// 	wx.navigateTo({
		// 		url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
		// 	})
		// }
	},
	bindTypeTap: function(e) {//敲击键盘类型
		this.setData({//设置数据
			selectCurrent: e.index//选择当前
		})
	},
	async wxaMpLiveRooms() {//淘宝网
		const res = await WXAPI.wxaMpLiveRooms()
		if (res.code == 0 && res.data.length > 0) {
			this.setData({
				aliveRooms: res.data//宿舍
			})
		}
	},
	

	onLoad: function(e) {//负载
		wx.showShareMenu({//显示共享菜单
			withShareTicket: true,//与分享票务
			menus: ['shareAppMessage', 'shareTimeline']//分享应用信息,分享时间线
		})
		// const that = this
		// if (e && e.query && e.query.inviter_id) { 
		//   wx.setStorageSync('referrer', e.query.inviter_id)
		// }
		if (e && e.scene) {//现场
			const scene = decodeURIComponent(e.scene)//解码URIComponent
			if (scene) {
				wx.setStorageSync('referrer', scene.substring(11))//推荐人,子串(11)
			}
		}
	
		if (app.globalData.iphone == true) {
			this.setData({
				iphone: 'iphone'
			})
		}
		WXAPI.cmsCategories().then(res => {
			//console.log(res.data.data[0].id)
			let topic = []
			if (res.code == 0) {
				for (let i = 0; i < res.data.length; i++) {
					topic.push(res.data[i]);
				}
				this.setData({
					topics: topic,
					activecategoryId: res.data[0].id
				});

			}
			this.gettapList(res.data[0].id)
		})

		this.initPage()//未知
		// this.categories()//类别
		// that.getCoupons()//获取优惠券
		// that.getNotice()//获取通知
		this.wxaMpLiveRooms()
	},
	
	//从文章模块搬过来的代码 起
	tapContents: function(e) {
		wx.navigateTo({
			url: "/pages/topic/index?id=" + e.currentTarget.dataset.id
		})
	},

	tapTopic: function(e) {
		this.setData({
			activecategoryId: e.currentTarget.dataset.id
		});
		this.gettapList(this.data.activecategoryId);
	},

	gettapList: function(categoryId) {
		WXAPI.cmsArticles({
			categoryId: categoryId
		}).then(res => {
			let content = [];
			if (res.code == 0) {
				for (let i = 0; i < res.data.length; i++) {
					if (res.data[i].categoryId == categoryId) {
						content.push(res.data[i]);
					}
				}
			}
			this.setData({
				contents: content
			});
		})
	},
	//从文章模块搬过来的代码 尾

	async initPage() {
		wx.showLoading();//显示加载中
		//获取轮播
		const bannerRes = await WXAPI.banners({
			type: 'home'
		})
		if (bannerRes.code == 700) {
			console.log('请在后台添加 banner 轮播图片，自定义类型填写 index')
		} else {
			this.setData({//设置数据
				banners: bannerRes.data
			});
		}
		//banner下导航
		const navRes = await WXAPI.banners({
			type: 'navigation'//导航
		})
		if (navRes.code == 700) {//卫星导航系统
			console.log('请在后台banner管理中导航图标，自定义类型填写 navigation')
		} else {
			this.setData({
				navigation: navRes.data//导航
			});
		}
		const hotRes = await WXAPI.banners({
			type: 'hot'
		})
		if (hotRes.code == 700) {//热销产品
			console.log('请在后台banner管理中导航图标，自定义类型填写 navigation')
		} else {
			this.setData({
				hot: hotRes.data
			});
		}
		

		const configRes = await WXAPI.queryConfigValue('recommendGoodsTitle')
		//查询配置值(推荐商品名称)
		if (configRes.code == 700) {//配置资源
			console.log('请在后台系统参数设置中设置推荐商品标题,参数值为前端显示的标题')
		} else {
			this.setData({
				recommendGoodsTitle: configRes.data//推荐商品名称
			});
		}
		this.kanjiaGoods()//砍价商品
		this.pingtuanGoods()//拼团商品
		this.getRecommendGoodsList()//推荐商品列表
		wx.hideLoading()//隐藏加载
	},
	onShow: function(e) {//功能
		app.fadeInOut(this, 'fadeAni', 0);
		// 获取购物袋数据，显示TabBarBadge
		TOOLS.showTabBarBadge();//显示标签栏徽章
	},
	async categories() {//类别
		const res = await WXAPI.goodsCategory()//货物类别
		let categories = [];
		if (res.code == 0) {
			const _categories = res.data.filter(ele => {
				return ele.level == 1
			})
			categories = categories.concat(_categories)
		}
		this.setData({
			categories: categories,
			activeCategoryId: 0,//活动类别名称	
			curPage: 1
		});
		this.getGoodsList(0);
	},
	onPageScroll(e) {//页面滚动
		let scrollTop = this.data.scrollTop
		this.setData({
			scrollTop: e.scrollTop//滚动顶部
		})
		if (e.scrollTop >= 180) {
			wx.setNavigationBarColor({//设置导航栏颜色
				frontColor: '#000000',//前面的颜色
				backgroundColor: '#ffffff'//背景颜色
			})
			app.fadeInOut(this, 'fadeAni', 1)//褪色Ani
			this.setData({
				disableSearchJump: false//禁用搜索跳转
			})
		} else {
			wx.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#ffffff'
			})
			app.fadeInOut(this, 'fadeAni', 0)
			this.setData({
				disableSearchJump: true //隐藏自定义导航栏时点击到搜索框区域时不跳转搜索页面
			})
		}
	},

	async getRecommendGoodsList(append) {//追加
		const res = await WXAPI.goods({
			recommendStatus: 1,//推荐状态
			pageSize: this.data.pageSize,//页面大小
			page: this.data.curPage
		})
		if (res.code == 404 || res.code == 700) {
			let newData = {
				loadingMoreHidden: false//更多隐藏
			}
			if (!append) {
				newData.goodsRecommend = []//商品推荐
			}
			this.setData(newData);//设置数据(新数据)
			return
		}
		let goods = []
		if (append) {
			goods = this.data.goodsRecommend//商品推荐
		}
		for (let i = 0; i < res.data.length; i++) {
			goods.push(res.data[i]);
		}
		this.setData({//设置数据
			loadingMoreHidden: true,//更多隐藏
			goodsRecommend: goods//商品推荐
		});
	},
	async getGoodsList(categoryId, append) {//药品清单
		if (categoryId == 0) {
			categoryId = "";
		}
		wx.showLoading({
			"mask": true
		})
		const res = await WXAPI.goods({
			categoryId: categoryId,
			nameLike: this.data.inputVal,//名称相似
			page: this.data.curPage,
			pageSize: this.data.pageSize
		})
		wx.hideLoading()
		if (res.code == 404 || res.code == 700) {
			let newData = {
				loadingMoreHidden: false
			}
			if (!append) {
				newData.goods = []
			}
			this.setData(newData);
			return
		}
		let goods = [];
		if (append) {
			goods = this.data.goods
		}
		for (var i = 0; i < res.data.length; i++) {//长度
			goods.push(res.data[i]);
		}
		this.setData({
			loadingMoreHidden: true,
			goods: goods,
		});
	},
	getCoupons: function() {//获取优惠券
		var that = this;
		WXAPI.coupons().then(function(res) {
			if (res.code == 0) {
				that.setData({
					coupons: res.data
				});
			}
		})
	},
	onShareAppMessage: function() {//呼叫中心
		return {
			title: '"' + wx.getStorageSync('mallName') + '" ' + CONFIG.shareProfile,//储存同步(商场名称)+分享简介
			path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid')
		}
	},
	//转发到朋友圈
	onShareTimeline: function() {//关于分享时间线
		return {
			title: '"' + wx.getStorageSync('mallName') + '" ' + CONFIG.shareProfile,
			query: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid')
		}
	},
	getNotice: function() {//获取通知
		var that = this;
		WXAPI.noticeList({//通知列表
			pageSize: 5
		}).then(function(res) {//功能
			if (res.code == 0) {
				that.setData({//设置数据
					noticeList: res.data//通知列表
				});
			}
		})
	},
	onReachBottom: function() {//抵达底层
		this.setData({//设置数据
			curPage: this.data.curPage + 1//曲线页
		});
		this.getRecommendGoodsList(true)
	},
	onPullDownRefresh: function() {//拔出后再刷新
		this.setData({
			curPage: 1
		});
		this.initPage()//刷新页码
		wx.stopPullDownRefresh()//停止拉动刷新
	},
	// 获取砍价商品
	async kanjiaGoods() {
		const res = await WXAPI.goods({
			kanjia: true
		});
		if (res.code == 0) {
			this.setData({
				kanjiaList: res.data
			})
		}
	},
	goCoupons: function(e) {//优惠券
		wx.navigateTo({
			url: "/pages/coupons/index"
		})
	},
	pingtuanGoods() { // 获取团购商品列表
		const _this = this
		WXAPI.goods({
			pingtuan: true
		}).then(res => {
			if (res.code === 0) {
				_this.setData({
					pingtuanList: res.data
				})
			}
		})
	},
	bindinput(e) {//绑定输入
		this.setData({
			inputVal: e.detail.value
		})
	},
	bindconfirm(e) {
		this.setData({
			inputVal: e.detail.value//输入值
		})
		wx.navigateTo({
			url: '/pages/goods/list?name=' + this.data.inputVal,
		})
	},
	onShareAppMessage: function() {//呼叫中心
		return {
			title: '"' + wx.getStorageSync('mallName') + '" ' + CONFIG.shareProfile,//储存同步
			path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid')
		}
	},	
	onShareAppMessage: function(e) {
		
		return {
			title: this.data.topicTitle,
			path: 'pages/topic/index?id=' + this.data.topic.id,
			imageUrl: this.data.topic.pic,
			success: function(res) {
				// 转发成功
			},
			fail: function(res) {
				// 转发失败
			}
		}
	},

})

