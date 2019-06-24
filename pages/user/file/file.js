// pages/file/file.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		date: '',
		navData: null,
		student: null,
		flag: true
  },

	scroll: function () {
		this.setData({
			flag: false
		})
	},

	getDate: function(){
		var date = new Date()
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()
		var date1 = year+"年"+month+"月"+day+"日"
		this.setData({
			date: date1
		})
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		this.getDate()
		console.log("student:"+this.data.student)
		console.log("navData:"+this.data.navData)
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