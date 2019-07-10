Page({
  tap1: function () {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  tap2: function () {
    wx.switchTab({
      url: '../../index/index/index',
    })
  },
  onShareAppMessage: function () {
    console.log("用户点击转发")
    return {
      title: "这个小程序真棒",
      path: "pages/user/login/login"
    }
  }
});