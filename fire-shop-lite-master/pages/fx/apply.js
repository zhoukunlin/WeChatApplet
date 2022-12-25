const app = getApp()
const WXAPI = require('apifm-wxapi')
const AUTH = require('../../utils/auth')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxlogin: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    AUTH.checkHasLogined(isLogined => {
    	this.setData({
    		wxlogin: isLogined
    	})
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  nameChange(e){
    this.data.name = e.detail.value
  },
  mobileChange(e){
    this.data.mobile = e.detail.value
  },
  bindSave(){
    wx.requestSubscribeMessage({
      tmplIds: ['I6jGwax_mL2M_0rlEoIpf9T9eaWQ_G-QTZFcoP4lviU'],
      success(res) {

      },
      fail(e) {
        console.error(e)
      },
      complete: (e) => {
        this.bindSaveDone()
      },
    })
  },
  bindSaveDone: function () {
    const name = this.data.name
    const mobile = this.data.mobile
    if (!name) {
      wx.showToast({
        title: '请输入真实姓名',
        icon: 'none'
      })
      return
    }
    if (!mobile) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none'
      })
      return
    }
    WXAPI.fxApply(wx.getStorageSync('token'), name, mobile).then(res => {
      if (res.code != 0) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        return
      }
      wx.navigateTo({
        url: "/pages/fx/apply-status"
      })
    })
  },
})