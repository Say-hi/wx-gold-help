// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '我的分析师',
    userInfo: {},
    usertools: [{
      'icon': '../../images/wechatHL.png',
      'tool': '我的分析师',
      'type': 'myfxs'
    },
    {
      'icon': '../../images/wechatHL.png',
      'tool': '公司介绍',
      'type': 'company'
    },
    {
      'icon': '../../images/wechatHL.png',
      'tool': '软件介绍',
      'type': 'soft'
    }],
    fxsInfo: [{
      'name': '张三',
      'company': '北京金融有限公司',
      'type': '高级分析师',
      'gender': '男',
      'style': '金融  专业  成熟',
      'time': '2017/2/2',
      'rise': '1.2%',
      'img': '../../images/fxs-image.png',
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
      'introduce': '这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师这是一个分析师'
    }],
    company: true,
    soft: '软件介绍软件介绍软件介绍软件介绍软件介绍软件介绍软件介绍软件介绍软件介绍软件介绍软件介绍软件介绍软件介绍软件介绍软件介绍'
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
  /**
   * 介绍内容切换
   */
  company () {
    this.setData({
      company: true
    })
  },
  soft () {
    this.setData({
      company: false
    })
  },
  /**
   * 分享设置
   * @returns {{title: string, path: string}}
   */
  onShareAppMessage () {
    return {
      title: '分享我的分析师',
      path: '/pages/login/login'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 获取用户信息
    this.setData({
      userInfo: app.data.userInfo
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
