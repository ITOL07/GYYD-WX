//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })

        
        }
      }
    })
    wx.getSystemInfo({
      success: res=> {
        console.log(res)
        this.globalData.systemInfo = res.system.toUpperCase()
      }
    })

    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }

    let that = this
    // that.checkLoginStatus()
  },
  // checkLoginStatus: function(){
  //   let that=this
  //   let loginFlag = wx.getStorageSync('loginFlag');
  //   if(loginFlag){
  //     wx.checkSession({
  //       success:function(){
  //         let userStorageInfo=wx.getStorageSync('userInfo');
  //         if (userStorageInfo){
  //           that.globalData.userInfo = JSON.parse(userStorageInfo)
  //         } else{
  //           that.showInfo('缓存信息缺失');
  //           console.error('登录成功后将用户信息')
  //         }
  //       },
  //       fail:function(){
  //         that.doLogin();
  //       }
  //     });
  //   } else {
  //     that.doLogin();
  //   }
  // },
  globalData: {
    userInfo: null,
    openid:null,
    user_id:null,
    phoneNo:null,
    version:'1.0.5',
    systemInfo:null
  }
})