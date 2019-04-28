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
    course_type:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log("开始请求课程详细信息，课程id为" + options.id + "club_id为" + options.club_id)
    
    var url_tmp = fileData.getListConfig().url_test;
    var _this = this;
    _this.setData({
      course_type: options.id,
      club_id: options.club_id
    })
    wx.request({
      url: url_tmp + '/club/getCourseInfo',
      data:{
        type:options.id
      },
      success(res) {
        console.log(res.data)
        _this.setData({
          CourseInfo: res.data
        })
      }
    }) 
  },
  gotoOrderdtl:function(){
    var that=this
    var storedetailRouter = '../../user/orderdetail/orderdetail?club_id=' + that.data.club_id+'&type='+that.data.course_type;
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