// pages/order/order.js
const app = getApp()
var fileData = require("../../../utils/data.js");
let orderStatus = ''
var map = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: '0',
    orderData: fileData.getOrderData()
    // orderData: null
  },

	tab: function(e){
		this.setData({
			flag: e.target.id
		})
		var flag = this.data.flag
		var data = []
		if(flag=='1'){
			for(var index in map){
				if (map[index].tradeStateDesc=="待付款"){
					data.push(map[index])
				}
			}
		}else if(flag=='2'){
			for(var index in map){
				if (map[index].tradeStateDesc=="已付款"){
					data.push(map[index])
				}
			}
		}else{
			for (var index in map) {
				data.push(map[index])
			}
		}	
		console.log("flag=2,data=" + data)
		this.setData({
			orderData: data
		})
	},
  getOrderData(orderStatus){
    var _this = this
    var url_tmp = fileData.getListConfig().url_test;
    wx.request({
      url: url_tmp +'/member/qryOrder',
      data:{
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
				map = this.data.orderData
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		map = this.data.orderData
		console.log("map:"+map)
    // this.getOrderData(orderStatus)
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
    wx.showNavigationBarLoading();
    this.getOrderData(orderStatus)
    console.log('下拉刷新成功')
    wx.hideNavigationBarLoading();

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