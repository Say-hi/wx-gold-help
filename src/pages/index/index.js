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
    title: '上海黄金交易所行情',
    userInfo: {},
    fxsNumber: 20,
    scrollHeight: 0,
    scrollTop: 10,
    followText: '',
    // url: '/analyst/list',
    orderBy: 'line',
    pageNo: 0,
    pageSize: 4,
    shanghaiInfo: [{
      'kind': 'Aut+D',
      'price': '278',
      'rise': '11.600',
      'type': 'red'
    },
    {
      'kind': 'Maut+D',
      'price': '2785',
      'rise': '11.1600',
      'type': 'green'
    },
    {
      'kind': 'Maut+D',
      'price': '2785',
      'rise': '11.1600',
      'type': 'green'
    }],
    fxs: []
  },
  /**
   * 处理返回加载跟多请求的数据
   * @param res 传入返回的数据
   * @param that 传入this
   */
  getMoreFixData (res, that) {
    let fxs = res.data.result
    // 处理字符串
    for (let i = 0; i < fxs.length; i++) {
      // 处理时间
      if (fxs[i].lastOperate !== undefined) {
        var time = fxs[i].lastOperate.slice(0, 10)
      } else {
        time = '无最新操作时间'
      }
      fxs[i].lastOperate = time
      // 处理头像
      let photo = app.data.imgUlr + fxs[i].photo
      fxs[i].photo = photo
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
    // 处理字符串
    for (let i = 0; i < fxs.length; i++) {
      // 处理时间
      if (fxs[i].lastOperate !== undefined) {
        var time = fxs[i].lastOperate.slice(0, 10)
      } else {
        time = '无最新操作时间'
      }
      fxs[i].lastOperate = time
      // 处理头像
      let photo = app.data.imgUlr + fxs[i].photo
      fxs[i].photo = photo
    }
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
    // setTimeout(() => {
    //   let addfxs = {
    //     'name': '张三',
    //     'type': '高级分析师',
    //     'style': '稳健性',
    //     'time': '2017/2/2',
    //     'rise': '1.2%'
    //   }
    //   this.data.fxs.push(addfxs)
    //   let that = this
    //   this.setData({
    //     fxs: that.data.fxs,
    //     show: false,
    //     hidden: true
    //   })
    // }, 1000)

    // let that = this
    // let sign = app.md5()
    // let timestamp = app.timest()
    // let method = 'POST'
    // let url = app.data.baseUrl + this.data.url + '?appId=' + appId + '&sign=' + sign + '&timestamp=' + timestamp
    // let obj = {
    //   url: url,
    //   data: {
    //     'page': {
    //       'pageNo': that.data.pageNo,
    //       'pageSize': that.data.pageSize
    //     },
    //     'nickName': that.data.userInfo.nickName
    //   },
    //   header: {'Content-Type': 'application/json'},
    //   method: method,
    //   success (res) {
    //     let fxs = res.data.result
    //     // 处理字符串
    //     for (let i = 0; i < fxs.length; i++) {
    //       // 处理时间
    //       if (fxs[i].lastOperate !== undefined) {
    //         var time = fxs[i].lastOperate.slice(0, 10)
    //       } else {
    //         time = '无最新操作时间'
    //       }
    //       fxs[i].lastOperate = time
    //       // 处理头像
    //       let photo = app.data.imgUlr + fxs[i].photo
    //       fxs[i].photo = photo
    //     }
    //     that.setData({
    //       fxs: that.data.fxs.concat(fxs),
    //       show: false,
    //       hidden: true
    //     })
    //   }
    // }
    // wx.request(obj)
    let that = this
    // [url:请求的接口; method:请求的方式; data:请求的数据; header:请求头; callback:回调函数; ]
    let inObj = {
      those: that,
      url: app.data.homeUrl,
      method: 'POST',
      data: {
        // 'orderBy': that.data.orderBy,
        'pageNo': that.data.pageNo,
        'pageSize': that.data.pageSize,
        'nickName': that.data.userInfo.nickName
      },
      header: {'Content-Type': 'application/json'}
    }
    app.getData(inObj, that.getMoreFixData)
  },
  // 下拉重新加载数据
  refresh () {
    if (this.data.flag) {
      this.setData({
        pageNo: 0,
        flag: false
      })
      // wx.showToast({
      //   title: '刷新数据中',
      //   icon: 'loading',
      //   duration: 10000
      // })
      console.log('重新加载数据')
      this.onLoad()
    }
    // console.log('呵呵')
    // this.onLoad()
  },
  // 滚动设置高度
  scroll (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    })
  },
  /**
   * 分享设置
   * @returns {desc: string, title: string, path: string}
   */
  onShareAppMessage () {
    return {
      desc: '分享我的首页',
      title: '黄金帮',
      path: '/pages/index/index'
    }
  },
  /**
   * 关注分析师功能
   */
  followfxs (e) {
    let that = this
    app.followfxs(e, that)
  },
  // 关注分析师点击确定后逻辑
  confirmfxs () {
    let that = this
    app.confirmfxs(that)
  },
  //   confirmfxs () {
  //     this.setData({
  //       followHidden: true
  //     })
  //   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    let that = this
    // app.userLogin()
    // var sessionId = wx.getStorageSync('sessionId')
    // 页面回滚到预设位置
    this.setData({
      scrollTop: 10,
      flag: true,
      userInfo: wx.getStorageSync('userInfo')
    })
    console.log(' ---------- onLoad ----------')
    //  获取用户信息
    // app.getUserInfo()
    //   .then(info => this.setData({ userInfo: info }))
    //   .catch(console.info)
    // app.userLogin()
    // let that = this
    // let url = that.data.url
    // console.dir(app.data)
    // 数据请求
    // getData(url, function () {
    //   that.setData({
    //     hidden: true
    //   })
    // })
    // 设定scroll-height高度值
    wx.getSystemInfo({
      success (res) {
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    })
    // wx.getUserInfo({
    //   success (res) {
    //     that.setData({
    //       userInfo: res.userInfo
    //     })
    //   }
    // })
    // console.log(that.data.userInfo)
    // this.setData({
    //   userInfo: app.data.userInfo
    // })
    // 加载首页数据
    // let sign = app.md5()
    // let timestamp = app.timest()
    // let url = app.data.baseUrl + this.data.url + '?appId=' + appId + '&sign=' + sign + '&timestamp=' + timestamp
    // let method = 'POST'
    // let obj = {
    //   url: url,
    //   data: {
    //     'page': {
    //       'pageNo': that.data.pageNo,
    //       'pageSize': that.data.pageSize
    //     },
    //     'nickName': that.data.userInfo.nickName
    //   },
    //   header: {'Content-Type': 'application/json'},
    //   method: method,
    //   success (res) {
    //     // console.log(url)
    //     // console.log(res)
    //     // console.log(res.data.result)
    //     let fxs = res.data.result
    //     // 处理字符串
    //     for (let i = 0; i < fxs.length; i++) {
    //       // 处理时间
    //       if (fxs[i].lastOperate !== undefined) {
    //         var time = fxs[i].lastOperate.slice(0, 10)
    //       } else {
    //         time = '无最新操作时间'
    //       }
    //       // let time = fxs[i].lastOperate.slice(0, 10) || '无最新操作'
    //       fxs[i].lastOperate = time
    //       // 处理头像
    //       let photo = app.data.imgUlr + fxs[i].photo
    //       fxs[i].photo = photo
    //     }
    //     that.setData({
    //       fxs: fxs
    //     })
    //   }
    // }
    // wx.request(obj)
    // 请求首页数据
    setTimeout(function () {
      let inObj = {
        those: that,
        url: app.data.homeUrl,
        method: 'POST',
        data: {
          'pageNo': that.data.pageNo,
          'pageSize': that.data.pageSize,
          'nikeName': that.data.userInfo.nickName
        },
        header: {'Content-Type': 'application/json'}
      }
      app.getData(inObj, that.getHomeFixData)
    },500)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    console.log(' ---------- onReady ----------')
    // let that = this
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    console.log(' ---------- onShow ----------')
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    console.log(' ---------- onUnload ----------')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    console.log(' ---------- onPullDownRefresh 重新获取当前页数据 ----------')
  //  下拉刷新重新获取数据
  //   let that = this
  //   let url = that.data.url
  //   this.setData({
  //     hidden: false
  //   })
  //   getData(url, function () {
  //     that.setData({
  //       hidden: true
  //     })
  //   })
  }
})
