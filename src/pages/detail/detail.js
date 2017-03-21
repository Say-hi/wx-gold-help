// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'detail',
    fxsInfo: {
      'name': '张三',
      'company': '北京金融有限公司',
      'type': '高级分析师',
      'style': '金融  专业  成熟',
      'time': '2017/2/2',
      'rise': '1.2%',
      'img': '../../images/fxs-image.png'
    },
    introduce: '分析师介绍分析师介绍分析师介绍分析师介绍分析师介绍分析师介绍分析师介绍分析师介绍分析师介绍分析师介绍分析师介绍分析师介绍',
    operation: [{
      'kind': 'AuT+D',
      'way': '开仓买入',
      'price': '价格',
      'garbage': '仓位'
    }]
  },
  // todo 点击后请求数据刷新数据
  showMore () {
    // var that = this
    // wx.request()
    var newOperation = [{
      'kind': 'AuT+D',
      'way': '闭仓卖出',
      'price': '价格',
      'garbage': '仓位'
    },
    {
      'kind': 'AuT+D',
      'way': '闭仓卖出',
      'price': '价格',
      'garbage': '仓位'
    },
    {
      'kind': 'AuT+D',
      'way': '闭仓卖出',
      'price': '价格',
      'garbage': '仓位'
    }]
    var operation = this.data.operation.concat(newOperation)
    this.setData({
      operation: operation
    })
    console.log('加载更多数据')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    console.log(params)
    // wx.setNavigationBarTitle({
    //   title: '当前页面'
    // })
  },
  onShareAppMessage () {
    return {
      desc: '分享分析师',
      title: '黄金帮',
      path: '/pages/detail/detail'
    }
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
