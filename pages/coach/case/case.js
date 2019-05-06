// pages/case/case.js
const app = getApp()
var fileData = require("../../../utils/data.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    caseDta: fileData.getCaseData(),
    index: 0
  },

	blur: function () {
		console.log(this.data.index)
		if (this.data.index == 1 || this.data.index == 0) {
			this.setData({
				flag: 0,
				index: 0
			})
		} else {
			this.setData({
				flag: 1,
				index: this.data.index - 1
			})
		}
	},

	focus: function () {
		console.log(this.data.index)
		var index = this.data.index
		var length = this.data.caseDta.length
		if (index == (length - 2) || index == (length - 1)) {
			this.setData({
				flag: 2,
				index: length - 1
			})
		} else {
			this.setData({
				flag: 1,
				index: index + 1
			})
		}
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.caseDta)
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