// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'rz',
    inputArr: ['姓名', '黄金编号', '电话', '微信号'],
    inputArr2: [
      {
        title: '姓名',
        text: '未填写'
      },
      {
        title: '电话',
        text: '未填写'
      },
      {
        title: '黄金编号',
        text: '未填写'
      }
    ],
    tips: '您的信息用于认证高级用户'
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
  // 提交认证
  rzSave () {
    if (!this.data.name || !this.data.number) {
      return wx.showToast({
        title: '信息不完整，请补全信息',
        mask: true
      })
    }
    let that = this
    let sobj = {
      url: app.data.rzUrl,
      data: {
        goldnum: that.data.number,
        phone: that.data.phone,
        wetusernum: that.data.wxNubmer,
        username: that.data.name
      }
    }
    app.getData(sobj, function (res, that) {
      console.log('信息提交', res)
      if (res.data.message === 'success') {
        wx.showToast({
          title: '信息提交成功，等待审核',
          mask: true
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      } else if (res.data.code === '100') {
        wx.showToast({
          title: '您的资料审核中，请耐心等待，如有问题请联系客服',
          mask: true
        })
      } else {
        wx.showToast({
          title: res.data.message
        })
      }
    })
  },
  // 获取认证说明
  getRzExplan () {
    let that = this
    let eobj = {
      those: that,
      url: app.data.rzExplanUrl
    }
    app.getData(eobj, function (res, that) {
      that.setData({
        tips: res.data.result
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    // this.getRzStatus()
    let that = this
    this.setData({
      showRz: params.rz
    })
    if (params.rz === '1') {
      return this.getRzExplan()
    }
    if (params.username) {
      this.data.inputArr2[0].text = params.username
    }
    if (params.wetusernum) {
      this.data.inputArr2[1].title = '微信'
      this.data.inputArr2[1].text = params.wetusernum
    }
    if (params.phone) {
      this.data.inputArr2[1].title = '电话'
      this.data.inputArr2[1].text = params.phone
    }
    if (params.goldnum) {
      this.data.inputArr2[2].text = params.goldnum
    }
    this.setData({
      inputArr2: that.data.inputArr2
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
