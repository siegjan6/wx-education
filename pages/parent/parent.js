// pages/work/work.js
const app = app || getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: app.globalData.flag,
    pageIndex: 0,
    pageSize: 4,
    studentList: [],
    userInfo: app.globalData.userInfo,
    date: utils.formatDate(),
    nowDate: utils.formatDate()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    that.setData({
      flag: app.globalData.flag,
      userInfo: app.globalData.userInfo
    })
    if (that.data.flag != 0) {
      let data = {
        token: app.globalData.token,
        pageIndex: that.data.pageIndex,
        pageSize: that.data.pageSize
      }
      utils.get('/std/list', data, (res) => {
        that.setData({
          studentList: res.data.data.list
        });
      })
    }
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

  },
  onBindMobile: function () {
    wx.navigateTo({
      url: '../bindMobile/bindMobile',
    })
  },
  onStudentDetal: function (e) {
    let that = this;
    const stdId = e.currentTarget.id;
    wx.navigateTo({
      url: '../todayHomework/todayHomework?stdId=' + stdId + '&date=' + that.data.date,
    })
  },
  submitInfo: function (e) {
    let that = this;
    const stdId = e.currentTarget.id;
    console.log(stdId);
    let data = {
      token: app.globalData.token,
      page: 'pages/index/index',
      formId: e.detail.formId
    }
    utils.post('/std/sub_sign_info', data, (res) => {
      console.log(res);
      wx.navigateTo({
        url: '../todayHomework/todayHomework?stdId=' + stdId + '&date=' + that.data.date,
      })
    })

  }
})