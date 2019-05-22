//index.js
//获取应用实例
const app = getApp()
var fileData = require("../../../utils/data.js");
var commonData = require("../../../utils/util.js"); 

Page({ 
  data: {
    index_dots: true,
		circular: true,
    index_color: "#646967",
    index_activeColor: "#FFFFFF",
    index_interval: 3000,
    index_duration: 1000,
		autoplay: false,
    //测试
    // swiperImg: fileData.getSwiperImgData(),
    swiperImg:null,
    navData: fileData.getNavData(),
    // listData: fileData.getListData(),
    //正式
    // swiperImg: '',
    navData: [],
    listData: null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //点击导航栏跳转到对应门店信息
  storeClick: function(e){
    var storeRouter = '../../store/storedetail/storedetail?id='+e.currentTarget.id;
    var storeTitle= '门店信息';
    commonData.routers(storeRouter, storeTitle);
  },
  //点击列表跳转到对应私教信息
  coachClick: function(e){
    var coachRouter = '../../coach/privatedetail/privatedetail?id='+e.currentTarget.id;
    var coachTitle = '私教信息';
    commonData.routers(coachRouter, coachTitle);
  },
  onLoad:function(){
    this.load();
  },
  onShow:function(){
    this.load();
  },
  load: function () {
    var that= this;
    console.log("openid====" + app.globalData.openid)
    console.log("phoneNo====" + app.globalData.phoneNo)
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
    var _this=this
    var url_tmp = fileData.getListConfig().url_test;
    wx.request({
      // url: url_tmp + '/coach/qry',
      url: url_tmp + '/img/load1',
      data:{
        //6为轮播图
        type:6
      },
      success(res) {
        console.log(res.data)
        _this.setData({
          swiperImg: res.data
        })
      }
    }) 
    wx.request({
      // url: url_tmp + '/coach/qry',
      url: url_tmp + '/coach/getCoach',
      success(res) {
        console.log(res.data)
        _this.setData({
          listData: res.data
        })
      }
    }) 
    // wx.request({
    //   // url: url_tmp + '/coach/qry',
    //   url: url_tmp + '/club/getClub',
    //   success(res) {
    //     console.log(res.data)
    //     _this.setData({
    //       navData: res.data
    //     })
    //   }
    // }) 
    that.getClubInfo()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getClubInfo: function () {
    var _this = this
    wx.getLocation({
      //type: 'wgs84',  
      type: 'gcj02', //微信可用的坐标
      success(res) {
        // _this.setData({
        //   la: res.latitude,
        //   lo: res.longitude
        // })
        const la = res.latitude
        const lo = res.longitude
        console.log(res.latitude + '| ' + res.longitude)
        console.log("开始请求门店信息！！")
        var url_tmp = fileData.getListConfig().url_test;
        wx.request({
          url: url_tmp + '/club/getClub',
          success(res) {
            console.log(res.data)
            let tmp = [];
            var json = {};
            for (var i = 0; i < res.data.length; i++) {
              var distance = commonData.distance(la, lo, res.data[i].la, res.data[i].lo)
              console.log('i===' + i + ' lat==' + res.data[i].la + ' lo==' + res.data[i].lo + '_this.la =====' + la + ' distance===' + distance)
              json = res.data[i]
              json.dis = distance
              
              tmp.push(json)
            }
            if (tmp.length === 0) {
              console.log('无符合条件记录')
            }

						let s = ''
						for (var i = 1; i < tmp.length; i++) {
							for (var j = i; j > 0; j--) {
								if (tmp[j].dis-tmp[j - 1].dis<0) {
									s = tmp[j];
									tmp[j] = tmp[j - 1];
									tmp[j - 1] = s;
								}
							}
						}

            _this.setData({
              navData: tmp
            })
          }
        })
      }

    })
  },
})
