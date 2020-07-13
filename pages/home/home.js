// pages/home/home.js
const http = require('../../models/Http')
Page({
  data: {
    images: [{ img: 'http://p1.music.126.net/ThrJ1D3x2OreyIPv0YkhLw==/109951164908001530.jpg' },
    { img: ' https://i.loli.net/2019/11/27/mDMhGdjL3CVov9k.jpg' },
    { img: ' https://i.loli.net/2019/11/27/IkdmLD9W2MJUFEY.jpg' }],
    indicatorDots: true,
    indicatorColor: "rgba(238, 238, 238,0.3)",
    active: "rgba(194,12,12,0.6)",
    radioList: [],
    musicList: [],
    talkList: []
  },
  onLoad: async function () {
    var musicList = await http.getMusic();
    var radioList = await http.getRadio();
    var talkList = await http.getTalk();
    var list = [];
    musicList.data.playlists.forEach(item => {
      var obj = {};
      obj.name = item.name;
      obj.id = item.id;
      obj.picUrl = item.coverImgUrl;
      obj.programCount = item.playCount;
      list.push(obj);
    })
    this.setData({
      talkList: talkList.data.djRadios.slice(0, 3),
      radioList: radioList.data.djRadios.slice(0, 3),
      musicList: list.slice(0, 3)
    })
  },
  handleToggle() {
    wx.navigateTo({
      url: `/pages/list/list?obj=${'1'}`,
    })
  },
  handleToggle2() {
    wx.navigateTo({
      url: `/pages/list/list?obj=${'2'}`,
    })
  },
  handleToggle3() {
    wx.navigateTo({
      url: `/pages/list/list?obj=${'3'}`,
    })
  }

})