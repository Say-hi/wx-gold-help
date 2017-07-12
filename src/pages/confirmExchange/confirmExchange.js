// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'confirmExchange',
    topArr: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        tip: '可爱的金毛',
        title: '金毛可爱美丽大方温柔'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        tip: '可爱的金毛',
        title: '金毛可爱美丽大方温柔'
      }
    ],
    textArr: [
      '参与奖品说明，你需要去专区足够的积分，方可换取奖品',
      '如积分不足或者商品不足,这个就会出现换取失败'
    ],
    people: '江文强',
    phone: '188712398',
    address: '萨都剌的罚款啥地方哈考虑啥地方哈纳斯达克浪费',
    mask: true
  },
  /**
   * 发送formId
   * @param e
   */
  msgSub (e) {
    app.sendFormId(e)
  },
  maskBtnTap () {
    this.setData({
      mask: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
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
