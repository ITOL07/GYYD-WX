// pages/agreement/agreement.js
const app = getApp()
var commonData = require("../../../utils/util.js"); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tmp:null

  },

  loadClick:function(options){
    console.log(options)
    var regRouter = '../../user/useragree/useragree?name='+options.currentTarget.id;
    if (options.currentTarget.id=="priv"){
      var regTitle = '用户隐私协议';
    } else if(options.currentTarget.id == "lesson"){
      var regTitle = '私教课协议';
    } else{
      var regTitle = '用户协议';
    }
    
    commonData.routers(regRouter, regTitle);
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
    console.log("用户点击转发")
    return {
      title: "这个小程序真棒",
      path: "pages/user/login/login"
    }
  }
})