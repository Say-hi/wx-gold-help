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
    // 登陆接口
    loginUrl: '/login',
    // 图片接口
    imgUlr: 'http://120.24.41.38:8183',
    // 关注接口
    followUrl: '/followers/concern/',
    // 查询分析师接口
    getfxsUrl: '/analyst/get/',
    // 取消关注
    cancelUrl: '/followers/cancelConcern/',
    userInfo: null,
    userId: null,
    wxCode: null,
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
        console.log(url)
        console.log(res)
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
          that.setData({
            followText: '关注成功了',
            followHidden: false
          })
        } else if (code === '500') {
          that.setData({
            followText: '关注失败了',
            followHidden: false
          })
        } else {
          that.setData({
            followText: '状态码有误',
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
        .then(res => console.log(res))
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
  // userLogin () {
  //   let sign = this.md5()
  //   let timestamp = this.timest()
  //   let url = this.data.baseUrl + this.data.loginUrl + '?appId=' + this.data.appId + '&sign=' + sign + '&timestamp=' + timestamp
  //   let obj = {
  //     url: url,
  //     data: {
  //       // code: res.code
  //     }
  //   }
  //   wx.login({
  //     // 用户授权成功
  //     success () {
  //       // 获取用户基本信息
  //       wx.getUserInfo()
  //       wx.request(obj)
  //     }
  //   })
  // },
  /**
   * 登陆状态维护
   */
  checkSession () {
    wx.checkSession({
      // session有效
      success () {

      },
      // session失效
      fail () {
        this.userLogin()
      }
    })
  },
  /**
   *
   * @param inObj {object} [url:请求的接口; method:请求的方式; data:请求的数据; header:请求头; callback:回调函数; ]
   */
  getData (inObj, callback) {
    let sign = this.md5()
    let timestamp = this.timest()
    // let method = inObj.method
    let url = this.data.baseUrl + inObj.url + '?appId=' + this.data.appId + '&sign=' + sign + '&timestamp=' + timestamp
    let obj = {
      url: url,
      // data: {
      //   'page': {
      //     'pageNo': that.data.pageNo,
      //     'pageSize': that.data.pageSize
      //   },
      //   'nickName': that.data.userInfo.nickName
      // },
      data: inObj.data,
      // header: {'Content-Type': 'application/json'},
      header: inObj.header,
      method: inObj.method,
      success (res) {
        callback(res, inObj.those)
        // let fxs = res.data.result
        // // 处理字符串
        // for (let i = 0; i < fxs.length; i++) {
        //   // 处理时间
        //   if (fxs[i].lastOperate !== undefined) {
        //     var time = fxs[i].lastOperate.slice(0, 10)
        //   } else {
        //     time = '无最新操作时间'
        //   }
        //   fxs[i].lastOperate = time
        //   // 处理头像
        //   let photo = app.data.imgUlr + fxs[i].photo
        //   fxs[i].photo = photo
        // }
        // that.setData({
        //   fxs: that.data.fxs.concat(fxs),
        //   show: false,
        //   hidden: true
        // })
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
