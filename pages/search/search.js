// pages/search/search.js
const http = require("../../models/Http")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotLists: [],
    history:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var searchList = await http.getSearch();
    console.log(searchList)
    this.setData({
      hotLists: searchList.data.playlist.tracks.slice(0, 20)
    })
  },
  handleSubmit(event) {
    var keyword = event.detail.value.keyword;
    console.log(keyword);
    var history=this.data.history;
    history.unshift(keyword);
    this.setData({
      history
    })
      wx.navigateTo({
        url: '/pages/searchlist/searchlist?keywords=' + keyword
      })
  }
}) 