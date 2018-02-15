// pages/wx-cropper/index.js
const app = app || getApp();
const imgUrl = 'https://www.jdyeducation.com/images/';
const utils = require('../../../utils/util.js');
const autoImage = require('autoImage.js');

let picId = -1;
let isDrag = false;
let initScroll = {
  offsetLeft: 0,
  offsetTop: 0
};
let initMouse = {
  x: 0,
  y: 0
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    path: 'https://www.jdyeducation.com/images/index.jpg',
    width: 100,//图片宽高
    height: 100
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    picId = options.picId;
    const data = {
      token: app.globalData.token,
      picId: picId
    }
    utils.get('/std/image_task_error', data, (res) => {
      res.data.data.path = imgUrl + res.data.data.path;
      // res.data.data.errorList = res.data.data.errorList.map((item) => {
      //   let result = autoImage.wxAutoErrorFlag(item.errorX, item.errorY, that.data.scaleP);  
      //   return { ...item, errorX: result.w, errorY: result.h };
      // })
      that.setData({
        ...that.data,
        ...res.data.data
      });
      wx.getImageInfo({
        // src: that.data.path,
        src: 'https://www.jdyeducation.com/images/index.jpg',
        success: function (res) {
          that.setData({
            ...that.data,
            width: res.width,
            height: res.height
          });
          that.draw();
        },
        fail: function (res) {
          console.log(res);
        }
      })
    })
  },
  draw: function () {
    var context = wx.createCanvasContext('myCanvas')

    context.drawImage(this.data.path, 0, 0, this.data.width, this.data.height)
    context.draw()
  },
  bindtouchstart: function (event) { 
    if (event.touches.length == 1) {
      isDrag = true;
      initScroll = {
        offsetLeft: event.target.offsetLeft,
        offsetTop: event.target.offsetTop
      }
      initMouse = {
        x: event.touches[0].x,
        y: event.touches[0].y
      }
    }
    console.log(...arguments);
  },
  bindtouchmove: function (event) {

  },
  bindtouchend: function (event) {
    isDrag = false;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.draw();
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