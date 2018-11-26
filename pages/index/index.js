// 小程序中调取文件只能用相对路径，不能用绝对路径
var postsData = require('../../data/posts-data.js');
//index.js
//获取应用实例
const app = getApp()

Page({
  // 向程序总是会读取data对象来做数据绑定，这个动作我们成为动作A
  data: {
    array: ['微信好友', '微信朋友圈', '腾讯QQ', '腾讯微博', 'YY直播平台', '陌陌好色交友'], // 分享途径
    dataStatus: false, // 是否显示视频
    autoplay: false, // 是否自动播放
    swiperAutoplay: true, // 是否自动轮播
    json: '', // 首页数据
    comment: '', // 评论数据
    power: '', // 电量
    commentContent: {
      value: '', // 评论内容
    },
    videocNname: '', // 视频连接
    modelImage: '', // 收藏的状态
    backgroundAudio: true, // 背景音乐状态
    fontAwesome: 'fa fa-play-circle-o', // 字体图标
    faSpin: '', // logo旋转
  },
  // 监听数据变化
  watch: {
    ['dataStatus']: {
      handler(newValue) {
        console.log('123', newValue);
      },
      deep: true
    }
  },
  //事件处理函数
  bindViewTap: function(event) {
    console.log('跳转了');
    // 保留当前页面，跳转到应用内的某个页面
    // wx.navigateTo({
    //   url: '/pages/web-view/web-view',
    //   success(res) {
    //     // console.log('跳转成功=>', event)
    //   },
    //   fail(res) {
    //     // console.log('跳转失败=>', res)
    //   },
    //   complete(res) {
    //     // console.log('跳转结束=>', res)
    //   }
    // })
    // 关闭当前页面，跳转到应用内的某个页面
    // wx.redirectTo({
    //   url: '../list/list?id=' + event.currentTarget.dataset.id
    // })
    // 关闭所有页面，打开到应用内的某个页面
    // wx.reLaunch({
    //   url: '../list/list?id=' + event.currentTarget.dataset.id
    // })
    // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    wx.switchTab({
      url: '../list/list?id=' + event.currentTarget.dataset.id
    })
  },
  // 视频播放
  btnVideo(event) {
    console.log('e', event.currentTarget.dataset.arrid, this.data.dataStatus);
    this.setData({
      videocNname: postsData.postVideoUrl[event.currentTarget.dataset.arrid].url, // 视频连接地址
      dataStatus: true, // 显示视频
      autoplay: true, // 自动播放
      swiperAutoplay: false // 停止自动轮播
    })
  },
  // 暂停播放回调事件
  bindpause(e) {
    this.setData({
      dataStatus: false, // 隐藏视频
      autoplay: false, // 关闭自动播放
      swiperAutoplay: true // 开启自动轮播
    })
  },
  iphoneBtn() {
    // 调起电话
    wx.makePhoneCall({
      phoneNumber: '17600085601',
      success: (res) => {
        console.log(res)
      }
    })
  },
  saoBtn() {
    // 调起客户端扫码界面进行扫码
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  // 背景音乐播放状态转换
  transformation(status) {
    if (status) {
      // 播放
      this.setData({
        backgroundAudio: false,
        fontAwesome: 'fa fa-pause-circle',
        faSpin: 'fa-pulse',
      })
    } else {
      // 暂停
      this.setData({
        backgroundAudio: true,
        fontAwesome: 'fa fa-play-circle-o',
        faSpin: '',
      })
    }
  },
  // 背景音乐
  btnbackgroundAuto() {
    var _this = this;
    var backAudio = this.data.backgroundAudio;
    const setBackgroundAudioManager = wx.getBackgroundAudioManager();
    if (backAudio) {
      setBackgroundAudioManager.title = '栀子花的思念 (DJ加快版)';
      setBackgroundAudioManager.epname = '此时此刻';
      setBackgroundAudioManager.singer = '许巍';
      setBackgroundAudioManager.coverImgUrl = 'http://imge.kugou.com/stdmusic/20171014/20171014092011150129.jpg';
      setBackgroundAudioManager.src = 'http://fs.w.kugou.com/201811191043/05b5ac747e1e972b1a73bdf207dea899/G110/M02/11/17/DocBAFng3BmAClc4ADYvnBNAPYY213.mp3';
      this.transformation(backAudio);
      console.log('ws', wx.getBackgroundAudioManager());
    } else {
      setBackgroundAudioManager.pause();
      this.transformation(backAudio);
    }

    //  监听播放
    setBackgroundAudioManager.onPlay(() => {
      // console.log('监听到了播放=>');
      _this.transformation(true);
    })
    // 监听暂停
    setBackgroundAudioManager.onPause(() => {
      // console.log('监听到了暂停=>');
      _this.transformation(false);
    })
  },
  // 双向数据绑定赋值（触发表单事件）
  bindinput(e) {
    this.setData({
      [`commentContent.value`]: e.detail.value
    })
  },
  // pageScrollToBottom: function() {
  //   wx.createSelectorQuery().select('#j_page').boundingClientRect(function(rect) {
  //     // 使页面滚动到底部
  //     wx.pageScrollTo({
  //       scrollTop: rect.bottom
  //     })
  //   }).exec()
  // },
  // 发送评论
  BtnSendOut(event) {
    console.log(this.data.commentContent.value);
    if (this.data.commentContent.value == '') {
      console.log('不能为空');
    } else {
      let commentArr = this.data.comment.hbuider
      let contentArr = commentArr.push({
        id: 1925,
        numage: 0,
        date: '刚刚',
        attbuider: [{
            id: 110,
            cnName: '头像',
            frameuits: {
              conent: '',
              title: '',
              url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1091628847,41930541&fm=26&gp=0.jpg'
            }
          },
          {
            id: 111,
            cnName: '标题',
            frameuits: {
              conent: '',
              title: '七月流水',
              url: ''
            }
          },
          {
            id: 112,
            cnName: '评论内容',
            frameuits: {
              conent: this.data.commentContent.value,
              title: '',
              url: ''
            }
          }
        ]
      })
      console.log('12312', commentArr);
      // 置空
      this.setData({
        [`comment.hbuider`]: commentArr,
        [`commentContent.value`]: ''
      });
      // 置底
      setTimeout(function() {
        wx.createSelectorQuery().select('#j_page').boundingClientRect(function(rect) {
          console.log(rect)
          // 使页面滚动到底部
          wx.pageScrollTo({
            scrollTop: rect.bottom + 1500
          })
        }).exec()
      })

    }
  },
  // 收藏
  collEction() {
    // 小程序的缓存上限最大不能超过10MB
    // wx.setStorageSync('modelImg', 'data');   // 同步设置缓存
    // var stor = wx.getStorageSync('key');   // 同步获取缓存
    // wx.removeStorageSync('key');      // 同步清除缓存
    // wx.clearStorageSync();      // 清除所有的缓存
    var _this = this;
    var postStatus = wx.getStorageSync('modelImg');
    // 模态框
    wx.showModal({
      title: '提示',
      content: !postStatus ? '确定收藏该文章吗?' : '确定不收藏该文章吗?',
      confirmText: '确定',
      cancelText: '取消',
      success(res) {
        if (res.confirm) {
          _this.setData({
            modelImage: !postStatus
          })
          wx.setStorageSync('modelImg', !postStatus);
          _this.openToast(postStatus);
        } else if (res.cancel) {
          postStatus = true;
          _this.openToast(postStatus);
        }
      }
    })



  },
  // 获取数据
  getData() {
    // wx.request({
    //   url: 'http://api.diich.com/rest/cms/store/get', 
    //   data: {
    //     id: '1062256861652033537'
    //   },
    //   method: 'GET',
    //   header: {
    //     'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaWljaC5jb20iLCJqdGkiOiIxMDY0NDUyOTUxNDQwNjI1NjY1IiwiZXhwIjoxNTQzNDg0MzM0LCJfY3VycmVudF9pZCI6MTA1NzIwMTMzNDk0OTU4ODk5NH0.O4hRwkTWStymA8FkuX1lS9RJOb5o6jucIb-Cvk30EEo',
    //     'authorityReference': 'cmsStoreAgainEdit',
    //     'diich': 'f8a9949a93ae9f60c44436c2d0db551d',
    //     'stamp': '1542620334697'
    //   },
    //   success(res) {
    //     console.log(res.data)
    //   },
    //   fail(res) {
    //     console.log(res)
    //   }
    // })
    const requestTask = wx.request({
      url: 'http://gank.io/api/xiandu/category/wow',
      data: {

      },
      method: 'GET',
      success(res) {
        console.log('成功', res)
      },
      fail(res) {
        console.log('失败', res)
      }
    })
    // requestTask.abort();
  },
  // 提示框
  openToast(postStatus) {
    if (postStatus) {
      wx.showToast({
        title: '已取消收藏',
        icon: 'none',
        duration: 500
      })
    } else {
      wx.showToast({
        title: '收藏成功',
        icon: 'none',
        duration: 500
      })
    }
  },
  // loding.....
  hoverLoading() {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 500)
  },
  // 底部选择器
  bindPickerChange(event) {
    console.log(this.data.array[event.detail.value]);
  },
  onLoad: function() {
    this.hoverLoading();


    wx.showShareMenu();
    var _this = this;

    var postStatus = wx.getStorageSync('modelImg');
    this.setData({
      modelImage: postStatus
    })


    this.setData({
      json: postsData.postContentData,
      comment: postsData.postListData,
    })

    // 获取电量
    wx.getBatteryInfo({
      success: (res) => {
        console.log('电量', res);
        _this.setData({
          power: Math.round(res.level) + '%'
        })
      }
    })

    // var num = "";
    // for (var i = 1; i < 10; i++) {
    //   for (var j = 1; j <= i; j++) {
    //     num += j + " X " + i + " = " + (j * i) + ";" + ((j * i) > 9 ? " " : "  ");
    //   }
    //   num += "\n";
    // }
    // console.log(num);

  },
  // 冒泡子级
  bindTouchstartSon() {
    console.log('子级允许冒泡')
  },
  // 阻止冒泡
  catchTouchstartSon() {
    console.log('子级阻止冒泡');
  },
  // 事件捕获父级
  bindTouchstartFather() {
    console.log('父级')
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // console.log('触底了')
  },
  
})