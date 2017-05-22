// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '>>开启黄金帮<<',
    text: '',
    windowWidth: 750,
    windowHeight: 1334
  },
  // 表单提交
  msgSub (e) {
    app.sendFormId(e)
    // console.log(e)
  },
  // 跳去首页
  goIndex () {
    // this.msgSub(e)
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    var that = this
    wx.getSystemInfo({
      success (res) {
        // console.log(res)
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })
    // wx.getUserInfo({
    //   success () {
    //     console.log('myinfo获取userInfo成功')
    //   }
    // })
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
