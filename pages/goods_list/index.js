import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 关键字
    keyword: "",
    // 商品的列表
    goods: [],
    // 是否有更多
    hasMoer: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      keyword
    } = options;
    this.setData({
      keyword
    });

    setTimeout(v => {
      // 请求商品列表
      request({
        url: "/goods/search",
        data: {
          query: this.data.keyword,
        }
      }).then(res => {
        // console.log(res)
        const {
          message
        } = res.data;
        const goods = message.goods.map(v => {
          v.goods_price = Number(v.goods_price).toFixed(2)
          return v
        })
        // 把message商品添加带list
        this.setData({
          goods
        })
      })
    }, 3000)

  },


})