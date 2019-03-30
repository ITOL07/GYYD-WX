// pages/coach/coach.js
const app = getApp()
var fileData = require("../../../utils/data.js");
var commonData = require("../../../utils/util.js"); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: fileData.getListData(),
    // url_test: 'http://localhost:8099',
    coachList:'',
    name:'',
    tel:''
  },
  coachClick: function(){
    var privatedetailRouter = '../../coach/privatedetail/privatedetail';
    var privatedetailTitle = '私教详情';
    commonData.routers(privatedetailRouter, privatedetailTitle);
  },
  coachClick1: function (nu) {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var coachArr = [];
    var url_test ='http://localhost:8099';
    wx.request({
      
      url: url_test+'/mydb/getCoach',
      success: function (res) {
        //console.log(res.data)
        console.log(res.data),
          _this.setData({ name: res.data[0].name }),
          _this.setData({ tel: res.data[0].tel })

        for (var i = 0; i < res.data.length; i++) {
          coachArr.push(res.data[i])
          // coachArr.push(res.data[i].tel,tel)
        }
        _this.setData({
          coachList: coachArr
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