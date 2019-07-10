// pages/storedetail/storedetail.js
const app = getApp()
var fileData = require("../../../utils/data.js");
var commonData = require("../../../utils/util.js");

Page({

  /** 
   * 页面的初始数据
   */
	data: {
		// courseData: fileData.getCourseData(),
		courseData: null,
		courseData_try: null,
		listData: null,
		// listData: null,
		storeListData: null,
		club_id: null,
		count: 10,
		order_no: null,
		// img_url_try:null
	},

	numChange(e) {
		this.setData({
			count: e.detail
		})
		console.log(e.detail)
	},
  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		console.log("开始请求门店信息！！")
		var url_tmp = fileData.getListConfig().url_test;
		var _this = this;
		_this.setData({
			club_id: options.id
		})
		console.log('options.id===' + options.id)
		wx.request({
			url: url_tmp + '/club/qry?club_id=' + options.id,
			success(res) {
				console.log(res.data)

				_this.setData({
					storeListData: res.data
				})
			}
		})
		wx.request({
			// url: url_tmp + '/club/qryCourse?club_id=' + options.id+'&bz1=1',
			url: url_tmp + '/club/getCourseType?club_id=' + options.id + '&bz1=1',
			success(res) {
				console.log(res.data)
				_this.setData({
          courseData_try: commonData.deWeight(res.data, 'courseType'),
				})
			}
		})
		wx.request({
			url: url_tmp + '/club/getCourseType?club_id=' + options.id + '&bz1=0',
			success(res) {
				console.log(res.data)
				_this.setData({
          courseData: commonData.deWeight(res.data, 'courseType')
				})
			}
		})
		wx.request({
			url: url_tmp + '/club/qryCoach?club_id=' + options.id,
			success(res) {
				console.log(res)
        if (res.statusCode==200){
          _this.setData({
            listData: res.data
          })
        }
			}
		})
		// if (app.globalData.openid == null) {
		// 	console.log("openid为空，请绑定微信，否则不能支付哦")
		// 	console.log("调用微信登录接口....")
		// 	commonData.wxlogin()
		// }

	},
	bindStoreInfo: function () {
		// console.log(e)
		var storedetailRouter = '../../store/storeinfo/storeinfo?id=' + this.data.club_id;
		var storedetailTitle = '门店详情';
		commonData.routers(storedetailRouter, storedetailTitle);

	},
	gotobuy: function (e) {
		console.info(e)
		console.log(e.currentTarget.dataset.clubId)
		var storedetailRouter = '../../coach/coursedetail/coursedetail?id=' + e.currentTarget.id + '&club_id=' + e.currentTarget.dataset.clubId + '&club_name=' + e.currentTarget.dataset.club_name;
		var storedetailTitle = '课程详情';
		commonData.routers(storedetailRouter, storedetailTitle);

	},
	getCoachInfo: function (e) {
    var storedetailRouter = '../../coach/privatedetail/privatedetail?id=' + e.currentTarget.id + "&club_id=" + e.currentTarget.dataset.clubId;
    console.log("coach_id=" + e.currentTarget.id + "   club_id==" + e.currentTarget.dataset.clubId)
		var storedetailTitle = '教练详情';
		commonData.routers(storedetailRouter, storedetailTitle);

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
    console.log("用户点击转发")
    return {
      title: "这个小程序真棒",
      path: "pages/user/login/login"
    }
  }

})