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
    }).then(res => {
      const {
        message
      } = res.data
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
  },
  // 监听页面的滚动事件
  onPageScroll(e) {
    const {
      scrollTop
    } = e;
    // 当前的状态
    let isShow = this.data.isShowTop;

    // 判断如果滚动高度大于100，显示回到顶部的按钮
    if (scrollTop > 100) {
      isShow = true
    } else {
      isShow = false
    }

    // 避免频繁的操作setData，所以如果下面两个值是相同就没必要再赋值了
    if (isShow == this.data.isShowTop) return;

    this.setData({
      isShowTop: isShow
    })
  }
})