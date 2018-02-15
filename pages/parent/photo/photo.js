// pages/parent/photo/photo.js
const app = app || getApp();
const utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 400,
    height: 500,
    scaleP: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.picId = options.picId;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    const data = {
      token: app.globalData.token,
      picId: that.data.picId
    }
    utils.get('/std/image_task_error', data, (res) => {
      res.data.data.path = 'https://www.jdyeducation.com/images/' + res.data.data.path;
      that.setData({
        ...that.data,
        ...res.data.data
      })
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            ...that.data,
            ...res
          })
          wx.getImageInfo({
            src: that.data.path,
            success: function (res) {
              that.setData({
                ...that.data,
                ...res
              })
              that.draw();
            }
          })
        }
      })


    })
  },
  draw: function () {
    let that = this;
    var context = wx.createCanvasContext('firstCanvas')
    console.log(that.data)
    if (that.data.width > that.data.height) {
      that.data.scaleP = that.data.windowWidth / that.data.height;
      context.scale(that.data.scaleP, that.data.scaleP);
      context.translate(that.data.height, 0)
      context.rotate(90 * Math.PI / 180);
      context.drawImage(that.data.path, 0, 0, that.data.width, that.data.height);

      for (let errItem of that.data.errorList) {
        context.drawImage('../../../assets/img/false.png', errItem.errorX - 25, errItem.errorY - 25, 50, 50);
        context.setTextAlign('right')
        context.fillText(errItem.errorDes, errItem.errorX - 50, errItem.errorY - 25)
      }
      context.draw()
    } else {
      that.data.scaleP = that.data.windowWidth / that.data.width;
      context.scale(that.data.scaleP, that.data.scaleP);
      context.drawImage(that.data.path, 0, 0, that.data.width, that.data.height);
      context.draw()
    }
  },
  drawErrorList: function (context) {
    let that = this;
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