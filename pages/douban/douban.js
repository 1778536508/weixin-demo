Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    animationData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx:wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250',
      data: {},
      // "Content-Type": "application/xml"   /  "Content-Type": "json"  / "Content-Type": ""
      header: {
        "Content-Type": "application/xml"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.data.subjects);
        res.data.subjects.map((v, i) => {
          v.animHeight = "";
        })
        _this.setData({
          content: res.data.subjects
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
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
        animation.height('400rpx').step();
        v.animHeight = animation.export();
      }
    })

  
    
    _this.setData({
      content: _this.data.content
    })


    
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