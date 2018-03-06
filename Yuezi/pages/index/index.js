//index.js
//获取应用实例
var util = require("../../utils/util.js")
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    
    

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {

    var that = this;
    that.setData({
      list: util.list
    })
  },
  opendTAI: function (ev) {
    var index = ev.currentTarget.dataset.index;
    wx.navigateTo({
      url: 'dtai/dtai?id=' + index
    })
  }
})
