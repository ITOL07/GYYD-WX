// pages/storeinfo/storeinfo.js
const app = getApp()
var fileData = require("../../../utils/data.js");
var commonData = require("../../../utils/util.js"); 

Page({
  data: {
    open_time: null,
    close_time: null,
    storeImg: null,
    latitude:null,
    longitude:null,
		markers: [{
			iconPath: "../../../static/images/store/address.png",
			id: 0,
			latitude: 0,
			longitude: 0,
			width: 28,
			height: 38
		}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('club_id==='+options.id)
    var url_tmp = fileData.getListConfig().url_test;
    var _this = this;
    _this.setData({
      club_id: options.id
    })
    console.log('options.id===' + options.id)
    wx.request({
      url: url_tmp + '/club/qry?club_id=' + options.id,
      success(res) {
        console.log(res.data)

        _this.setData({
          storeData: res.data,
          open_time: res.data.openTime.substring(9, 14),
          close_time: res.data.closeTime.substring(9, 14),
          latitude:res.data.la,
          longitude:res.data.lo
        })
				_this.data.markers[0].latitude = _this.data.latitude
				_this.data.markers[0].longitude = _this.data.longitude
				_this.setData({
					markers: _this.data.markers
				})
				console.log("markers====" + JSON.stringify(_this.data.markers))
				console.log("latitude====" + _this.data.latitude)
				console.log("longitude====" + _this.data.longitude)
				console.log("storeData====" + JSON.stringify(_this.data.storeData))
        console.log("close_time====" + _this.data.close_time)
      }
    }) 
    wx.request({
      url: url_tmp + '/img/load2',
      data:{
        user_id: options.id,
        type: 32
      },
      success(res) {
        _this.setData({
          storeImg: res.data   
        })
				console.log("storeImg=" + JSON.stringify(_this.data.storeImg))  
      }
    })
      
  },

	previewImg: function (e) {
		let imgs = []
		let list = this.data.storeImg
		for(let i=0;i<list.length;i++){
			imgs.push(list[i].img_url)
		}
		commonData.previewImg(e, imgs)
	},

  openLocation:function(){
    var _this=this
    // wx.getLocation({
    // type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      // success(res) {
    const latitude = _this.data.latitude
    const longitude = _this.data.longitude
		wx.openLocation({
			latitude,
			longitude,
			scale: 18
		})
    //  }
    // })
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
    console.log("用户点击转发")
    return {
      title: "这个小程序真棒",
      path: "pages/user/login/login"
    }
  }
})