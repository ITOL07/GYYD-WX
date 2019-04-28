// pages/storedetail/storedetail.js
const app = getApp()
var fileData = require("../../../utils/data.js");
var commonData = require("../../../utils/util.js"); 

Page({

  /** 
   * 页面的初始数据
   */
  data: {
    // courseData: fileData.getCourseData(),
    courseData:null,
    courseData_try:null,
    listData: fileData.getListData(),
    // listData: null,
    storeListData:null,
    club_id:null,
    count:10,
    order_no:null
  },
  buyCourse: function (e) {
    var _this = this
    var url_tmp = fileData.getListConfig().url_test;
    _this.setData({
      order_no:this.getOrderNo()
    })
    if(e.currentTarget.dataset.try_flag==1){
      this.setData({
        count:1
      })
    }
    wx.request({
      url: url_tmp+'/pay/id',
      data: {
        desc: e.currentTarget.dataset.desc,
        order_no: _this.data.order_no,
        openid: app.globalData.openid,
        sale_id: e.currentTarget.dataset.saleid,
        try_flag: e.currentTarget.dataset.try_flag,
        price: e.currentTarget.dataset.price*_this.data.count
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      
      success(res) {
        console.log("desc==" + _this.data.order_no + "openid===" + _this.data.openid)
        console.log(res.data)
        // console.log(res.data.errno)
        if(res.data.errno=="-1"){
          wx.showToast({
            title: res.data.errcode,
            icon: 'none',
            duration: 2000
          });
          return
        }
        _this.setData({
          timeStamp: res.data.timestamp,
          nonceStr: res.data.noncestr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.sign
        })
        wx.requestPayment({
          timeStamp: _this.data.timeStamp,
          nonceStr: _this.data.nonceStr,
          package: _this.data.package,
          signType: 'MD5',
          paySign: _this.data.paySign,
          success(res) {
            console.log(_this.data.order_no+'支付成功：'+res)
            //发送支付状态，服务端更新状态
            _this.sendPayRes(_this.data.order_no)
          },
          fail(res){
            console.log(_this.data.order_no + '支付失败' + res)
            _this.sendPayRes(_this.data.order_no)
          }
        })
      }

    })
  },
  sendPayRes:function(order_no){
    var _this = this
    var url_tmp = fileData.getListConfig().url_test;
    wx.request({
      url: url_tmp+'/pay/res',
      data: {
        order_no: order_no,
        openid: app.globalData.openid
      }, 
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("支付结果反馈成功：" + res.data.trade_state_desc)
        wx.showToast({
          title: res.data.trade_state_desc,
          icon: 'loading',
          duration: 2000
        });
      }
    })
  },
  getOrderNo: function () {
    const now = new Date()
    var tmp = (now - 1) + (Math.round(Math.random() * 89 + 100)).toString()
    console.log('订单号为'+tmp)
    return tmp
  },
  numChange(e) {
    this.setData({
      count:e.detail
    })
    console.log(e.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("开始请求门店信息！！")
    var url_tmp = fileData.getListConfig().url_test;
    var _this=this;
    _this.setData({
      club_id: options.id
    })
    console.log('options.id==='+options.id)
    wx.request({
      url: url_tmp + '/club/qry?club_id=' + options.id,
      success(res) {
        console.log(res.data)
        
        _this.setData({
          storeListData: res.data
        })
      }
    }) 
    wx.request({
      // url: url_tmp + '/club/qryCourse?club_id=' + options.id+'&bz1=1',
      url: url_tmp + '/club/getCourseType?club_id=' + options.id + '&bz1=1',
      success(res) {
        console.log(res.data)
        _this.setData({
          courseData_try: res.data
        })
      }
    }) 
    wx.request({
      url: url_tmp + '/club/getCourseType?club_id=' + options.id + '&bz1=0',
      success(res) {
        console.log(res.data)
        _this.setData({
          courseData: res.data
        })
      }
    }) 
    wx.request({
      url: url_tmp + '/club/qryCoach?club_id=' + options.id,
      success(res) {
        console.log(res.data)
        _this.setData({
          listData: res.data
        })
      }
    })
    if (app.globalData.openid==null) {
      console.log("openid为空，请绑定微信，否则不能支付哦")
      console.log("调用微信登录接口....")
      commonData.wxlogin()
    }

  },
  bindStoreInfo:function(){
    // console.log(e)
    var storedetailRouter = '../../store/storeinfo/storeinfo?id=' + this.data.club_id;
    var storedetailTitle = '门店详情';
    commonData.routers(storedetailRouter, storedetailTitle);

  },
  gotobuy:function(e){
    var storedetailRouter = '../../coach/coursedetail/coursedetail?id=' + e.currentTarget.id;
    var storedetailTitle = '课程详情';
    commonData.routers(storedetailRouter, storedetailTitle);

  },
  getCoachInfo:function(e){
    var storedetailRouter = '../../coach/privatedetail/privatedetail?id=' + e.currentTarget.id;
    var storedetailTitle = '教练详情';
    commonData.routers(storedetailRouter, storedetailTitle);

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