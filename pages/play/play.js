// pages/play/play.js
const myaudio =wx.getBackgroundAudioManager();  
const HTTP = require('../../models/Http');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlay: true,
    animation: '',
    musicslist:[],
    datalist:[],
    index:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var id = options.id;
    var data = await HTTP.getPlaylistDetail({
       id
     });
    this.setData({
      musicslist:data.data.playlist.tracks,
      datalist:data.data.playlist.tracks[0]
    });
    var id =this.data.datalist.id;
    var res =await HTTP.getMusicUrl({id:id});
    var url = res.data.data[0].url;
    myaudio.title =this.data.datalist.name;
    myaudio.src = url;
    myaudio.coverImgUrl =this.data.datalist.al.picUrl ;
    myaudio.onPlay(()=>{
      this.setData({
        isPlay:true
      })
   })
   myaudio.onPause(()=>{
     this.setData({
       isPlay:false
     })
   })
  },
  handleClick() {
    if (this.data.isPlay) {
      this.setData({
        isPlay:false
       })
       myaudio.pause()
    } else {
      this.setData({
        isPlay:true
      })
      myaudio.play()
    }
  },
  nextMusic: async function(){
    var index=this.data.index+1;
    var datalist= this.data.musicslist[index];
    var id =datalist.id;
    var res = await HTTP.getMusicUrl({id:id});
    myaudio.title =datalist.name;
    myaudio.src = res.data.data[0].url;
    myaudio.coverImgUrl =datalist.al.picUrl ;
    this.setData({
      datalist,
      index,
    })
  },
  lastMusic:async function(){
    var index=this.data.index;
    if(!index==0){
      var index=this.data.index-1;
      var datalist= this.data.musicslist[index];
      var id =datalist.id;
      var res = await HTTP.getMusicUrl({id:id});
      myaudio.title =datalist.name;
      myaudio.src = res.data.data[0].url;
      myaudio.coverImgUrl =datalist.al.picUrl ;
      this.setData({
        datalist,
        index,
      })
    }
  }
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

})
