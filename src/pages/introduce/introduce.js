// 获取全局应用程序实例对象
const app = getApp()
const WxParse = require('../../wxParse/wxParse')
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
      header: {'Content-Type': 'application/json'}
    }
    app.getData(inObj, function (res, that) {
      that.setData({
        company: res.data.result
      })
      var article = that.data.company.introduce
      WxParse.wxParse('article', 'html', article, that, 5)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
  }
})
