var dateTimePicker = require('../../../utils/timePicker.js');
const app = getApp()
const date1 = new Date()
Page({
  data: {
    date: date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate(),
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: date1.getFullYear(),
    endYear: date1.getFullYear() + 5
  },
  onLoad() {
    console.log("user_id==" + app.globalData.user_id)
    var _this = this
    var arr = []
    wx.request({
      url: 'http://localhost:8099/mydb/getUsers',
      success: function (res) {
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          arr.push(res.data[i].sale_id)
        }
        _this.setData({
          array: arr
        })
      }
    })

    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    console.log(obj1.dateTime)
    console.log(obj1.dateTimeArray)

    this.setData({
      dateTime: obj1.dateTime,
      dateTimeArray: obj1.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  
  changeDate(e) {
    this.setData({ date: e.detail.value });
  },
  changeDateTime(e) {
    console.log(e.detail.value)
    this.setData({
      dateTime: e.detail.value,
    });
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  }
})