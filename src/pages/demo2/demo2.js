// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'demo2',
    showDistance: 0.00,
    firstDistance: 123,
    lastDistance: 123,
    width: 123,
    sl: 0,
    tf: 0,
    flag: true,
    startX: 0,
    lastTF: 0
  },
  // 创建nubmerArr
  setNumberArr () {
    let numberArr = []
    for (let i = 0; i <= 200; i++) {
      let s = {}
      s.i = i / 10
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
  /**
   * 触摸开始
   * @param e
   */
  touchStart (e) {
    this.setData({
      startT: e.timeStamp,
      startX: e.changedTouches[0].clientX
    })
  },
  /**
   * 触摸结束
   * @param e
   */
  touchEnd (e) {
    let showDistance = this.data.showDistance * 10 * 20
    let lastTF = this.data.tf
    let endT = e.timeStamp
    let endX = e.changedTouches[0].clientX
    let that = this
    let direction = true
    // 判断是否为大力奇迹
    let time = endT - this.data.startT
    if (time < 300) {
      console.log('time---' + time)
      let md = Math.floor((300 - time) / 2)
      console.log('md----' + md)
      if (endX - that.data.startX > 0) {
        direction = false
      }
      // 自滚
      this.autoScroll(md, direction, time)
    } else if (showDistance < -lastTF) {
      // 复位
      that.goback()
    }

    this.setData({
      lastTF: lastTF
    })
  },
  // 大力出奇迹啊
  autoScroll (steps, direction, time) {
    // 最后一次位置
    let that = this
    let step = steps
    let timer = ''
    timer = setInterval(function () {
      if (step <= 0) {
        that.goback()
        that.setData({
          lastTF: that.data.tf
        })
        clearInterval(timer)
      }
      if (step < 20) {
        step -= 2
      } else {
        step -= 10
      }
      if (direction) {
        that.setData({
          tf: that.data.tf - step
        })
      } else {
        that.setData({
          tf: that.data.tf + step
        })
      }
      that.scroll()
    }, time)
  },
  /**
   * 触摸移动中
   * @param e
   */
  touchMove (e) {
    // if (this.data.tf > 0) return
    let endT = e.timeStamp
    if (endT - this.data.startT < 300) return
    let lastTF = this.data.lastTF
    let moveDistance = e.changedTouches[0].clientX - this.data.startX
    if (moveDistance + lastTF < -4001 || moveDistance + lastTF > 0) return
    this.setData({
      tf: moveDistance + lastTF
    })
    this.scroll()
  },
  // 计算获取位置信息
  scroll () {
    let scrollLeft = Math.floor(Math.abs(this.data.tf) / 200 * 10) / 10
    this.setData({
      showDistance: scrollLeft
    })
  },
  // 复位
  goback () {
    // console.log(1)
    let that = this
    let showDistance = that.data.showDistance * 10 * 20
    // let lastTF = that.data.lastTF
    let timer2 = ''
    // if (showDistance < -lastTF) {
    timer2 = setInterval(function () {
      if (showDistance >= Math.abs(that.data.tf)) {
        clearInterval(timer2)
      }
      that.setData({
        tf: that.data.tf + 1
      })
    }, 5)
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // TODO: onLoad
    let info = wx.getSystemInfoSync()
    this.setData({
      firstDistance: info.screenWidth / 2,
      lastDistance: info.screenWidth / 2,
      width: 20 * 200 + 1 + info.screenWidth / 1
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
