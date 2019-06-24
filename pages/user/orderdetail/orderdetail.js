// pages/orderdetail/orderdetail.js
const app = getApp()
var fileData = require("../../../utils/data.js");
var commonData = require("../../../utils/util.js"); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 这里是一些组件内部数据
    // input默认是1 
    
    // 使用data数据对象设置样式名 
    minusStatus: 'disabled',
    course_type:'',
    courseData: null,
    courseData_try: null,
    listData: fileData.getListData(),
    // listData: null,
    storeListData: null,
    club_id: null,
    coach_id: null,
    club_name: null,
    coach_name: null,
    club_id_list: [],
    coach_id_list: [],
    club_name_list: [],
    coach_name_list: [],
    index_club:0,
    index_coach: 0,
    count: 10,
    order_no: null,
    sum:null,
    course_id:null,
    state_desc:null,
    min_count:null,
    // num: 10
  },

    // 这里放置自定义方法
    /* 点击减号 */
    bindMinus: function () {
      var num = this.data.num;
      var price = this.data.courseData.min_price;
      var min_count= this.data.min_count;
      // 如果大于1时，才可以减 
      if (num > min_count) {
        num--;
      }
      // 只有大于一件的时候，才能normal状态，否则disable状态 
      var minusStatus = num <= min_count ? 'disabled' : 'normal';
      // 将数值与状态写回 
      this.setData({
        num: num,
        minusStatus: minusStatus,
        // sum: price * num
      });
      // this.triggerEvent('numChange', this.data.num);
    },
    /* 点击加号 */
    bindPlus: function () {
      var num = this.data.num;
      var min_count = this.data.min_count;
      // 不作过多考虑自增1 
      num++;
      // 只有大于一件的时候，才能normal状态，否则disable状态 
      var minusStatus = num < min_count ? 'disabled' : 'normal';
      // 将数值与状态写回 
      this.setData({
        num: num,
        minusStatus: minusStatus,
        // sum: price * num
      });
      // this.triggerEvent('numChange', this.data.num);
    },
    /* 输入框事件 */
    bindManual: function (e) {
      var num = e.detail.value;
      // 将数值与状态写回 
      this.setData({
        num: num,
        // sum: price*num
      });
      // this.triggerEvent('numChange', this.data.num);
    },
  buyCourse: function (e) {
    var _this = this
    var tel = app.globalData.phoneNo;
    if(tel==null){
      wx.showModal({
        title: '绑定手机确认',
        content: '点击确认绑定手机号',
        success: function (sm) {
          if (sm.confirm) {
            console.log("用户点击确认")
            var addupRouter = '../../user/bindPhone/bindPhone?id=buy' ;
            var addupTitle='绑定手机号'
            commonData.routers(addupRouter, addupTitle);
          } else if (sm.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else {
      var url_tmp = fileData.getListConfig().url_test;
      _this.setData({
        order_no: _this.getOrderNo(),
      })
      if (e.currentTarget.dataset.try_flag == 1) {
        _this.setData({
          count: 1,
          num: 1
        })
      }
      wx.request({
        url: url_tmp + '/pay/id',
        data: {
          desc: e.currentTarget.dataset.desc,
          order_no: _this.data.order_no,
          openid: app.globalData.openid,
          // sale_id: e.currentTarget.dataset.saleid,
          sale_id: _this.data.course_id,
          try_flag: e.currentTarget.dataset.try_flag,
          // price: e.currentTarget.dataset.price * _this.data.count
          price: e.currentTarget.dataset.price,
          count: e.currentTarget.dataset.count
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },

        success(res) {
          console.log("desc==" + _this.data.order_no + "openid===" + _this.data.openid)
          console.log(res.data)
          // console.log(res.data.errno)
          if (res.data.errno == "-1") {
            wx.showToast({
              title: res.data.errcode,
              icon: 'none',
              duration: 2000
            });
            return
          }
          _this.setData({
            timeStamp: res.data.timestamp,
            nonceStr: res.data.noncestr,
            package: res.data.package,
            signType: 'MD5',
            paySign: res.data.sign
          })
          wx.requestPayment({
            timeStamp: _this.data.timeStamp,
            nonceStr: _this.data.nonceStr,
            package: _this.data.package,
            signType: 'MD5',
            paySign: _this.data.paySign,
            success(res) {
              console.log(_this.data.order_no + '支付成功：' + res)
              //发送支付状态，服务端更新状态
              _this.sendPayRes(_this.data.order_no)
            },
            fail(res) {
              console.log(_this.data.order_no + '支付失败' + res)
              _this.sendPayRes(_this.data.order_no)
            }
          })
        }

      })
    }
    
  },
  sendPayRes: function (order_no) {
    var _this = this
    var url_tmp = fileData.getListConfig().url_test;
    wx.request({
      url: url_tmp + '/pay/res',
      data: {
        order_no: order_no,
        openid: app.globalData.openid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("支付结果反馈成功：" + res.data.trade_state)
        console.log("支付结果反馈成功：" + res)
        _this.setData({
          state_desc: res.data.trade_state
        })
        
        // wx.showToast({
        //   title: res.data.trade_state_desc,
        //   icon: 'loading',
        //   duration: 2000
        // });
        if (_this.data.state_desc =='SUCCESS'){
          console.log('succ')
          wx.navigateTo({
            url: '../msg/msg_success',
            success: function () {
              wx.setNavigationBarTitle({
                title: '支付结果页'
              })
            }
          })
        }
        else if (_this.data.state_desc =='NOTPAY') {
          console.log('notpay')
          wx.navigateTo({
            url: '../msg/msg_fail',
            success: function () {
              wx.setNavigationBarTitle({
                title: '支付结果页'
              })
            }
          })
        }
       
      }
    })
  },
  getOrderNo: function () {
    const now = new Date()
    var tmp = (now - 1) + (Math.round(Math.random() * 89 + 100)).toString()
    console.log('订单号为' + tmp)
    return tmp
  },
  getCourseId:function(club_id,coach_id){
    console.log('开始获取课程id,入参为场地id：'+club_id+',教练ID：'+coach_id)
    var _this = this
    var url_tmp = fileData.getListConfig().url_test;
    wx.request({
      url: url_tmp + '/course/getCourseId',
      data: {
        club_id: club_id,
        coach_id: coach_id,
        course_type:_this.data.course_type
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        _this.setData({
          course_id:res.data.courseId
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    console.log("传入信息为 options： "+options)
    console.log("传入的club_id为" + options.club_id + 'course_type为：' + options.type + 'coach_id为' + options.coach_id)
     
    var club_idx = (typeof (options.club_id) == "undefined") ? null : options.club_id
    var coach_idx = (typeof (options.coach_id )== "undefined")? null : options.coach_id
    var club_namex = (typeof (options.club_name) == "undefined")? null : options.club_name
    var coach_namex = (typeof (options.coach_name) == "undefined") ? null : options.coach_name
    _this.setData({
      course_type:options.type,
      club_id: club_idx,
      coach_id: coach_idx,
      club_name: club_namex,
      coach_name: coach_namex
    })
    var url_tmp = fileData.getListConfig().url_test;
    //根据课程类型加载课程讯息
    wx.request({
      url: url_tmp + '/club/getCourseInfo',
      data: {
        type: options.type,
        // id: _this.data.club_id == null ? _this.data.coach_id : _this.data.club_id
        id: club_idx == "null" ? coach_idx : club_idx
      },
      success(res) {
        console.log(res.data)
        _this.setData({
          courseData: res.data,
          min_count:res.data.min_count
        })
        if(res.data.tryFlag=='1'){
          _this.setData({
            num:1
          })
        } else {
          _this.setData({
            num:res.data.min_count
          })
        }
      }
    }) 
    console.log(club_idx+'coach_idx==='+coach_idx+'options.type==='+options.type)
    //根据传入信息判断查询优先场地名称或者教练名称
    if (club_idx == "null"){
      _this.returnClubInfo(coach_idx, options.type);
    } else if (coach_idx=="null"){
      _this.returnCoachInfo(club_idx, options.type);
    }else{
      return
    }
  },
  //根据教练ID和课程类型查询场地信息
  returnClubInfo: function (coach_idx,course_type){
    var _this = this
    var url_tmp = fileData.getListConfig().url_test;
    wx.request({
      url: url_tmp + '/course/getClubOrCoach',
      method:'POST',
      data:{
        coach_id: coach_idx,
        course_type: course_type,
        club_id:''
      }, header: {
        'content-type': 'application/x-www-form-urlencoded'  //发送post请求
      },
      success(res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          _this.setData({
            club_id_list: res.data.id_list,
            club_name_list: res.data.name_list
          })
          _this.getCourseId(_this.data.club_id_list[_this.data.index_club], coach_idx)
        }
      }
    }) 
  },
  //根据场地ID和课程类型查询教练信息
  returnCoachInfo: function (club_idx,course_type) {
    console.log('return coachInfo')
    var _this = this
    var url_tmp = fileData.getListConfig().url_test;
    wx.request({
      url: url_tmp + '/course/getClubOrCoach',
      method: 'POST',
      data: {
        coach_id: '',
        course_type: course_type,
        club_id: club_idx
      }, header: {
        'content-type': 'application/x-www-form-urlencoded'  //发送post请求
      },
      success(res) {
        console.log(res)
        if(res.statusCode == 200){
        _this.setData({
          coach_id_list: res.data.id_list,
          coach_name_list: res.data.name_list
        })
          _this.getCourseId(club_idx, _this.data.coach_id_list[_this.data.index_coach])
        }
      }
    })
  },
  //普通选择器：
  bindPickerChange_club: function (e) {
    console.log('club picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index_club: e.detail.value
    })

    this.getCourseId(this.data.club_id_list[this.data.index_club], this.data.coach_id)
  },
  bindPickerChange_coach: function (e) {
    console.log('coach picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index_coach: e.detail.value
    })

    console.log('选择的教练id为' + this.data.coach_id_list[this.data.index_coach])
    this.getCourseId(this.data.club_id,this.data.coach_id_list[this.data.index_coach])
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