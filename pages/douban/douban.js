

var config = require('../../utils/config.js');
var $http = require('../../utils/util.js');
// console.log('config', config)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    heightView: '',
    content: '',      //top250
    in_theaters: '',  // 正在上映的电影-北京
    coming_soon: '',  // 即将上映的电影
  },
  watch: {
    heightView: function(v1) {
      console.log('v',v1);
    }
  },
  // 实时监听swiper高度
  queryHeight() {
    var _this = this;
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#domeView').boundingClientRect()
    query.exec(function (res) {
      console.log('打印demo的元素的信息', res);
      console.log('打印高度', res[0].height);
      _this.setData({
        heightView: res[0].height
      })
    })
  },
  // 数据交互
  httpRequest(_url, callback) {
    var _this = this;
    $http.getReq(_url, function (res) {
      console.log(res);
      res.data.subjects.map((v, i) => {
        v.animHeight = {};
        v.onshow = false;
        v.angleup = {};
      })
      // 调用并设置高度
      _this.queryHeight();
      // 回调函数
      return typeof callback == 'function' && callback(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var _this = this;
    getApp().setWatcher(this.data, this.watch); // 设置监听器
    this.httpRequest(config.config.app.getDoubanTop250Url, function(res) {
      _this.setData({
        content: res.data.subjects
      })
      _this.httpRequest(config.config.app.getIntheaTersUrl, function (res) {
        _this.setData({
          in_theaters: res.data.subjects
        })
        _this.httpRequest(config.config.app.getComingSoonUrl, function (res) {
          _this.setData({
            coming_soon: res.data.subjects
          })
          console.log('dome渲染完成')
          wx.hideLoading();
        });
      });
    });
    
    
    // wx.request({
    //   url: 'https://douban.uieee.com/v2/movie/top250',
    //   data: {},
    //   // "Content-Type": "application/xml"   /  "Content-Type": "json"  / "Content-Type": ""
    //   header: {
    //     "Content-Type": "application/xml"
    //   },
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: function(res) {
    //     console.log(res.data.subjects);
    //     res.data.subjects.map((v, i) => {
    //       v.animHeight = {};
    //       v.onshow = false;
    //       v.angleup = {};
    //     })
    //     _this.setData({
    //       content: res.data.subjects
    //     })
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  },
  /**
   * 展示主演人物
   */
  btnAnimation(event) {
    console.log(event.currentTarget.dataset.id);
    var _this = this;
    this.data.content.map((v ,i) => {
      if (v.id == event.currentTarget.dataset.id) {
        var animation = wx.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        var animatiup = wx.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        });
        if (v.onshow) {
          animation.height('0').step();
          animatiup.rotate(0).step();
        } else {
          animation.height('400rpx').step();
          animatiup.rotate(180).step();
        }
        v.onshow = !v.onshow;
        v.animHeight = animation.export();
        v.angleup = animatiup.export();
      }
    })

    this.setData({
      content: _this.data.content
    })
    // 等待动画完成后再次调用并设置高度
    setTimeout(function() {
      _this.queryHeight();
    }, 1000)



    
  },
  /**
   * 影片详情
   */
  btnDetails (event) {
    console.log('影视详情', event.currentTarget.dataset.url);
    wx.navigateTo({
      url: "/pages/web-view/web-view?_id=" + event.currentTarget.dataset._id + "&type=" + event.currentTarget.dataset.type + "&url=" + event.currentTarget.dataset.url
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('监听页面初次渲染完成')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('监听页面显示')
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
    var _this = this;
    this.httpRequest(config.config.app.getDoubanTop250Url, function (res) {
      _this.setData({
        content: res.data.subjects
      })
      _this.httpRequest(config.config.app.getIntheaTersUrl, function (res) {
        _this.setData({
          in_theaters: res.data.subjects
        })
        _this.httpRequest(config.config.app.getComingSoonUrl, function (res) {
          _this.setData({
            coming_soon: res.data.subjects
          })
          console.log('dome渲染完成')
          wx.stopPullDownRefresh();     // 下拉刷新停止
        });
      });
    });
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