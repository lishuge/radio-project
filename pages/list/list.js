// pages/list/list.js
const http = require('../../models/Http')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [],
    musicHistory:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var options = options.obj;
    if (options == '1') {
      console.log('打印1');
      var musicList = await http.getMusic();
      console.log(musicList.data.playlists)
      var itemList = [];
      musicList.data.playlists.forEach(item => {
        var obj = {};
        obj.name = item.name;
        obj.id = item.id;
        obj.picUrl = item.coverImgUrl;
        obj.programCount = item.playCount;
        itemList.push(obj);
      })
      console.log(itemList)
      this.setData({
        itemList
      })
    } else if (options == '2') {
      console.log('打印2');
      var itemList = await http.getRadio();
      this.setData({
        itemList: itemList.data.djRadios
      })
    } else {
      console.log('打印3');
      var itemList = await http.getTalk();
      this.setData({
        itemList: itemList.data.djRadios
      })
    }
  },
  handlePlay(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/play/play?id=' + id
    })
    var musicHistory=this.data.musicHistory;
    var obj = {};
    obj.img = event.currentTarget.dataset.img;
    obj.name = event.currentTarget.dataset.name;
    obj.id = event.currentTarget.dataset.id;
    musicHistory.push(obj);
    this.setData({
      musicHistory
    })
    wx.setStorageSync('musicHistory',musicHistory)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})