// pages/set/set.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNo:app.globalData.phoneNo,
    open_id: app.globalData.openid,
    version:app.globalData.version
  },
  exitClick: function(){
    wx.showModal({
      title: '提示',
      content: '确认是否退出',
      success: function(res){
        if(res.confirm){
          wx.navigateTo({
            url: '../login/login',
            success: function () {
              wx.setNavigationBarTitle({
                title: '登录'
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phoneNo: app.globalData.phoneNo,
      open_id: app.globalData.openid,
      version: app.globalData.version
    })
    console.log('this.data.open_id====' + this.data.open_id)
    console.log('this.data.phoneNo====' + this.data.phoneNo)
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