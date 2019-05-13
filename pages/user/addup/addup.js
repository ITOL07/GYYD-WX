// pages/addup/addup.js
const app = getApp()
var fileData = require("../../../utils/data.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
		// addupData: fileData.getAddupData(),
    addupData:null,
		status: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("开始请求课时信息！！")
    var url_tmp = fileData.getListConfig().url_test;
    var _this = this;
    console.log('options.id===' + options.id + 'options.status' + options.status)
    wx.request({
      url: url_tmp + '/member/qryLesson',
      data:{
        mem_id:app.globalData.user_id,
        status:(typeof(options.status) == "undefined") ? '' : options.status
      },
      success(res) {
        console.log(res.data)

        _this.setData({
          addupData: res.data,
          // open_time: res.data.start_time_1
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

  }
})