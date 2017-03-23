// 获取全局应用程序实例对象
const app = getApp()
const WxParse = require('../../wxParse/wxParse')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '分析师明细',
    fxsInfo: {},
    introduce: '',
    operation: [{
      'kind': 'AuT+D',
      'change': '买入',
      'price': '价格',
      'garbage': '仓位比列',
      'count': '数量'
    }]
  },
  // todo 点击后请求数据刷新数据
  showMore () {
    // var that = this
    // wx.request()
    var newOperation = [{
      'kind': 'AuT+D',
      'way': '闭仓卖出',
      'price': '价格',
      'garbage': '仓位'
    },
    {
      'kind': 'AuT+D',
      'way': '闭仓卖出',
      'price': '价格',
      'garbage': '仓位'
    },
    {
      'kind': 'AuT+D',
      'way': '闭仓卖出',
      'price': '价格',
      'garbage': '仓位'
    }]
    var operation = this.data.operation.concat(newOperation)
    this.setData({
      operation: operation
    })
    console.log('加载更多数据')
  },
  /**
   * 处理分析师数据
   * @param res
   * @param that
   */
  getSingleFixData (res, that) {
    let fxs = res.data.result
    // 处理字符串
    // 处理时间
    if (fxs.lastOperate !== undefined) {
      var time = fxs.lastOperate.slice(0, 10)
    } else {
      time = '无最新操作时间'
    }
    fxs.lastOperate = time
    // 处理头像
    let photo = app.data.imgUlr + fxs.photo
    fxs.photo = photo
    // 处理介绍信息
    let introduce = fxs.introduce
    console.log(introduce)

    that.setData({
      fxsInfo: fxs,
      introduce: fxs.introduce,
      show: false,
      hidden: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    // console.log(params)
    // 加载分析师信息
    let that = this
    // 页面传递分析师id
    var id = params.type
    // [url:请求的接口; method:请求的方式; data:请求的数据; header:请求头; callback:回调函数; ]
    let inObj = {
      those: that,
      url: app.data.getfxsUrl + id,
      method: 'GET',
      // data: {
      //   'page': {
      //     'pageNo': that.data.pageNo,
      //     'pageSize': that.data.pageSize
      //   },
      //   'nickName': that.data.userInfo.nickName
      // },
      header: {'Content-Type': 'application/json'}
    }
    app.getData(inObj, this.getSingleFixData)
    // // 程序id
    // var appId = app.data.appId
    //
    // // 签名
    // var sign = app.md5()
    // // 时间戳
    // var timestamp = app.timest()
    // // 拼接url
    // var url = app.data.baseUrl + app.data.getfxsUrl + id + '?appId=' + appId + '&sign=' + sign + '&timestamp=' + timestamp
    // // 请求方法
    // var method = 'GET'
    // // 配置传参数据
    // var obj = {
    //   url: url,
    //   method: method,
    //   success (res) {
    //     // console.log(url)
    //     // console.log(res)
    //     let fxs = res.data.result
    //     console.log(fxs)
    //     // 处理字符串
    //     // 处理时间
    //     if (fxs.lastOperate !== undefined) {
    //       var time = fxs.lastOperate.slice(0, 10)
    //     } else {
    //       time = '无最新操作时间'
    //     }
    //     // let time = fxs[i].lastOperate.slice(0, 10) || '无最新操作'
    //     fxs.lastOperate = time
    //     // 处理头像
    //     var photo = app.data.imgUlr + fxs.photo
    //     fxs.photo = photo
    //     that.setData({
    //       fxsInfo: fxs
    //     })
    //   }
    // }
    // wx.request(obj)
  },
  /**
   * 设置分享
   * @returns {{desc: string, title: string, path: string}}
   */
  onShareAppMessage () {
    return {
      desc: '分享分析师',
      title: '黄金帮',
      path: '/pages/detail/detail'
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // 渲染富文本数据
    var reg = /src="/g
    var article = this.data.introduce
    var str = 'src="' + app.data.imgUlr
    article = article.replace(reg, str)
    console.log(article)
    var that = this
    WxParse.wxParse('article', 'html', article, that, 5)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
