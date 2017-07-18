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
    today: '05月27号',
    stopTime: '20:30',
    jcArr: ['收盘价', '涨跌结果', '日期'],
    jcResultArr: [],
    jcstatus: 0,
    page: 1
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
      _that.setData({
        fxs: res.data.result
      })
    })
  },
  // 竞猜选择
  choosejc (e) {
    if (e.currentTarget.dataset.type === 'up') {
      this.setData({
        choose: 'up',
        jcstatus: 1
      })
    } else {
      this.setData({
        choose: 'down',
        jcstatus: 0
      })
    }
    this.jc()
  },
  // 展示更多数据
  showMore () {
    this.getYestoday(++this.data.page)
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
      console.log(res.data.result[0].list)
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
    let url = app.data.baseUrl + app.data.jcUrl + '?appId=' + app.data.appId + '&lift=' + that.data.jcstatus + '&SESSIONID=' + SESSIONID + '&sign=' + sign + '&timestamp=' + timestamp
    let jcobj = {
      url: url,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        if (res.data.message === '用户不可以重复竞猜') {
          return wx.showToast({
            title: '您已经竞猜过了，不能重复竞猜',
            mask: true
          })
        } else {
          that.setData({
            mask: true
          })
        }
      }
    }
    wx.request(jcobj)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    let today = new Date()
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
    this.getrecommend()
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
