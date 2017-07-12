// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'rz',
    showRz: false,
    inputArr: ['姓名', '黄金编号', '电话', '微信号'],
    inputArr2: [
      {
        title: '姓名',
        text: '一颗星'
      },
      {
        title: '电话',
        text: '18855953465'
      },
      {
        title: '黄金编号',
        text: '5241654'
      }
    ],
    tips: '阿斯兰的开发将阿斯顿将发生的风景阿斯顿浪费将阿斯顿浪费就阿斯顿镂空风景撒旦阿斯顿风景阿斯顿浪费'
  },
  tagInput (e) {
    let tag = e.currentTarget.dataset.tag
    let that = this
    let value = e.detail.value
    if (tag === '姓名') {
      that.setData({
        name: value
      })
    } else if (tag === '黄金编号') {
      that.setData({
        number: value
      })
    } else if (tag === '电话') {
      that.setData({
        phone: value
      })
    } else if (tag === '微信号') {
      that.setData({
        wxNubmer: value
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    this.setData({
      showRz: params.rz
    })
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
