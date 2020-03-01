import request from "../../utils/request.js"

Page({
  data: {
    // 轮播图的数据
    banners: [],
    // 菜单数组
    menus: [],
    // 楼层数据
    floors: [],
    isShowTop: false
  },

  onLoad() {
    // 请求轮播图接口
    request({
      url: "/home/swiperdata"
    }).then(res => {
      // message是轮播图的数组
      const {
        message
      } = res.data;
      // 赋值给banners
      this.setData({
        banners: message
      })
    })
    request({
      url: "/home/catitems"
    }).then(res => {
      // message是菜单的数组
      const {
        message
      } = res.data;

      // 循环添加跳转链接
      const newData = message.map((v, i) => {
        // 代表是分类
        if (i === 0) {
          v.url = "/pages/category/index"
        }

        return v;
      })

      // 赋值给menus
      this.setData({
        menus: newData
      })
    })
    request({
      url: "/home/floordata"
    }).then( res =>{
      const {message} = res.data
      this.setData({
        floors: message
      })
    })
  },
  // 小程序回到顶部
  handleToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }
})