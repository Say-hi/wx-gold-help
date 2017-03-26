// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '我的分析师',
    cancelUrl: '/followers/cancelConcern/',
    cancelText: '取消关注成功',
    userInfo: {},
    followHidden: true,
    fxsInfo: [{
      'name': '张三',
      'company': '北京金融有限公司',
      'type': '高级分析师',
      'gender': '男',
      'style': '金融  专业  成熟',
      'time': '2017/2/2',
      'rise': '1.2%',
      'img': '../../images/fxs-image.png',
      'id': '52f005e6d4b340edb025fd26cdd7793a',
      'introduce': '这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师'
    },
    {
      'name': '张三',
      'company': '北京金融有限公司',
      'type': '高级分析师',
      'gender': '男',
      'style': '金融  专业  成熟',
      'time': '2017/2/2',
      'rise': '1.2%',
      'img': '../../images/fxs-image.png',
      'id': '1234',
      'introduce': '这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师'
    },
    {
      'name': '张三',
      'company': '北京金融有限公司',
      'type': '高级分析师',
      'gender': '男',
      'style': '金融  专业  成熟',
      'time': '2017/2/2',
      'rise': '1.2%',
      'img': '../../images/fxs-image.png',
      'id': '1235',
      'introduce': '这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师'
    }],
    company: true,
    soft: {}
  },
  /**
   * 用户头像照片选择
   */
  chooseImage () {
    var that = this
    wx.chooseImage({
      count: 1,
      success (res) {
        console.log(res.tempFilePaths)
        that.data.userInfo.avatarUrl = res.tempFilePaths
        that.setData({
          userInfo: that.data.userInfo
        })
        // todo 上传变更后信息到服务器
      }
    })
  },
  // 取消关注
  cancelFollow (e) {
    var that = this
    var analystId = e.currentTarget.dataset.id
    var number = e.currentTarget.dataset.number
    // console.log(analystId)
    // todo 取消关注的分析师--->重新获取关注数据array.splice()
    var appId = app.data.appId
    var sign = app.md5()
    var timestamp = app.timest()
    var url = app.data.baseUrl + this.data.cancelUrl + '/' + analystId + '?appId=' + appId + '&SESSIONID=' + wx.getStorageSync('sessionId') + '&sign=' + sign + '&timestamp=' + timestamp
    var method = 'GET'
    var obj = {
      url: url,
      method: method,
      success (res) {
        // console.log(url)
        // console.log(res)
        var code = res.data.code
        // console.log(typeof code)
        if (code === '500') {
          // 失败
          that.setData({
            cancelText: '取消关注失败'
          })
        } else if (code === '200') {
          // 成功
          // console.log(number)
          that.data.fxsInfo.splice(number, 1)
          that.setData({
            cancelText: '取消关注成功',
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
      // data: {
      //   // 'orderBy': that.data.orderBy,
      //   'pageNo': that.data.pageNo,
      //   'pageSize': that.data.pageSize,
      //   'nickName': that.data.userInfo.nickName
      // },
      header: {'Content-Type': 'application/json'}
    }
    app.getData(inObj, function (res, that) {
      that.setData({
        soft: res.data.result
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    console.log(' ---------- onReady ----------')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    console.log(' ---------- onShow ----------')
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    console.log(' ---------- onUnload ----------')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    console.log(' ---------- onPullDownRefresh ----------')
  }
})
