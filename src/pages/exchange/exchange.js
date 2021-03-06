// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'exchange',
    page: 1,
    exchangeArr: [
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   title: '美味想成',
      //   status: '兑换成功',
      //   delScore: -600,
      //   time: '2017-6-25'
      // }
    ]
  },
  getList (page) {
    let that = this
    let obj = {
      those: that,
      url: app.data.exchangeUrl,
      data: {
        pageNo: page
      }
    }
    app.getData(obj, function (res, that) {
      wx.hideLoading()
      if (!res.data.result.list) {
        return wx.showToast({
          title: '没有更多内容了',
          mask: true
        })
      }
      that.setData({
        exchangeArr: that.data.exchangeArr.concat(res.data.result.list)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    wx.showLoading({
      title: '正在查询您兑换过的奖品'
    })
    this.getList(1)
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
  },
  onReachBottom () {
    this.getList(++this.data.page)
  }
})
