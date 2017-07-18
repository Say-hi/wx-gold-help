// 获取全局应用程序实例对象
const app = getApp()
// let appId = app.data.appId
/**
 * 用于获取后台数据
 * @param url {String} url地址
 * @param callback {Function} 回调函数
 */
// function getData (url, callback) {
//   wx.request({
//     url: url,
//     header: {
//       'content-type': 'json'
//     },
//     success () {
//       callback()
//       console.info('get data success')
//     },
//     fail () {
//       //  todo
//     }
//   })
// }
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 初始化展示
    hidden: true,
    // 查看更多显示
    show: true,
    // 信息展示
    infoShow: true,
    // 关注弹窗显示
    followHidden: true,
    flag: true,
    status: 0,
    stockCode: 0,
    title: '信息展示',
    userInfo: {},
    currentSearch: 0,
    goOn: true,
    orderBy: 'a.is_top desc,a.create_date desc',
    searchTitle: ['默认', '收益率', '最近操作'],
    search: ['a.is_top desc,a.create_date desc', 'a.profitability desc', 'a.last_operate desc'],
    followText: '',
    pageNo: 1,
    pageSize: 4,
    shanghaiInfo: [
      {
        'prod_name': 'Au(T+D)',
        'new_price': '--',
        'up_down_rate': '--',
        'quote_time': '--',
        'up_down': '--'
      },
      {
        'prod_name': 'mAu(T+D)',
        'new_price': '--',
        'up_down_rate': '--',
        'quote_time': '--',
        'up_down': '--'
      },
      {
        'prod_name': 'Ag(T+D)',
        'new_price': '--',
        'up_down_rate': '--',
        'quote_time': '--',
        'up_down': '--'
      }
    ],
    fxs: [],
    indexImg: '../../images/logo1.png'
  },
  /**
   * 改变Search选项
   * @param e
   */
  changeSearch (e) {
    let index = e.currentTarget.dataset.serahcindex
    this.setData({
      pageNo: 1,
      goOn: true,
      currentSearch: index,
      orderBy: this.data.search[index]
    })
    this.homeUser()
  },
  /**
   * 处理返回加载跟多请求的数据
   * @param res 传入返回的数据
   * @param that 传入this
   */
  getMoreFixData (res, that) {
    let fxs = res.data.result
    if (!fxs) {
      return wx.showToast({
        title: '没有更多的分析师了',
        icon: 'success',
        success () {
          that.setData({
            show: false,
            hidden: true
          })
        }
      })
    }
    // 处理字符串
    for (let i = 0; i < fxs.length; i++) {
      // 处理时间
      if (fxs[i].lastOperate !== undefined) {
        // var time = fxs[i].lastOperate.slice(0, 10)
      } else {
        fxs[i].lastOperate = '无操作时间'
      }
    }
    that.setData({
      fxs: that.data.fxs.concat(fxs),
      show: false,
      hidden: true
    })
  },
  /**
   * 处理返回加载首页请求的数据
   * @param res
   * @param that
   */
  getHomeFixData (res, that) {
    let fxs = res.data.result
    if (res.data.code !== '200') {
      this.setData({
        status: 0
      })
      return
      // this.onLoad()
    } else {
      for (let i = 0; i < fxs.length; i++) {
        // 处理时间
        if (fxs[i].lastOperate !== undefined) {
          // var time = fxs[i].lastOperate.slice(0, 10)
        } else {
          fxs[i].lastOperate = '无操作时间'
        }
      }
    }
    // 更新数据
    // 停止弹出框
    wx.hideToast()
    // 停止下拉刷新
    wx.stopPullDownRefresh()
    that.setData({
      fxs: fxs,
      show: false,
      hidden: true
    })
  },
  /**
   * 显示更多信息
   */
  showMore () {
    // todo 后台数据获取
    // wx:request({})
    this.setData({
      pageNo: ++this.data.pageNo,
      hidden: false
    })
    let that = this
    // [url:请求的接口; method:请求的方式; data:请求的数据; header:请求头; callback:回调函数; ]
    let inObj = {
      those: that,
      url: app.data.homeUrl,
      method: 'POST',
      data: {
        'orderBy': that.data.orderBy,
        'pageNo': that.data.pageNo,
        'pageSize': that.data.pageSize,
        'nickName': that.data.userInfo.nickName
      },
      header: {'Content-Type': 'application/json'}
    }
    app.getData(inObj, that.getMoreFixData)
  },
  /**
   * 分享设置
   * @returns {desc: string, title: string, path: string}
   */
  onShareAppMessage () {
    return {
      desc: '分享我的首页',
      title: '黄金帮，名师帮您做参谋',
      path: '/pages/index/index'
    }
  },
  /**
   * 关注分析师功能
   */
  followfxs (e) {
    let that = this
    let useUrl = app.data.followUrl
    app.followfxs(e, that, useUrl)
  },
  /**
   * 取消关注分析师功能
   * @param e
   */
  cancelFollow () {
    wx.showModal({
      title: '取消关注',
      content: '请在"我的分析师"页面取消关注',
      showCancel: false
    })
  },
  // 关注分析师点击确定后逻辑
  confirmfxs () {
    let that = this
    app.confirmfxs(that)
  },
  // 获取sessionId
  getSessionId (callback) {
    let that = this
    wx.getStorage({
      key: 'sessionId',
      success () {
        // console.log(res)
        // if (!res.data) return that.getSessionId()
        callback
      },
      fail () {
        return that.getSessionId()
      }
    })
  },
  // 获取首页分析师列表信息
  homeUser () {
    let that = this
    wx.getStorage({
      key: 'userInfo',
      success (res) {
        that.setData({
          userInfo: res.data
        })
        let inObj = {
          those: that,
          url: app.data.homeUrl,
          method: 'POST',
          data: {
            'orderBy': that.data.orderBy,
            'pageNo': that.data.pageNo,
            'pageSize': that.data.pageSize,
            'nikeName': that.data.userInfo.nickName
          },
          header: {'Content-Type': 'application/json'}
        }
        that.getSessionId(app.getData(inObj, that.getHomeFixData))
      },
      fail () {
        let inObj = {
          those: that,
          url: app.data.homeUrl,
          method: 'POST',
          data: {
            'orderBy': that.data.orderBy,
            'pageNo': that.data.pageNo,
            'pageSize': that.data.pageSize
          },
          header: {'Content-Type': 'application/json'}
        }
        app.getData(inObj, that.getHomeFixData)
      }
    })
  },
  /**
   * 发送formId
   * @param e
   */
  msgSub (e) {
    app.sendFormId(e)
  },
  /**
   * 获取交易所信息
   * @param that
   * @returns {*}
   */
  getStockInfo () {
    let that = this
    let stockObj = {
      url: app.data.stockUrl,
      method: 'POST',
      data: {
        'accessKey': app.data.accessKey,
        'token': app.stockmd5(),
        'time': app.timest13()
      },
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
      success (res) {
        // console.log(res)
        if (res.data.resultCode !== 0) {
          // console.log('交易所问题')
          return setTimeout(that.getStockInfo, 200)
        }
        let arr = res.data.resultData
        if (!arr) return
        for (let i = 0; i < arr.length; i++) {
          let date = arr[i].quote_time.split('')
          date.splice(2, 0, ':')
          date.splice(5, 0, ':')
          arr[i].quote_time = date.join('')
          // 处理百分比
          // arr[i].up_down_rate = (arr[i].up_down_rate * 100).toString().slice(0, 5) + '%'
          // arr[i].up_down_rate = (arr[i].up_down_rate * 10000) / 100.00 + '%'
          arr[i].up_down_rate = that.changeTwoDecimalf(arr[i].up_down_rate) + '%'
        }
        that.setData({
          shanghaiInfo: res.data.resultData,
          stockCode: res.data.resultCode
        })
      }
    }
    wx.request(stockObj)
  },
  /**
   * 小数点后两位
   * @param floatvar
   * @returns {*}
   */
  changeTwoDecimalf  (floatvar) {
    var fx = parseFloat(floatvar)
    if (isNaN(fx)) {
      return false
    }
    fx = Math.round(fx * 10000) / 100.00
    var sx = fx.toString()
    var posdecimal = sx.indexOf('.')
    if (posdecimal < 0) {
      posdecimal = sx.length
      sx += '.'
    }
    while (sx.length <= posdecimal + 2) {
      sx += '0'
    }
    return sx
  },
  // 获取首页图片
  indeximg (res, that) {
    that.setData({
      indexImg: res.data.result
    })
  },
  // 获取图片
  todayTipsInterface () {
    let that = this
    let obj = {
      url: app.data.todayTipsInterfaceUrl,
      those: that
    }
    app.getData(obj, that.indeximg)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // this.msgSubmit()
    let that = this
    // let that = this
    // this.getStockInfo()
    // 页面数据初始化
    // app.userLogin()
    this.setData({
      pageNo: 1,
      flag: true
    })
    if (this.data.status === 0) {
      that.homeUser()
    } else {
      let inObj = {
        those: that,
        url: app.data.homeUrl,
        method: 'POST',
        data: {
          'orderBy': that.data.orderBy,
          'pageNo': that.data.pageNo,
          'pageSize': that.data.pageSize,
          'nikeName': that.data.userInfo.nickName
        },
        header: {'Content-Type': 'application/json'}
      }
      app.getData(inObj, that.getHomeFixData)
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    this.todayTipsInterface()
    // console.log(' ---------- onReady ----------')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    let that = this
    // console.log(' ---------- onShow ----------')
    // 当状态确认时请求数据
    if (this.data.status === 1) {
      this.setData({
        pageNo: 1
      })
      let inObj = {
        those: that,
        url: app.data.homeUrl,
        method: 'POST',
        data: {
          'orderBy': that.data.orderBy,
          'pageNo': that.data.pageNo,
          'pageSize': that.data.pageSize,
          'nikeName': that.data.userInfo.nickName
        },
        header: {'Content-Type': 'application/json'}
      }
      app.getData(inObj, that.getHomeFixData)
    }
    // 设置状态
    this.setData({
      status: 1
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // console.log(' ---------- onUnload ----------')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // 显示弹出框
    wx.showToast({
      title: '接收数据中...',
      icon: 'loading',
      duration: 10000
    })
    // 重新加载首页数据
    this.onLoad()
  },
  /**
   * 页面相关事件处理函数--监听用户上拉触底动作
   */
  onReachBottom () {
    this.showMore()
  }
})
