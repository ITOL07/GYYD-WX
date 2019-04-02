//index.js
//获取应用实例
const app = getApp()
var fileData = require("../../../utils/data.js");
var commonData = require("../../../utils/util.js"); 

Page({ 
  data: {
    index_dots: true,
    index_color: "#646967",
    index_activeColor: "#FFFFFF",
    index_interval: 3000,
    index_duration: 1000,
    //测试
    swiperImg: fileData.getSwiperImgData(),
    navData: fileData.getNavData(),
    listData: fileData.getListData(),
    //正式
    // swiperImg: '',
    // navData: '',
    // listData: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //点击导航栏跳转到对应门店信息
  storeClick: function(){
    var storeRouter= '../../store/storedetail/storedetail';
    var storeTitle= '门店信息';
    commonData.routers(storeRouter, storeTitle);
  },
  //点击列表跳转到对应私教信息
  coachClick: function(){
    var coachRouter = '../../coach/privatedetail/privatedetail';
    var coachTitle = '私教信息';
    commonData.routers(coachRouter, coachTitle);
  },
  onLoad: function () {
    var that= this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
