// pages/login/login.js
const app = getApp()
var commonData = require("../../../utils/util.js"); 
var fileData = require("../../../utils/data.js");
var util = require('../../../utils/md5.js') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal1: '',
    inputVal2: '',
    logflag: wx.getStorageSync("logFlag")
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
    var warn = null;
    console.log('pass++++'+This.data.inputVal2)
    console.log('util.hexMD5 pass++++' + util.hexMD5(This.data.inputVal2))
    if (This.data.inputVal1 == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'loading',
        duration: 1500
      })
      return;
    } else if (This.data.inputVal1.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(This.data.inputVal1)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'loading',
        duration: 1500
      })
      return;
    } 
    else if (This.data.inputVal2 == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'loading',
        duration: 1500
      })
      return;
    }
    var url_tmp = fileData.getListConfig().url_test;
    wx.request({
      // url: 'https://www.guyueyundong.com/api/me/login',
      url: url_tmp+'/user/login',
      data: {
        phoneNo: This.data.inputVal1,
        passwd: util.hexMD5(This.data.inputVal2),
        type:1
      },
      method: 'POST',
      // dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'  //发送post请求
      },
      success: function (res) {
        //请求成功的处理
        console.log(res.data)
        app.globalData.phoneNo = This.data.inputVal1
        app.globalData.user_id = res.data.id
        console.log("user_id==="+app.globalData.user_id)
        console.log("phoneNo===" + app.globalData.phoneNo)
        if (res.data.errono==0)
        {
          wx.switchTab({
            url: '../../index/index/index',
            success: function () {
              wx.setNavigationBarTitle({
                title: '首页'
              })
            }
          })
        }else {
          wx.showToast({
            title: res.data.errocode,
            icon: 'loading',
            duration: 1500
          })
          return;
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
  justLook: function () {
    wx.switchTab({
      url: '../../index/index/index',
      success: function () {
        wx.setNavigationBarTitle({
          title: '古越运动'
        })
      }
    })  },
  wxlogin:function(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              console.log('userInfo++++' + res.userInfo.data)
              wx.setStorageSync('logFlag', true)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res)
              }
            }
          })
        }
        else {
          wx.setStorageSync('logFlag', false)
        }
      }
    })
    // 登录
    commonData.wxlogin()
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
    // var _this=this
    // wx.getSetting({
    //   success(res) {
    //     console.log(res.authSetting['scope.userInfo'])
    //     if (res.authSetting['scope.userInfo']){
    //       _this.wxlogin()
    //       _this.setData({
    //         logflag: false
    //       })
    //       console.log("logflag====" + _this.data.logflag)
    //     }
    //   }
    // })
    console.log('logflag======'+this.data.logflag)
    if (this.data.logflag){
      this.wxlogin()
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