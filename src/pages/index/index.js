// 获取全局应用程序实例对象
const app = getApp()
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
    title: '上海黄金交易所行情',
    userInfo: {},
    fxsNumber: 20,
    scrollHeight: 0,
    url: 'https://api.douban.com/v2/movie/in_theaters',
    shanghaiInfo: [{
      'kind': 'Aut+D',
      'price': '278',
      'time': '11.600',
      'type': 'red'
    },
    {
      'kind': 'Maut+D',
      'price': '2785',
      'time': '11.1600',
      'type': 'green'
    },
    {
      'kind': 'Maut+D',
      'price': '2785',
      'time': '11.1600',
      'type': 'green'
    }],
    fxs: [{
      'name': '张三',
      'company': '北京金融有限公司',
      'type': '高级分析师',
      'style': '金融  专业  成熟',
      'time': '2017/2/2',
      'rise': '1.2%',
      'img': '../../images/fxs-image.png'
    },
    {
      'name': '张三',
      'company': '北京金融有限公司',
      'type': '高级分析师',
      'style': '金融  专业  成熟',
      'time': '2017/2/2',
      'rise': '1.2%',
      'img': '../../images/fxs-image.png'
    },
    {
      'name': '张三',
      'company': '北京金融有限公司',
      'type': '高级分析师',
      'style': '金融  专业  成熟',
      'time': '2017/2/2',
      'rise': '1.2%',
      'img': '../../images/fxs-image.png'
    }]
  },
  /**
   * 显示更多信息
   */
  showMore () {
    // todo 后台数据获取
    // wx:request({})
    this.setData({
      hidden: false
    })
    setTimeout(() => {
      var addfxs = {
        'name': '张三',
        'type': '高级分析师',
        'style': '稳健性',
        'time': '2017/2/2',
        'rise': '1.2%'
      }
      this.data.fxs.push(addfxs)
      var that = this
      this.setData({
        fxs: that.data.fxs,
        show: false,
        hidden: true
      })
    }, 1000)
  },
  /**
   * 分享设置
   * @returns {desc: string, title: string, path: string}
   */
  onShareAppMessage () {
    return {
      desc: '分享我的首页',
      title: '金大侠',
      path: '/pages/login/login'
    }
  },
  /**
   * 关注分析师功能
   */
  followfxs (e) {
    app.followfxs(e)
    // todo 后台返回信息判断是否展示弹窗
    this.setData({
      followHidden: false
    })
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
  onLoad (e) {
    console.log(' ---------- onLoad ----------')
    // var that = this
    // var url = that.data.url
    // console.dir(app.data)
    //  获取用户信息
    app.getUserInfo()
      .then(info => this.setData({ userInfo: info }))
      .catch(console.info)
    // 数据请求
    // getData(url, function () {
    //   that.setData({
    //     hidden: true
    //   })
    // })
    // 设定scroll-height高度值
    let that = this
    wx.getSystemInfo({
      success (res) {
        console.log(res.windowHeight)
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    console.log(' ---------- onReady ----------')
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
  //   var that = this
  //   var url = that.data.url
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
