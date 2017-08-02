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
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', // 图片
        tip: '可爱的金毛',
        title: '金毛可爱美丽大方温柔'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        tip: '可爱的金毛',
        title: '金毛可爱美丽大方温柔'
      }
    ],
    textArr: [],
    people: '',
    phone: '',
    address: ''
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
  // 获取商品详情
  getDetail (id) {
    let that = this
    let sign = app.md5()
    let timestamp = app.timest()
    let SESSIONID = app.wxGetStorage('sessionId')
    let url = app.data.baseUrl + app.data.exchangeDetailUrl + '?appId=' + app.data.appId + '&id=' + id + '&SESSIONID=' + SESSIONID + '&sign=' + sign + '&timestamp=' + timestamp
    let obj = {
      url: url,
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
      method: 'POST',
      success (res) {
        // console.log(res)
        // console.log(`res`, res)
        that.setData({
          textArr: that.data.textArr.concat(res.data.result.explains.split('&')),
          info: res.data.result
        })
      }
    }
    wx.request(obj)
  },
  // 公共奖品说明
  getjpsmUrl () {
    let that = this
    let obj = {
      those: that,
      url: app.data.getjpsmUrl
    }
    app.getData(obj, function (res, that) {
      // console.log(res)
      that.data.textArr.push(res.data.result)
      that.setData({
        textArr: that.data.textArr
      })
    })
  },
  // 确认兑换
  confirmExchange () {
    if (!this.data.address) {
      wx.showToast({
        title: '请补全地址信息'
      })
    }
    wx.showModal({
      title: '奖品兑换',
      content: '是否确认兑换奖品',
      showCancel: true,
      cancelText: '取消',
      confirmText: '兑换',
      success (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '奖品兑换中',
            mask: true
          })
          let that = this
          let cobj = {
            those: that,
            url: app.data.confirmExchangeUrl,
            data: {
              address: that.data.address,
              name: that.data.people,
              phone: that.data.phone,
              prizeid: that.data.id
            }
          }
          app.getData(cobj, function (res, that) {
            wx.hideLoading()
            if (res.data.message === '当前商品仓库剩余0，兑换失败') {
              that.setData({
                backText: '当前商品仓库剩余0，兑换失败',
                mask: true
              })
            } else if (res.data.message === '用户积分不足,兑换失败') {
              that.setData({
                backText: '哎呀，积分不够诶，兑换失败',
                mask: true
              })
            }
            if (res.data.message === '兑换成功') {
              wx.showToast({
                title: '兑换成功',
                mask: true
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1500)
            }
            // console.log(res)
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (parmas) {
    this.setData({
      id: parmas.id
    })
    this.getjpsmUrl()
    this.getDetail(parmas.id)
    // let that = this
    // app.getAddress(that)
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
