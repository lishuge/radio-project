// pages/my/my.js
Page({
  data: {
    logo: "",
    name: "",
    hasUserInfo: true,
    musicHistory: [],
    bindtimes:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: (res) => {   //必须要用箭头函数
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              var { nickName, avatarUrl } = res.userInfo;
              this.setData({
                logo: avatarUrl,
                name: nickName
              });
            }
          })
        }
      },
    });
  },
  onShow: function () {
    var bindtimes=this.data.bindtimes;
    console.log(bindtimes)
    if(bindtimes){
       var musicHistory = wx.getStorageSync('musicHistory');
              console.log(musicHistory);
              this.setData({
                musicHistory
              });
         }       
    },      
  onGetUserInfo(e) {
    var { nickName, avatarUrl } = e.detail.userInfo;
    var musicHistory = wx.getStorageSync('musicHistory');
    console.log(musicHistory);
    this.setData({
      logo: avatarUrl,
      name: nickName,
      hasUserInfo: false,
      musicHistory,
      bindtimes:true
    })
  },
})