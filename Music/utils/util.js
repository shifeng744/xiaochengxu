function indexResult(callback) {
  wx.request({
    url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {  //成功了
        callback(res.data);
        //console.log(res.data)
      }

    }
  })
}
function topList(callback) {
  wx.request({
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {  //成功了
        callback(res.data);
        //console.log(res.data)
      }

    }
  })
}
//排行榜详细
function topListDetail(id, callback) {
  wx.request({
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      tpl: 3,
      page: 'detail',
      type: 'top',
      topid: id,  //重点
    },
    method: "GET",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {  //成功了
        callback(res.data);
        //console.log(res.data)
      }
    }
  })
}
//歌词
function lyric(val, callback) {
  wx.request({
    url: 'http://gecimi.com/api/lyric/' + val, //仅为示例，并非真实的接口地址
    data: {

    },
    method: "GET",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {  //成功了
        callback(res.data);
        //console.log(res.data)
      }
    }
  })
}
function gethotkey(callback) {
  wx.request({
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 405556840,
      uin: 627060296,
      format: 'json',
      inCharset: 'utf - 8',
      outCharset: 'utf - 8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1
    },
    method: "GET",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {  //成功了
        callback(res.data);
        //console.log(res.data)
      }
    }
  })
}

//搜索结果
function searchResult(val, index, callback) {
  wx.request({
    url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      w: val,
      zhidaqu: 1,
      catZhida: 1,
      t: 0,
      flag: 1,
      ie: 'utf-8',
      sem: 1,
      aggr: 0,
      perpage: 20,
      n: 20,
      p: index,
      _: new Date().getTime()
    },
    method: "GET",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {  //成功了
        callback(res.data);
        //console.log(res.data)
      }
    }
  })
}
module.exports = {
  indexResult: indexResult,  //首页的数据
  topList: topList,  //排行榜
  topListDetail: topListDetail,  //排行榜详细
  lyric: lyric,
  gethotkey: gethotkey,
  searchResult: searchResult //搜索结果
}
