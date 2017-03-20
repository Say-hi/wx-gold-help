// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    // 提示信息
    hidden: true,
    // 分析师关注信息提示
    followHidden: true,
    type: null
  },
  // 提示信息处理
  confirm () {
    this.setData({
      hidden: true
    })
    wx.navigateBack({
      delta: 1
    })
  },
  // 关注分析师
  followfxs (e) {
    app.followfxs(e)
    this.setData({
      followHidden: false
    })
  },
  // 关注分析师点击确定后逻辑
  confirmfxs () {
    let that = this
    app.confirmfxs(that)
  },
  /**
   * 分享设置
   * @returns {desc: string, title: string, path: string}
   */
  onShareAppMessage () {
    return {
      desc: '分享我的分析师',
      title: '金大侠',
      path: '/pages/myinfo/myinfo'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    var that = this
    this.setData({
      title: params.title || '金大侠-个人信息',
      type: params.type || 'myfxs'
    })
    wx.setNavigationBarTitle({
      title: that.data.title
    })
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
    console.info(this.data.type)
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
