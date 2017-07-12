// 获取全局应用程序实例对象
const app = getApp()
const WxParse = require('../../wxParse/wxParse')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '我的分析师',
    cancelUrl: '/followers/cancelConcern/',
    cancelText: '取消关注成功',
    userInfo: null,
    followHidden: true,
    fxsInfo: [],
    company: true,
    soft: {},
    operation1: {
      icon: 'icon-tongzhi1-on',
      title: '服务通知',
      text: '点击增加消息通知次数',
      nubmer: 1
    },
    operation: [
      {
        icon: 'icon-VIP',
        title: '申请用户认证',
        text: '显示认证状态',
        url: '../rz/rz?rz=true'
      },
      {
        icon: 'icon-zhangfubang',
        title: '金价涨跌竞猜',
        text: '每天赚取积分赢大奖',
        url: '../jc/jc'
      },
      {
        icon: 'icon-giftfill',
        title: '积分兑换',
        text: '数种奖品任你选'
      },
      {
        icon: 'icon-dizhi',
        title: '地址管理',
        text: '奖品直接寄到您手中'
      },
      {
        icon: 'icon-kefu',
        title: '联系客服',
        text: '亲！不懂的请联系我们客服哦'
      },
      {
        icon: 'icon-lingdang',
        title: '服务介绍',
        text: '看看我们是做。。。。。'
      },
      {
        icon: 'icon-fangzi',
        title: '公司介绍',
        url: '../introduce/introduce?type=company'
      }
    ]
  },
  /**
   * 用户头像照片选择
   */
  chooseImage () {
    var that = this
    wx.chooseImage({
      count: 1,
      success (res) {
        that.data.userInfo.avatarUrl = res.tempFilePaths
        that.setData({
          userInfo: that.data.userInfo
        })
      }
    })
  },
  // 取消关注
  cancelFollow (e) {
    var that = this
    var analystId = e.currentTarget.dataset.id
    var number = e.currentTarget.dataset.number
    var appId = app.data.appId
    var sign = app.md5()
    var timestamp = app.timest()
    var url = app.data.baseUrl + this.data.cancelUrl + '/' + analystId + '?appId=' + appId + '&SESSIONID=' + wx.getStorageSync('sessionId') + '&sign=' + sign + '&timestamp=' + timestamp
    var method = 'GET'
    var obj = {
      url: url,
      method: method,
      success (res) {
        var code = res.data.code
        if (code === '500') {
          // 失败
          that.setData({
            cancelText: '取消关注失败'
          })
        } else if (code === '200') {
          // 成功
          that.data.fxsInfo.splice(number, 1)
          that.setData({
            cancelText: '请记得去"首页"重新关注帮你参谋的名师噢',
            fxsInfo: that.data.fxsInfo
          })
        } else {
          that.setData({
            cancelText: '服务器开小差了'
          })
        }
        that.setData({
          followHidden: false
        })
      }
    }
    wx.request(obj)
  },
  // 关注结果弹窗
  confirmfxs () {
    this.setData({
      followHidden: true
    })
  },
  /**
   * 发送formId
   * @param e
   */
  msgSub (e) {
    app.sendFormId(e)
  },
  // 打开通知
  showTz () {
    this.setData({
      mask: true
    })
  },
  // 关闭服务通知弹窗
  closeTz () {
    this.setData({
      mask: false
    })
  },
  /**
   * 去公司详情页
   */
  gotocompany (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  /**
   * 分享设置
   * @returns {{title: string, path: string}}
   */
  // onShareAppMessage () {
  //   return {
  //     title: '分享我的分析师',
  //     path: '/pages/login/login'
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    let that = this
    // 获取用户信息
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    // [url:请求的接口; method:请求的方式; data:请求的数据; header:请求头; callback:回调函数; ]
    let inObj = {
      those: that,
      url: app.data.softUrl,
      method: 'GET',
      header: {'Content-Type': 'application/json'}
    }
    app.getData(inObj, function (res, that) {
      that.setData({
        soft: res.data.result
      })
      var article = that.data.soft.introduce
      WxParse.wxParse('article', 'html', article, that, 5)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // console.log(' ---------- onReady ----------')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // console.log(' ---------- onShow ----------')
    // 获取用户关注的信息
    let that = this
    let inObj2 = {
      those: that,
      url: app.data.getUserFxs,
      method: 'GET',
      header: {'Content-Type': 'application/json'}
    }
    app.getData(inObj2, function (res, that) {
      // console.log(that)
      if (!res.data.result) {
        that.setData({
          fxsInfo: []
        })
      } else {
        let fxsInfo = res.data.result
        for (let i = 0; i < fxsInfo.length; i++) {
          if (!fxsInfo[i].gender) {
            fxsInfo[i].gender = '未知'
          }
        }
        that.setData({
          fxsInfo: fxsInfo
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // console.log(' ---------- onUnload ----------')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // console.log(' ---------- onPullDownRefresh ----------')
  }
})
