                                    var baseUrl = "http://neteasecloudmusicapi.zhaoboy.com/"
function http({url,data}){
    return new Promise((resolve,reject)=>{
        wx.request({
            url: baseUrl+url,
            data,
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (res)=>{
                resolve(res)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
}
module.exports = {
    getMusic:()=>{
        return http({
            url:"top/playlist?cat=华语"
        })
    },
    getRadio:()=>{
        return http({
            url:"dj/recommend/type?type=8"
        })
    },
    getTalk:()=>{
        return http({
            url:"dj/recommend/type?type=7"
        })
    },
    getSearch:()=>{
        return http({
            url:"top/list?idx=1"
        })
    },
    getPlaylistDetail:(id)=>{
        return http({
            url:'playlist/detail',
            data:id
        })
    },
    getMusicUrl:(id)=>{
        return http({
            url:'song/url',
            data:id
        })
    },
    searchMusic:()=>{
        return http({
          url:'search',
          data:keywords
        })
    }
}