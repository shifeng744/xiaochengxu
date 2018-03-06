// playsong.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgpath:false,
    duration: 0,
    currentPosition: 0,
    currentScent: 0,
    allFZ:0,
    width: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取 屏幕宽度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          eleWidth: res.windowWidth
        })
      }
    });
    var songlist = app.globalData.songlist;
    this.setData({
      songlist: songlist,

      imgPath: 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + songlist.albummid + '.jpg'
    })
    this.autoplayMusic();

    setInterval(function () {
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          //console.log(res)
          that.setData({
            duration: res.duration,   //总时长
            currentPosition: res.currentPosition,   //当前的时间
            currentScent: parseInt(res.currentPosition / 60),//当前的秒
            width: res.currentPosition / res.duration * 100,
            allFZ: parseInt(res.duration / 60)  //当前的分钟
            
          })
        }
      })
    }, 1000)

    var g=that.data.songlist.songname;
    
    util.lyric(g, function (data) {
      //console.log(data.result[0].lrc)
      wx.request({
        url: data.result[0].lrc, //仅为示例，并非真实的接口地址
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var re = /\[.+]/g;
          var gc = res.data.replace(re, "");
          that.setData({
            gc: gc
          })
        }
      })
    });

  },
  play:function(){
    var off= !this.data.imgpath;
    this.setData({
      imgpath:off
    })
    this.autoplayMusic()
  },
  autoplayMusic:function(){
    var songmid = this.data.songlist.songmid;
    if (this.data.imgpath == false) {
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/C100' + songmid + '.m4a?fromtag=38'
      })
    }
    else {
      wx.pauseBackgroundAudio();
    }
  },
  binbar:function(ev){
    //前进后退

      //1.拖拽 事件就只有一个 bindtouchmove   
      //2. 获取 bar 的原点  X=ev.touches[0].clientX - bar.offsetLeft
      //3.页面初始化后马上获取 bar宽度 = 屏幕的宽度 - bar.offsetLeft * 2
      //4.改变当前的时间  
      //    公式：手指移动的距离 / bar的宽度 * 总时长
      //5.调用接口 wx.seekBackgroundAudio  改变当前时长

      /*console.log(ev.touches[0].clientX)
      console.log(ev.target.offsetLeft);*/
      var that = this;
      var X = ev.touches[0].clientX - ev.target.offsetLeft

      //bar的宽度
      var eleWidth = this.data.eleWidth - ev.target.offsetLeft * 2;


      wx.seekBackgroundAudio({  //只有播放的时候才会执行
        position: X / eleWidth * that.data.duration
      })
      //改变当前的时间

      this.setData({
        width: X / eleWidth * 100
      });


  }

  

})