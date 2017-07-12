// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'drviePlate',
    showDistance: 0.00,
    firstDistance: 123,
    lastDistance: 123,
    width: 123,
    sl: 0,
    goId: 0
  },
  // 创建nubmerArr
  setNumberArr () {
    let numberArr = []
    for (let i = 0; i <= 2000; i++) {
      let s = {}
      s.i = (i / 10).toString().replace('.', '')

      // s.i.rpelace('.', '')
      if (i % 10 === 0) {
        s.flag = 1
      } else {
        s.flag = 0
      }
      numberArr.push(s)
    }
    this.setData({
      numberArr: numberArr
    })
  },
  // setsl () {
  //   this.setData({
  //     sl:
  //   })
  // },
  // 滚动获取位置
  scroll (e) {
    console.log(e.detail.deltaX)

    // console.log(e.detail.scrollLeft)
    let scrollLeft = Math.floor(e.detail.scrollLeft / 200 * 10) / 10
    // console.log(sl)
    // if (Math.abs(scrollLeft - this.data.showDistance) < 5) {
    // let sl = scrollLeft * 10 * 20
    //   return this.setData({
    //     showDistance: scrollLeft,
    //     sl: sl
    //   })
    // }
    // let s = scrollLeft.toString().replace('.', '')
    // if (e.detail.deltaX === -1) {
    //   console.log(1)
    // }
    // if (e.detail.deltaX === '-1') {
    //   console.log(2)
    // }
    this.setData({
      // goId: s,
      showDistance: scrollLeft
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    console.log(wx.getSystemInfoSync())
    let info = wx.getSystemInfoSync()
    this.setData({
      firstDistance: info.screenWidth / 2,
      lastDistance: info.screenWidth / 2,
      width: 20 * 2000 + 1 + info.screenWidth / 1
    })
    // console.log(info.screenWidth);
    // TODO: onLoad
    this.setNumberArr()
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
