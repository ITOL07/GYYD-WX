// pages/login/login.js
const app = getApp()
var commonData = require("../../../utils/util.js"); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal1: '',
    inputVal2: ''
  },
  inputValue1: function (res) {
    this.setData({
      inputVal1: res.detail.value
    })
  },
  inputValue2: function (res) {
    this.setData({
      inputVal2: res.detail.value
    })
  },
  loginClick: function(){
    var This = this;
    if (This.data.inputVal1 == '') {
      wx.showToast({
        title: '手机号不能为空',
        image: 'loading',
        duration: 1500
      })
      return;
    } else if (This.data.inputVal2 == '') {
      wx.showToast({
        title: '密码不能为空',
        image: 'loading',
        duration: 1500
      })
      return;
    }

    wx.switchTab({
      url: '../../index/index/index',
      success: function () {
        wx.setNavigationBarTitle({
          title: '首页'
        })
      }
    })
  },
  quickClick: function () {
    var regRouter = '../../user/reg/reg';
    var regTitle = '首注册页';
    commonData.routers(regRouter, regTitle);
  },
  forgetClick: function(){
    console.log(0);
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