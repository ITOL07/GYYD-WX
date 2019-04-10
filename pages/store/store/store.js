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
    storeListData: null,
    la:null,
    lo:null
  },
  storeClick: function(e){
    console.log(e)
    var storedetailRouter = '../../store/storedetail/storedetail?id=' + e.currentTarget.id;
     var storedetailTitle = '门店详情';
     commonData.routers(storedetailRouter, storedetailTitle);

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    wx.getLocation({
      //type: 'wgs84',  
      type: 'gcj02', //微信可用的坐标
      success(res) {
        // _this.setData({
        //   la: res.latitude,
        //   lo: res.longitude
        // })
        const la = res.latitude
        const lo = res.longitude
        console.log(res.latitude + '| ' + res.longitude)
        console.log("开始请求门店信息！！")
        var url_tmp = fileData.getListConfig().url_test;
        wx.request({
          url: url_tmp + '/club/getClub',
          success(res) {
            console.log(res.data)
            let tmp = [];
            var json = {};
            for (var i = 0; i < res.data.length; i++) {
              var distance = commonData.distance(la, lo, res.data[i].la, res.data[i].lo)
              console.log('i===' + i + ' lat==' + res.data[i].la + ' lo==' + res.data[i].lo + '_this.la =====' + la + ' distance===' + distance)
              json=res.data[i]
              json.dis=distance
              // if(distance<15000){
              // if (distance >900000) {
              tmp.push(json)
              // }
            }
            if(tmp.length===0){
              console.log('无符合条件记录')
            }
            
            _this.setData({
              storeListData: tmp
            })

            // _this.setData({
            //   storeListData: res.data
            // })
          }
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