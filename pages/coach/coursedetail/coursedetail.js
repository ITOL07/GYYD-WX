// pages/coursedetail/coursedetail.js
const app = getApp()
var fileData = require("../../../utils/data.js");
var commonData = require("../../../utils/util.js"); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CourseInfo:null,
    club_id:null,
    course_type:null,
    img_url:null,
    club_name:null,
    coach_id:null,
    coach_name:null
  },

	call: function(){
		wx.navigateTo({
			url: "../../user/service/service"
		})
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log("开始请求课程详细信息，课程类型为" + options.id + "club_id为" + options.club_id + "club_name为" + options.club_name+"coach_id为"+options.coach_id+"coach_name为"+options.coach_name)
    var url_tmp = fileData.getListConfig().url_test;
    var _this = this;
    _this.setData({
      course_type: options.id,
      club_id: (typeof (options.club_id) == "undefined") ? null : options.club_id,
      club_name: (typeof (options.club_name) == "undefined") ? null : options.club_name,
      // coach_id: options.coach_id == "undefined" ? null : options.coach_id,
      coach_id: (typeof (options.coach_id) == "undefined") ? null : options.coach_id,
      coach_name: (typeof (options.coach_name) == "undefined") ? null : options.coach_name,
    })
    wx.request({
      url: url_tmp + '/club/getCourseInfo',
      data:{
        type:options.id
      },
      success(res) {
        console.log(res.data)
        _this.setData({
          CourseInfo: res.data,
          // img_url:'https://www.guyueyundong.com/'+res.data.bz2.substring(9)
        })
      }
    }) 
  },
  gotoOrderdtl:function(){
    var that=this
    var storedetailRouter = '../../user/orderdetail/orderdetail?club_id=' + that.data.club_id + '&club_name=' + that.data.club_name+'&type='+that.data.course_type+'&coach_id='+that.data.coach_id+'&coach_name='+that.data.coach_name;
    console.log(storedetailRouter)
    var storedetailTitle = '课程详情';
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

  }
})