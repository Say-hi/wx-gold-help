// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'jc',
    today: '05月27号',
    stopTime: '06月25日20:30',
    jcArr: ['收盘价', '涨跌结果', '日期'],
    jcResultArr: [
      {
        price: 123,
        status: 0,
        time: '6-24',
        url: 'www.jiangwenqiang.com'
      }
    ],
    fxs: '小辉辉',
    fxstext: '擦亮讲法律思考将对方离开；撒旦教法律考试的将发生地离开房间阿斯兰的看风景阿斯兰的看风景洒落的',
    fxsid: 1234,
    fxsFollow: true,
    fxsimg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    jcstatus: 0
  },
  /**
   * 关注分析师功能
   */
  followfxs (e) {
    let that = this
    let useUrl = app.data.followUrl
    app.followfxs(e, that, useUrl)
  },
  // 竞猜选择
  choosejc (e) {
    if (e.currentTarget.dataset.type === 'up') {
      this.setData({
        choose: 'up',
        jcstatus: 0
      })
    } else {
      this.setData({
        choose: 'down',
        jcstatus: 1
      })
    }
    this.setData({
      mask: true
    })
  },
  // 展示更多数据
  showMore () {
    let that = this
    // todo 获取更多数据
    let obj = {
      price: 123,
      status: 0,
      time: '6-24',
      url: 'www.jiangwenqiang.com'
    }
    this.data.jcResultArr.push(obj)
    this.setData({
      jcResultArr: that.data.jcResultArr
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
