// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'jc',
    // 关注弹窗显示
    followHidden: true,
    // today: '05月27号',
    stopTime: '20:30',
    jcArr: ['收盘价', '涨跌结果', '日期'],
    jcResultArr: [],
    // jcstatus: 0,
    page: 1,
    jifen: 0,
    tabArr: [
      {
        icon: 'icon-biaoqian',
        title: '我参与的记录',
        url: '../record/record'
      },
      {
        icon: 'icon-giftfill',
        title: '积分兑换',
        text: '数种奖品任您选',
        url: '../scoreExchange/scoreExchange'
      },
      {
        icon: 'icon-dizhi',
        title: '地址管理',
        text: '奖品直接寄到您手中',
        url: 'address'
      }
    ]
  },
  gotocompany (e) {
    let that = this
    if (e.currentTarget.dataset.url === 'kefu') {
      return
    } else if (e.currentTarget.dataset.url === 'address') {
      app.openAddress(that)
      return
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.url + '?jifen=' + that.data.jifen
    })
  },
  /**
   * 关注分析师功能
   */
  followfxs (e) {
    let that = this
    let useUrl = app.data.followUrl
    app.followfxs(e, that, useUrl)
  },
  cancelFollow () {
    wx.showModal({
      title: '取消关注',
      content: '请在"我的分析师"页面取消关注',
      showCancel: false
    })
  },
  // 取消竞猜
  cancel () {
    this.setData({
      mask: false
    })
  },
  // 关注分析师点击确定后逻辑
  confirmfxs () {
    let that = this
    app.confirmfxs(that)
  },
  // 获取推荐分析师
  getrecommend () {
    let that = this
    let reobj = {
      those: that,
      url: app.data.recommendUrl
    }
    app.getData(reobj, function (res, _that) {
      let fxs = []
      fxs.push(res.data.result)
      _that.setData({
        fxs: fxs
      })
    })
  },
  // 竞猜选择
  choosejc (e) {
    // let jcStatus = wx.getStorageSync('jcStatus')
    // console.log(jcStatus.date)
    // if (jcStatus.date === this.data.today) {
    //   return this.setData({
    //     mask: true
    //   })
    // }
    if (e.currentTarget.dataset.type === 'up') {
      this.setData({
        chooses: 'up',
        jcstatuss: 1,
        mask: true
      })
    } else {
      this.setData({
        chooses: 'down',
        jcstatuss: 0,
        mask: true
      })
    }
  },
  // 展示更多数据
  showMore () {
    this.getYestoday(++this.data.page)
  },
  // 获取今日竞猜类型
  gettodayjc () {
    let that = this
    let obj = {
      those: that,
      url: app.data.getTodayjc,
      method: 'GET',
      header: {'Content-Type': 'application/json'}
    }
    app.getData(obj, function (res, that) {
      // console.log('jctype', res)
      that.setData({
        jctype: res.data.result
      })
    })
  },
  // 获取竞猜比例
  rate () {
    let that = this
    let obj = {
      those: that,
      url: app.data.getRateUrl,
      method: 'GET',
      header: {'Content-Type': 'application/json'}
    }
    app.getData(obj, function (res, that) {
      // console.log('rate', res)
      res.data.result.fallproportion = Math.round(res.data.result.fallproportion * 10000) / 100.00 + '%'
      res.data.result.riseproportion = Math.round(res.data.result.riseproportion * 10000) / 100.00 + '%'
      // res.data.result.fallproportion * 100
      // res.data.result.riseproportion * 100
      that.setData({
        rate: res.data.result
      })
    })
  },
  /**
   * 发送formId
   * @param e
   */
  msgSub (e) {
    app.sendFormId(e)
  },
  // 弹窗关闭
  confirm () {
    let jcStatus = wx.getStorageSync('jcStatus')
    // console.log(jcStatus.date)
    if (jcStatus.date === this.data.today) {
      this.setData({
        jcstatus: jcStatus.jcstatus,
        choose: jcStatus.choose,
        mask: false
      })
    }
    // todo 发送jc请求
    this.jc()
    this.setData({
      mask: false
    })
  },
  // 获取网站地址
  getWebUrl () {
    let that = this
    let webObj = {
      those: that,
      url: app.data.webUrl
    }
    app.getData(webObj, function (res, that) {
      that.setData({
        url: res.data.result || 'http://www.sge.com.cn/sjzx/mrhqsj'
      })
    })
  },
  // 获取前天的结果
  getYestoday (page) {
    let that = this
    let getyObj = {
      those: that,
      url: app.data.upDownRecord,
      data: {
        pageNo: page
      }
    }
    app.getData(getyObj, function (res, _that) {
      // console.log(res.data.result[0].list)
      if (!res.data.result[0].list) {
        return wx.showToast({
          title: '没有更多内容了',
          mask: true,
          duration: 1000
        })
      }
      for (let i of res.data.result[0].list) {
        i.createDate = i.createDate.slice(5, 10)
      }
      _that.setData({
        jcResultArr: _that.data.jcResultArr.concat(res.data.result[0].list)
      })
    })
  },
  // 用户竞猜
  jc () {
    let that = this
    let sign = app.md5()
    let timestamp = app.timest()
    let SESSIONID = app.wxGetStorage('sessionId')
    let url = app.data.baseUrl + app.data.jcUrl + '?appId=' + app.data.appId + '&lift=' + that.data.jcstatuss + '&SESSIONID=' + SESSIONID + '&sign=' + sign + '&timestamp=' + timestamp
    let jcobj = {
      url: url,
      method: 'POST',
      data: {
        type: that.data.jctype
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        if (res.data.message === '用户不可以重复竞猜') {
          return wx.showToast({
            title: '您已经竞猜过了，不能重复竞猜',
            mask: true
          })
        } else if (res.data.message === '当前时间不能竞猜') {
          wx.removeStorageSync('jcStatus')
          return wx.showToast({
            title: '非常抱歉,当前时间不能竞猜',
            mask: true
          })
        } else {
          let jcStatus = {
            date: that.data.today,
            jcstatus: that.data.jcstatuss,
            choose: that.data.chooses
          }
          that.setData({
            jcstatus: that.data.jcstatuss,
            choose: that.data.chooses
          })
          wx.setStorageSync('jcStatus', jcStatus)
          that.rate()
        }
      }
    }
    wx.request(jcobj)
  },
  // 获取用户积分
  getUserScore () {
    let that = this
    let obj = {
      those: that,
      url: app.data.getUserScore
    }
    app.getData(obj, function (res, that) {
      console.log('jifen', res)
      that.setData({
        jifen: res.data.result.fraction
      })
    })
  },
  // 获取增加的积分
  getAddScore () {
    let that = this
    let objs = {
      those: that,
      url: app.data.getAddScoreUrl
    }
    app.getData(objs, function (res, that) {
      // console.log('add score', res)
      that.setData({
        getjifen: res.data.result
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    let today = new Date(new Date().getTime() + 86400000)
    let hour = today.getHours()
    let min = today.getMinutes()
    if (hour > 20 || (hour === 20 && min > 30)) {
      today = new Date(new Date().getTime() + 86400000)
    }
    let m = today.getMonth() * 1 + 1
    let d = today.getDate()
    today = (m < 10 ? '0' + m : m) + '月' + (d < 10 ? '0' + d : d) + '日'
    this.setData({
      today: today
    })
    this.getWebUrl()
    this.getYestoday(1)
    // this.rate()
    this.getAddScore()
    this.gettodayjc()
    // this.getrecommend()
    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
    this.getrecommend()
    this.getUserScore()
    this.rate()
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
  },
  onShareAppMessage () {
    return {
      desc: '分享我的首页',
      title: '黄金帮，名师帮您做参谋',
      path: '/pages/myinfo/myinfo'
    }
  }
})
