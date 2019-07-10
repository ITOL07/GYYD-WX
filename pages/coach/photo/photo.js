// pages/photo/photo.js
const app = getApp()
var fileData = require("../../../utils/data.js");
var commonData = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_length:0,
    icons_url: [],
    icons_name: [],
    coach_id: app.globalData.user_id,
    type: '25',
    public_url: app.globalData.public_url,
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var url_tmp = fileData.getListConfig().url_test;
    wx.request({
      url: url_tmp + '/userIcons/queryCoachInfoIcons',
      method: 'POST',
      data: {
        coach_id: options.coachid,
        type: options.type
      },//param
      header: {
        'content-type': 'application/x-www-form-urlencoded'  //发送post请求
      }, success: function (res) {
        console.info(res)
        if (res.statusCode == 200) {
          that.setData({
            icons_name: res.data.icons_name,
            icons_url: res.data.icons_url,
            data_length: res.data.icons_url.length
          })
        }
        console.log(that.data.icons_name)
        console.log(that.data.icons_url)
        console.log(that.data.data_length)
      }
    })
  },
  changeImage: function (event) {
    var that = this
    var num = that.data.index
    var fx = event.currentTarget.dataset.param
    var length = that.data.icons_url.length - 1
    console.log(length)
    console.info(fx)
    if (fx == 'left') {
      if (num == 0) {
        num = length
      } else {
        num = num - 1
      }
    } else if (fx == 'right') {
      if (num == length) {
        num = 0
      } else {
        num = num + 1
      }
    }
    console.log(num)
    that.setData({
      index: num
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
    console.log("用户点击转发")
    return {
      title: "这个小程序真棒",
      path: "pages/user/login/login"
    }
  }
})