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
    introduce: '啊哦，分析师还没有填写相关介绍',
    operation: [{
      'typeDescription': '品种',
      'directionDescription': '操作',
      'price': '价格',
      'quantity': '数量',
      'buyRatio': '比例'
    }],
    operationCopy: [{
      'typeDescription': '品种',
      'directionDescription': '操作',
      'price': '价格',
      'quantity': '数量',
      'buyRatio': '比例'
    }],
    pageNo: 0,
    pageSize: 1
  },
  showMore () {
    let that = this
    let inObj3 = {
      those: that,
      url: app.data.operationUrl,
      method: 'POST',
      data: {
        'analystId': that.data.fxsInfo.id,
        'pageNo': ++that.data.pageNo,
        'pageSize': 3
      },
      header: {'Content-Type': 'application/json'}
    }
    app.getData(inObj3, function (res, that) {
      if (!res.data.result) {
        return wx.showToast({
          title: '没有更多的操作记录了',
          icon: 'success'
        })
      }
      if (that.data.pageNo === 1) {
        that.setData({
          operation: that.data.operationCopy.concat(res.data.result)
        })
      } else {
        that.setData({
          operation: that.data.operation.concat(res.data.result)
        })
      }
    })
  },
  /**
   * 处理分析师数据
   * @param res [返回值]
   * @param that [this指向]
   */
  getSingleFixData (res, that) {
    // console.log(res)
    if (res.data.code !== '200') {
      return wx.showModal({
        title: '抱歉',
        content: '抱歉服务器开小差了，请尝试重新打开',
        showCancel: false,
        confirmText: '朕知道了',
        confirmColor: '#0094ff',
        success () {
          wx.switchTab({
            url: '../index/index'
          })
        }
      })
    }
    let fxs = res.data.result
    // 处理字符串
    // 处理时间
    if (fxs.lastOperate !== undefined) {
      // var time = fxs.lastOperate.slice(0, 10)
    } else {
      fxs.lastOperate = '暂无新操作'
    }
    if (!fxs.market) {
      that.data.operation.push({
        'typeDescription': '暂无',
        'directionDescription': '暂无',
        'price': '暂无',
        'quantity': '暂无',
        'buyRatio': '暂无'
      })
    } else {
      that.data.operation.push(fxs.market)
    }
    that.setData({
      fxsInfo: fxs,
      introduce: fxs.introduce,
      show: false,
      hidden: true,
      operation: that.data.operation
    })
    var article = that.data.introduce
    WxParse.wxParse('article', 'html', article, that, 5)
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
    this.setData({
      id: id
    })
    // [url:请求的接口; method:请求的方式; data:请求的数据; header:请求头; callback:回调函数; ]
    let inObj = {
      those: that,
      url: app.data.getfxsUrl + id,
      method: 'GET',
      header: {'Content-Type': 'application/json'}
    }
    // 获取分析师数据
    app.getData(inObj, this.getSingleFixData)
  },
  /**
   * 设置分享
   * @returns {{desc: string, title: string, path: string}}
   */
  onShareAppMessage () {
    return {
      desc: '分享分析师',
      title: '黄金帮，名师帮您做参谋',
      path: '/pages/detail/detail?type=' + this.data.id
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
  }
})
