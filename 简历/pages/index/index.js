//index.js
//获取应用实例
var util=require("../../utils/util.js")
Page({
  data: {
      off:true
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  onLoad: function () {
      this.setData({
        arr:util.arr
        
      });
      this.automusic();
  },
  //点击
  playmusic:function(){
    var off=!this.data.off;
    this.setData({
      off:off
    })
    this.automusic();
  },
  automusic:function(){
    if(this.data.off){
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/C100001HpGqo4daJ21.m4a?fromtag=38',
        title: '',
        coverImgUrl: ''
      })
    //http://ws.stream.qqmusic.qq.com/C100' + 001HpGqo4daJ21 + '.m4a?fromtag=38
    }
    else{
      wx.pauseBackgroundAudio()
    }
  }
})
