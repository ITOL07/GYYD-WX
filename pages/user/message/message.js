// pages/message/message.js
const app = getApp()
var fileData = require("../../../utils/data.js");
var map = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageData: fileData.getMessageData(),
		selected: true
  },

	switch1: function () {
		this.setData({
			selected: true
		})
		var data = []
		if(this.data.selected==true){
			for(var index in map){
				if(map[index].type=="课程提醒"){
					data.push(map[index])
				}
			}
			this.setData({
				messageData: data
			})
		}
	},

	switch2: function () {
		this.setData({
			selected: false
		})
		var data = []
		if (this.data.selected == false) {
			for (var index in map) {
				if (map[index].type == "系统通知") {
					data.push(map[index])
				}
			}
			this.setData({
				messageData: data
			})
		}
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		map = this.data.messageData
		this.switch1()
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