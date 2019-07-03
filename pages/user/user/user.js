// pages/user/user.js
const app = getApp()
var commonData = require("../../../utils/util.js"); 
var fileData = require("../../../utils/data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
    headImage: '../../../static/images/user/head.png',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  queryLesson:function(){
    console.log('累计购课明细！！')

  },
  headImageClick: function () {
    this.setData({
      actionSheetHidden: false
    })
  },
  actionSheetChange: function () {
    this.setData({
      actionSheetHidden: true
    })
  },
  selectPhoto: function () {
    var This = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        This.setData({
          headImage: res.tempFilePaths[0],
          actionSheetHidden: true
        })
      },
    })
  },

  addupClick: function(){
		var addupRouter = '../../user/addup/addup';
    var addupTitle = '累计购课';
    commonData.routers(addupRouter, addupTitle);
  },
  finishedClick: function () {
    var addupRouter = '../../user/finished/finished';
    var addupTitle = '已结束';
    commonData.routers(addupRouter, addupTitle);
  },
  appointmentClick: function () {
    var addupRouter = '../../user/unfinished/unfinished';
    var addupTitle = '待完成';
    commonData.routers(addupRouter, addupTitle);
  },
  loadClick: function () {
    var addupRouter = '../../user/addup/addup?status=null';
    var addupTitle = '待预约';
    commonData.routers(addupRouter, addupTitle);
  },

  fileClick: function(){
    var fileRouter = '../../user/file/file';
    var fileTitle = '身体档案';
    commonData.routers(fileRouter, fileTitle);
  },
  orderClick: function () {
    var orderRouter = '../../user/order/order';
    var orderTitle = '我的订单';
    commonData.routers(orderRouter, orderTitle);
  },
  agreementClick: function () {
    var agreementRouter = '../../user/agreement/agreement';
    var agreementTitle = '用户协议';
    commonData.routers(agreementRouter, agreementTitle);
  },
	serviceClick: function () {
		var agreementRouter = '../../user/service/service';
    var agreementTitle = '客服';
    commonData.routers(agreementRouter, agreementTitle);
  },
	messageClick: function () {
		var agreementRouter = '../../user/message/message';
    var agreementTitle = '消息';
    commonData.routers(agreementRouter, agreementTitle);
  },
  setClick: function(){
    var setRouter = '../../user/set/set';
    var setTitle = '设置';
    commonData.routers(setRouter, setTitle);
  },
  getUserInfo: function (e) {
    // console.log(e)
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getPhoneNo:function(){
    var url_tmp = fileData.getListConfig().url_test;
    var _this = this
    wx.request({
      url: url_tmp +'/user/qry',
      data:{
        mem_id: app.globalData.user_id
      },
      success(res){
        console.log(res)
        app.globalData.phoneNo = res.data.userName
        _this.setData({
          tel: res.data.userName
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   this.show();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(){
    this.show();
  },
  show: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
    this.getPhoneNo();
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
    console.log("用户点击转发")
    return {
      title: "这个小程序真棒",
      path: "pages/user/login/login"
    }
  }
})