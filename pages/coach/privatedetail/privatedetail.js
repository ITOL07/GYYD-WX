// pages/privatedetail/privatedetail.js
const app = getApp()
var fileData = require("../../../utils/data.js");
var commonData = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseData: fileData.getCourseData()
  },
  certificateClick: function(){
    var certificateRouter = '../../coach/certificate/certificate';
    var certificateTitle = '证书';
    commonData.routers(certificateRouter, certificateTitle);
  },
  caseClick: function(){
    var caseRouter = '../../coach/case/case';
    var caseTitle = '案例';
    commonData.routers(caseRouter, caseTitle);
  },
  photoClick: function(){
    var photoRouter = '../../coach/photo/photo';
    var photoTitle = '相册';
    commonData.routers(photoRouter, photoTitle);
  },
  courseClick: function(){
    var coursedetailRouter = '../../coach/coursedetail/coursedetail';
    var coursedetailTitle = '课程详情';
    commonData.routers(coursedetailRouter, coursedetailTitle);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("教练详情页"+options.coachId)
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