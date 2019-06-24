const app = getApp()
var fileData = require("../../../utils/data.js");
var util = require('../../../utils/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '', //获取到的手机栏中的值
    VerificationCode: '',
    Code: '',
    success: false,
    state: '',
    flag:'',
		status: 1,
		phoneno: ''
  },
  /**
    * 获取验证码
    */
  return_home: function (e) {
    wx.navigateTo({
      url: '/pages/user/login/login',
    })

  },
  return_buy: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
  handleInputPhone: function (e) {
    this.setData({
      phone: e.detail.value,
    })
  },
  handleVerificationCode: function (e) {
    console.log(e);
    this.setData({
      Code: e.detail.value
    })
  },
  
  doGetCode: function () {
    var that = this;
    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
			// status: 2
    })
    var phone = that.data.phone;
    if (phone == '') {
      warn = "号码不能为空";
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      warn = "手机号格式不正确";
    } 
    if (warn != null) {
      wx.showModal({
        title: '提示',
        content: warn
     })
     return
    }else{
      let no = phone.substring(0, 3) + '***' + phone.substring(7, 11)
      that.setData({
        phoneno: no
      })

      var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
      var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
      var url_tmp = fileData.getListConfig().url_test;
      wx.request({
        url: url_tmp + '/user/isReg', //后端判断是否已被注册， 已被注册返回0 ，未被注册返回-1
        method: "POST",
        data: {
          phoneNo: that.data.phone
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("res.data.errocode:" + res.data.errocode)
          that.setData({
            state: res.data.errono
          })
          if (phone == '') {
            warn = "号码不能为空";
          } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
            warn = "手机号格式不正确";
          } //手机号已被注册提示信息
          else if (that.data.state == 0) {  //判断是否被注册
            warn = "手机号已被注册,请登录或者找回密码!";
            if(that.data.flag=="buy"){
              wx.navigateBack({
                delta: 1
              })
            }else{
              wx.navigateTo({
                url: '/pages/user/login/login',
              })
            }  
          }
          else {
            wx.request({
              url: url_tmp + '/user/getvcode', //填写发送验证码接口
              method: "POST",
              data: {
                phoneNo: that.data.phone
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res)
                var res_code=res.data.errocode;
                that.setData({
                  VerificationCode: res.data.vericode
                })
                if(res_code=="0"){
                  that.setData({
                    status:2
                  })
                }
                //当手机号正确的时候提示用户短信验证码已经发送
                wx.showToast({
                  title: '短信验证码已发送',
                  icon: 'none',
                  duration: 2000
                });
                //设置一分钟的倒计时
                var interval = setInterval(function () {
                  currentTime--; //每执行一次让倒计时秒数减一
                  that.setData({
                    text: currentTime + 's', //按钮文字变成倒计时对应秒数

                  })
                  //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
                  if (currentTime <= 0) {
                    clearInterval(interval)
                    that.setData({
                      text: '重新发送',
                      currentTime: 61,
                      disabled: false,
                      color: '#33FF99'
                    })
                  }
                }, 1000);
              }
            })
          };
          //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
          if (warn != null) {
            wx.showModal({
              title: '提示',
              content: warn
            })
            that.setData({
              disabled: false,
              color: '#33FF99'
            })
            return;
          }
        }

      })
    }
		

  },
  submit: function (e) {
   
    var that = this
    if (this.data.Code == '') {
      wx.showToast({
        title: '请输入验证码',
        // image: '/images/error.png',
				icon: 'info',
        duration: 2000
      })
      return
    } else if (this.data.Code != this.data.VerificationCode) {
      wx.showToast({
        title: '验证码错误',
        // image: '/images/error.png',
				icon: 'clear',
        duration: 2000
      })
      return
    }
    else {
      var that = this
      var phone = that.data.phone;
      if(that.data.flag==1){
        console.log('解绑手机号')
        var url_tmp = fileData.getListConfig().url_test + '/user/unBindPhone';
      }else{
        var url_tmp = fileData.getListConfig().url_test+'/user/bindPhone';
        console.log('绑定手机号')
      }
      wx.request({
        url: url_tmp,
        method: "POST",
        data: {
          phoneNo: phone,
          open_id: app.globalData.openid
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          if (that.data.flag == 1) {
            var title = '解绑手机号成功~';
          } else {
            var title = '绑定手机号成功~';
          }
          wx.showToast({
            title: title,
            icon: 'loading',
            duration: 2000
          })
          console.log(res.data)
          app.globalData.phoneNo = phone
          that.setData({
            success: true
          })
        }
      })
    }
  },
  onLoad:function(options){
    console.log("绑定手机号===" + options.id)
    this.setData({
      flag: options.id
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})