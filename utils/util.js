const baseUrl = 'https://www.jdyeducation.com/mini_app';

const jd_get = (url, data, call) => {
  let loadingTimer = null;
  let loadingShow = false;
  loadingTimer = setTimeout(() => {
    wx.showLoading({
      title: '请稍后'
    });
    loadingShow = true;
  }, 200);
  let requestObj = {};
  requestObj.url = baseUrl + url;
  if (data !== undefined) requestObj.data = data;
  wx.request({
    ...requestObj,
    success: call || function (res) { },
    fail: (res) => {
      console.error('请求失败<GET:' + url + '> - ' + JSON.stringify(res || []));
    },
    complete: () => {
      if (loadingTimer) {
        clearTimeout(loadingTimer);
        loadingTimer = null;
      }
      if (loadingShow == true) wx.hideLoading();
    }
  })
}

const jd_post = (url, data, call) => {
  let loadingTimer = null;
  let loadingShow = false;
  loadingTimer = setTimeout(() => {
    wx.showLoading({
      title: '请稍后'
    });
    loadingShow = true;
  }, 200);
  let requestObj = {
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  };
  requestObj.url = baseUrl + url;
  if (data !== undefined) requestObj.data = JSON.stringify(data);
  wx.request({
    ...requestObj,
    success: call || function (res) { },
    fail: (res) => {
      console.error('请求失败<GET:' + url + '> - ' + JSON.stringify(res || []));
    },
    complete: () => {
      if (loadingTimer) {
        clearTimeout(loadingTimer);
        loadingTimer = null;
      }
      if (loadingShow == true) wx.hideLoading();
    }
  })
}

const login = () => {

}

//模板消息
const sendTempleMsg = (orderId, trigger, template_id, form_id, page, postJsonString) => {
  var that = this;
  wx.request({
    url: 'https://api.it120.cc/' + that.globalData.subDomain + '/template-msg/put',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      token: that.globalData.token,
      type: 0,
      module: 'order',
      business_id: orderId,
      trigger: trigger,
      template_id: template_id,
      form_id: form_id,
      url: page,
      postJsonString: postJsonString
    },
    success: (res) => {
      //console.log('*********************');
      //console.log(res.data);
      //console.log('*********************');
    }
  })
};
const sendTempleMsgImmediately = (template_id, form_id, page, postJsonString) => {
  var that = this;
  wx.request({
    url: 'https://api.it120.cc/' + that.globalData.subDomain + '/template-msg/put',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      token: that.globalData.token,
      type: 0,
      module: 'immediately',
      template_id: template_id,
      form_id: form_id,
      url: page,
      postJsonString: postJsonString
    },
    success: (res) => {
      console.log('*********************');
      console.log(res.data);
      console.log('*********************');
    }
  })
};

function formatDate() {
  var date = new Date();
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-');
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  get: jd_get,
  post: jd_post,
  url: baseUrl,
  formatDate: formatDate
}