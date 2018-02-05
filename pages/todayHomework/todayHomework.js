// pages/todayHomework/todayHomework.js 
const app = app || getApp();
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stdId: -1,
    date: '2018-1-1',
    isSignOut: 2, //是否签退，0：否，1：是, 2:当日未签到
    info: {},
    url: 'https://www.jdyeducation.com/images/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    const stdId = parseInt(option.stdId)
    const date = option.date;
    let that = this;
    that.setData({
      stdId: stdId,
      date: date
    })
    let data = {
      token: app.globalData.token,
      stdId: that.data.stdId,
      filterDate: that.data.date
    }
    utils.get('/std/task_detail', data, (res) => {
      that.setData({
        isSignOut: res.data.data.isSignOut,
        info: res.data.data.info
      })
    })
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
      studentName: wx.getStorageSync('studentInfo').name
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
  onPhoto: function () { 
  },
  onInnerTask: function (e) {
    let that = this;
    const taskId = e.currentTarget.id;
    const taskItem = that.data.info.taskList.filter((item) => {
      return (taskId == item.taskId);
    })[0]; 
    if (taskItem.uploadPath.length == 0)
      return;
    wx.setStorageSync('studentInfo', that.data.info);
    wx.navigateTo({
      url: 'workDetail/workDetail?taskId=' + taskId,
    })
  }
})