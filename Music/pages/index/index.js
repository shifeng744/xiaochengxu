var util = require("../../utils/util.js");
var app = getApp();
Page({
  data:{
    navlist:["推荐","排行榜","搜索"],
    navcur:2,
    searchId:1,
    //searchShow: true,
    timer:null,
    searchform: true,
    searchList: [],
    list: [] //搜索缓存    
  },
  onLoad: function () {
    var that = this;
    util.indexResult(function (data) {
      //console.log(data.data)
      that.setData({
        radioList: data.data.radioList,  //电台
        slider: data.data.slider,
        songList: data.data.songList

      })
    });
    util.gethotkey(function (data) {
      //console.log(data.data)
      that.setData({
        gethotkey: data.data.hotkey.splice(0,9),  //电台

      })
    });
    util.topList(function (data) {
      that.setData({
        topList: data.data.topList,
        
      })
    }); //console.log(data.data.topList)  
  },
  //搜索结果关键字
  bindKeywordInput: function (ev) {
    //console.log(ev.detail.value)
    this.setData({
      searchKey: ev.detail.value,
      searchList: []
      //searchShow: true
    })
  },
  //搜索结果
  searchResult: function () {
    //搜索结果
    var that = this;
    var val = this.data.searchKey;
    var searchId = this.data.searchId;
    util.searchResult(val, searchId, function (data) {
      //console.log(data)
      var searchList = that.data.searchList
      if (that.data.searchform) {
        searchList = data.data.song.list
        console.log(0)
      }
      else {
        searchList = searchList.concat(data.data.song.list);
        console.log(1)//下拉拼接
      }
      that.setData({
        searchList: searchList,

        searchform: false
      })
      //console.log(that.data.searchList)
    })
    var list = this.data.list;
    var obj = {};
    obj.content = this.data.searchKey;
    list.push(obj);

    //离线缓存
    wx.setStorage({
      key: "gg",
      data: list
    });

    this.setData({
      list: list
    })



  },
  lower:function(){ //下拉
    var that = this;
    clearTimeout(this.data.timer);
   
    this.data.timer=setTimeout(function(){
      that.setData({
        searchId: that.data.searchId +1
      })
      that.searchResult();
      console.log(that.data.searchId)
    },100)
  },
  //点击
  tab:function(ev){
    var index = ev.currentTarget.dataset.navid;
    this.setData({
      navcur: index
    })
  },
  openToplist:function(ev){//打开排行榜
    var index = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../toplist/toplist?id=' + index
    })
  },
  //打开播放页面
  openPlayMusic: function (ev) {
    //获取ID 
    var index = ev.currentTarget.dataset.searchid;
    //把一个 传到 getApp
    app.globalData.songlist = this.data.searchList[index]
    //跳转
    wx.navigateTo({
      url: '../playsong/playsong'
    })
  }
  

 
})
