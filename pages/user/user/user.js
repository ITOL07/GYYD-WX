// pages/user/user.js
const app = getApp()
var commonData = require("../../../utils/util.js"); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
    headImage: '../../../static/images/user/head.png'
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
    var addupRouter = '../../user/addup/addup';
    var addupTitle = '已完成';
    commonData.routers(addupRouter, addupTitle);
  },
  appointmentClick: function () {
    var addupRouter = '../../user/addup/addup';
    var addupTitle = '预约中';
    commonData.routers(addupRouter, addupTitle);
  },
  loadClick: function () {
    var addupRouter = '../../user/addup/addup';
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
  setClick: function(){
    var setRouter = '../../user/set/set';
    var setTitle = '设置';
    commonData.routers(setRouter, setTitle);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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