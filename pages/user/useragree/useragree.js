// pages/user/useragree/useragree.js
const app = getApp()
var fileData = require("../../../utils/data.js");
// var commonData = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
    url:null
  },

  sysinfo: function () {
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.system)
        console.log(res.system.indexOf("iOS"))
        //var system = res.system.indexOf("IOS");
        // that.setData({
        // systemInfo: res
        // });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getUrl:function(){
    var url_tmp = fileData.getListConfig().url_test;
    var _this=this
    wx.request({
      // url: url_tmp + '/coach/qry',
      url: url_tmp + '/doc/load',
      data:{
        name:'user',
        type:'1'
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        _this.setData({
          url: res.data.url
        })
      }
    }) 
  },
  onLoad: function (options) {
    var that=this
    var sysInfo = app.globalData.systemInfo
    console.log(sysInfo)
    this.getUrl()
    if (sysInfo.indexOf("IOS")>-1){
      that.setData({
        flag:true
      })
      console.log('flag====' + that.data.flag)
    }
    // else{
    //   that.setData({
    //     flag: false
    //   })
    //   console.log('flag====' + flag)
    // }

    if(!that.data.flag){
      wx.downloadFile({
        url: that.data.url,
        success: function (res) {
          console.log(res)
          var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
          wx.openDocument({
            filePath: Path,
            success: function (res) {
              console.log('打开成功');
            }
          })
        },
        fail: function (res) {
          console.log(res);
        }
      })
    }
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