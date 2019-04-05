// pages/login/login.js
const app = getApp()
var commonData = require("../../../utils/util.js"); 
var fileData = require("../../../utils/data.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal1: '',
    inputVal2: ''
  },
  inputValue1: function (res) {
    this.setData({
      inputVal1: res.detail.value
    })
  },
  inputValue2: function (res) {
    this.setData({
      inputVal2: res.detail.value
    })
  },
  loginClick: function(){
    var This = this;
    if (This.data.inputVal1 == '') {
      wx.showToast({
        title: '手机号不能为空',
        image: 'loading',
        duration: 1500
      })
      return;
    } else if (This.data.inputVal2 == '') {
      wx.showToast({
        title: '密码不能为空',
        image: 'loading',
        duration: 1500
      })
      return;
    }
    wx.request({
      // url: 'https://www.guyueyundong.com/api/me/login',
      url: 'http://localhost:8099/user/login',
      data: {
        phoneNo: This.data.inputVal1,
        passwd: This.data.inputVal2
      },
      method: 'POST',
      // dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'  //发送post请求
      },
      success: function (res) {
        //请求成功的处理
        console.log(res.data)
        if (res.data.errocode==="ok")
        {
          wx.switchTab({
            url: '../../index/index/index',
            success: function () {
              wx.setNavigationBarTitle({
                title: '首页'
              })
            }
          })
        }
      }
    })

    // wx.switchTab({
    //   url: '../../index/index/index',
    //   success: function () {
    //     wx.setNavigationBarTitle({
    //       title: '首页'
    //     })
    //   }
    // })
  },
  quickClick: function () {
    var regRouter = '../../user/reg/reg';
    var regTitle = '注册';
    commonData.routers(regRouter, regTitle);
  },
  forgetClick: function(){
    var regRouter = '../../user/forgetPass/forgetPass';
    var regTitle = '重置密码';
    commonData.routers(regRouter, regTitle);
  },
  wxlogin:function(){
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var _this = this
        var url_tmp = fileData.getListConfig().url_test;
        wx.request({
          // url: 'https://www.guyueyundong.com/api/me/login',
          url: url_tmp+'/api/me/login',
          data: {
            code: res.code,
          },
          method: 'POST',
          // dataType: 'json',
          header: {
            'content-type': 'application/x-www-form-urlencoded'  //发送post请求
          },
          success: function (res) {
            //请求成功的处理
            //console.log(code);
            // _this.globalData.openid = res.data.openid
            console.log("发送code成功", res.data);
            console.log("发送code成功", res.data.openid);
            wx.switchTab({
              url: '../../index/index/index',
              success: function () {
                wx.setNavigationBarTitle({
                  title: '首页'
                })
              }
            })
          }
        })
      }
    })
  },
  getPhoneNumber: function (e) {
    console.log(e.detail.iv);
    console.log(e.detail.encryptedData);
    wx.login({
      success: res => {
        console.log(res.code);
        wx.request({
          url: 'http://localhost:8099/user/getPhone',
          data: {
            'encryptedData': encodeURIComponent(e.detail.encryptedData),
            'iv': e.detail.iv,
            'code': res.code
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/json'
          }, // 设置请求的 header
          success: function (res) {
            if (res.status == 1) {//我后台设置的返回值为1是正确
              //存入缓存即可
              wx.setStorageSync('phone', res.phone);
            }
          },
          fail: function (err) {
            console.log(err);
          }
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
wx.getSetting({
  success(res) {
    console.log(res)
    // res.authSetting = {
    //   "scope.userInfo": true,
    //   "scope.userLocation": true
    // }
  }
}), 
wx.openSetting({
  success(res) {
    console.log(res)
    // res.authSetting = {
    //   "scope.userInfo": true,
    //   "scope.userLocation": true
    // }
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