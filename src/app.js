/**
 * API module
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
const md5 = require('./utils/wxmd5')
App({
  /**
   * Global shared
   * 可以定义任何成员，用于在整个应用中共享
   */
  data: {
    name: '黄金帮',
    version: '0.2.0',
    // domain
    baseUrl: 'https://www.goldbang.cn/rest',
    // 二期
    // baseUrl: 'https://www.goldbang.cn/jeesite/rest',
    // baseUrl: 'http://192.168.0.127:8080/jeesite/rest',
    // 首页接口
    homeUrl: '/analyst/list',
    // 图片接口
    // imgUlr: 'http://120.24.41.38:8183',
    // 关注接口
    followUrl: '/wechatUser/concern',
    // followUrl: '/followers/concern/',
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
    // formId传送
    sendFormIdUrl: '/wechatUser/saveFormId/',
    // 图片
    todayTipsInterfaceUrl: '/frontPicture/frontPictureInterface',
    // 消息条数
    checkUrl: '/informationkey/ckeck',
    // 添加消息条数
    saveUrl: '/informationkey/save',
    // 提交认证
    rzUrl: '/authentication/save',
    // 认证状态
    rzStatusUrl: '/authentication/feedback',
    // 认证说明
    rzExplanUrl: '/authenticationExplain/explainInterface',
    // 竞猜记录
    guessinglist: '/guessingCompetition/guessinglist',
    // 昨日升跌情况
    upDownRecord: '/goldPriceRiseFall/yesterdayGoldLift',
    // 查询网址
    webUrl: '/website/websiteInterface',
    // 用户竞猜
    jcUrl: '/guessingCompetition/save',
    // 奖品列表
    scoreUrl: '/prize/prizeList',
    // 认证用户取消关注的分析师
    cancelFUr: '/authentication/cancel',
    // 获取用户积分
    getUserScore: '/userIntegral/get',
    // 公共奖品说明
    getjpsmUrl: '/todayTips/todayTipsInterface',
    // 兑换记录
    exchangeUrl: '/exchangeRecord/wechatuserlist',
    // 奖品详情
    exchangeDetailUrl: '/prize/get',
    // 用户兑换
    confirmExchangeUrl: '/exchangeRecord/exchangeRecordDocking',
    // 推荐分析师
    recommendUrl: '/analyst/recommend',
    userInfo: null,
    sessionId: null,
    // 服务器定义的id
    appId: 'e0d13e1b692968f4a3fd9e21c926d7d8',
    // 签名码
    PDK: '52f005e6d4b340edb025fd26cdd7793a',
    // 行情接口相关
    accessKey: 'yb00001',
    accessSecret: 'yb00001accessSecret',
    stockUrl: 'https://www.yi-gold.com/yuebao/api/ProxyController/proxyProdMarket.do'
  },
  // 不是只能定义`data`，别的也可以
  other: 'other variables',
  getAddress (that) {
    let _this = this
    // let _that = that
    var a = wx.getStorageSync('address')
    // 判断缓存
    if (!a) {
      // 判断授权
      _this.addressInfo(that)
    } else {
      that.setData({
        people: a.name,
        address: a.add,
        phone: a.tel
      })
    }
  },
  addressInfo (that) {
    let __this = this
    let bs = {
      success (res) {
        console.log('chooseAddress', res)
        let addressss = {
          add: res.provinceName + res.cityName + res.countyName + res.detailInfo,
          name: res.userName,
          tel: res.telNumber
        }
        that.setData({
          people: addressss.name,
          address: addressss.add,
          phone: addressss.tel
        })
        return wx.setStorageSync('address', addressss)
      },
      fail (res) {
        console.log(res)
        let obj1 = {
          success (res) {
            // 授权失败
            if (!res.authSetting['scope.address']) {
              wx.showToast({
                title: '请开启【通讯地址】选项',
                duration: 1000,
                mask: true
              })
              // 开启设置界面
              let obj2 = {
                success (res) {
                  // 设置成功
                  if (res.authSetting['scope.address']) {
                    let obj3 = {
                      success (res) {
                        let address = {
                          add: res.provinceName + res.cityName + res.countyName + res.detailInfo,
                          name: res.userName,
                          tel: res.telNumber
                        }
                        that.setData({
                          people: address.name,
                          address: address.add,
                          phone: address.tel
                        })
                        wx.setStorageSync('address', address)
                      }
                    }
                    wx.chooseAddress(obj3)
                  } else {
                    return __this.getAddress(that)
                  }
                }
              }
              setTimeout(function () {
                wx.openSetting(obj2)
              }, 1500)
            } else {
              let obj4 = {
                success (res) {
                  let addresss = {
                    add: res.provinceName + res.cityName + res.countyName + res.detailInfo,
                    name: res.userName,
                    tel: res.telNumber
                  }
                  that.setData({
                    people: addresss.name,
                    address: addresss.add,
                    phone: addresss.tel
                  })
                  wx.setStorageSync('address', addresss)
                }
              }
              wx.chooseAddress(obj4)
            }
          }
        }
        wx.getSetting(obj1)
      }
    }
    wx.chooseAddress(bs)
  },
  openAddress (that) {
    let _this = this
    _this.addressInfo(that)
  },
  /**
   * 关注分析师功能
   * @param e {Event} 事件参数
   */
  followfxs (e, that, useUrl) {
    // 获取分析师ID
    var analystId = e.currentTarget.dataset.id
    var arrayId = e.currentTarget.dataset.arraryid
    var appId = this.data.appId
    var sign = this.md5()
    var timestamp = this.timest()
    var url = this.data.baseUrl + useUrl + '?SESSIONID=' + wx.getStorageSync('sessionId') + '&analystId=' + analystId + '&appId=' + appId + '&sign=' + sign + '&timestamp=' + timestamp
    var method = 'POST'
    var obj = {
      url: url,
      // data: data,
      method: method,
      // header: {
      //   'content-type': 'application/x-www-for-urlencoded'
      // },
      success (res) {
        console.log('follow-res', res)
        var message = res.data.message
        if (message === 'success') {
          that.data.fxs[arrayId].isConcerned = that.data.fxs[arrayId].isConcerned === 1 ? 0 : 1
          that.setData({
            followText: '您将收到名师最新的操作策略服务',
            followHidden: false,
            fxs: that.data.fxs
          })
        } else if (message === '用户无认证') {
          that.setData({
            followText: '您尚未完成认证，暂不能关注团队级分析师，请前往"我的分析师"完成认证',
            followHidden: false
          })
        } else if (message === '同一用户不能关注多个分析师') {
          that.setData({
            followText: '不能同时关注多名分析师，请先在"我的分析师"取消原来的关注后，再进行关注',
            followHidden: false
          })
        } else if (message === '用户无特权关注高级分析师') {
          that.setData({
            followText: '您无法关注该高级分析师',
            followHidden: false
          })
        } else if (message === '服务器错误') {
          that.setData({
            followText: '哎呀，服务器开小差了，请稍后再试',
            followHidden: false
          })
        } else if (message === '无效的SESSIONID') {
          that.setData({
            followText: '请删除小程序后，重新打开并授权',
            followHidden: false
          })
        } else if (message === '用户关注失败') {
          that.setData({
            followText: '您为已认证用户，请联系客服修改关注',
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
   * 获取时间戳不去除位数
   * @returns {string}
   */
  timest13 () {
    let timer = new Date()
    let tmp = timer.getTime().toString()
    return tmp
  },
  /**
   * stock md5 加密
   * @returns {*}
   */
  stockmd5 () {
    let timestamp = this.timest13()
    let accessKey = this.data.accessKey
    let accessSecret = this.data.accessSecret
    let str = 'accessKey=' + accessKey + '&accessSecret=' + accessSecret + '&time=' + timestamp
    return md5.hexMD5(str)
  },
  /**
   * 获取用户授权
   */
  userLogin () {
    let that = this
    wx.login({
      success: function (res) {
        // 本地存储code
        that.wxSetStorage('code', res.code)
        // console.log(res.code)
        wx.getUserInfo({
          success (res) {
            wx.setStorageSync('userInfo', res.userInfo)
            // console.log(res.userInfo)
            that.requestSessionId(function () {
              // console.log('get sessionId from site')
            })
          },
          fail () {
            return wx.showToast({
              title: '查看信息，无法关注分析师',
              icon: 'success',
              duration: 3000
            })
          }
        })
      }
    })
  },
  /**
   * formId传递
   * @param e
   */
  sendFormId (e) {
    let that = this
    let formId = e.detail.formId
    let SESSIONID = wx.getStorageSync('sessionId')
    wx.request({
      // url: that.data.baseUrl + that.data.sendFormIdUrl + formId + '?SESSIONID=' + SESSIONID
      // 二期
      url: that.data.baseUrl + that.data.saveUrl + '?SESSIONID=' + SESSIONID + '&key=' + formId + '&appId=' + that.data.appId + '&sign=' + that.md5() + '&timestamp=' + that.timest(),
      method: 'POST',
      success (res) {
        console.log(res)
      }
    })
  },
  /**
   * 获取用户信息
   * @param successCallback
   */
  wxGetUserInfo (successCallback, failCallback) {
    wx.getUserInfo({
      success (res) {
        successCallback('userInfo', res.userInfo)
      },
      fail () {
        failCallback()
        wx.showToast({
          title: '用户拒绝提供权限,无法查看信息',
          icon: 'success',
          duration: 3000
        })
      }
    })
  },
  /**
   * 获取sessionID
   */
  requestSessionId (successCallback) {
    let that = this
    // 获取storage中的用户信息
    let userInfos = that.wxGetStorage('userInfo')
    let userCode = that.wxGetStorage('code')
    // console.log(userInfos)
    // md5加密
    let sign = that.md5()
    // 时间戳
    let timestamp = that.timest()
    // 请求url
    let url = that.data.baseUrl + that.data.sessionIdUrl + userCode + '?appId=' + that.data.appId + '&sign=' + sign + '&timestamp=' + timestamp
    // 请求数据
    // console.log(url)
    wx.request({
      url: url,
      method: 'POST',
      data: {
        'nikeName': userInfos.nickName,
        'photoUrl': userInfos.avatarUrl
      },
      success (session) {
        // 存储sessionId
        // console.log('sessionid', session.data.result)
        if (session.data.result) {
          that.wxSetStorage('sessionId', session.data.result)
        }
        // console.log(session.data.result)
        // 回调函数
        successCallback()
      },
      fail (res) {
        console.log(res)
      }
    })
  },
  /**
   * 获取本地storage
   * @param code [string] {要获取的session}
   * @returns {*}
   */
  wxGetStorage (code) {
    return wx.getStorageSync(code)
  },
  /**
   * 设置本地storage
   * @param codeName [string] {设置key}
   * @param codeData [string || object] {设置keyData}
   */
  wxSetStorage (codeName, codeData) {
    wx.setStorage({
      key: codeName,
      data: codeData
    })
  },
  /**
   * 微信登陆状态维护
   */
  wxSessionCheck () {
    let that = this
    wx.checkSession({
      // session有效
      success () {
        // console.log('登陆态有效')
        // that.userLogin()
      },
      // session失效
      fail () {
        // console.log('登陆态失效')
        that.userLogin()
      }
    })
  },
  /**
   *
   * @param inObj {object} [url:请求的接口; method:请求的方式; data:请求的数据; header:请求头; callback:回调函数; ]
   */
  getData (inObj, callback) {
    // let that = this
    let sign = this.md5()
    let timestamp = this.timest()
    let SESSIONID = this.wxGetStorage('sessionId')
    let url = this.data.baseUrl + inObj.url + '?appId=' + this.data.appId + '&SESSIONID=' + SESSIONID + '&sign=' + sign + '&timestamp=' + timestamp
    let obj = {
      url: url,
      data: inObj.data || {},
      header: inObj.header || {'Content-Type': 'application/x-www-form-urlencoded'},
      method: inObj.method || 'POST',
      success (res) {
        // console.log(res)
        callback(res, inObj.those)
      }
    }
    wx.request(obj)
  },
  /**
   * session 失效的时候处理
   */
  code300 () {
    // 用户重新授权
    this.userLogin()
  },
  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch () {
    let that = this
    this.wxSessionCheck()
    wx.getStorage({
      key: 'sessionId',
      success () {
        // check sessionId 是否有效
        let checkObj = {
          those: that,
          url: that.data.getUserFxs,
          method: 'GET',
          header: {'Content-Type': 'application/json'}
        }
        that.getData(checkObj, function (res) {
          let code = res.data.code
          // console.log(code)
          if (code === '300' || code === '301') {
            // console.log('sessionId无效')
            return that.userLogin()
          }
        })
        // console.log(res.data)
        // console.log('缓存有效')
      },
      fail () {
        // console.log(res.data)
        // console.log('缓存无效')
        return that.userLogin()
      }
    })
  },
  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow () {
    // console.log(' ========== Application is showed ========== ')
  },
  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide () {
    // console.log(' ========== Application is hid ========== ')
  }
})
