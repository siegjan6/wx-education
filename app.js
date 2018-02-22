//app.js
const util = require('utils/util.js')
App({
  onLaunch: function () {
    this.login();
  },
  login: function () {
    var that = this;
    wx.login({//没有 token 开始登录
      success: function (res) {
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo
          }
        })
        let code = res.code;
        let data = {
          code: res.code
        };
        util.post('/auth/login', data, (res) => {
          that.globalData.token = res.data.data.token;
          that.globalData.flag = res.data.data.flag || 0;
          console.log(res);
        })
      }
    })
  },
  globalData: {
    token: null,
    flag: 0,//0: 未绑定， 1：已绑定学生， 2：教师账户（在权限范围下查看学生） 
    userInfo: null,
    subDomain: "mini_app", // 如果你的域名是： https://api.it120.cc/abcd 那么这里只要填写 abcd
    version: "1.0",
    shareProfile: '君德教育' // 首页转发的时候话术
  }
  /*
  根据自己需要修改下单时候的模板消息内容设置，可增加关闭订单、收货时候模板消息提醒；
  1、/pages/to-pay-order/index.js 中已添加关闭订单、商家发货后提醒消费者；
  2、/pages/order-details/index.js 中已添加用户确认收货后提供用户参与评价；评价后提醒消费者好评奖励积分已到账；
  3、请自行修改上面几处的模板消息ID，参数为您自己的变量设置即可。  
   */
})



// "tabBar": {
//   "color": "#6e6d6b",
//     "selectedColor": "#e64330",
//       "borderStyle": "white",
//         "backgroundColor": "#fff",
//           "box-shadow": "0 0 6px 0",
//             "list": [
//               {
//                 "pagePath": "pages/index/index",
//                 "iconPath": "assets/img/home.png",
//                 "selectedIconPath": "assets/img/home1.png",
//                 "text": "君德"
//               },
//               {
//                 "pagePath": "pages/teacher/teacher",
//                 "iconPath": "assets/img/teacher.png",
//                 "selectedIconPath": "assets/img/teacher1.png",
//                 "text": "名师"
//               },
//               {
//                 "pagePath": "pages/table/table",
//                 "iconPath": "assets/img/table.png",
//                 "selectedIconPath": "assets/img/table1.png",
//                 "text": "课程"
//               },
//               {
//                 "pagePath": "pages/parent/parent",
//                 "iconPath": "assets/img/student.png",
//                 "selectedIconPath": "assets/img/student1.png",
//                 "text": "学生"
//               }
//             ]
// }