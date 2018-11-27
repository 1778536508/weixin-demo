var config = require("./config.js");
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}




// "Content-Type": "application/xml"   /  "Content-Type": "json"  / "Content-Type": ""
var header = {
  // 'Accept': 'application/json',
  'Content-Type': 'application/xml',
  // 'Authorization': null,
}
function getReq(url, cb) {
  console.log("header=="),
    console.log(header)
  wx.request({
    url: config.config.doubanApi + url,
    method: 'get',
    header: header,
    success: function (res) {
      return typeof cb == "function" && cb(res)
    },
    fail: function () {
      wx.stopPullDownRefresh();     // 下拉刷新停止
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && cb(false)
    }
  })
}

function postReq(url, data, cb) {
  wx.showLoading({
    title: '加载中',
  })
  console.log("header=="),
    console.log(header),
    wx.request({
      url: config.config.doubanApi + url,
      header: header,
      data: data,
      method: 'post',
      success: function (res) {
        wx.stopPullDownRefresh();     // 下拉刷新停止
        return typeof cb == "function" && cb(res)
      },
      fail: function () {
        wx.stopPullDownRefresh();     // 下拉刷新停止
        wx.hideLoading();
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      }
    })

}





module.exports = {
  formatTime: formatTime,
  getReq: getReq,
  postReq: postReq,
  header: header,
}

