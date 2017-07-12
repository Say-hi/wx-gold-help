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
    people: '',
    phone: '',
    address: '',
    mask: true
  },
  /**
   * 发送formId
   * @param e
   */
  msgSub (e) {
    app.sendFormId(e)
  },
  addressfix () {
    let that = this
    app.openAddress(that)
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
    let that = this
    app.getAddress(that)
    // let a = wx.getStorageSync('address')
    // if (!a) {
    //   let obj = {
    //     success (res) {
    //       let address = {
    //         add: res.provinceName + res.cityName + res.countyName + res.detailInfo,
    //         name: res.userName,
    //         tel: res.telNumber
    //       }
    //       that.setData({
    //         people: address.name,
    //         address: address.add,
    //         phone: address.tel
    //       })
    //       wx.setStorageSync('address', address)
    //     }
    //   }
    //   wx.chooseAddress(obj)
    // } else {
    //   this.setData({
    //     people: a.name,
    //     address: a.add,
    //     phone: a.tel
    //   })
    // }
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
