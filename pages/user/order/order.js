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
    orderData: null,
    currentTab:0
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
  buyCourse: function (e) {
    var _this = this
    var url_tmp = fileData.getListConfig().url_test;
    var o_no = e.currentTarget.id;
    console.log('重新支付订单号：' + o_no)
    wx.request({
      url: url_tmp + '/member/qryPayInfo',
      data: {
        // order_no: '155757490201017'
        order_no: o_no
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        // if (res.data.errno == "-1") {
        //   wx.showToast({
        //     title: res.data.errcode,
        //     icon: 'none',
        //     duration: 2000
        //   });
        //   return
        // }
        
        wx.requestPayment({
          timeStamp: res.data.timestamp,
          nonceStr: res.data.noncestr,
          package: res.data.package1,
          signType: 'MD5',
          paySign: res.data.sign,
          success(res1) {
            console.log(o_no + '支付成功：' + res1.errMsg)
            //发送支付状态，服务端更新状态
            _this.sendPayRes(o_no)
          },
          fail(res1) {
            console.log(o_no + '支付失败' + res1.errMsg)
            _this.sendPayRes(o_no)
          }
        })
      }

    })
  },
  sendPayRes: function (order_no) {
    var _this = this
    var url_tmp = fileData.getListConfig().url_test;
    wx.request({
      url: url_tmp + '/pay/res',
      data: {
        order_no: order_no,
        openid: app.globalData.openid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("支付结果反馈成功：" + res.data.trade_state_desc)
        wx.showToast({
          title: res.data.trade_state_desc,
          icon: 'loading',
          duration: 2000
        });
        wx.switchTab({
          url: '../../user/user/user',
          success: function () {
            wx.setNavigationBarTitle({
              title: '我的'
            })
          }
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