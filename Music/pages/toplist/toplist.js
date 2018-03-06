
var util = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  onLoad: function (options) {
    var index = options.id;
    var that=this;
    util.topListDetail(index, function (data) {
     // console.log(data)
      that.setData({
        songlist: data.songlist,
        topinfo: data.topinfo,
        update_time:data


      })
      
    })
  },
  openplaysong:function(ev){
    var index = ev.currentTarget.dataset.idgg;
    app.globalData.songlist = this.data.songlist[index].data;
    wx.navigateTo({
      url: '../playsong/playsong'
    })
  }








})