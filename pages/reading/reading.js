Page({

  /**
   * 页面的初始数据
   */
  data: {
    progress: 0,    // 进度条
    reading: '',
    multiArray: [[], ["福利", "Android", "iOS", "休息视频", "拓展资源", "前端", "ALL"]],
    multiIndex: [],   // 记住默认选中下标
    keyword: "福利",   // 关键字
    num: 10,   // 每页数量
    page: 1,  // 页数
    loading: false,
    //所有图片的高度
    imgheights: [],
    // 当前所处滑块的index
    circular: '',
    current: '',
  },
  // loding.....
  hoverLoading() {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
  },

  imageLoad: function (e) {
    //获取图片真实宽度
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比
      ratio = imgwidth / imgheight;
    // console.log(imgwidth, imgheight)
    //计算的高度值
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
  },
  bindchange: function (e) {
    // console.log(e.detail.current)
    this.setData({ current: e.detail.current })
    
  },
  /**
   * http 数据交互
   */
  httpRequest(msg, loding) {
    var _this = this;
    wx.request({
      url: 'http://gank.io/api/data/' + _this.data.keyword + '/' + _this.data.num + '/' + _this.data.page,
      data: {},
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('res=>', res, _this.data.page);
        res.data.results.map((v, i) => {
          v.publishedAt = v.publishedAt.split("T")[0] + "   " + v.publishedAt.split("T")[1].split('Z')[0];
          v.createdAt = v.createdAt.split("T")[0] + "   " + v.createdAt.split("T")[1].split('Z')[0];
        })
        if (loding) {
          _this.hoverLoading();
        }
        if (msg) {
          var readingPush = _this.data.reading;
          if (res.data.results.length > 0) {
            res.data.results.map((item, index) => {
              readingPush.push(item);
            })
          } else {
            readingPush.push({
              who: '到底了'
            });
          }
          
          _this.setData({
            reading: readingPush,
            loading: false,
          })
        } else {
          if (res.data.results.length > 0) {
            _this.setData({
              reading: res.data.results   // 赋值数据
            })
          } else {
            _this.setData({
              reading: [
                {
                  who: '暂无数据',
                  url: '',
                  createdAt: '',
                  }
                ]   // 赋值数据
            })
          }
          
          wx.stopPullDownRefresh();     // 下拉刷新停止
        }
        
      },
      fail: function (res) { },
      complete: function (res) {
        console.log('请求过数据')
      },
    })
  },
  //点击路由跳转跳转
  btnVideoPost(event) {
    console.log(event);
    wx.navigateTo({
      url: '/pages/web-view/web-view?_id=' + event.currentTarget.dataset._id + '&type=' + event.currentTarget.dataset.type + '&url=' + event.currentTarget.dataset.url
    })
  },
  // 确定
  bindMultiPickerChange(event) {
    wx.startPullDownRefresh();
    // console.log('改变时触发', event);
    // console.log(this.data.multiArray[1][event.detail.value[1]])
    this.setData({
      multiIndex: event.detail.value,
      page: event.detail.value[0] + 1,
      keyword: this.data.multiArray[1][event.detail.value[1]]
    })
    this.httpRequest();

    wx.setStorageSync('value_list', this.data.keyword);
    wx.setStorageSync('index_list', this.data.page);
    wx.setStorageSync('arr_list', this.data.multiIndex);

   

  },
  // bindMultiPickerColumnChange(e) {
  //   // console.log('修改的列的下标为', e.detail.column, '，值的下标为', e.detail.value);
  // },
  /**
   * 置顶
   */
  roofPlacement() {
    console.log(123);
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
  
    var arr=[];
    for(var i = 1; i <= 100; i++) {
      arr.push(i);
    }
    
    
    _this.setData({
      multiArray: [arr, ["福利", "Android", "iOS", "休息视频", "拓展资源", "前端", "ALL"]],
      multiIndex: wx.getStorageSync('arr_list') ? wx.getStorageSync('arr_list') : [0,0],
      page: wx.getStorageSync('index_list') ? wx.getStorageSync('index_list') : 1,
      keyword: wx.getStorageSync('value_list') ? wx.getStorageSync('value_list') : '福利'
    })
    console.log(wx.getStorageSync('arr_list'))
    console.log(this.data.multiIndex, this.data.page, this.data.keyword)
    
    this.httpRequest(false, true);
    
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.httpRequest();    
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this;
    if (this.data.loading) return;
    this.setData({ loading: true });
    this.data.page++;
    this.httpRequest(true);
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})