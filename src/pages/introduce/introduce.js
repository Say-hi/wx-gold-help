// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'introduce',
    type: 'fxs',
    fxsInfo: {},
    company: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (parmas) {
    let that = this
    var type = parmas.type
    this.setData({
      type: type
    })
    let inObj = {
      those: that,
      url: app.data.companyUrl,
      method: 'GET',
      // data: {
      //   // 'orderBy': that.data.orderBy,
      //   'pageNo': that.data.pageNo,
      //   'pageSize': that.data.pageSize,
      //   'nickName': that.data.userInfo.nickName
      // },
      header: {'Content-Type': 'application/json'}
    }
    app.getData(inObj, function (res, that) {
      that.setData({
        company: res.data.result
      })
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
