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
    var certificateRouter = '../../coach/certificate/certificate';
    // var certificateRouter = '../../coach/certificate/certificate?coachid=' + app.globalData.user_id+'&type='+event.currentTarget.dataset.param;
    var certificateTitle = '证书';
    commonData.routers(certificateRouter, certificateTitle);
  },
  caseClick: function(){
    var caseRouter = '../../coach/case/case';
    var caseTitle = '案例';
    commonData.routers(caseRouter, caseTitle);
  },
  photoClick: function(){
    var photoRouter = '../../coach/photo/photo';
    var photoTitle = '相册';
    commonData.routers(photoRouter, photoTitle);
  },
  courseClick: function(){
    var coursedetailRouter = '../../coach/coursedetail/coursedetail';
    var coursedetailTitle = '课程详情';
    commonData.routers(coursedetailRouter, coursedetailTitle);
  },
  showCoachInfo:function(param){
    var that = this
    var url_tmp = fileData.getListConfig().url_test;
    console.log(param)
    wx.request({
      url: url_tmp + '/coach/getCoachInfo',
      method:'POST',
      data: { coach_id: param},//param
      header: {
        'content-type': 'application/x-www-form-urlencoded'  //发送post请求
        },success:function(res){
        console.info(res)
        if (res.statusCode == 200){
          that.setData({
            coach_name: res.data.name,
            nick_name: res.data.nickName,
            score: res.data.score,
            adept:res.data.comment
          })
          }
        }
    })
  },
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
        console.info(res)
        if (res.statusCode == 200) {
          that.setData({
            credentials: res.data.credentials,
            cases: res.data.cases,
            albums: res.data.albums
          })
        }
      }
    })
  },
  getClubInfo: function () {
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
          url: url_tmp + '/club/getClub',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("教练详情页" + options.coach_id)
    //默认加载教练个人信息
    this.showCoachInfo(options.coach_id);
    //默认加载教练证件信息
    this.showCoachPapersNum(options.coach_id);
    //默认加载场地信息
    this.getClubInfo();
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