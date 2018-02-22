// pages/index/index.js
const app = app || getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    return {
      title: app.globalData.shareProfile,
      path: '/pages/start/start',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  phone: function () {
    wx.makePhoneCall({
      phoneNumber: '15316663631',
    })
  },
  phone2: function () {
    wx.makePhoneCall({
      phoneNumber: '13641794834',
    })
  },
  click: function (e) {
    wx.openLocation({
      latitude: 31.116980,
      longitude: 121.272610,
      scale: 18,
      name: '君德教育',
      address: '江川北路321号晶尚坊二期11号'
    })
  },
  onMessageing: function (e) {
    let that = this; 

    let data = {
      token: app.globalData.token,
      page: 'pages/index/index',
      formId: e.detail.formId
    }
    utils.post('/std/sub_sign_info', data, (res) => {
      console.log(res)
      wx.navigateTo({
        url: './../parent/parent',
        fail:function(){
          console.log(...arguments)
        }
      })
    })
    // wx.navigateTo({
    //   url: 'messageing/messageing',
    // })
  }
})