// pages/todayHomework/workDetail/workDetail.js
const app = app || getApp();
const utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    avatarUrl: null,
    taskItem: null,
    imgUrl: 'https://www.jdyeducation.com/images/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const taskId = parseInt(options.taskId)
    const info = wx.getStorageSync('studentInfo')
    let that = this;

    const taskItem = info.taskList.filter((item) => {
      return (taskId == item.taskId);
    })[0];
    that.setData({
      info: info,
      taskItem: taskItem
    });
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
    wx.removeStorageSync('studentInfo');
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

  bindViewTap: function () {
    var that = this;
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 1,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          //将临时变量赋值给已经在data中定义好的变量
          avatarUrl: tempFilePaths
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  previewImage: function (e) {
    var that = this;
    //获取当前图片的下表
    let picId = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../wx-cropper/index?picId=' + picId,
    })
    // console.log(...arguments)
    // //数据源
    // let pictures = that.data.taskItem.uploadPath.map((item) => that.data.imgUrl + item.path);
    // wx.previewImage({
    //   //当前显示下表
    //   current: pictures[index],
    //   //数据源
    //   urls: pictures
    // })
  }
})