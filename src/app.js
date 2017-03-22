/**
 * API module
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
const wechat = require('./utils/wechat')
const Promise = require('./utils/bluebird')
const md5 = require('./utils/wxmd5')
App({
  /**
   * Global shared
   * 可以定义任何成员，用于在整个应用中共享
   */
  data: {
    name: '黄金帮',
    version: '0.1.0',
    baseUrl: 'http://120.24.41.38:8183/rest',
    followUrl: '/followers/concern/',
    userInfo: null,
    userId: 123,
    appId: 'e0d13e1b692968f4a3fd9e21c926d7d8',
    PDK: '52f005e6d4b340edb025fd26cdd7793a'
  },
  // 不是只能定义`data`，别的也可以
  other: 'other variables',
  // todo 用户关注分析师功能补充
  /**
   * 关注分析师功能
   * @param e {Event} 事件参数
   */
  followfxs (e, that) {
    // 获取分析师ID
    var analystId = e.currentTarget.dataset.id
    // console.log('fxsID:' + analystId)
    // console.log('关注了该分析师')
    var appId = this.data.appId
    var sign = this.md5()
    var timestamp = this.timest()
    var url = this.data.baseUrl + this.data.followUrl + this.data.userId + '/' + analystId + '?appId=' + appId + '&sign=' + sign + '&timestamp=' + timestamp
    var method = 'GET'
    var obj = {
      url: url,
      method: method,
      success (res) {
        // console.log(url)
        // console.log(res)
        var code = res.data.code
        if (code === '500') {
          that.setData({
            followText: '小主，关注失败了'
          })
        }
        if (code === '200') {
          that.setData({
            followText: '小主，成功关注了'
          })
        }
        that.setData({
          followHidden: false
        })
      }
    }
    wx.request(obj)
  },
  /**
   * 关注后的弹窗
   */
  confirmfxs (that) {
    return that.setData({followHidden: true})
  },
  /**
   * md5 加密
   * @returns {*}
   */
  md5 () {
    let timestamp = this.timest()
    let PDK = this.data.PDK
    let appId = this.data.appId
    let str = timestamp + appId + PDK
    return md5.hexMD5(PDK + md5.hexMD5(str))
  },
  /**
   * 获取时间戳
   * @returns {string}
   */
  timest () {
    // var tmp = Date.parse(new Date()).toString()
    var timer = new Date()
    var tmp = timer.getTime().toString()
    tmp = tmp.substr(0, 10)
    return tmp
  },
  /**
   * 获取用户信息
   * @return {Promise} 包含获取用户信息的`Promise`
   */
  getUserInfo () {
    return new Promise((resolve, reject) => {
      if (this.data.userInfo) return reject(this.data.userInfo)
      wechat.login()
        .then(() => wechat.getUserInfo())
        .then(res => res.userInfo)
        .then(info => (this.data.userInfo = info))
        .then(info => resolve(info))
        .catch(error => console.error('failed to get user info, error: ' + error))
    })
  },

  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch () {
    console.log(' ========== Application is launched ========== ')
  },
  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow () {
    console.log(' ========== Application is showed ========== ')
  },
  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide () {
    console.log(' ========== Application is hid ========== ')
  }
})
