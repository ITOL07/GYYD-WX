const app = getApp()
var fileData = require("../../../utils/data.js");
var commonData = require("../../../utils/util.js");
const ImgLoader = require("../../../utils/img-loader.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
		icons_url: [],
    icons_url_s:[],
    icons_name:[],
    coach_id: app.globalData.user_id,
    type:'23',
    public_url:app.globalData.public_url
  },

	genImgListData: function (options) {
    console.log("获取图片类型为" + options.type)
		var images = []
    var images_s=[]
		var that = this
		var url_tmp = fileData.getListConfig().url_test;
		wx.request({
			url: url_tmp + '/userIcons/queryCoachInfoIcons',
			method: 'POST',
			data: {
				coach_id: options.coachid,
				type: options.type
			},//param
			header: {
				'content-type': 'application/x-www-form-urlencoded'  //发送post请求
			},
			success: function (res) {
				if (res.statusCode == 200) {
					images = res.data.icons_url
          images_s = res.data.icons_url_s
					var img = images.map(item => {
							return {
								url: item,
								loaded: false
							}
					})
          var img_s = images_s.map(item => {
            return {
              url: item,
              loaded: false
            }
          })
					console.log("images:"+JSON.stringify(img)+"---end")
					that.setData({
						icons_url: img,
            icons_url_s:img_s
					})
				}
			}
		})
		
	},

	loadImages: function() {
		//同时发起全部图片的加载
		// this.data.icons_url.forEach(item => {
		// 	this.imgLoader.load(item.url)
		// })
    this.data.icons_url_s.forEach(item => {
      this.imgLoader.load(item.url)
    })
	},
	//加载完成后的回调
	imageOnLoad(err, data) {
		console.log('图片加载完成', err, data.src)

		const icons_url = this.data.icons_url.map(item => {
			if (item.url == data.src)
				item.loaded = true
			return item
		})
    const icons_url_s = this.data.icons_url_s.map(item => {
      if (item.url == data.src)
        item.loaded = true
      return item
    })
    this.setData({ icons_url, icons_url_s})
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		this.genImgListData(options)		
		//初始化图片预加载组件，并指定统一的加载完成回调
		this.imgLoader = new ImgLoader(this, this.imageOnLoad.bind(this))
    // console.log(options)
    // var that = this
    // var url_tmp = fileData.getListConfig().url_test;
    // wx.request({
    //   url: url_tmp + '/userIcons/queryCoachInfoIcons',
    //   method: 'POST',
    //   data: { 
    //     coach_id:options.coachid,
    //     type: options.type
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'  //发送post请求
    //   }, 
		// 	success: function (res) {
    //     console.info(res)
    //     if (res.statusCode == 200) {
    //       that.setData({
    //         icons_name: res.data.icons_name,
    //         // icons_url: res.data.icons_url
    //       })
    //     }
    //     console.log(that.data.icons_name)
    //     // console.log(that.data.icons_url)
    //   }
    // })
  },

	// previewImg: function (e) {
	// 	commonData.previewImg(e, this.data.icons_url)
	// },
  previewImg: function (e) {
    var images = this.data.icons_url
    images = images.map(item => {
      return item.url
    })
    commonData.previewImg(e, images)
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
		var that = this
		setTimeout(function(){
			that.loadImages()
		}, 1000)
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