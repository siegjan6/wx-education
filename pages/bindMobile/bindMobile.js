

const app = app || getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: ''
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
    this.setData({
      value: ''
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
  bindKeyInput: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  onOK: function () {
    let that = this;
    let data = {
      token: app.globalData.token,
      mobile: that.data.value
    }
    utils.post('/std/bind', data, (res) => {
      console.log(res);
      if (res.data.code == 0) {
        wx.showModal({
          title: '绑定手机',
          content: '绑定成功',
          complete: () => {
            var pages = getCurrentPages()
            var prevPage = pages[pages.length - 2]  //上一个页面 
            app.globalData.flag = 1;
            prevPage.setData({
              flag: 1
            })
            wx.navigateBack({
              prevPage
            })
          }
        })
      } else {
        wx.showModal({
          title: res.data.code.toString(),
          content: res.data.comment
        })
      }
    })

  }
})