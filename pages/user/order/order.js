// pages/order/order.js
const app = getApp()
var fileData = require("../../../utils/data.js");
let orderStatus = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ["全部", "待支付", "已支付"],
    // orderData: fileData.getOrderData()
    orderData: null
  },
  //顶部tab切换
  navbarTap: function (e) {
    let index = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: index
    })

    //1"全部";2, "待支付"；3"已支付"；
    if (index == 0) {
      orderStatus = '';
    } else if (index == 1) {
      orderStatus = -1;
    } else if (index == 2) {
      orderStatus = 0;
    } else {
      orderStatus = '';
    }
    this.getOrderData(orderStatus);
  },

  getOrderData(orderStatus) {
    var _this = this
    var url_tmp = fileData.getListConfig().url_test;
    wx.request({
      url: url_tmp + '/member/qryOrder',
      data: {
        // mem_id: app.globalData.user_id
        mem_id: app.globalData.openid,
        trade_state: orderStatus
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        _this.setData({
          orderData: res.data
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderData(orderStatus)
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