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
  }
});