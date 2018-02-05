//引入本地json数据，这里引入的就是第一步定义的json数据
var postData = require('./config.js');
var data = postData.data;
Page({
  data: {
    films: [],
    showLoading: true,
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },

  onLoad: function () {
    var that = this
    setTimeout(function () {
      that.setData({
        films: data.subjects,
        showLoading: false,
      });
    }, 1000);
  },
  viewDetail: function (event) {
    var dataset = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?id=' + dataset.id + '&title=' + dataset.title + '&type=inTheathers'
    })
  },
  //配置分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '君德名师',
      path: 'pages/teacher/teacher',
      // imgurl:'',
      success: function (res) {
        // 转发成功
        console.log("转发成功" + res.target)
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败" + res.target)
      }
    }
  }
})
