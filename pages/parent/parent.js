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
    stdItems: {},
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
    this.data.date = e.detail.value;
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
    this.initStudents();
  },
  initStudents: function () {
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
        let studentList = res.data.data.list;
        that.setData({
          studentList
        });
      })
    }
  },
  initData: function () {
    let that = this;
    const studentList = that.data.studentList;
    for (let item of studentList) {
      let data = {
        token: app.globalData.token,
        stdId: item.stdId,
        filterDate: that.data.date
      }
      utils.get('/std/task_detail', data, (res) => {
        that.data.stdItems[item.stdId] = {
          isSignOut: res.data.data.isSignOut,
          info: res.data.data.info
        };
        console.log(that.data.stdItems[item.stdId])
        that.setData({
          ...that.data
        });
      })
    }
  },
  //打开photo 带错误标记的图片
  // onCatchtap: function (e) {
  //   var that = this;
  //   let picId = e.currentTarget.id;
  //   wx.navigateTo({
  //     url: 'photo/photo?picId=' + picId,
  //   })
  // },
  //打开微信图片预览 picId 改成 taskId
  onCatchtap: function (e) {
    let that = this;
    let picId = e.currentTarget.id;
    let taskId = e.currentTarget.dataset.taskid;
    let stdId = e.currentTarget.dataset.stdid;
    let previewObj = that.getImagesByTaskId(stdId, taskId, picId);
    wx.previewImage({
      ...previewObj
    })
  },
  getImagesByTaskId: function (stdId, taskId, picId) {
    let that = this;
    let urls = [];
    let current = '';
    let stdItem = that.data.stdItems[stdId].info;
    for (let taskItem of stdItem.taskList) {
      if (taskItem.taskId == taskId) {
        for (let imgObj of taskItem.uploadPath) {
          let imgPath = 'https://www.jdyeducation.com/images/' + imgObj.path;
          urls.push(imgPath);
          if (picId == imgObj.picId) current = imgPath;
        }
        return {
          urls, current
        };
      }
    }
    return {};
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
  submitInfo: function (e) {
    let that = this;
    that.initData();

    let data = {
      token: app.globalData.token,
      page: 'pages/index/index',
      formId: e.detail.formId
    }
    utils.post('/std/sub_sign_info', data, (res) => {
      // wx.showLoading({
      //   title: '订阅通知成功',
      // })
      // setTimeout(function () {
      //   wx.hideLoading()
      // }, 700)
    })
  }
})