const app = getApp()
var fileData = require("data.js");

function routers(routers,title){
  wx.navigateTo({
    url: routers,
    success: function(){
      wx.setNavigationBarTitle({
        title: title
      })
    }
  })
}

function deWeight(arr,param){
  console.log("传入数组："+arr)
  var hash = [];
  arr = arr.reduce(function(x,y){
    hash[y[param]] ? '': hash[y[param]]=true&&x.push(y);
    return x;
  },[])
  console.log("返回去重数组：" + arr)
  return arr
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatTimeHM = str => {
  // const hour = date.getHours()
  // const minute = date.getMinutes()

  // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  // return [hour, minute].map(formatNumber).join(':')
  return str.substring(9,14)
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 计算两个经纬度之间的距离
const distance = (la1, lo1, la2, lo2) => {
  var La1 = la1 * Math.PI / 180.0;
  var La2 = la2 * Math.PI / 180.0;
  var La3 = La1 - La2;
  var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
  s = s * 6378.137; //地球半径
  s = Math.round(s * 10000) / 10;
  // console.log("计算结果",s)
  //计算精度 4位可精确到米
  s = s.toFixed(1);
  return s
}

function wxlogin() {
  // 登录
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      var _this = this
      var url_tmp = fileData.getListConfig().url_test;
      wx.request({
        // url: 'https://www.guyueyundong.com/wxuser/login',
        url: url_tmp + '/wxuser/login',
        data: {
          code: res.code,
          type:1,
          nickName: app.globalData.userInfo.nickName,
          gender: app.globalData.userInfo.gender,
          icon: app.globalData.userInfo.avatarUrl
        },
        method: 'POST',
        // dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded'  //发送post请求
        },
        success: function (res) {
          //请求成功的处理
          //console.log(code);
          app.globalData.openid = res.data.openid
          app.globalData.user_id = res.data.id
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
}

//点击图片查看大图
//e表示当前查看的图片的下标，imgs表示将要预览的图片列表
function previewImg(e, imgs) {
	var index = e.currentTarget.dataset.index
	var imgArr = imgs
	wx.previewImage({
		current: imgArr[index],     //当前图片地址
		urls: imgArr,               //所有要预览的图片的地址集合 数组形式
		success: function (res) {
			console.log("width=" + res.width)
      console.log("urls="+imgArr[index])
		},
		fail: function (res) { },
		complete: function (res) { },
	})
}

function share(){
  console.log("用户点击转发")
  return {
    title: "这个小程序真棒",
    path: "pages/user/login/login"
  }
}

module.exports = {
  formatTime: formatTime,
  formatTimeHM: formatTimeHM,
  routers,
  distance,
  deWeight: deWeight,
  wxlogin: wxlogin,
	previewImg: previewImg,
  share:share
}
