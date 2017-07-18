// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'scoreExchange',
    page: 1,
    exchangeArr: [
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   tip: '美味想成',
      //   title: '好吃好吃好吃好吃好吃好吃好吃好吃好贺词好贺词',
      //   status: 1,
      //   score: 600,
      //   number: 150,
      //   id: 12341234
      // },
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   tip: '美味想成',
      //   title: '好吃好吃好吃好吃好吃好吃好吃好吃好贺词好贺词',
      //   status: 1,
      //   score: 600,
      //   number: 150,
      //   id: 657457
      // }
    ]
  },
  // 获取奖品列表
  getScorList (page) {
    let that = this
    let obj = {
      those: that,
      url: app.data.scoreUrl,
      data: {
        pageNo: page
      }
    }
    app.getData(obj, function (res, that) {
      // console.log(res)
      // res.data.result.list
      if (!res.data.result.list) {
        return wx.showToast({
          title: '没有更多内容啦',
          mask: true
        })
      }
      that.setData({
        exchangeArr: that.data.exchangeArr.concat(res.data.result.list)
      })
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    wx.showLoading({
      title: '请求数据中'
    })
    this.getScorList(1)
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
  // 触底操作
  onReachBottom () {
    wx.showLoading({
      title: '请求数据中'
    })
    this.getScorList(++this.data.page)
  }
})
