// pages/wx-cropper/index.js
const app = app || getApp();
const imgUrl = 'https://www.jdyeducation.com/images/';
const utils = require('../../../utils/util.js');
const autoImage = require('autoImage.js');

let picId = -1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    path: 'https://www.jdyeducation.com/images/index.jpg',
    isShowImg: true,

    // 图片缩放值
    scaleP: 0
  },
  cusImageLoad: function (e) {
    var that = this;
    that.setData(autoImage.wxAutoImageCal(e.detail.width, e.detail.height)); 
    const data = {
      token: app.globalData.token,
      picId: picId
    }
    utils.get('/std/image_task_error', data, (res) => {
      res.data.data.path = imgUrl + res.data.data.path;
      res.data.data.errorList = res.data.data.errorList.map((item) => {
        let result = autoImage.wxAutoErrorFlag(item.errorX, item.errorY, that.data.scaleP); console.log(result)
        return { ...item, errorX: result.w, errorY: result.h };
      })
      that.setData({
        ...that.data,
        ...res.data.data,
      });
      console.log('errorFlag', res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    picId = options.picId;
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

  }
})