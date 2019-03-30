// pages/store/store.js
const app = getApp()
var fileData = require("../../../utils/data.js");
var commonData = require("../../../utils/util.js"); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // storeListData: fileData.getStoreListData()
    storeListData: null
  },
  storeClick: function(){
    var storedetailRouter = '../../store/storedetail/storedetail';
    var storedetailTitle = '门店详情';
    commonData.routers(storedetailRouter, storedetailTitle);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    console.log("开始请求门店信息！！")
      wx.request({
        url: 'http://localhost:8099/mydb/getClub',
        success(res){
          console.log(res.data)
          _this.setData({
             storeListData:res.data
          })
        }
      }) 
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