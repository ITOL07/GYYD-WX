// pages/user/showLess/showLess.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("user_id==" + app.globalData.user_id)
    var _this = this
    var arr = []
    wx.request({
      url: 'http://localhost:8099/member/qryLesson',
      data:{
        mem_id: app.globalData.user_id,
        status:0
      },
      success: function (res) {
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          arr.push(res.data[i])
        }
        _this.setData({
          array: arr
        })
      }
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