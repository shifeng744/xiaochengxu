// dtai.js
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var id = option.id;


    this.setData({
      list: util.list,
      dtaiList: util.dtaiList[id],
      prevview: util.imgPath[id].prevview, //大图
      imgPath: util.imgPath[id].imgPath   //小图
    })
  },
  openMap:function(){
    wx.openLocation({
      latitude: 23.148720,
      longitude: 113.257760,
      scale: 28,
      name:"广州站",
      address:"广东省广州市越秀区环市西路159号"
    })
  },
  adtu:function(ev){
    var index = ev.currentTarget.dataset.prindex;
    var that=this;
    wx.previewImage({
      current: that.data.prevview[index], // 当前显示图片的http链接
      urls: that.data.prevview  // 需要预览的图片http链接列表
    })
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