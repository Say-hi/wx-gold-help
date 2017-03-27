/**
 * API module
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
const wechat = require('./utils/wechat')
const Promise = require('./utils/bluebird')
const md5 = require('./utils/wxmd5')
// const appId = 'e0d13e1b692968f4a3fd9e21c926d7d8'
App({
  /**
   * Global shared
   * 可以定义任何成员，用于在整个应用中共享
   */
  data: {
    name: '黄金帮',
    version: '0.1.0',
    // domain
    baseUrl: 'http://120.24.41.38:8183/rest',
    // 首页接口
    homeUrl: '/analyst/list',
    // 图片接口
    imgUlr: 'http://120.24.41.38:8183',
    // 关注接口
    followUrl: '/followers/concern/',
    // 查询分析师接口
    getfxsUrl: '/analyst/get/',
    // 取消关注
    cancelUrl: '/followers/cancelConcern/',
    // 获取操作记录
    operationUrl: '/market/list',
    // 获取软件介绍
    softUrl: '/article/getAppIntroduction',
    // 获取公司介绍
    companyUrl: '/article/getCompanyIntroduction',
    // 获取sessionID
    sessionIdUrl: '/wechatUser/getSessionID/',
    // 获取用户已关注的分析师
    getUserFxs: '/analyst/concernedAnalyst',
    userInfo: null,
    sessionId: null,
    // 服务器定义的id
    appId: 'e0d13e1b692968f4a3fd9e21c926d7d8',
    // 签名码
    PDK: '52f005e6d4b340edb025fd26cdd7793a'
  },
  // 不是只能定义`data`，别的也可以
  other: 'other variables',
  // todo 用户关注分析师功能补充
  /**
   * 关注分析师功能
   * @param e {Event} 事件参数
   */
  followfxs (e, that, useUrl) {
    // 获取分析师ID
    var analystId = e.currentTarget.dataset.id
    var arrayId = e.currentTarget.dataset.arraryid
    // console.log('fxsID:' + analystId)
    // console.log('关注了该分析师')
    var appId = this.data.appId
    var sign = this.md5()
    var timestamp = this.timest()
    var url = this.data.baseUrl + useUrl + analystId + '?appId=' + appId + '&SESSIONID=' + wx.getStorageSync('sessionId') + '&sign=' + sign + '&timestamp=' + timestamp
    var method = 'GET'
    var obj = {
      url: url,
      method: method,
      success (res) {
        // console.log(url)
        // console.log(res)
        var code = res.data.code
        // if (code === '500') {
        //   wx.showModal({
        //     title: '关注分析师',
        //     showCancel: false,
        //     content: '啊哦，小主关注失败了'
        //   })
        // }
        // else if (code === '200') {
        //   wx.showModal({
        //     title: '关注分析师',
        //     showCancel: false,
        //     content: '小主关注成功啦'
        //   })
        // }
        // else {
        //   wx.showModal({
        //     title: '未进入判断',
        //     content: 'fail'
        //   })
        // }
        if (code === '200') {
          // console.log(that.data)
          // console.log(arrayId)
          that.data.fxs[arrayId].isConcerned = that.data.fxs[arrayId].isConcerned === 1 ? 0 : 1
          that.setData({
            followText: '操作成功了',
            followHidden: false,
            fxs: that.data.fxs
          })
        } else if (code === '500') {
          that.setData({
            followText: '操作失败了',
            followHidden: false
          })
        } else {
          that.setData({
            followText: '服务器开小差了',
            followHidden: false
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
    return that.setData({
      followHidden: true
    })
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
    let timer = new Date()
    let tmp = timer.getTime().toString()
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
        // .then(res => console.log(res))
        .then(() => wechat.getUserInfo())
        .then(res => res.userInfo)
        .then(info => (this.data.userInfo = info))
        .then(info => resolve(info))
        .catch(error => console.error('failed to get user info, error: ' + error))
    })
  },
  /**
   * 获取用户授权
   */
  userLogin () {
    let that = this
    let userCode = null
    wx.login({
      success: function (res) {
        // 用户code
        // console.log(res)
        userCode = res.code
        // console.log('login中的' + userCode)
        wx.getUserInfo({
          success: function (result) {
            // console.log(result)
            // that.data.userInfo = result.userInfo
            // that.setData({
            //   userInfo: result.userInfo
            // })
            wx.setStorage({
              key: 'userInfo',
              data: result.userInfo
            })
            // console.log('getuserinfo' + userCode)
            if (userCode) {
              // 发起网络请求
              let nikeName = result.userInfo.nickName
              // console.log(nikeName)
              let photoUrl = result.userInfo.avatarUrl
              let sign = that.md5()
              let timestamp = that.timest()
              let url = that.data.baseUrl + that.data.sessionIdUrl + userCode + '?appId=' + that.data.appId + '&sign=' + sign + '&timestamp=' + timestamp
              wx.request({
                url: url,
                method: 'POST',
                data: {
                  'nikeName': nikeName,
                  'photoUrl': photoUrl
                },
                success (session) {
                  // console.log(session)
                  // 存储sessionId
                  wx.setStorage({
                    key: 'sessionId',
                    data: session.data.result
                  })
                  // console.log(that)
                  that.data.sessionId = session.data.result
                  // wx.getStorage({
                  //   key: 'sessionId',
                  //   success (res) {
                  //     that.data.sessionId = res.result
                  //   }
                  // })
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
      }
    })
    // that.data.sessionId = wx.getStorageSync('sessionId')
    // console.log(that.data.sessionId)
  },
  /**
   * 登陆状态维护
   */
  // checkSession () {
  //   wx.checkSession({
  //     // session有效
  //     success () {
  //
  //     },
  //     // session失效
  //     fail () {
  //       this.userLogin()
  //     }
  //   })
  // },
  /**
   *
   * @param inObj {object} [url:请求的接口; method:请求的方式; data:请求的数据; header:请求头; callback:回调函数; ]
   */
  getData (inObj, callback) {
    let sign = this.md5()
    let timestamp = this.timest()
    let url = this.data.baseUrl + inObj.url + '?appId=' + this.data.appId + '&SESSIONID=' + wx.getStorageSync('sessionId') + '&sign=' + sign + '&timestamp=' + timestamp
    let obj = {
      url: url,
      data: inObj.data,
      header: inObj.header,
      method: inObj.method,
      success (res) {
        callback(res, inObj.those)
      }
    }
    wx.request(obj)
  },
  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch () {
    console.log(' ========== Application is launched ========== ')
    let that = this
    // let userCode = ''
    // let userInfo = {}
    // that.userLogin()
    wx.checkSession({
      // sessionId有效
      success () {
        console.log('登陆态有效')
        // that.userLogin()
      },
      // sessionId失效
      fail () {
        console.log('登陆态失效')
        // 重新登陆
        that.userLogin()
      }
    })
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
