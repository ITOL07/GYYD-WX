// pages/privatedetail/privatedetail.js
const app = getApp()
var fileData = require("../../../utils/data.js");
var commonData = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseData: fileData.getCourseData(),
    param_id:'',//存储传如本页面的教练ID，作为参数传到下一级
    nick_name:'',//昵称
    coach_name:'',//教练姓名
    score:'',//评分
    credentials:'',//证书
    cases:'',//案例
    albums:'',//相册
    introduction:'',//教练简介
    adept:'',//擅长

    //测试
    //navData: fileData.getNavData(),
    //正式
    navData: [],
  },
  certificateClick: function(event){
    console.log(event)
   // var certificateRouter = '../../coach/certificate/certificate';
     var certificateRouter = '../../coach/certificate/certificate?coachid=' + this.data.param_id+'&type='+event.currentTarget.dataset.param;
    var certificateTitle = '证书';
    commonData.routers(certificateRouter, certificateTitle);
  },
  caseClick: function (event){
    var caseRouter = '../../coach/case/case?coachid=' + this.data.param_id + '&type=' + event.currentTarget.dataset.param;
    var caseTitle = '案例';
    commonData.routers(caseRouter, caseTitle);
  },
  photoClick: function (event){
    var photoRouter = '../../coach/certificate/certificate?coachid=' + this.data.param_id + '&type=' + event.currentTarget.dataset.param;
    var photoTitle = '相册';
    commonData.routers(photoRouter, photoTitle);
  },
  courseClick: function(e){
    console.log('privateDetail.coach_id' + e.currentTarget.dataset.coachId + 'coach_name' + e.currentTarget.dataset.coach_name)
    // var coursedetailRouter = '../../coach/coursedetail/coursedetail';
    var coursedetailRouter = '../../coach/coursedetail/coursedetail?id=' + e.currentTarget.id + '&coach_id=' + e.currentTarget.dataset.coachId + '&coach_name=' + e.currentTarget.dataset.coach_name;
    var coursedetailTitle = '课程详情';
    commonData.routers(coursedetailRouter, coursedetailTitle);
  },

  //展示教练个人信息
  showCoachInfo:function(param){
    var that = this
    var url_tmp = fileData.getListConfig().url_test;
    var coach_info = "暂时没有信息"
    console.log(param)
    wx.request({
      url: url_tmp + '/coach/getCoachInfo',
      method:'POST',
      data: { coach_id: param},//param
      header: {
        'content-type': 'application/x-www-form-urlencoded'  //发送post请求
        },success:function(res){
        console.info(res.data)
        if (res.statusCode == 200){
          that.setData({
            coach_name: res.data.name,
            nick_name: res.data.nickName,
            score: res.data.score,
            adept:res.data.comment,
            icon_url:res.data.icon,
            introduction: (res.data.introduction == null)? coach_info : res.data.introduction
          })
          }
        }
    })
  },

  //展示教练证件信息
  showCoachPapersNum: function (param) {
    var that = this
    var url_tmp = fileData.getListConfig().url_test;
    console.log(param)
    wx.request({
      url: url_tmp + '/userIcons/getCoachPapersNum',
      method: 'POST',
      data: { coach_id: param },//param
      header: {
        'content-type': 'application/x-www-form-urlencoded'  //发送post请求
      }, success: function (res) {
        console.info(res.data)
        if (res.statusCode == 200) {
          that.setData({
            credentials: res.data.credentials == undefined ? 0 : res.data.credentials,
            cases: res.data.cases == undefined ? 0 : res.data.cases,
            albums: res.data.albums == undefined ? 0 : res.data.albums
          })
        }
      }
    })
  },

  //获取教练场地信息
  getClubInfo: function (param) {
    var _this = this
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
          url: url_tmp + '/coach/getMyClub',
          data:{
            coach_id: param
          },
          success(res) {
            console.log(res.data)
            let tmp = [];
            var json = {};
            for (var i = 0; i < res.data.length; i++) {
              var distance = commonData.distance(la, lo, res.data[i].la, res.data[i].lo)
              console.log('i===' + i + ' lat==' + res.data[i].la + ' lo==' + res.data[i].lo + '_this.la =====' + la + ' distance===' + distance)
              json = res.data[i]
              json.dis = distance

              tmp.push(json)
            }
            if (tmp.length === 0) {
              console.log('无符合条件记录')
            }

            _this.setData({
              navData: tmp
            })
          }
        })
      }

    })
  },
  getCourseInfo: function (para1,para2) {
    var that = this
    var url_tmp = fileData.getListConfig().url_test;
    console.log('获取教练课程信息'+para1)
    wx.request({
      // url: url_tmp + '/course/getCourseInfo',
      url: url_tmp + '/coach/qryCourse',
      method: 'POST',
      data: { 
        coach_id: para1 ,
        try_flag:'',
        club_id: (typeof (para2) == "undefined") ? '' : para2},//param
      header: {
        'content-type': 'application/x-www-form-urlencoded'  //发送post请求
      }, success: function (res) {
        console.info(res.data)
        if (res.statusCode == 200) {
          that.setData({
            courseData: commonData.deWeight(res.data,'courseType')
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("教练详情页" + options.id+"club_id==="+options.club_id)
    this.setData({
      param_id: options.id
    });
    //默认加载教练个人信息
    this.showCoachInfo(options.id);
    //默认加载教练证件信息
    this.showCoachPapersNum(options.id);
    //默认加载场地信息
    this.getClubInfo(options.id);
    //默认加载教授课程信息
    this.getCourseInfo(options.id, options.club_id);
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
		wx.hideNavigationBarLoading() //完成停止加载
		wx.stopPullDownRefresh() //停止下拉刷新
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

  },
  storeClick: function (e) {
    console.log(e)
    var storedetailRouter = '../../store/storedetail/storedetail?id=' + e.currentTarget.id;
    var storedetailTitle = '门店详情';
    commonData.routers(storedetailRouter, storedetailTitle);

  },
})