// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'record',
    page: 1,
    jcArr: ['竞猜日期', '预测涨跌', '实际涨跌', '收盘价', '积分变动'],
    jcResultArr: []
  },
  // 获取用户竞猜记录
  getUserRecord (page) {
    let that = this
    let obj = {
      those: that,
      url: app.data.guessinglist,
      data: {
        pageNo: page
      }
    }
    app.getData(obj, function (res, that) {
      if (res.data.message === '最近无竞猜') {
        wx.showToast({
          title: '您尚未竞猜过哦，快去竞猜吧',
          mask: true
        })
        return setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      }
      if (!res.data.result.list) {
        return wx.showToast({
          title: '没有更多内容啦',
          mask: true
        })
      }
      for (let i of res.data.result.list) {
        i.createDate = i.createDate.slice(0, 10)
      }
      that.setData({
        jcResultArr: that.data.jcResultArr.concat(res.data.result.list)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // TODO: onLoad
    this.getUserRecord(1)
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
    this.getUserRecord(++this.data.page)
  }
})
